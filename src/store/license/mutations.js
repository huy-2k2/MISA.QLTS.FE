const mutations = {
    setLicenses(state, [field, data]) {
        state.licenses[field] = data
    },
    setSelectFixedAssets(state, [field, data]) {
        state.selectFixedAssets[field] = data
    },
    setSelectedFixedAssets(state, [field, data]) {
        state.selectedFixedAssets[field] = data
    },
    setBudgets(state, [field, data]) {
        state.budgets[field] = data
    },
    setBudgetDetails(state, data) {
        state.budgetDetails = data
    },
    setListIdDeleted(state, [field, data]) {
        state.listIdDeleted[field] = data
    }
}

export default mutations