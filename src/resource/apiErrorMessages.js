import _enum from "./enum";

const {vietnam, english} = _enum.languages

const apiErrorMessages = {
    [400]: {
        [vietnam]: 'Yêu cầu không hơp lệ.',
        [english]: '...'
    },
    [401]: {
        [vietnam]: 'Yêu cầu chưa được xác thực',
        [english]: '...'
    },
    [403]: {
        [vietnam]: 'Bạn không có quyền truy cập.',
        [english]: '...'
    },
    [404]: {
        [vietnam]: 'Tài nguyên tìm kiếm không tồn tại.',
        [english]: '...'
    },
    [500]: {
        [vietnam]: 'Lỗi hệ thống.',
        [english]: '...'
    },
    
}

export default apiErrorMessages