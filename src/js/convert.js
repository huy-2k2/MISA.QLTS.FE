 /**
 * 
 * @param {Float} num 
 * @returns {String}
 * author: Nguyen Quoc Huy
 * created at: 30/04/2023
 * description: Hàm chuyển một số về dạng đơn vị tiền vnđ 
 */
function toCurrency(num) {
    if(isNaN(Number.parseFloat(num)) || !num.toString().length)
        return ''
    else 
        return Number.parseFloat(num).toLocaleString('vi-VN')
}

 /**
 * 
 * @returns {String}
 * author: Nguyen Quoc Huy
 * created at: 30/04/2023
 * description: Hàm lấy ngày hiện tại về định dạng yyyy-mm-dd
 */
function toCurrentDate(date = new Date().toISOString()) {
    return date.substring(0, 10)
}


 /**
 * 
 * @param {Float} num
 * @param {Number} decimal
 * @return {Float}
 * author: Nguyen Quoc Huy
 * created at: 30/04/2023
 * description: Hàm làm tròn
 */
function toRounded(num, decimal = 2) {
    if(Number.isInteger(num))   
        return num
    return Number.parseFloat(num).toFixed(decimal)
}


 /**
 * 
 * @param {String} string
 * author: Nguyen Quoc Huy
 * created at: 30/04/2023
 * description: Hàm viết hoa chữ cái đầu
 */
function toUpperFirstChar(string) {
    if(string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    return ""
}

export default {toCurrency, toCurrentDate, toRounded, toUpperFirstChar}
