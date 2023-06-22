import HomePage from '../pages/HomePage.vue'
import AssetPage from '../pages/AssetPage.vue'
import CategoryPage from '../pages/CategoryPage.vue'
import SearchPage from '../pages/SearchPage.vue'
import ToolPage from '../pages/ToolPage.vue'
import ReportPage from '../pages/ReportPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import  AssetHTDBPage from '../pages/AssetHTDBPage.vue'
import WriteAssetPage from '../pages/WriteAssetPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'



const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {path: '/', component: HomePage},
            {path: '/asset', component: AssetPage,},
            {path: '/category', component: CategoryPage},
            {path: '/search', component: SearchPage},
            {path: '/report', component: ReportPage},
            {path: '/tool', component: ToolPage},
            {path: '/asset-htdb', component: AssetHTDBPage},
            {path: '/write-asset', component: WriteAssetPage}
        ]
    },
    {
        path: '/login',
        component: LoginPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router