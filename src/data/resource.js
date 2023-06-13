import myEnum from './enum'

const resource = {
    // dữ liệu hiện thị trên toast message
    toastMessage: {
        [myEnum.typeForm.duplicate]: "Nhân bản dữ liệu thành công.",
        [myEnum.typeForm.add]: "Lưu dữ liệu thành công.",
        [myEnum.typeForm.edit]: "thay đổi dữ liệu thành công.",
        import: "Nhập khẩu dữ liệu thành công"
    },
    // tiêu đề của form
    formTitle: {
        [myEnum.typeForm.duplicate]: "Nhân bản tài sản",
        [myEnum.typeForm.add]: "Thêm tài sản",
        [myEnum.typeForm.edit]: "Sửa tài sản",
        import: "Nhập khẩu tài sản"
    },
    // thông báo lỗi khi validate dữ liệu
    validateMessage: {
        required: "cần phải nhập thông tin <strong>{0}</strong>",
        length: "{0} phải có độ dài từ {1} đến {2} ký tự",
        duplicate: "{0} đã tồn tại",
        higher: "{0} phải lớn hoặc bằng {1}",
        lower: "{0} phải nhỏ hoặc bằng {1}",
        interger: "{0} phải là số nguyên",
        positive: "{0} phải lớn hơn 0",
        realNumber: "{0} hải là số thực",
        equal: "{0} phải bằng {1}"
    },
    // menu
    menu: ["MISA QLTS", "Tổng quan", "Tài sản", {text: "Tài sản HT-ĐB", tooltip: "Tài sản hệ thống đường bộ"}, "Công cụ dụng cụ", "Danh mục", "Tra cứu", "Báo cáo"],
    // tiêu đề của table
    tHead: [{text: 'STT', tooltip: 'Số thứ tự'}, "Mã tài sản", "Tên tài sản", "Loại tài sản", "Bộ phận sử dụng", "Số lượng", "Nguyên giá", {text: "HM/KH lũy kế", tooltip: "Hao mòn/ khấu hao lũy kế"}, "Giá trị còn lại", "Chức năng"],
    // tiêu đề của page
    titlePage: ["Tổng quan tài sản", "Danh sách tài sản", "Tài sản hệ thống đường bộ", "Công cụ", "Danh mục", "Tra cứu", "Báo cáo"],
    tooltip: {import: 'Nhập khẩu', delete: 'Xóa', edit: 'Sửa', duplicate: 'Nhân bản', close: 'Đóng'},
    // chi tiết của 1 trang
    fixedAssetDetail: {financialDepartment: 'Sở tài chính', year: 'Năm', totalFixedAsset: 'Tổng số {0} bản ghi', searchPlaceholder: 'Tìm kiếm tài sản'},
    // label combobox
    combobox: [["Mã", "Tên"]],
    // placeholder cho combobox và input
    placeholder: {combobox: 'Chọn {0}', input: 'Nhập {0}'},
    // tên các field input
    fieldName: {
        fixedAssetCategory: 'loại tài sản',
        department: 'bộ phận sử dụng',
        fixedAssetCode: 'mã tài sản',
        fixedAssetName: 'tên tài sản',
        departmentCode: 'mã bộ phận sử dụng',
        departmentName: 'tên bộ phận sử dụng',
        fixedAssetCategoryCode: 'mã loại tài sản',
        fixedAssetCategoryName: 'tên loại tài sản',
        quantity: 'số lượng',
        cost: 'nguyên giá',
        lifeTime: 'số năm sử dụng',
        depreciationRate: 'tỷ lệ hao mòn',
        depreciationAnnual: 'hao mòn năm',
        trackedYear: 'năm theo dõi',
        purchaseDate: 'ngày mua',
        useDate: 'ngày bắt đầu sử dụng',
        fileImport: 'file nhập khẩu',
        dataType: 'loại dữ liệu'
    },
    // text ở các button
    buttons: {addFixedAsset: 'Thêm tài sản', cancel: 'Hủy', save: 'Lưu', close: 'Đóng', noSave: 'Không lưu', discard: 'Hủy bỏ', notConfirm: 'Không', delete: 'Xóa', import: "Nhập khẩu"},
    // thống báo ở dialog khi thêm sửa xóa
    dialogMessages: {
        cancelSave: 'Bạn có muốn hủy bỏ khai báo tài sản này?',
        cancelSaveChanged: 'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?',
        removeFixedAsset: 'Bạn có muốn xóa tài sản {0} ?',
        removeMultiFixedAsset: '{0} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?'
    },
    contextMenu: {
        add: "Thêm mới",
        delete: "Xóa",
        edit: "Sửa",
        duplicate: "Nhân bản"
    }
}

export default resource