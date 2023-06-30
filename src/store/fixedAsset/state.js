import { DEFAULT_PAGE_SIZE } from "@/config"
function state() {
    return {
        fixedAssets: {
            data: [],
            isLoading: true,
        },
        departments: {
            data: [],
            isLoading: true
        },
        fixedAssetCategorys: {
            data: [],
            isLoading: true
        },
        totalAsset: 0,
        totalQuantity: 0,
        totalCost: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        currentPage: 1,
        filterDepartmentId: "",
        filterFixedAssetCategoryId:"",
        filterTextSearch: ""
    }
}

export default state