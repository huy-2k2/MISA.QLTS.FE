const mutations = {
     /**
     * @description: thay đổi dữ liệu của state licenses
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng license, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setLicenses(state, [field, data]) {
        state.licenses[field] = data
    },

    /**
     * @description: thay đổi dữ liệu của state selectFixedAssets
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng selectFixedAssets, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setSelectFixedAssets(state, [field, data]) {
        state.selectFixedAssets[field] = data
    },

     /**
     * @description: thay đổi dữ liệu của state selectedFixedAssets
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng selectedFixedAssets, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setSelectedFixedAssets(state, [field, data]) {
        state.selectedFixedAssets[field] = data
    },

    /**
     * @description: thay đổi dữ liệu của state budgets
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng budgets, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setBudgets(state, [field, data]) {
        state.budgets[field] = data
    },

    /**
     * @description: thay đổi dữ liệu của state budgetDetails
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng budgetDetails, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setBudgetDetails(state, data) {
        state.budgetDetails = data
    },

    /**
     * @description: thay đổi dữ liệu của state listIdDeleted
     * @param: {state, [field, data]}: state: dữ liệu local của module, field: tên property trong đối tượng listIdDeleted, data: dữ liệu thay đổi
     * @return: {any}
     * @author: NQ Huy 04/07/2023
     */
    setListIdDeleted(state, [field, data]) {
        state.listIdDeleted[field] = data
    }
}

export default mutations