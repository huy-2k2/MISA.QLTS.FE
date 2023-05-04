 /**
 * 
 * @param {Float} num 
 * @returns {String}
 * author: Nguyen Quoc Huy
 * created at: 30/04/2023
 * description: Hàm chuyển một số về dạng đơn vị tiền vnđ 
 */
function toCurrency(num) {
    // hàm trả về exception nếu num không thể chuyển về số nguyên, nếu không trả về string đã được định dạng vnđ
    function getCurrency(num) {
        if(isNaN(Number.parseInt(num)))
            throw new Error(`không thể chuyển ${num} về số nguyên`)
        else 
            return Number.parseInt(num).toLocaleString('vi-VN')
    }
    if(num.length) {
        try {
            return getCurrency(num)
        } catch(error) {
            // có lỗi thì log ra message và trả về chuỗi rỗng
            console.log(error.message);
            return num
        }
    }
    return ""
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

export {toCurrency, toCurrentDate}