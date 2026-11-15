
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTicket, updateTicket } from '../services/ticketService'

const route = useRoute()
const router = useRouter()

const ticket = ref(null)
const chargement = ref(true)
const enregistrement = ref(false)
const erreur = ref('')
const message = ref('')

onMounted(async () => {
    try {
        const response = await getTicket(route.params.id)
        ticket.value = { ...response.data }
    } catch (error) {
        erreur.value = 'Ticket introuvable ou erreur de connexion.'
    } finally {
        chargement.value = false
    }
})

async function modifierTicket() {
    if (
        !ticket.value.titre.trim() ||
        !ticket.value.description.trim() ||
        !ticket.value.demandeur.trim()
    ) {
        erreur.value = 'Veuillez remplir les champs obligatoires.'
        return
    }

    try {
        enregistrement.value = true
        erreur.value = ''
        message.value = ''

        await updateTicket(ticket.value.id, ticket.value)

        message.value = 'Ticket modifié avec succès.'
    } catch (error) {
        erreur.value = 'Erreur lors de la modification.'
    } finally {
        enregistrement.value = false
    }
}
</script>

<template>
    <div class="detail">
        <p v-if="chargement">Chargement...</p>

        <div v-else-if="erreur && !ticket">
            <p class="erreur">{{ erreur }}</p>
            <button @click="router.push('/tickets')">Retour</button>
        </div>

        <form v-else-if="ticket" @submit.prevent="modifierTicket">
            <h1>Détail / Modification du ticket</h1>

            <label>Titre *</label>
            <input v-model="ticket.titre" required>

            <label>Description *</label>
            <textarea v-model="ticket.description" required></textarea>

            <label>Demandeur *</label>
            <input v-model="ticket.demandeur" required>

            <label>Priorité</label>
            <select v-model="ticket.priorite">
                <option>Basse</option>
                <option>Moyenne</option>
                <option>Haute</option>
            </select>

            <label>Statut</label>
            <select v-model="ticket.statut">
                <option>Ouvert</option>
                <option>En cours</option>
                <option>Résolu</option>
                <option>Fermé</option>
            </select>

            <p><strong>Date de création :</strong> {{ ticket.dateCreation }}</p>

            <p v-if="erreur" class="erreur">{{ erreur }}</p>
            <p v-if="message" class="message">{{ message }}</p>

            <button type="submit" :disabled="enregistrement">
                {{ enregistrement ? 'Enregistrement...' : 'Enregistrer les modifications' }}
            </button>

            <button type="button" @click="router.push('/tickets')">
                Retour à la liste
            </button>
        </form>
    </div>
</template>

<style scoped>
.detail {
    max-width: 550px;
    margin: 30px auto;
    padding: 25px;
    background: white;
    border-radius: 12px;
}

h1 {
    color: #243b55;
    text-align: center;
}

label {
    display: block;
    margin-top: 15px;
}

input, textarea, select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 6px;
}

textarea {
    min-height: 90px;
}

button {
    padding: 10px;
    margin: 10px 5px 0 0;
    background: #243b55;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.erreur {
    color: red;
}

.message {
    color: green;
}
</style>
