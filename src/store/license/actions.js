import { GetAllBudgetApi, getFilterFixedAssetNoLicenseApi, getFilterLicensesApi } from "@/js/api"
const actions = {
     /**
     * @description: action gọi api để lấy danh sách chứng từ
     * @param: {store}: store: store local của module
     * @author: NQ Huy 07/07/2023
     */
    async getFilterLicenses(store) {
        // set loading là true
        store.commit("setLicenses", ["isLoading", true])

        // gọi api để lấy dữ liệu
        const {data} = await getFilterLicensesApi(store.state.licenses.pageSize, store.state.licenses.currentPage, store.state.licenses.filterTextSearch)
        
        // commit các dữ liệu đã lấy được từ api
        store.commit("setLicenses", ["data", data.list_license])
        store.commit("setLicenses", ["isLoading", false])
        store.commit("setLicenses", ["totalCost", data.total_cost])
        store.commit("setLicenses", ["totalLicense", data.total_license])
    },

    /**
     * @description: action gọi api để lấy danh sách tài sản khi chọn tài sản trong thêm hoạc sửa chứng từ
     * @param: {store, licenseId}: store: store local của module, licenseId: id của license trong trường hợp sửa
     * @author: NQ Huy 07/07/2023
     */
    async getFilterSelectFixedAsset(store, licenseId) {
        // lấy ra thông số pageSize, currentPage, từ khóa tìm kiếm, danh sách tài sản đã chọn
        const pageSize = store.state.selectFixedAssets.pageSize
        const currentPage = store.state.selectFixedAssets.currentPage
        const textSearch = store.state.selectFixedAssets.filterTextSearch
        const  listIdSelected = store.state.selectedFixedAssets.allData.map(fixedAsset => fixedAsset.fixed_asset_id)

        // set loading là true
        store.commit("setSelectFixedAssets", ["isLoading", true])

        // gọi api để lấy dữ liệu
        const {data} = await getFilterFixedAssetNoLicenseApi(pageSize, currentPage, listIdSelected, textSearch, licenseId) 

        // commit các dữ liệu lấy từ được từ api
        store.commit("setSelectFixedAssets", ["data", data.list_fixed_asset])
        store.commit("setSelectFixedAssets", ["totalAsset", data.total_asset])
        store.commit("setSelectFixedAssets", ["isLoading", false])
    },

     /**
     * @description: action gọi api để lấy danh sách nguồn ngân sách
     * @param: {store}: store: store local của module
     * @author: NQ Huy 07/07/2023
     */
    async getBudgets(store) {
        // set loading là true
        store.commit('setBudgets', ['isLoading', true])

        // gọi api để lấy dữ liệu
        const {data} = await GetAllBudgetApi()

        // commit các dữ liệu lấy từ api
        store.commit('setBudgets', ['isLoading', false])
        store.commit('setBudgets', ['data', data])
    },

    /**
     * @description: action để thêm hoạc xóa 1 budgetDetail trong danh sách budgetDetails
     * @param: {store}: store: store local của module
     * @author: NQ Huy 07/07/2023
     */
    setBudgetDetails(store, budgetDetail) {
        // lấy toàn bộ danh sách budgetDetails
        const budgetDetails = store.state.budgetDetails

        // tìm ra vị trí tương ứng có fixed_asset_id đã cho
        const index = budgetDetails.findIndex(bd => bd.fixed_asset_id == budgetDetail.fixed_asset_id)
        if(index != -1) {
            budgetDetails[index] = budgetDetail
        } 
        else {
            budgetDetails.push(budgetDetail)
        }
        store.commit("setBudgetDetails", budgetDetails)
    },

    /**
     * @description: action xóa tài sản đã được chọn khỏi danh sách
     * @param: {store, fixedAssetId}: store: store local của module, fixedAssetId: id của tài sản cần xóa
     * @author: NQ Huy 07/07/2023
     */
    removeSelectedFixedAsset(store, fixedAssetId) {
        // lấy ra selectedFixedAssets
        let selectedFixedAssets = store.state.selectedFixedAssets.allData
        
        // lấy ra budgetDetails
        let budgetDetails = store.state.budgetDetails

        // xóa tài sản khỏi danh sách
        selectedFixedAssets = selectedFixedAssets.filter(fa => fa.fixed_asset_id != fixedAssetId)

        // xóa budgetDetails của tài sản vừa xóa khỏi danh sách budgetDetails
        budgetDetails = budgetDetails.filter(bd => bd.fixed_asset_id != fixedAssetId)

        // commit dữ liệu
        store.commit("setSelectedFixedAssets", ['allData', selectedFixedAssets])
        store.commit("setBudgetDetails", budgetDetails)
        store.commit("setSelectedFixedAssets", ['currentPage', 1])

    },
}

export default actions