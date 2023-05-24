const getters = {
    departmentById: (state) => (departmentId) => {
        return state.departments.data.find(department => department.departmentId == departmentId)
    },
    assetTypeById: (state) => (assetTypeId) => {
        return state.assetTypes.data.find(assetType => assetType.assetTypeId == assetTypeId)
    },
    totalPage(state) {
        return Math.ceil(state.totalAsset / state.pageSize)
    },
    departmentByCode:(state) => (departmentCode) => {
        return state.departments.data.find(department => department.departmentCode == departmentCode)
    },
    assetTypeByCode:(state) => (assetTypeCode) => {
        return state.assetTypes.data.find(assetType => assetType.assetTypeCode == assetTypeCode)
    },
}

export default getters