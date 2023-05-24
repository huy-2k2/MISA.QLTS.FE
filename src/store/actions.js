import axios from "axios"
import emitter from '../common/emitter';
import apiErrorMessages from "@/resource/apiErrorMessages";
import { BASE_API_URL } from "../config";

function getData(store, url, field, callback) {
    store.commit('setLoading', {isLoading: true, field})
    axios.get(url)
    .then(({data}) =>{
        store.commit('setLoading', {isLoading: false, field})
        callback(data)
    })
    .catch(error => {
        const message = apiErrorMessages[error.response.status][store.state.language]
        emitter.emit('setDialogMessage', message)
    })
}

const actions = {
    getDepartments(store) {
        getData(store, `${BASE_API_URL}departments`, 'departments', (data) => {
            store.commit('setData', {data, field: 'departments'})
        })
    },

    getAssetTypes(store) {
        getData(store, `${BASE_API_URL}assettypes`, 'assetTypes', (data) => {
            store.commit('setData', {data, field: 'assetTypes'})
        })
    },

    getAssets(store) {
        getData(store, `${BASE_API_URL}paginateassets?pageSize=${store.state.pageSize}&currentpage=${store.state.currentPage}`, 'assets', (response) => {
            store.commit('setData', {data: response.assets, field: 'assets'})
            store.commit('setTotalAsset', response.totalAsset)
        })
    },

    getAssetFilterByDepartmentId(store) {
        getData(store, `${BASE_API_URL}paginateassets/department?pageSize=${store.state.pageSize}&currentpage=${store.state.currentPage}&departmentId=${store.state.filterDepartmentId}`, 'assets', (response) => {
            store.commit('setData', {data: response.assets, field: 'assets'})
            store.commit('setTotalAsset', response.totalAsset)
        })
    },

    getAssetFilterByAssetTypeId(store) {
        getData(store, `${BASE_API_URL}paginateassets/assetType?pageSize=${store.state.pageSize}&currentpage=${store.state.currentPage}&assetTypeId=${store.state.filterAssetTypeId}`, 'assets', (response) => {
            store.commit('setData', {data: response.assets, field: 'assets'})
            store.commit('setTotalAsset', response.totalAsset)
        })
    },

    getAssetFilterByAll(store) {
        getData(store, `${BASE_API_URL}paginateassets/all?pageSize=${store.state.pageSize}&currentpage=${store.state.currentPage}&departmentId=${store.state.filterDepartmentId}&assetTypeId=${store.state.filterAssetTypeId}`, 'assets', (response) => {
            store.commit('setData', {data: response.assets, field: 'assets'})
            store.commit('setTotalAsset', response.totalAsset)
        })
    },

    setLanguage({commit}, language) {
        commit('setLanguage', language)
    },

    setCurrentPage(store, currentPage) {
        store.commit('setCurrentPage', currentPage)
        store.dispatch('getFilterAssets', {departmentId: store.state.filterDepartmentId, assetTypeId: store.state.filterAssetTypeId, isSetCurrentPage: true})
    },

    resetState(store) {
        store.commit('setCurrentPage', 1)
        store.commit("setFilterDepartmentId", null)
        store.commit("setFilterAssetTypeId", null)
    },

    getFilterAssets(store, {departmentId, assetTypeId, isSetCurrentPage}) {
        if(!isSetCurrentPage)
            store.commit('setCurrentPage', 1)
        store.commit('setFilterDepartmentId', departmentId)
        store.commit('setFilterAssetTypeId', assetTypeId)
        if(!departmentId && !assetTypeId) {
            store.dispatch('getAssets')
        } else if(departmentId && assetTypeId) {
            store.dispatch('getAssetFilterByAll')
        } else if(departmentId) {
            store.dispatch('getAssetFilterByDepartmentId')
        } else if(assetTypeId) {
            store.dispatch('getAssetFilterByAssetTypeId')
        }
    },
   
}

export default actions