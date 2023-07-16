import { BASE_API_URL } from "@/config";
import ax from "axios";
import emitter from "@/common/emitter";
import router from '../router'
import _enum from "@/data/enum";
import resource from "@/data/resource";
const axios = ax.create()

// tạo header request trước khi gửi api
axios.interceptors.request.use(function(config) {
    // thêm token vào request
    const token = localStorage.getItem('bearer_token')
    config.headers = {
        Authorization: `Bearer ${token}`
    }
    return config
})

// xử lý trong trường hợp xảy ra lỗi
axios.interceptors.response.use(function(response) {
    return response
}, function(error) {
    const response = error?.response?.data
    if(!response)
        return
    if(response.errorCode == _enum.errorCode.InvalidToken) {
        router.push('/login')
        return
    }
    let message = "";
    if(response.errorCode == _enum.errorCode.deleteDetail) {
        const fixedAsset = response.data.fixedAsset
        const license = response.data.license
        message = resource.errorMessage.deleteFixedAssetDetail.format(fixedAsset.fixed_asset_code, license.license_code)
    } 
    else if(response.errorCode == _enum.errorCode.deleteDetailMulti) {
        let length = response.data.length
        length = length < 10? `0${length}` : length
        message = resource.errorMessage.deleteFixedAssetDetailMulti.format(length)
    }  
    else {
        message = response.userMessage + "."
    }
    // tạo message
    // bắn ra thông báo
    emitter.emit('setDialogMessage', message)
    return Promise.reject(error)
})


// lấy dữ liệu danh sách tài sản đã được filter
async function getFilterFixedAssetApi(pageSize, currentPage, departmentId, fixedAssetCategoryId, textSearch) {
    return await axios.get( `${BASE_API_URL}fixedAsset/filter?pageSize=${pageSize}&currentPage=${currentPage}&departmentId=${departmentId}&fixedAssetCategoryId=${fixedAssetCategoryId}&textSearch=${textSearch}`)
}

// lấy tất cả phòng ban
async function getDepartmentsApi() {
    return await axios.get(`${BASE_API_URL}department`)
}

// lấy tất cả loại tài sản
async function getFixedAssetCategorysApi() {
    return await axios.get(`${BASE_API_URL}fixedAssetCategory`)
}

// lấy gợi ý mã tài sản
async function getRecommendFixedAssetCodeApi() {
    return await axios.get(`${BASE_API_URL}fixedAsset/recommendFixedAssetCode`)
}

// sửa tài sản
async function editFixedAssetApi(fixedAssetId, body) {
    return await axios.put(`${BASE_API_URL}fixedAsset/${fixedAssetId}`, body)
}

// lấy 1 tài sản
async function getFixedAssetApi(fixedAssetId) {
    return await axios.get(`${BASE_API_URL}fixedAsset/${fixedAssetId}`)
}

// thêm tài sản
async function postFixedAssetApi(body) {
    axios.post(`${BASE_API_URL}fixedAsset`, body)
}

// kiểm tra mã tài sản bị trùng
async function getFixedAssetCodeExistedApi(fixedAssetCode, fixedAssetId) {
   return await axios.get(`${BASE_API_URL}fixedAsset/isCodeExisted?code=${fixedAssetCode}&id=${fixedAssetId}`)
}

async function getLicenseCodeExistedApi(licenseCode, licenseId) {
    return await axios.get(`${BASE_API_URL}license/isCodeExisted?code=${licenseCode}&id=${licenseId}`)
}

// xóa tài sản
async function deleteFixedAssetsApi(listFixedAsset) {
    return await axios.delete(`${BASE_API_URL}fixedAsset`, { data: listFixedAsset})
}

// import dữ liệu từ file vào db
async function postImportFileApi(typeImport, formData, isSubmit) {
    return await axios.post(`${BASE_API_URL}${typeImport}/file?isSubmit=${isSubmit}`, formData, {headers: { "Content-Type": "multipart/form-data"}})
}

// kiểm tra người dùng đã sở hữu token hợp lệ ở trang đăng nhập
async function getIsLoginedApi() {
    const token = localStorage.getItem("bearer_token");
    await ax.get(`${BASE_API_URL}auth`, { headers: { Authorization: `Bearer ${token}` } });
}

// lấy token từ username và passoword do người dùng nhập
async function getTokenApi(email, passoword) {
    return await ax.post(`${BASE_API_URL}auth`, {
        email: email,
        password: passoword
    })
   
} 

async function getFilterLicensesApi(pageSize, currentPage, textSearch) {
    return await axios.get(`${BASE_API_URL}license/filter?pageSize=${pageSize}&currentPage=${currentPage}&textSearch=${textSearch}`)
}

async function getRecommendLicenseCodeApi() {
    return await axios.get(`${BASE_API_URL}license/recommendLicenseCode`)
}

async function getFilterFixedAssetNoLicenseApi(pageSize, currentPage, listIdSelected, textSearch, licenseId) {
    return await axios.post(`${BASE_API_URL}fixedAsset/filterNoLicense`, {
        pageSize, currentPage, listIdSelected, textSearch, licenseId      
    })
}

async function GetAllBudgetApi() {
    return await axios.get(`${BASE_API_URL}budget`)
}

async function GetBudgetsByFixedAssetIdApi(fixedAssetId) {
    return await axios.get(`${BASE_API_URL}budget/listModel?fixedAssetId=${fixedAssetId}`)
}

async function getLicenseByIdApi(licenseId) {
    return await axios.get(`${BASE_API_URL}license/${licenseId}`)
}

async function getListFixedAssetByLicenseId(licenseId) {
    return await axios.get(`${BASE_API_URL}fixedAsset/listByLicenseId?licenseId=${licenseId}`)
}

async function postLicenseApi(licenseData) {
    return await axios.post(`${BASE_API_URL}license/model`, licenseData)
}

async function deleteListLicenseApi(listId) {
    return await axios.delete(`${BASE_API_URL}license`, {data: listId})
}

async function putLicenseApi(licenseId, licenseData) {
    return await axios.put(`${BASE_API_URL}license/model/${licenseId}`, licenseData)
}

export {putLicenseApi, deleteListLicenseApi, getFilterFixedAssetApi, GetAllBudgetApi, postLicenseApi, getListFixedAssetByLicenseId, getLicenseCodeExistedApi, getLicenseByIdApi, getDepartmentsApi, GetBudgetsByFixedAssetIdApi, getFixedAssetCategorysApi, getRecommendFixedAssetCodeApi, editFixedAssetApi, getFixedAssetApi, postFixedAssetApi, getFixedAssetCodeExistedApi, deleteFixedAssetsApi, postImportFileApi, getIsLoginedApi, getTokenApi, getFilterLicensesApi, getRecommendLicenseCodeApi, getFilterFixedAssetNoLicenseApi}