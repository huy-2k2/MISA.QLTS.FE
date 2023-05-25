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
        language: '',
        totalAsset: 0,
        pageSize: DEFAULT_PAGE_SIZE,
        currentPage: 1,
        filterDepartmentId: "",
        filterFixedAssetCategoryId:"",
        filterTextSearch: ""
    }
}

export default state