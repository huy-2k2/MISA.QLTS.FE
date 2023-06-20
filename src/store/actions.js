import {getFilterFixedAssetApi, getDepartmentsApi, getFixedAssetCategorysApi} from '../js/api'


const actions = {
    /**
     * description: action lấy ra tất cả thông tin phòng ban rồi lưu vào state
     * created by: NQ Huy(25/05/2023)
     * @param {*} store 
     */
    async getDepartments(store) {
        store.commit('setLoading', {isLoading: true, field: "departments"})
            const data = await getDepartmentsApi(() =>   store.commit('setLoading', {isLoading: false, field: "departments"})) 
            if(!data)
                return
            store.commit('setData', {
                data: data.map(department => ({departmentId: department.department_id, departmentCode: department.department_code, departmentName: department.department_name})) ,
                field: 'departments'
            })
            store.commit('setLoading', {isLoading: false, field: "departments"})
  
        
    },

    /**
     * description: lấy ra tất cả mã loại tài sản rồi lưu vào state
     * create by: NQ Huy(25/05/2023)
     * @param {*} store 
     */
    async getFixedAssetCategorys(store) {
        store.commit('setLoading', {isLoading: true, field: "fixedAssetCategorys"})
        const data = await getFixedAssetCategorysApi(() =>   store.commit('setLoading', {isLoading: false, field: "fixedAssetCategorys"}))
        if(!data)
            return
        store.commit('setData', {
            data: data.map(fixedAssetCategory => ({fixedAssetCategoryId: fixedAssetCategory.fixed_asset_category_id, fixedAssetCategoryCode: fixedAssetCategory.fixed_asset_category_code, fixedAssetCategoryName: fixedAssetCategory.fixed_asset_category_name, lifeTime: fixedAssetCategory.life_time, depreciationRate: fixedAssetCategory.depreciation_rate})),
            field: 'fixedAssetCategorys'
        })
        store.commit('setLoading', {isLoading: false, field: "fixedAssetCategorys"})
        
    },

    /**
     * description: lấy ra các tài sản thỏa mã điều kiện lọc rồi lưu vào state
     * create by: NQ Huy(25/05/2023)
     * @param {*} store 
     */
    getFilterFixedAsset(store) {
        store.commit('setLoading', {isLoading: true, field: "fixedAssets"})
        // lấy dữ liệu tài rồi lưu vào state
        getFilterFixedAssetApi(store.state.pageSize, store.state.currentPage, store.state.filterDepartmentId || "", store.state.filterFixedAssetCategoryId || "", store.state.filterTextSearch || "", (data) => {
            store.commit("setData", {
                data: data.listFixedAsset.map(fixedAsset => ( {
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
            store.commit("setTotalAsset", data.totalAsset)
            store.commit("setTotalQuantity", data.totalQuantity)
            store.commit("setTotalCost", data.totalCost)
            store.commit('setLoading', {isLoading: false, field: "fixedAssets"})
        }, () => store.commit('setLoading', {isLoading: false, field: "fixedAssets"}))
    }
   
}

export default actions