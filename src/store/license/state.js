import { DEFAULT_PAGE_SIZE } from "@/config"
function state() {
    return {
        // lưu chứng từ ở table chứng từ
        licenses: {
            data: [],

            // biến trạng thái load của danh sách chứng từ
            isLoading: true,

            // tổng số chứng từ
            totalLicense: 0,

            // tổng nguyên giá của chứng từ
            totalCost: 0,

            // kích thước trang của table chứng từ
            pageSize: DEFAULT_PAGE_SIZE,

            // trang hiện tại của table chứng từ
            currentPage: 1,

            // text search khi filter chứng từ
            filterTextSearch: ""
        },
        
        // lưu tài sản khi chọn tài sản cho chứng từ
        selectFixedAssets: {
            data: [],

            // biến trạng thái load của danh sách tài sản khi chọn tài sản cho chứng từ
            isLoading: true,

            // tổng số tài sản
            totalAsset: 0,

            // kích thước trang của table chọn tài sản
            pageSize: DEFAULT_PAGE_SIZE,

            // trang hiện tại của table tài sản
            currentPage: 1,

            // chứa từ khóa tìm kiếm khi filter chọn tài sản
            filterTextSearch: ""
        },

        // lưu danh sách tài sản đã được chọn khi thêm hoạc sửa chứng từ
        selectedFixedAssets: {
            allData: [],

            // kích thước trang của table tài sản đã chọn
            pageSize: DEFAULT_PAGE_SIZE,

            // trang hiện tại của table tài sản đã chọn
            currentPage: 1,

            // từ khóa tìm kiếm khi filter
            filterTextSearch: ""
        },

        // danh sách các nguồn ngân sách để load vào combobox
        budgets: {
            data: [],

            // kiểm tra trạng thái loading của danh sách nguồn ngân sách
            isLoading: true
        },

        // danh sách chi tiết nguồn ngân sách khi thêm hoạc sửa chứng từ
        budgetDetails: [
            
        ],

        // danh sách id xóa khi sửa 1 chứng từ
        listIdDeleted: {
            // danh sách id xóa của chi tiết chứng từ
            licenseDetail: [],

            // danh sách xóa của chi tiết ngân sách
            budgetDetail: []
        }
    }
}

export default state