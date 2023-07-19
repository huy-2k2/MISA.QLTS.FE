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
    // kiểm tra errorCode trong trường hợp token không hợp lệ
    if(response.errorCode == _enum.errorCode.InvalidToken) {
        router.push('/login')
        return
    }

    let message = "";
    // kiểm tra errorCode trong trường hợp xóa 1 tài sản có phát sinh chứng từ
    if(response.errorCode == _enum.errorCode.deleteDetail) {
        const fixedAsset = response.data.fixedAsset
        const license = response.data.license
        message = resource.errorMessage.deleteFixedAssetDetail.format(fixedAsset.fixed_asset_code, license.license_code)
    } 
    // kiểm tra errorCode trong trường hợp xóa nhiều tài sản có phát sinh chứng từ
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


 /**
* @description: lấy dữ liệu danh sách tài sản đã được filter
* @param {pageSize}: kích thước page
* @param {currentPage}: trang hiện tại
* @param {departmentId}: id phòng ban
* @param {fixedAssetCategoryId}: id mã loại tài sản
* @param {textSearch}: từ khóa tìm kiếm
* @author: NQ Huy 04/05/2023
* @return: danh sách tài sản thỏa mã filter
*/
async function getFilterFixedAssetApi(pageSize, currentPage, departmentId, fixedAssetCategoryId, textSearch) {
    return await axios.get( `${BASE_API_URL}fixedAsset/filter?pageSize=${pageSize}&currentPage=${currentPage}&departmentId=${departmentId}&fixedAssetCategoryId=${fixedAssetCategoryId}&textSearch=${textSearch}`)
}

/**
* @description: lấy tất cả phòng ban
* @author: NQ Huy 04/05/2023
* @return: danh sách phòng ban
*/
async function getDepartmentsApi() {
    return await axios.get(`${BASE_API_URL}department`)
}

/**
* @description: lấy tất cả loại tài sản
* @author: NQ Huy 04/05/2023
* @return: danh sách phòng ban
*/
async function getFixedAssetCategorysApi() {
    return await axios.get(`${BASE_API_URL}fixedAssetCategory`)
}

/**
* @description: lấy gợi ý mã tài sản
* @author: NQ Huy 04/05/2023
* @return: mã code gợi ý cho tài sản
*/
async function getRecommendFixedAssetCodeApi() {
    return await axios.get(`${BASE_API_URL}fixedAsset/recommendFixedAssetCode`)
}


/**
* @description: sửa tài sản
* @param {fixedAssetId}: id tài sản
* @param {body}: nội dung update
*/
async function editFixedAssetApi(fixedAssetId, body) {
    return await axios.put(`${BASE_API_URL}fixedAsset/${fixedAssetId}`, body)
}

/**
* @description: lấy ra 1 tài sản
* @param {fixedAssetId}: id tài sản
* @return: dữ liệu của tài sản
*/
async function getFixedAssetApi(fixedAssetId) {
    return await axios.get(`${BASE_API_URL}fixedAsset/${fixedAssetId}`)
}

/**
* @description: thêm tài sản
* @param {body}: dữ liệu thêm mới
*/
async function postFixedAssetApi(body) {
    axios.post(`${BASE_API_URL}fixedAsset`, body)
}

/**
* @description: kiểm tra mã tài sản bị trùng
* @param {fixedAssetId}: id tài sản
* @param {fixedAssetCode}: mã tài sản
* @return: true nếu bị trùng, ngược lại thì false
*/
async function getFixedAssetCodeExistedApi(fixedAssetCode, fixedAssetId) {
   return await axios.get(`${BASE_API_URL}fixedAsset/isCodeExisted?code=${fixedAssetCode}&id=${fixedAssetId}`)
}

/**
* @description: kiểm tra mã tài chứng từ bị trùng
* @param {licenseCode}: mã chứng từ
* @param {licenseId}: id chứng từ
* @return: true nếu bị trùng, ngược lại thì false
*/
async function getLicenseCodeExistedApi(licenseCode, licenseId) {
    return await axios.get(`${BASE_API_URL}license/isCodeExisted?code=${licenseCode}&id=${licenseId}`)
}

/**
* @description: xóa tài sản
* @param {listFixedAsset}: danh sách id cần xóa
*/
async function deleteFixedAssetsApi(listFixedAsset) {
    return await axios.delete(`${BASE_API_URL}fixedAsset`, { data: listFixedAsset})
}

/**
* @description: import dữ liệu vào db
* @param {typeImport}: kiểu dữ liệu import (tài sản, phòng ban, loại tài sản...)
* @param {formData}: dữ liệu file excep
* @param {isSubmit}: biến kiểm tra là submit hay chỉ validate
* @return: dữ liệu trong file excel cùng với lỗi nếu có lỗi
*/
async function postImportFileApi(typeImport, formData, isSubmit) {
    return await axios.post(`${BASE_API_URL}${typeImport}/file?isSubmit=${isSubmit}`, formData, {headers: { "Content-Type": "multipart/form-data"}})
}

