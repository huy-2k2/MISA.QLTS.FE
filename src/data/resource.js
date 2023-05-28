import myEnum from './enum'

const resource = {
    // lấy message lỗi từ error code
    errorMessage: {
        [0]: "Lỗi server",
        [1]: "Lỗi mã code bị trùng",
        [2]: "Lỗi validate dữ liệu",
        [3]: "Lỗi validate nghiệp vụ",
        [4]: "Lỗi không tìm thấy dữ liệu"
    },
    // dữ liệu hiện thị trên toast message
    toastMessage: {
        [myEnum.typeForm.duplicate]: "Nhân bản dữ liệu thành công.",
        [myEnum.typeForm.add]: "Lưu dữ liệu thành công.",
        [myEnum.typeForm.edit]: "thay đổi dữ liệu thành công.",
    },
    // tiêu đề của form
    formTitle: {
        [myEnum.typeForm.duplicate]: "Nhân bản tài sản",
        [myEnum.typeForm.add]: "Thêm tài sản",
        [myEnum.typeForm.edit]: "Sửa tài sản",
    },
    // thông báo lỗi khi validate dữ liệu
    validateMessage: {
        required: "{0} không được để trống",
        length: "{0} có độ dài từ {1} đến {2} ký tự",
        duplicate: "{0} đã tồn tại",
        higher: "{0} phải lớn hoặc bằng hơn {1}",
        lower: "{0} phải nhỏ hoặc bằng {1}",
        interger: "{0} phải là số nguyên",
        positive: "{0} phải lớn hơn 0",
        realNumber: "{0} phải là số thực",
        equal: "{0} phải bằng {1}"
    },
    // menu
    menu: ["MISA QLTS", "Tổng quan", "Tài sản", {text: "Tài sản HT-ĐB", tooltip: "Tài sản hệ thống đường bộ"}, "Công cụ dụng cụ", "Danh mục", "Tra cứu", "Báo cáo"],
    // tiêu đề của table
    tHead: [{text: 'STT', tooltip: 'Số thứ tự'}, "Mã tài sản", "Tên tài sản", "Loại tài sản", "Bộ phận sử dụng", "Số lượng", "Nguyên giá", {text: "HM/KH lũy kế", tooltip: "Hao mòn/ khấu hao lũy kế"}, "Giá trị còn lại", "Chức năng"]
}

export default resource