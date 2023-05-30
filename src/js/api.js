import { BASE_API_URL } from "@/config";
import axios from "axios";
import resource from "@/data/resource";
import emitter from "@/common/emitter";

// hàm xử lý lỗi mặc định
function defaultReject(error) {
    const response = error.response.data
    // tạo message
    const message = `
        <p>${resource.errorMessage[response.errorCode]}</p>
        <p>${response.userMessage}</p>
    `
    // bắn ra thông báo
    emitter.emit('setDialogMessage', message)
}

// lấy dữ liệu danh sách tài sản đã được filter
function getFilterFixedAssetApi(pageSize, currentPage, departmentId, fixedAssetCategoryId, textSearch, resolve, bonusReject) {
    axios.get( `${BASE_API_URL}fixedAsset/filter?pageSize=${pageSize}&currentPage=${currentPage}&departmentId=${departmentId}&fixedAssetCategoryId=${fixedAssetCategoryId}&textSearch=${textSearch}`)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })   
}

// lấy tất cả phòng ban
function getDepartmentsApi(resolve, bonusReject) {
    axios.get(`${BASE_API_URL}department`)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// lấy tất cả loại tài sản
function getFixedAssetCategorysApi(resolve, bonusReject) {
    axios.get(`${BASE_API_URL}fixedAssetCategory`)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// lấy gợi ý mã tài sản
function getRecommendFixedAssetCodeApi(resolve, bonusReject) {
    axios.get(`${BASE_API_URL}fixedAsset/recommendFixedAssetCode`)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// sửa tài sản
function editFixedAssetApi(fixedAssetId, body, resolve, bonusReject) {
    axios.put(`${BASE_API_URL}fixedAsset/${fixedAssetId}`, body)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// lấy 1 tài sản
function getFixedAssetApi(fixedAssetId, resolve, bonusReject) {
    axios.get(`${BASE_API_URL}fixedAsset/${fixedAssetId}`)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// thêm tài sản
function postFixedAssetApi(body, resolve, bonusReject) {
    axios.post(`${BASE_API_URL}fixedAsset`, body)
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// kiểm tra mã tài sản bị trùng
async function getFixedAssetCodeExistedApi(fixedAssetCode, fixedAssetId, bonusReject) {
    try {
        let response = await axios.get(`${BASE_API_URL}fixedAsset/isCodeExisted?fixedAssetCode=${fixedAssetCode}&fixedAssetId=${fixedAssetId}`)
        return response.data
    } catch(error) {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    }
}

// xóa tài sản
function deleteFixedAssetsApi(listFixedAsset, resolve, bonusReject) {
    axios.delete(`${BASE_API_URL}fixedAsset/multiple`, { data: listFixedAsset })
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// xuất file excel
function getFixedAssetsExcelApi(resolve, bonusReject) {
    axios.get(`${BASE_API_URL}fixedAsset/excel`, {responseType: 'blob'})
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

export {getFilterFixedAssetApi, getDepartmentsApi, getFixedAssetCategorysApi, getRecommendFixedAssetCodeApi, editFixedAssetApi, getFixedAssetApi, postFixedAssetApi, getFixedAssetCodeExistedApi, deleteFixedAssetsApi, getFixedAssetsExcelApi}