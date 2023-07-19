import { DEFAULT_PAGE_SIZE } from "@/config"
function state() {
    return {
        // dữ liệu của table danh sách tài sản
        fixedAssets: {
            data: [],

            // trạng thái loading của table danh sách tài sản
            isLoading: true,
        },

        // dữ liệu danh sách phòng ban
        departments: {
            data: [],
            isLoading: true
        },

        // dữ liệu danh sách loại tài sản
        fixedAssetCategorys: {
            data: [],
            isLoading: true
        },

        // tổng số bản ghi của table danh sách tài sản
        totalAsset: 0,

        // tổng số lượng tài sản của table danh sách tài sản
        totalQuantity: 0,

        // tổng nguyên giá của table danh sách tài sản
        totalCost: 0,

        // kích thước trang của table danh sách tài sản
        pageSize: DEFAULT_PAGE_SIZE,

        // trang hiện tại của table danh sách tài sản
        currentPage: 1,

        // filter department id
        filterDepartmentId: "",

        // filter fixed_asset_category
        filterFixedAssetCategoryId:"",

        // từ khóa tìm kiếm của table danh sách tài sản
        filterTextSearch: ""
    }
}

export default state