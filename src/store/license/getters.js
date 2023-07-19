
const getters = {
     /**
     * @description: thực hiện phân trang của table danh sách tài sản đã được chọn khi thêm hoạc sửa chứng từ
     * @return: {dữ liệu khi đã được filter và phân trang}
     * @author: NQ Huy 07/05/2023
     */
    paginateSelectedFixedAsset: (state) => () => {
        const listFilterd = state.selectedFixedAssets.allData.filter(fixedAsset => {
            // lấy ra và làm sạch từ khóa tìm kiếm
            const textSearch = state.selectedFixedAssets.filterTextSearch.toLowerCase().trim()

            // trả về từ danh sách thỏa mãn từ khóa tìm kiếm
            return fixedAsset.fixed_asset_code.toLowerCase().includes(textSearch) || fixedAsset.fixed_asset_name.toLowerCase().includes(textSearch)
        })

        // tính tổng  nguyên giá và tổng hao mòn năm
        let totalCost = 0
        let totalDepreciationAnnual = 0
        listFilterd.forEach(fixedAsset => {
            totalCost += fixedAsset.cost
            totalDepreciationAnnual += fixedAsset.depreciation_annual
        })

        // chỉ lấy lượng dữ liệu thỏa mã pageSize và nằm ở trang yêu cầu
        const pageSize =  state.selectedFixedAssets.pageSize
        const offset = (state.selectedFixedAssets.currentPage - 1) * pageSize
        const listPaginated = listFilterd.slice(offset, offset + pageSize)

        // trả về giá trị
        return {listPaginated, totalCost, totalDepreciationAnnual, totalData: listFilterd.length}
    },

     /**
     * @description: lấy ra các budget detail của 1 tài sản
     * @param: {fixedAssetID}: fixedAssetId: id của tài sản 
     * @return: {danh sách budget detail}
     * @author: NQ Huy 04/05/2023
     */
    budgetDetailByFixedAssetId: (state) => (fixedAssetId) => {
        const budgets = state.budgetDetails.find(bd => bd.fixed_asset_id == fixedAssetId)
        return budgets
    }
}

export default getters