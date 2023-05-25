import _enum from "./enum";

const {vietnam, english} = _enum.languages

const toastMessages = {
    duplicateFixedAssetSuccess: {
        [vietnam]: 'Nhân bản dữ liệu thành công',
        [english]: '...'
    },
    addFixedAssetSuccess: {
        [vietnam]: 'Lưu dữ liệu thành công',
        [english]: '...'
    },
    editFixedAssetSuccess: {
        [vietnam]: 'Thay đổi dữ liệu thành công',
        [english]: '...'
    },
}

export default toastMessages