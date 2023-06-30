import { DEFAULT_PAGE_SIZE } from "@/config"
function state() {
    return {
        licenses: {
            data: [],
            isLoading: true,
            totalLicense: 0,
            totalCost: 0,
            pageSize: DEFAULT_PAGE_SIZE,
            currentPage: 1,
            filterTextSearch: ""
        },
        
        selectFixedAssets: {
            data: [],
            isLoading: true,
            totalAsset: 0,
            pageSize: DEFAULT_PAGE_SIZE,
            currentPage: 1,
            filterTextSearch: ""
        },
        selectedFixedAssets: {
            allData: [],
            pageSize: DEFAULT_PAGE_SIZE,
            currentPage: 1,
            filterTextSearch: ""
        }
        
    }
}

export default state