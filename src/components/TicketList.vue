
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getTickets, deleteTicket } from '../services/ticketService'

const router = useRouter()

const tickets = ref([])
const chargement = ref(true)
const erreur = ref('')
const recherche = ref('')
const filtreStatut = ref('')
const filtrePriorite = ref('')

async function chargerTickets() {
    try {
        chargement.value = true
        erreur.value = ''
        const response = await getTickets()
        tickets.value = response.data
    } catch (error) {
        erreur.value = 'Impossible de charger les tickets.'
    } finally {
        chargement.value = false
    }
}

onMounted(() => {
    chargerTickets()
})

const ticketsFiltres = computed(() => {
    return tickets.value.filter(ticket => {
        const titre = ticket.titre.toLowerCase().includes(recherche.value.toLowerCase())
        const statut = filtreStatut.value === '' || ticket.statut === filtreStatut.value
        const priorite = filtrePriorite.value === '' || ticket.priorite === filtrePriorite.value

        return titre && statut && priorite
    })
})

async function supprimerTicket(id) {
    const confirmation = confirm('Voulez-vous vraiment supprimer ce ticket ?')

    if (confirmation) {
        try {
            await deleteTicket(id)
            await chargerTickets()
        } catch (error) {
            erreur.value = 'Erreur lors de la suppression du ticket.'
        }
    }
}

function voirTicket(id) {
    router.push('/tickets/' + id)
}
</script>

<template>
    <div class="container">
        <h1>Gestion des tickets de maintenance</h1>

        <button class="nouveau" @click="router.push('/tickets/nouveau')">
            Nouveau ticket
        </button>

        <div v-if="chargement" class="message">
            Chargement...
        </div>

        <div v-else-if="erreur" class="erreur">
            {{ erreur }}
        </div>

        <div v-else>
            <div class="filtres">
                <input v-model="recherche" placeholder="Rechercher par titre...">

                <select v-model="filtreStatut">
                    <option value="">Tous les statuts</option>
                    <option>Ouvert</option>
                    <option>En cours</option>
                    <option>Résolu</option>
                    <option>Fermé</option>
                </select>

                <select v-model="filtrePriorite">
                    <option value="">Toutes les priorités</option>
                    <option>Haute</option>
                    <option>Moyenne</option>
                    <option>Basse</option>
                </select>
            </div>

            <p class="nombre">
                Nombre de tickets visibles : {{ ticketsFiltres.length }}
            </p>

            <p v-if="ticketsFiltres.length === 0" class="message">
                Aucun ticket trouvé.
            </p>

            <div v-else class="liste">
                <div v-for="ticket in ticketsFiltres" :key="ticket.id" class="ticket">
                    <h2>{{ ticket.titre }}</h2>

                    <p><strong>Demandeur :</strong> {{ ticket.demandeur }}</p>
                    <p><strong>Description :</strong> {{ ticket.description }}</p>
                    <p><strong>Date :</strong> {{ ticket.dateCreation }}</p>
                    <p><strong>Priorité :</strong> {{ ticket.priorite }}</p>
                    <p><strong>Statut :</strong> {{ ticket.statut }}</p>

                    <button @click="voirTicket(ticket.id)">
                        Détails / Modifier
                    </button>

                    <button class="supprimer" @click="supprimerTicket(ticket.id)">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1100px;
    margin: 30px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    text-align: center;
    color: #243b55;
}

.filtres {
    display: flex;
    gap: 12px;
    margin: 30px 0 15px;
    flex-wrap: wrap;
}

input, select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    flex: 1;
    min-width: 180px;
}

.nombre {
    font-weight: bold;
    margin-bottom: 20px;
}

.liste {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.ticket {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 3px 8px #00000012;
}

.ticket h2 {
    color: #243b55;
    font-size: 20px;
}

button {
    padding: 10px 12px;
    margin: 5px 5px 0 0;
    border: none;
    border-radius: 6px;
    background: #243b55;
    color: white;
    cursor: pointer;
}

.nouveau {
    display: block;
    margin: 20px auto;
}

.supprimer {
    background: #b91c1c;
}

.message {
    text-align: center;
    padding: 25px;
}

.erreur {
    color: #b91c1c;
    text-align: center;
    padding: 15px;
}

@media (max-width: 600px) {
    .filtres {
        flex-direction: column;
    }
}
</style>
