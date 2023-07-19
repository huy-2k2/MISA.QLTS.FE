// kiểu form (thêm, sửa, xóa, nhân bản)
const typeForm = {
    edit:'edit',
    duplicate: 'duplicate',
    add: 'add',
}

// kiểu combobox (options, hoạc table)
const typeCombobox = {
    tableOption: 'tableOption',
    listOption: 'listOption'
}

// mã lỗi tương ứng với server
const errorCode = {
    exception: 0,
    duplicateCode: 1,
    dataValidate: 2,
    businessValidate: 3,
    notFound: 4,
    invalidData: 5,
    fileInvalid: 6,
    credentialNotValid: 7,
    InvalidToken: 8,
    deleteDetail: 9,
    deleteDetailMulti: 10
}

// kiểu dữ liệu để format
const dataType = {
    string: 0,
    guid: 1,
    interger: 2,
    double: 3,
    dateTime: 4,
    yearType: 5
}

export default {typeForm, typeCombobox, errorCode, dataType}