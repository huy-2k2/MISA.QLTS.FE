import HomePage from '../pages/HomePage.vue'
import AssetPage from '../pages/AssetPage.vue'
import CategoryPage from '../pages/CategoryPage.vue'
import SearchPage from '../pages/SearchPage.vue'
import ToolPage from '../pages/ToolPage.vue'
import ReportPage from '../pages/ReportPage.vue'
import  AssetHTDBPage from '../pages/AssetHTDBPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {path: '/', component: HomePage},
    {path: '/asset', component: AssetPage},
    {path: '/category', component: CategoryPage},
    {path: '/search', component: SearchPage},
    {path: '/report', component: ReportPage},
    {path: '/tool', component: ToolPage},
    {path: '/asset-htdb', component: AssetHTDBPage},
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router