const mutations = {
    setData(state, {data, field}) {
        state[field].data = data
    },
    setLoading(state, {isLoading, field}) {
        state[field].isLoading = isLoading
    },
    setLanguage(state, language) {
        state.language = language
    },
    setTotalAsset(state, totalAsset) {
        state.totalAsset = totalAsset
    },
    setCurrentPage(state, currentPage) {
        state.currentPage = currentPage
    },
    setFilterDepartmentId(state, departmentId) {
        state.filterDepartmentId = departmentId
    },
    setFilterAssetTypeId(state, assetTypeId) {
        state.filterAssetTypeId = assetTypeId
    }  
}

export default mutations