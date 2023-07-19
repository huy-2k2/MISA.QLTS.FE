/**
* @description: Hàm chuyển một số về dạng đơn vị tiền vnđ 
* @param: {num}: num: giá trị cần chuyển đổi
* @author: NQ Huy 04/05/2023
* @return: giá trị sau khi đã chuyển về đơn vị tiền tệ
*/
function toCurrency(num) {
    if(isNaN(Number.parseFloat(num)) || !num.toString().length)
        return ''
    else 
        return Number.parseFloat(num).toLocaleString('vi-VN')
}


/**
* @description: Hàm lấy ngày hiện tại về định dạng yyyy-mm-dd
* @param: {date}: date: giá trị cần chuyển đổi
* @author: NQ Huy 04/05/2023
* @return: giá trị sau khi đã chuyển về yyyy-mm-dd
*/
function toCurrentDate(date = new Date().toISOString(), isInInput = true) {
    
    if(isInInput)
        return date.substring(0, 10)
    else  {
        const datePart = date.split("-")
        const year = datePart[0]
        const month = datePart[1]
        const day = datePart[2].substring(0, 2)
        const result =  day + '/' + month + '/' +year
        return result
    }
    
}

 /**
* @description: Hàm làm tròn
* @param: {num, decimal}: date: giá trị cần làm tròn, decimal: số chữ số sau dấu phẩy
* @author: NQ Huy 04/05/2023
* @return: giá trị sau khi làm tròn
*/
function toRounded(num, decimal = 2) {
    if(Number.isInteger(num))   
        return num
    return Number.parseFloat(num).toFixed(decimal)
}


/**
* @description: Hàm viết hoa chữ cái đầu
* @param: {string}: string: chuỗi cần viết hoa chữ cái đầu
* @author: NQ Huy 04/05/2023
* @return: chuỗi sau khi viết hoa chữ cái đầu
*/
function toUpperFirstChar(string) {
    if(string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    return ""
}

export default {toCurrency, toCurrentDate, toRounded, toUpperFirstChar}
