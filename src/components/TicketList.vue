<script setup>
import { ref, onMounted, computed } from "vue";
import { getTickets } from "../services/ticketService";

const tickets = ref([]);
const chargement = ref(true);
const erreur = ref("");

const recherche = ref("");
const filtreStatut = ref("");
const filtrePriorite = ref("");

async function chargerTickets() {
  try {
    chargement.value = true;
    erreur.value = "";
    const response = await getTickets();
    tickets.value = response.data;
  } catch (error) {
    erreur.value =
      "Impossible de charger les tickets. Vérifiez que JSON Server est démarré.";
  } finally {
    chargement.value = false;
  }
}

onMounted(() => {
  chargerTickets();
});

const ticketsFiltres = computed(() => {
  return tickets.value.filter((ticket) => {
    const titreCorrespond = ticket.titre
      .toLowerCase()
      .includes(recherche.value.toLowerCase());

    const statutCorrespond =
      filtreStatut.value === "" || ticket.statut === filtreStatut.value;

    const prioriteCorrespond =
      filtrePriorite.value === "" || ticket.priorite === filtrePriorite.value;

    return titreCorrespond && statutCorrespond && prioriteCorrespond;
  });
});
</script>

<template>
  <div class="container">
    <h1>Gestion des tickets de maintenance</h1>

    <p class="description">
      Consultez et recherchez les tickets de support informatique.
    </p>

    <div v-if="chargement" class="message">Chargement...</div>

    <div v-else-if="erreur" class="error">
      {{ erreur }}
    </div>

    <div v-else>
      <div class="filtres">
        <input
          type="text"
          v-model="recherche"
          placeholder="Rechercher par titre..."
        />

        <select v-model="filtreStatut">
          <option value="">Tous les statuts</option>
          <option value="Ouvert">Ouvert</option>
          <option value="En cours">En cours</option>
          <option value="Résolu">Résolu</option>
        </select>

        <select v-model="filtrePriorite">
          <option value="">Toutes les priorités</option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
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

          <div class="badges">
            <span
              :class="['badge', 'priorite-' + ticket.priorite.toLowerCase()]"
            >
              {{ ticket.priorite }}
            </span>

            <span
              :class="[
                'badge',
                'statut-' + ticket.statut.toLowerCase().replace(' ', '-'),
              ]"
            >
              {{ ticket.statut }}
            </span>
          </div>
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
  color: purple;
}

.description {
  text-align: center;
  color:#D48AA8;
}

.filtres {
  display: flex;
  gap: 12px;
  margin: 30px 0 15px;
  flex-wrap: wrap;
}

input,
select {
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

.badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.badge {
  padding: 7px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}

.priorite-haute {
  background: #fee2e2;
  color: #b91c1c;
}

.priorite-moyenne {
  background: #fef354;
  color: #92400e;
}

.priorite-basse {
  background: #dcfce7;
  color: #166534;
}

.statut-ouvert {
  background: #1245;
  color: #1e40a1;
}

.statut-en-cours {
  background: pink;
  color:blue;
}

.statut-résolu {
  background: #2147;
  color: #166574;
}

.message {
  text-align: center;
  padding: 25px;
}

.error {
  color: red;
  background: #fee2e2;
  padding: 15px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .filtres {
    flex-direction: column;
  }
}
</style>
