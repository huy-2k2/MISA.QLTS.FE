const typeForm = {
    edit:'edit',
    duplicate: 'duplicate',
    add: 'add',
}

const typeCombobox = {
    tableOption: 'tableOption',
    listOption: 'listOption'
}

const errorCode = {
    exception: 0,
    duplicateCode: 1,
    dataValidate: 2,
    businessValidate: 3,
    notFound: 4,
    invalidData: 5,
    fileInvalid: 6,
    credentialNotValid: 7,
    InvalidToken: 8
}

const dataType = {
    string: 0,
    guid: 1,
    interger: 2,
    double: 3,
    dateTime: 4,
    yearType: 5
}

export default {typeForm, typeCombobox, errorCode, dataType}