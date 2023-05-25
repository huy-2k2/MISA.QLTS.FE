const getters = {
    departmentById: (state) => (departmentId) => {
        return state.departments.data.find(department => department.departmentId == departmentId)
    },
    fixedAssetCategoryById: (state) => (fixedAssetCategoryId) => {
        return state.fixedAssetCategorys.data.find(fixedAssetCategory => fixedAssetCategory.fixedAssetCategoryId == fixedAssetCategoryId)
    },
    totalPage(state) {
        return Math.ceil(state.totalAsset / state.pageSize)
    },
    departmentByCode:(state) => (departmentCode) => {
        return state.departments.data.find(department => department.departmentCode == departmentCode)
    },
    fixedAssetCategoryByCode:(state) => (fixedAssetCategoryCode) => {
        return state.fixedAssetCategorys.data.find(fixedAssetCategory => fixedAssetCategory.fixedAssetCategoryCode == fixedAssetCategoryCode)
    },
}

export default getters