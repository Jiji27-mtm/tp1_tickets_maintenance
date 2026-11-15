
import { createRouter, createWebHistory } from 'vue-router'

import TicketList from '../components/TicketList.vue'
import TicketForm from '../components/TicketForm.vue'
import TicketDetail from '../components/TicketDetail.vue'

const routes = [
    {
        path: '/tickets',
        component: TicketList
    },
    {
        path: '/tickets/nouveau',
        component: TicketForm
    },
    {
        path: '/tickets/:id',
        component: TicketDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
