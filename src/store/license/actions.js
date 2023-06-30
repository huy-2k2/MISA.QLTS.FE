import { getFilterFixedAssetNoLicenseApi, getFilterLicensesApi } from "@/js/api"
const actions = {
    getFilterLicenses(store) {
        store.commit("setLicenses", ["isLoading", true])
        getFilterLicensesApi(store.state.licenses.pageSize, store.state.licenses.currentPage, store.state.licenses.filterTextSearch, (data) => {
            store.commit("setLicenses", ["data", data.list_license_model])
            store.commit("setLicenses", ["isLoading", false])
            store.commit("setLicenses", ["totalCost", data.total_cost])
            store.commit("setLicenses", ["totalLicense", data.total_license])
        })
    },

    getFilterSelectFixedAsset(store) {
        const pageSize = store.state.selectFixedAssets.pageSize
        const currentPage = store.state.selectFixedAssets.currentPage
        const textSearch = store.state.selectFixedAssets.filterTextSearch
        const  listIdSelected = store.state.selectedFixedAssets.allData.map(fixedAsset => fixedAsset.fixed_asset_id)
        store.commit("setSelectFixedAssets", ["isLoading", true])
        getFilterFixedAssetNoLicenseApi(pageSize, currentPage, listIdSelected, textSearch, (data) => {
            store.commit("setSelectFixedAssets", ["data", data.list_fixed_asset])
            store.commit("setSelectFixedAssets", ["totalAsset", data.total_asset])
            store.commit("setSelectFixedAssets", ["isLoading", false])
        })
    }
}

export default actions