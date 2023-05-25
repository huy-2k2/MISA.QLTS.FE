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
    setPageSize(state, pageSize) {
        state.pageSize = pageSize
    },
    setFilter(state, {departmentId, fixedAssetCategoryId, textSearch}) {
        state.filterDepartmentId = departmentId || ""
        state.filterFixedAssetCategoryId = fixedAssetCategoryId || ""
        state.filterTextSearch = textSearch || ""
    },
}

export default mutations