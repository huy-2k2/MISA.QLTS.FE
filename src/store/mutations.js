const mutations = {
    // set data chung cho các state fixedAssets, fixedAssetCategorys, departments, vì cấu trúc của 3 state này giống nhau nên viết lại làm 1 hàm
    setData(state, {data, field}) {
        state[field].data = data
    },
    // set loading dữ liệu cho fixedAssets, fixedAssetCategorys, departments
    setLoading(state, {isLoading, field}) {
        state[field].isLoading = isLoading
    },
    // set tổng số bản ghi
    setTotalAsset(state, totalAsset) {
        state.totalAsset = totalAsset
    },
    // set tổng số lượng
    setTotalQuantity(state, totalQuantity) {
        state.totalQuantity = totalQuantity
    },
    // set tổng giá tiền
    setTotalCost(state, totalCost) {
        state.totalCost = totalCost
    },
    // set page
    setCurrentPage(state, currentPage) {
        state.currentPage = currentPage
    },
    // set kích thước page
    setPageSize(state, pageSize) {
        state.pageSize = pageSize
    },
    // set dữ liệu về các trường lọc dữ liệu
    setFilter(state, {departmentId, fixedAssetCategoryId, textSearch}) {
        state.filterDepartmentId = departmentId || ""
        state.filterFixedAssetCategoryId = fixedAssetCategoryId || ""
        state.filterTextSearch = textSearch || ""
    },
}

export default mutations