// 

/**
* @description: kiểm tra người dùng đã sở hữu token hợp lệ ở trang đăng nhập
* @return: nếu không hợp lệ thì trả về lỗi 400
*/
async function getIsLoginedApi() {
    const token = localStorage.getItem("bearer_token");
    await ax.get(`${BASE_API_URL}auth`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
* @description: lấy token từ username và passoword do người dùng nhập
* @param {email}: email người dùng
* @param {passoword}: mật khẩu
* @return: trả về token nếu thông tin hợp lệ, không thì trả về lỗi 400
*/
async function getTokenApi(email, passoword) {
    return await ax.post(`${BASE_API_URL}auth`, {
        email: email,
        password: passoword
    })
   
} 

/**
* @description: filter chứng từ
* @param {pageSize}: kích thước page
* @param {currentPage}: page hiện tại
* @param {textSearch}: từ khóa tìm kiếm
* @return: dữ liệu danh sách license thỏa mãn điều kiện filter
*/
async function getFilterLicensesApi(pageSize, currentPage, textSearch) {
    return await axios.get(`${BASE_API_URL}license/filter?pageSize=${pageSize}&currentPage=${currentPage}&textSearch=${textSearch}`)
}

/**
* @description: lấy mã gợi ý khi thêm mới chứng từ
* @return: mã gợi ý
*/
async function getRecommendLicenseCodeApi() {
    return await axios.get(`${BASE_API_URL}license/recommendLicenseCode`)
}

/**
* @description: filter của table chọn tài sản 
* @param {pageSize}: kích thước page
* @param {currentPage}: page hiện tại
* @param {textSearch}: từ khóa tìm kiếm
* @param {listIdSelected}: danh sách id các tài sản đã chọn
* @param {licenseId}: id chứng từ tương ứng
* @return: danh sách tài sản thỏa mãn điều kiện filter
*/
async function getFilterFixedAssetNoLicenseApi(pageSize, currentPage, listIdSelected, textSearch, licenseId) {
    return await axios.post(`${BASE_API_URL}fixedAsset/filterNoLicense`, {
        pageSize, currentPage, listIdSelected, textSearch, licenseId      
    })
}

/**
* @description: lấy tất cả nguồn ngân sách
* @return: danh sách nguồn ngân sách
*/
async function GetAllBudgetApi() {
    return await axios.get(`${BASE_API_URL}budget`)
}

/**
* @description: lấy tất cả budget_detail của 1 tài sản
* @param {fixedAssetId}: id tài sản
* @return: danh sách budgetDetail của 1 tài sản
*/
async function GetBudgetsByFixedAssetIdApi(fixedAssetId) {
    return await axios.get(`${BASE_API_URL}budget/listModel?fixedAssetId=${fixedAssetId}`)
}

/**
* @description: lấy dữ liệu của 1 license theo id
* @param {licenseId}: id chứng từ
* @return: 1 chứng từ
*/
async function getLicenseByIdApi(licenseId) {
    return await axios.get(`${BASE_API_URL}license/${licenseId}`)
}

/**
* @description: lấy dữ liệu của 1 license theo id
* @param {licenseId}: id chứng từ
* @return: 1 chứng từ
*/
async function getListFixedAssetByLicenseId(licenseId) {
    return await axios.get(`${BASE_API_URL}fixedAsset/listByLicenseId?licenseId=${licenseId}`)
}

/**
* @description: thêm mới chứng từ
* @param {licenseData}: dữ liệu thêm mới
*/
async function postLicenseApi(licenseData) {
    return await axios.post(`${BASE_API_URL}license/model`, licenseData)
}

/**
* @description: xóa nhiều chứng từ
* @param {listId}: danh sách id cần xóa
*/
async function deleteListLicenseApi(listId) {
    return await axios.delete(`${BASE_API_URL}license`, {data: listId})
}

/**
* @description: xóa nhiều chứng từ
* @param {licenseId}: id chứng từ
* @param {licenseData}: dữ liệu sửa
*/
async function putLicenseApi(licenseId, licenseData) {
    return await axios.put(`${BASE_API_URL}license/model/${licenseId}`, licenseData)
}

export {putLicenseApi, deleteListLicenseApi, getFilterFixedAssetApi, GetAllBudgetApi, postLicenseApi, getListFixedAssetByLicenseId, getLicenseCodeExistedApi, getLicenseByIdApi, getDepartmentsApi, GetBudgetsByFixedAssetIdApi, getFixedAssetCategorysApi, getRecommendFixedAssetCodeApi, editFixedAssetApi, getFixedAssetApi, postFixedAssetApi, getFixedAssetCodeExistedApi, deleteFixedAssetsApi, postImportFileApi, getIsLoginedApi, getTokenApi, getFilterLicensesApi, getRecommendLicenseCodeApi, getFilterFixedAssetNoLicenseApi}