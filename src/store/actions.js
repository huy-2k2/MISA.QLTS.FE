import axios from "axios"
import emitter from '../common/emitter';
import apiErrorMessages from "@/resource/apiErrorMessages";
import { BASE_API_URL } from "../config";

function getData(store, url, field, callback) {
    store.commit('setLoading', {isLoading: true, field})
    axios.get(url)
    .then(({data}) =>{
        store.commit('setLoading', {isLoading: false, field})
        callback(data)
    })
    .catch(error => {
        console.log(error);
        const message = apiErrorMessages[error.response.status][store.state.language]
        emitter.emit('setDialogMessage', message)
    })
}

const actions = {
    getDepartments(store) {
        getData(store, `${BASE_API_URL}department`, 'departments', (data) => {
            store.commit('setData', {
                data: data.map(department => ({departmentId: department.department_id, departmentCode: department.department_code, departmentName: department.department_name})) ,
                field: 'departments'})
        })
    },

    getFixedAssetCategorys(store) {
        getData(store, `${BASE_API_URL}fixedAssetCategory`, 'fixedAssetCategorys', (data) => {
            store.commit('setData', {
                data: data.map(fixedAssetCategory => ({fixedAssetCategoryId: fixedAssetCategory.fixed_asset_category_id, fixedAssetCategoryCode: fixedAssetCategory.fixed_asset_category_code, fixedAssetCategoryName: fixedAssetCategory.fixed_asset_category_name})),
                field: 'fixedAssetCategorys'})
        })
    },

    getFilterFixedAsset(store) {
        getData(store, `${BASE_API_URL}fixedAsset?pageSize=${store.state.pageSize}&currentPage=${store.state.currentPage}&departmentId=${store.state.filterDepartmentId || ""}&fixedAssetCategoryId=${store.state.filterFixedAssetCategoryId || ""}&textSearch=${store.state.filterTextSearch || ""}`, "fixedAssets", (data) => {
            store.commit("setData", {
                data: data.listFixedAsset.map(fixedAsset => ( {
                    fixedAssetId: fixedAsset.fixed_asset_id,
                    fixedAssetCode: fixedAsset.fixed_asset_code,
                    fixedAssetName: fixedAsset.fixed_asset_name,
                    fixedAssetCategoryId: fixedAsset.fixed_asset_category_id,
                    departmentId: fixedAsset.department_id,
                    purchaseDate: fixedAsset.purchase_date,
                    useDate: fixedAsset.use_date,
                    cost: fixedAsset.cost,
                    quantity: fixedAsset.quantity,
                    depreciationRate: fixedAsset.depreciation_rate,
                    depreciationAnnual: fixedAsset.depreciation_annual,
                    trackedYear: fixedAsset.tracked_year,
                    lifeTime: fixedAsset.life_time
                })),
                field: "fixedAssets"
            })
            store.commit("setTotalAsset", data.totalAsset)
        })
    }
   
}

export default actions