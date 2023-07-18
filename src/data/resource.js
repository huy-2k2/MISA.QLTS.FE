import myEnum from './enum'

const resource = {
    errorMessage: {
        deleteFixedAssetDetail: "Tài sản có mã <strong>{0}</strong> đã phát sinh chứng từ<br/>ghi tăng có mã <strong>{1}</strong>.",
        deleteFixedAssetDetailMulti: "<strong>{0}</strong> tài sản được chọn đã phát sinh chứng từ ghi tăng."
    },
    // dữ liệu hiện thị trên toast message
    toastMessage: {
        [myEnum.typeForm.duplicate]: "Nhân bản dữ liệu thành công.",
        [myEnum.typeForm.add]: "Lưu dữ liệu thành công.",
        [myEnum.typeForm.edit]: "thay đổi dữ liệu thành công.",
        import: "Nhập khẩu dữ liệu thành công.",
        delete: "Xóa dữ liệu thành công.",
        credentialInvalid: "Tên đăng nhập hoạc mật khẩu không đúng.",
        credentialRequired: "Vui lòng nhập đầy đủ thông tin đăng nhập.",
    },
    // tiêu đề của form
    formTitle: {
        [myEnum.typeForm.duplicate]: "Nhân bản tài sản",
        [myEnum.typeForm.add]: "Thêm tài sản",
        [myEnum.typeForm.edit]: "Sửa tài sản",
        import: "Nhập khẩu tài sản",
        login: "Đăng nhập để làm việc với <strong>MISA QLTS</strong>",
        addIncrement: "Thêm chứng từ ghi tăng",
        editIncrement: "Sửa chứng từ ghi tăng",
        infoIncrement: "Thông tin chứng từ",
        detailIncrement: "Thông tin chi tiết",
        fixedAssetIncrement: "Chọn tài sản ghi tăng",
        editFixedAsset: 'Sửa tài sản {0}',
        
    },
    // thông báo lỗi khi validate dữ liệu
    validateMessage: {
        required: "cần phải nhập thông tin <strong>{0}</strong>.",
        length: "{0} phải có độ dài từ {1} đến {2} ký tự.",
        duplicate: "{0} đã tồn tại.",
        higher: "{0} phải lớn hoặc bằng {1}.",
        lower: "{0} phải nhỏ hoặc bằng {1}.",
        interger: "{0} phải là số nguyên.",
        positive: "{0} phải lớn hơn 0.",
        realNumber: "{0} hải là số thực.",
        equal: "{0} phải bằng {1}.",
        seletedFixedAssets: "Chọn ít nhất 1 tài sản.",
        notEmpty: "Thông tin này không được bỏ trống."
    },
    // menu
    menu: ["MISA QLTS", "Tổng quan", {parent: 'Tài sản', children: ['Ghi tăng', 'Thay đổi thông tin', 'Đánh giá lại', 'Tính hao mòn', 'Điều chuyển tài sản', 'Ghi giảm', 'Kiểm kê', 'Khác']}, {text: "Tài sản HT-ĐB", tooltip: "Tài sản hệ thống đường bộ"}, "Công cụ dụng cụ", "Danh mục", "Tra cứu", "Báo cáo"],
    // tiêu đề của table
    tHead: [{text: 'STT', tooltip: 'Số thứ tự'}, "Mã tài sản", "Tên tài sản", "Loại tài sản", "Bộ phận sử dụng", "Số lượng", "Nguyên giá", {text: "HM/KH lũy kế", tooltip: "Hao mòn/ khấu hao lũy kế"}, "Giá trị còn lại", "Chức năng", 'Số chứng từ', "Ngày chứng từ", "Ngày ghi tăng", "Tổng nguyên giá", "Nội dung", "Hao mòn năm"],
    // tiêu đề của page
    titlePage: ["Tổng quan tài sản", "Danh sách tài sản", "Tài sản hệ thống đường bộ", "Công cụ", "Danh mục", "Tra cứu", "Báo cáo", 'Ghi tăng tài sản', "Thông tin chi tiết"],
    tooltip: {zoomIn: "Thu nhỏ", zoomOut: 'Phóng to', changeDisplay: "Thay đổi giao diện", prevPage: "Trang trước", nextPage: "Trang sau", import: 'Nhập khẩu', delete: 'Xóa', edit: 'Sửa', duplicate: 'Nhân bản', close: 'Đóng', print: 'In', expand: 'Xem thêm', addIncrement: "Thêm nguồn kinh phí", removeIncrement:"Bỏ nguồn kinh phí"},
    // chi tiết của 1 trang
    fixedAssetDetail: {financialDepartment: 'Sở tài chính', year: 'Năm', totalFixedAsset: 'Tổng số {0} bản ghi', searchPlaceholder: 'Tìm kiếm tài sản'},
    // label combobox
    combobox: [["Mã", "Tên"]],
    // placeholder cho combobox và input
    placeholder: {combobox: 'Chọn {0}', input: 'Nhập {0}', searchCertificate: 'Tìm kiếm theo số chứng từ, nội dung', searchFixedAsset: "Tìm kiếm theo mã, tên tài sản"},
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
        dataType: 'loại dữ liệu',
        username: "Username, email hoạc số điện thoại",
        password: "mật khẩu",
        incrementCode: "mã chứng từ",
        incrementDay: "ngày ghi tăng",
        note: "ghi chú",
        source: "nguồn hình thành",
        value: "giá trị",
        budget: "ngân sách"
    },
    // text ở các button
    buttons: {addFixedAsset: 'Thêm tài sản', cancel: 'Hủy', save: 'Lưu', close: 'Đóng', noSave: 'Không lưu', discard: 'Hủy bỏ', notConfirm: 'Không', confirm: "Đồng ý", delete: 'Xóa', import: "Nhập khẩu", login: "Đăng nhập", logout: 'Đăng xuất', forgotPassword: "Quên mật khẩu?", add: 'Thêm', choseFixedAsset: "Chọn tài sản"},
    // thống báo ở dialog khi thêm sửa xóa
    dialogMessages: {
        cancelSaveFixedAsset: 'Bạn có muốn hủy bỏ khai báo tài sản này?',
        cancelSave: 'Bạn có muốn hủy bỏ khai báo này?',
        cancelSaveLicense: "Bạn có muốn hủy bỏ khai báo chứng từ này?",
        cancelSaveChanged: 'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?',
        cancelSaveEditLicense: "Bạn có muốn hủy bỏ thay đổi thông tin chứng từ này?",
        removeFixedAsset: 'Bạn có muốn xóa tài sản {0}?',
        removeMultiFixedAsset: '{0} tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?',
        removeLicense: "Bạn có muốn xóa chứng từ có mã {0}?",
        removeMultiLicense: "{0} chứng từ đã được chọn. Bạn có muốn xóa các chứng từ ngày khỏi danh sách?",
        noDataFound: "Không tìm thấy dữ liệu"
    },
    //context menu
    contextMenu: {
        add: "Thêm mới",
        delete: "Xóa",
        edit: "Sửa",
        duplicate: "Nhân bản"
    },
    // chiều hiện thị
    displayOption: {
        ver: 'Giao diện dọc',
        hor: 'Giao diện ngang',
    }
}

export default resource