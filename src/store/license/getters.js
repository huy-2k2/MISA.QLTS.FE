
const getters = {
    paginateSelectedFixedAsset: (state) => () => {
        const listFilterd = state.selectedFixedAssets.allData.filter(fixedAsset => {
            const textSearch = state.selectedFixedAssets.filterTextSearch.toLowerCase().trim()
            return fixedAsset.fixed_asset_code.toLowerCase().includes(textSearch) || fixedAsset.fixed_asset_name.toLowerCase().includes(textSearch)
        })
        let totalCost = 0
        let totalDepreciationAnnual = 0
        listFilterd.forEach(fixedAsset => {
            totalCost += fixedAsset.cost
            totalDepreciationAnnual += fixedAsset.depreciation_annual
        })
        const pageSize =  state.selectedFixedAssets.pageSize
        const offset = (state.selectedFixedAssets.currentPage - 1) * pageSize
        const listPaginated = listFilterd.slice(offset, offset + pageSize)
        return {listPaginated, totalCost, totalDepreciationAnnual, totalData: listFilterd.length}
    },

    budgetDetailByFixedAssetId: (state) => (fixedAssetId) => {
        const budgets = state.budgetDetails.find(bd => bd.fixed_asset_id == fixedAssetId)
        return budgets
    }
}

export default getters