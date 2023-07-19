const validate = {

    /**
    * @description: hàm kiểm tra khác rỗng
    * @param: {value}: value: giá trị cần kiểm tra
    * @author: NQ Huy 04/05/2023
    * @return: true nếu kiểm tra khác rổng, ngược lại thì false
    */
    validateRequired(value) {
        // nếu là string thì value.trim() khác rỗng, các giá trị khác thì phải null hoạc undefined
        if (typeof value == 'string' && !value.trim() || value == null || value == undefined) {
            return false
        }
        return true
    },

    /**
    * @description: kiểm tra một số có phải là số nguyên hay không
    * @param: {value}: value: giá trị cần kiểm tra
    * @author: NQ Huy 04/05/2023
    * @return: true nếu kiểm tra khác rổng, ngược lại thì false
    */
    validateInterger(value) {
        return Number.isInteger(Number.parseFloat(value))
    },

    /**
    * @description: kiểm tra một số có phải là số thực hay không
    * @param: {value}: value: giá trị cần kiểm tra
    * @author: NQ Huy 04/05/2023
    * @return: true nếu kiểm tra khác rổng, ngược lại thì false
    */
    validateRealNumber(value) {
        return !Number.isNaN(Number.parseFloat(value))
    },

  
    /**
    * @description: kiểm tra chuỗi có độ dài nằm trong khoảng cho phép
    * @param: {value, min, max}: value: giá trị cần kiểm tra, min: độ dài nhỏ nhất, max: độ dài lớn nhất
    * @author: NQ Huy 04/05/2023
    * @return: true nếu kiểm tra khác rổng, ngược lại thì false
    */
    validateLength(value, min, max) {
        value = value.toString()
        return value.length >= min && value.length <= max
    }
}

export default validate