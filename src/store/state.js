import { PAGE_SIZE } from "@/config"
function state() {
    return {
        assets: {
            data: [],
            isLoading: true,
        },
        departments: {
            data: [],
            isLoading: true
        },
        assetTypes: {
            data: [],
            isLoading: true
        },
        language: '',
        totalAsset: 0,
        pageSize: PAGE_SIZE,
        currentPage: 1,
        filterDepartmentId: null,
        filterAssetTypeId:null
    }
}

export default state