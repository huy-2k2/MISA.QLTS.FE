const getters = {
    // lấy ra phòng ban từ id phòng ban
    departmentById: (state) => (departmentId) => {
        const result =  state.departments.data.find(department => department.departmentId == departmentId)
        return result
    },
    // lấy ra loại tài sản từ id loại tài sản
    fixedAssetCategoryById: (state) => (fixedAssetCategoryId) => {
        const result = state.fixedAssetCategorys.data.find(fixedAssetCategory => fixedAssetCategory.fixedAssetCategoryId == fixedAssetCategoryId)
        return result;
    },
    // tính tổng số trang
    totalPage(state) {
        return Math.ceil(state.totalAsset / state.pageSize)
    },
    // lấy ra phòng ban từ mã phòng ban
    departmentByCode:(state) => (departmentCode) => {
        return state.departments.data.find(department => department.departmentCode == departmentCode)
    },
    // lấy loại tài sản từ mã loại tài sản
    fixedAssetCategoryByCode:(state) => (fixedAssetCategoryCode) => {
        return state.fixedAssetCategorys.data.find(fixedAssetCategory => fixedAssetCategory.fixedAssetCategoryCode == fixedAssetCategoryCode)
    },
}

export default getters