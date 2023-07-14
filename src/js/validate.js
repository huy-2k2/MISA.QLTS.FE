const validate = {
      /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm kiểm tra khác rỗng
         */
      validateRequired(value) {
        // nếu là string thì value.trim() khác rỗng, các giá trị khác thì phải null hoạc undefined
        if (typeof value == 'string' && !value.trim() || value == null || value == undefined) {
            return false
        }

        return true
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: kiểm tra một số có phải là số nguyên hay không
     */
    validateInterger(value) {
        return Number.isInteger(Number.parseFloat(value))
    },


    /**
     * author: Nguyen Quoc Huy
     * created at: 07/05/2023
     * description: kiểm tra một số có phải là số thực hay không
     */
    validateRealNumber(value) {
        return !Number.isNaN(Number.parseFloat(value))
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: kiểm tra một số có phải là số nguyên hay không
     */
    validateLength(value, min, max) {
        value = value.toString()
        return value.length >= min && value.length <= max
    }
}

export default validate