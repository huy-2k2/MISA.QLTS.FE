const mutations = {
    setLicenses(state, [field, data]) {
        state.licenses[field] = data
    },
    setSelectFixedAssets(state, [field, data]) {
        state.selectFixedAssets[field] = data
    },
    setSelectedFixedAssets(state, [field, data]) {
        state.selectedFixedAssets[field] = data
    }
}

export default mutations