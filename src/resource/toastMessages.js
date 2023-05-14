import _enum from "./enum";

const {vietnam, english} = _enum.languages

const toastMessages = {
    duplicateAssetSuccess: {
        [vietnam]: 'Nhân bản dữ liệu thành công',
        [english]: '...'
    },
    addAssetSuccess: {
        [vietnam]: 'Lưu dữ liệu thành công',
        [english]: '...'
    },
    editAssetSuccess: {
        [vietnam]: 'Thay đổi dữ liệu thành công',
        [english]: '...'
    },
}

export default toastMessages