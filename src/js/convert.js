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
function toCurrentDate() {
    return new Date().toISOString().substring(0, 10)
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

export default {toCurrency, toCurrentDate, toRounded}
