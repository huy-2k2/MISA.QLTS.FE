import { GetAllBudgetApi, getFilterFixedAssetNoLicenseApi, getFilterLicensesApi } from "@/js/api"
const actions = {
    async getFilterLicenses(store) {
        store.commit("setLicenses", ["isLoading", true])
        const {data} = await getFilterLicensesApi(store.state.licenses.pageSize, store.state.licenses.currentPage, store.state.licenses.filterTextSearch)
        store.commit("setLicenses", ["data", data.list_license])
        store.commit("setLicenses", ["isLoading", false])
        store.commit("setLicenses", ["totalCost", data.total_cost])
        store.commit("setLicenses", ["totalLicense", data.total_license])
    },

    async getFilterSelectFixedAsset(store, licenseId) {
        const pageSize = store.state.selectFixedAssets.pageSize
        const currentPage = store.state.selectFixedAssets.currentPage
        const textSearch = store.state.selectFixedAssets.filterTextSearch
        const  listIdSelected = store.state.selectedFixedAssets.allData.map(fixedAsset => fixedAsset.fixed_asset_id)
        store.commit("setSelectFixedAssets", ["isLoading", true])
        const {data} = await getFilterFixedAssetNoLicenseApi(pageSize, currentPage, listIdSelected, textSearch, licenseId) 
        store.commit("setSelectFixedAssets", ["data", data.list_fixed_asset])
        store.commit("setSelectFixedAssets", ["totalAsset", data.total_asset])
        store.commit("setSelectFixedAssets", ["isLoading", false])
    },

    async getBudgets(store) {
        store.commit('setBudgets', ['isLoading', true])
        const {data} = await GetAllBudgetApi()
        store.commit('setBudgets', ['isLoading', false])
        store.commit('setBudgets', ['data', data])
    },

    setBudgetDetails(store, budgetDetail) {
        const budgetDetails = store.state.budgetDetails
        const index = budgetDetails.findIndex(bd => bd.fixed_asset_id == budgetDetail.fixed_asset_id)
        if(index != -1) {
            budgetDetails[index] = budgetDetail
        } else {
            budgetDetails.push(budgetDetail)
        }
        store.commit("setBudgetDetails", budgetDetails)
    },

    removeSelectedFixedAsset(store, fixedAssetId) {
        let selectedFixedAssets = store.state.selectedFixedAssets.allData
        let budgetDetails = store.state.budgetDetails
        selectedFixedAssets = selectedFixedAssets.filter(fa => fa.fixed_asset_id != fixedAssetId)
        budgetDetails = budgetDetails.filter(bd => bd.fixed_asset_id != fixedAssetId)
        store.commit("setSelectedFixedAssets", ['allData', selectedFixedAssets])
        store.commit("setBudgetDetails", budgetDetails)
        store.commit("setSelectedFixedAssets", ['currentPage', 1])

    },
}

export default actions