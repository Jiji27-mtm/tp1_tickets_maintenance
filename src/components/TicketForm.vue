
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket } from '../services/ticketService'

const router = useRouter()

const titre = ref('')
const description = ref('')
const demandeur = ref('')
const priorite = ref('Moyenne')
const chargement = ref(false)
const erreur = ref('')

async function ajouterTicket() {
    if (!titre.value || !description.value || !demandeur.value) {
        erreur.value = 'Veuillez remplir tous les champs obligatoires.'
        return
    }

    try {
        chargement.value = true
        erreur.value = ''

        const nouveauTicket = {
            titre: titre.value,
            description: description.value,
            demandeur: demandeur.value,
            priorite: priorite.value,
            statut: 'Ouvert',
            dateCreation: new Date().toISOString().slice(0, 10)
        }

        await createTicket(nouveauTicket)

        router.push('/tickets')
    } catch (error) {
        erreur.value = "Erreur lors de l'ajout du ticket."
    } finally {
        chargement.value = false
    }
}
</script>

<template>
    <div class="formulaire">
        <h1>Nouveau ticket</h1>

        <form @submit.prevent="ajouterTicket">
            <label>Titre *</label>
            <input v-model="titre" type="text">

            <label>Description *</label>
            <textarea v-model="description"></textarea>

            <label>Demandeur *</label>
            <input v-model="demandeur" type="text">

            <label>Priorité</label>
            <select v-model="priorite">
                <option>Basse</option>
                <option>Moyenne</option>
                <option>Haute</option>
            </select>

            <p v-if="erreur" class="erreur">{{ erreur }}</p>

            <button type="submit" :disabled="chargement">
                {{ chargement ? 'Enregistrement...' : 'Enregistrer' }}
            </button>

            <button type="button" @click="router.push('/tickets')">
                Annuler
            </button>
        </form>
    </div>
</template>

<style scoped>
.formulaire {
    max-width: 500px;
    margin: 30px auto;
    padding: 25px;
    background: white;
    border-radius: 12px;
}

h1 {
    text-align: center;
    color: #243b55;
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
    margin-top: 20px;
    margin-right: 8px;
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    background: #243b55;
    color: white;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.erreur {
    color: red;
}
</style>
