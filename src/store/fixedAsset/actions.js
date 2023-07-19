import {getFilterFixedAssetApi, getDepartmentsApi, getFixedAssetCategorysApi} from '../../js/api'


const actions = {
    /**
     * @description: lấy toàn bộ phòng ban
     * @param: {store}: store: store local của module
     * @author: NQ Huy 04/05/2023
     */
    async getDepartments(store) {
        // set loading là true
        store.commit('setLoading', {isLoading: true, field: "departments"})
        try {
            // gọi api để lấy dữ liệu
            const {data} = await getDepartmentsApi() 
            
            // commit dữ liệu lấy được từ api
            store.commit('setData', {
                data: data.map(department => ({departmentId: department.department_id, departmentCode: department.department_code, departmentName: department.department_name})) ,
                field: 'departments'
            })
            store.commit('setLoading', {isLoading: false, field: "departments"})

        } 
        // trường hợp gọi api thất bại
        catch {
         store.commit('setLoading', {isLoading: false, field: "departments"})
        }
    },

     /**
  * @description: lấy tất cả loại tài sản
  * @param: {store}: store: store local của module
  * @author: NQ Huy 04/05/2023
  */
    async getFixedAssetCategorys(store) {
        // set loading là true
        store.commit('setLoading', {isLoading: true, field: "fixedAssetCategorys"})
        try {
            //  gọi api để lấy dữ liệu
            const {data} = await getFixedAssetCategorysApi()
            
            // commit dữ liệu lấy từ api
            store.commit('setData', {
                data: data.map(fixedAssetCategory => ({fixedAssetCategoryId: fixedAssetCategory.fixed_asset_category_id, fixedAssetCategoryCode: fixedAssetCategory.fixed_asset_category_code, fixedAssetCategoryName: fixedAssetCategory.fixed_asset_category_name, lifeTime: fixedAssetCategory.life_time, depreciationRate: fixedAssetCategory.depreciation_rate})),
                field: 'fixedAssetCategorys'
            })
            store.commit('setLoading', {isLoading: false, field: "fixedAssetCategorys"})
        }
        // xử lý lỗi
        catch {
            store.commit('setLoading', {isLoading: false, field: "fixedAssetCategorys"})
        }
    },

     /**
     * @description: gọi api để lấy dữ liệu cho table danh sách tài sản
     * @param: {store}: store: store local của module
     * @author: NQ Huy 04/05/2023
     */
    async getFilterFixedAsset(store) {
        // set loading là true
        store.commit('setLoading', {isLoading: true, field: "fixedAssets"})
       
        try {
            // gọi api để lấy dữ liệu
            const {data} = await getFilterFixedAssetApi(store.state.pageSize, store.state.currentPage, store.state.filterDepartmentId || "", store.state.filterFixedAssetCategoryId || "", store.state.filterTextSearch || "")
            
            // commit dữ liệu lấy từ api
            store.commit("setData", {
                data: data.list_fixed_asset.map(fixedAsset => ( {
                    fixedAssetId: fixedAsset.fixed_asset_id,
                    fixedAssetCode: fixedAsset.fixed_asset_code,
                    fixedAssetName: fixedAsset.fixed_asset_name,
                    fixedAssetCategoryId: fixedAsset.fixed_asset_category_id,
                    departmentId: fixedAsset.department_id,
                    purchaseDate: fixedAsset.purchase_date,
                    useDate: fixedAsset.use_date,
                    cost: fixedAsset.cost,
                    quantity: fixedAsset.quantity,
                    depreciationRate: fixedAsset.depreciation_rate,
                    depreciationAnnual: fixedAsset.depreciation_annual,
                    trackedYear: fixedAsset.tracked_year,
                    lifeTime: fixedAsset.life_time
                })),
                field: "fixedAssets"
            })
                // lưu các dữ liệu về tổng tài sản, tổng số lượng, tổng nguyên giá
                store.commit("setTotalAsset", data.total_asset)
                store.commit("setTotalQuantity", data.total_quantity)
                store.commit("setTotalCost", data.total_cost)
                store.commit('setLoading', {isLoading: false, field: "fixedAssets"})

        } 
        // xử lý lỗi
        catch {
            store.commit('setLoading', {isLoading: false, field: "fixedAssets"})
        }
    }
   
}

export default actions