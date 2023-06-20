import { BASE_API_URL } from "@/config";
import axios from "axios";
import emitter from "@/common/emitter";

// hàm xử lý lỗi mặc định
function defaultReject(error) {
    console.log(error);
    const response = error?.response?.data
    if(!response)
        return
    // tạo message
    const message = response.userMessage + "."
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
async function getDepartmentsApi(bonusReject) {
    try {
        const response =  await axios.get(`${BASE_API_URL}department`)
        return response.data
    } catch(error) {
        defaultReject(error)
        if(bonusReject) {
            bonusReject(error)
        }
    } 
}

// lấy tất cả loại tài sản
async function getFixedAssetCategorysApi(bonusReject) {
    try {
        const response = await axios.get(`${BASE_API_URL}fixedAssetCategory`)
        return response.data
    } catch(error) {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    }
   
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
    axios.delete(`${BASE_API_URL}fixedAsset`, { data: listFixedAsset })
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

// import dữ liệu từ file vào db
function postImportFileApi(typeImport, formData, isSubmit, resolve, bonusReject) {
    axios.post(`${BASE_API_URL}${typeImport}/file?isSubmit=${isSubmit}`, formData, {headers: { "Content-Type": "multipart/form-data",}})
    .then(({data}) => resolve(data))
    .catch(error => {
        defaultReject(error)
        if(bonusReject){
            bonusReject(error)
        }
    })
}

export {getFilterFixedAssetApi, getDepartmentsApi, getFixedAssetCategorysApi, getRecommendFixedAssetCodeApi, editFixedAssetApi, getFixedAssetApi, postFixedAssetApi, getFixedAssetCodeExistedApi, deleteFixedAssetsApi, postImportFileApi}