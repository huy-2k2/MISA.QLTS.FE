<template>
    <div ref="tableWrapper" :class="{ isLoading }" class="table-wrapper custom-scrollbar">
        <div v-show="$store.state.totalAsset == 0 && !isLoading" class="table__nodata">
            <img src="../assets/image/nodata.png" alt="">
        </div>
        <MisaLoading v-if="isLoading"></MisaLoading>
        <table v-else class="table">
            <thead ref="tableHead">
                <tr>
                    <th scope="col">
                        <MisaInputCheckbox @changeChecked="handleCheckAll" :checked="isCheckedAll">
                        </MisaInputCheckbox>
                    </th>
                    <th scope="col">
                        <TheToolTip :tooltip="resource.tHead[0].tooltip">
                            {{ resource.tHead[0].text }}
                        </TheToolTip>
                    </th>
                    <th scope="col">{{ resource.tHead[1] }}</th>
                    <th scope="col">{{ resource.tHead[2] }}</th>
                    <th scope="col">{{ resource.tHead[3] }}</th>
                    <th scope="col">{{ resource.tHead[4] }}</th>
                    <th scope="col">{{ resource.tHead[5] }}</th>
                    <th scope="col">{{ resource.tHead[6] }}</th>
                    <th scope="col">
                        <TheToolTip :tooltip="resource.tHead[7].tooltip">
                            {{ resource.tHead[7].text }}
                        </TheToolTip>
                    </th>
                    <th scope="col">{{ resource.tHead[8] }}</th>
                    <th scope="col">{{ resource.tHead[9] }}</th>
                </tr>
            </thead>
            <tbody ref="tbody" class="table__body">
                <tr @dblclick="handleEdit(tr, index, $event)" v-for="(tr, index) in tbody" :key="tr.td2">
                    <td scope="row">
                        <MisaInputCheckbox @changeChecked="(checked) => handleCheck(checked, index)"
                            :checked="tr.isChecked">
                        </MisaInputCheckbox>
                    </td>
                    <td>{{ index + 1 + $store.state.pageSize * ($store.state.currentPage - 1) }}</td>
                    <td>{{ tr.fixedAssetCode }}</td>
                    <td>{{ tr.fixedAssetName }}</td>
                    <td>{{ $store.getters.fixedAssetCategoryById(tr.fixedAssetCategoryId)?.fixedAssetCategoryName }}</td>
                    <td>{{ $store.getters.departmentById(tr.departmentId)?.departmentName }}</td>
                    <td>{{ convert.toCurrency(tr.quantity) }}</td>
                    <td>{{ convert.toCurrency(tr.cost) }}</td>
                    <td> 0 </td>
                    <td>{{ convert.toCurrency(tr.cost) }}</td>
                    <td>
                        <div class="table__function">
                            <TheToolTip tooltip="Sửa">
                                <button @click="handleEdit(tr)" class="table__function__button table__function__edit">
                                    <div class="icon-pen-edit"></div>
                                </button>
                            </TheToolTip>
                            <TheToolTip tooltip="Nhân bản">
                                <button @click="handleDuplicate(tr)"
                                    class="table__function__button table__function__detail">
                                    <div class="icon-file-detail"></div>
                                </button>
                            </TheToolTip>
                        </div>
                    </td>
                </tr>
                <tr ref="trBonus"></tr>
            </tbody>
            <tbody class="table__footer">
                <tr ref="tableFooter">
                    <td class="table__footer__td">
                        <div class="table__footer__left">
                            <p class="table__footer__total">Tổng số: <strong>{{ convert.toCurrency($store.state.totalAsset)
                            }}</strong>
                                bản ghi
                            </p>
                            <div class="table__footer__select">
                                <div ref="selectPageSizeHead" @click="isShowPageSizeList = !isShowPageSizeList"
                                    class="table__footer__select__head">
                                    <div class="table__footer__select__value">{{ $store.state.pageSize }}</div>
                                    <div class="table__footer__select__icon">
                                        <div v-show="!isShowPageSizeList" class="icon-down"></div>
                                        <div v-show="isShowPageSizeList" class="icon-up"></div>
                                    </div>
                                </div>
                                <div ref="selectPageSizeOption" v-show="isShowPageSizeList"
                                    class="table__footer__select__options">
                                    <div @click="handleSetPageSize(pageSize)" v-for="pageSize in pageSizeList"
                                        :key="pageSize" class="table__footer__select__option">
                                        {{ pageSize }}
                                    </div>
                                </div>
                            </div>
                            <MisaPaginate></MisaPaginate>
                        </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="table__footer__conclusion">{{ convert.toCurrency($store.state.totalQuantity) }}</td>
                    <td class="table__footer__conclusion">{{ convert.toCurrency($store.state.totalCost) }}</td>
                    <td class="table__footer__conclusion">0</td>
                    <td class="table__footer__conclusion">{{ convert.toCurrency($store.state.totalCost) }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <ThePopup :isShow="isShowRemove" :isHasClose="false">
            <MisaDialog :text="dialogText" @click1="handleRemove" @click2="isShowRemove = false" quantity="2" button1="Xóa"
                button2="Không">
            </MisaDialog>
        </ThePopup>
        <ThePopup :isShow="isShowForm" @close="isShowForm = false">
            <TheForm :fixedAssetId="fixedAssetId" :typeForm="typeForm" @clickClose="isShowForm = false"></TheForm>
        </ThePopup>
    </div>
</template>

<script>
import MisaDialog from '@/components/MisaDialog.vue'
import MisaInputCheckbox from '../components/MisaInputCheckbox.vue'
import MisaPaginate from '../components/MisaPaginate.vue'
import ThePopup from './ThePopup.vue'
import TheToolTip from './TheToolTip.vue'
import TheForm from './TheForm.vue'
import MisaLoading from '@/components/MisaLoading.vue'
// import axios from 'axios'
// import { BASE_API_URL } from '@/config'
import { deleteFixedAssetsApi } from '@/js/api'
export default {
    methods: {
        /**
        * @param {Boolean} checked 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng thay đổi size của page
        */
        handleSetPageSize(pageSize) {
            this.isShowPageSizeList = false
            this.$store.commit("setPageSize", pageSize)
            this.$store.commit("setCurrentPage", 1)
            this.$store.dispatch("getFilterFixedAsset")
        },

        /**
         * @param {Boolean} checked 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở thead 
         */
        handleCheckAll(checked) {
            this.isCheckedAll = checked
            // tất cả checkbox ở tr có cùng giá trị với checkbox ở thead
            this.tbody.forEach(tr => tr.isChecked = checked)
            // emit sự kiện thay đổi trạng thái của remove button cho header
            this.emitter.emit('disableBtnRemove', !checked)
        },

        /**
         * @param {Boolean} checked 
         * @param {Interger} index 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở tr
         */
        handleCheck(checked, index) {
            // gán giá trị isChecked tương ứng
            this.tbody[index].isChecked = checked
            let countChecked = 0
            // kiểm tra xem tất cả các ô đã được checked chưa, nếu rồi thì gán isCheckedAll là true (để checked ở thead là true)
            this.tbody.forEach(tr => countChecked += tr.isChecked ? 1 : 0)
            this.isCheckedAll = countChecked == this.tbody.length
            // emit sự kiện thay đổi trạng thái button remove cho header
            this.emitter.emit('disableBtnRemove', countChecked == 0)
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click button remove tài sản
        */
        handleRemove() {
            // lấy ra danh sách id tài sản cần xóa
            const removeFixedAssetList = this.tbody.filter(fixedAsset => fixedAsset.isChecked)
            const removeFixedAssetCodeList = removeFixedAssetList.map(fixedAsset => fixedAsset.fixedAssetId)

            deleteFixedAssetsApi(removeFixedAssetCodeList, () => {
                this.isCheckedAll = false
                this.isShowRemove = false
                // tính lại giá trị tổng số trang
                const newTotalPage = Math.ceil((this.$store.state.totalAsset - removeFixedAssetList.length) / this.$store.state.pageSize)
                // nếu trang hiện tại lớn hơn tổng số trang mới thì currentPage = newTotalPage
                if (this.$store.state.currentPage > newTotalPage) {
                    this.$store.commit("setCurrentPage", newTotalPage)
                }
                this.$store.dispatch("getFilterFixedAsset")
            }, () => this.isShowRemove = false
            )
        },

        /**
        * author: Nguyen Quoc Huy
        * @param {Object} tr
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click vào button sửa tài sản
        */
        handleEdit(tr, index, event) {
            // nếu dbclick vào input checkbox thì không mở form edit
            if (index != undefined && event != undefined) {
                if (this.$refs.tbody.querySelectorAll('td:first-child')[index].contains(event.target))
                    return
            }
            this.isShowForm = true;
            this.typeForm = this.$enum.typeForm.edit;
            // gán giá trị dữ liệu sửa bằng giá trị ở dòng người dùng click 
            this.fixedAssetId = tr.fixedAssetId
        },

        /**
       * author: Nguyen Quoc Huy
       * @param {Object} tr
       * created at: 30/04/2023
       * description: Hàm xử lý sự kiện khi người dùng click vào button nhân bản
       */
        handleDuplicate(tr) {
            // mở form duplicate
            this.isShowForm = true;
            this.typeForm = this.$enum.typeForm.duplicate;
            // gán giá trị dữ liệu nhân bản bằng giá trị ở dòng người dùng click 
            this.fixedAssetId = tr.fixedAssetId
        },
    },
    components: {
        MisaInputCheckbox,
        MisaPaginate,
        MisaDialog,
        ThePopup,
        TheToolTip,
        TheForm,
        MisaLoading
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Hàm lắng nghe các global event khi component được mounted
     */
    mounted() {
        // lắng nghe sự kiện multidelte từ header
        this.emitter.on("multiDelete", () => {
            const checkedTrs = this.tbody.filter(tr => tr.isChecked)
            // nếu chưa có checkbox nào được chọn thì kết thúc hàm
            if (!checkedTrs.length)
                return
            // tạo thông báo khi bản xóa 1 bản
            else if (checkedTrs.length == 1)
                this.dialogText = `Bạn có muốn xóa tài sản <strong>${checkedTrs[0].fixedAssetCode} - ${checkedTrs[0].fixedAssetName}</strong>?`
            // tạo thông báo khi xóa nhiều bản
            else {
                this.dialogText = `<strong>${checkedTrs.length < 10 ? '0' + checkedTrs.length : checkedTrs.length}</strong> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`
            }
            this.isShowRemove = true
        });

        // lắng  nghe sự kiện ẩn select page size khi click vào màn hình
        this.eventTogglePageSizeList = (event) => {
            if (this.$refs.selectPageSizeHead?.contains(event.target) || this.$refs.selectPageSizeOption?.contains(event.target))
                return
            this.isShowPageSizeList = false
        }
        window.addEventListener('click', this.eventTogglePageSizeList)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: thực hiện xóa các trình lắng nghe sự kiện khi unmount
     */
    unmounted() {
        // xóa sự kiện ẩn select page size khi click vào màn hình
        window.removeEventListener('click', this.eventTogglePageSizeList)
    },

    data() {
        return {
            fixedAssetId: null,
            typeForm: null,
            isShowForm: false,
            dialogText: '',
            isShowRemove: false,
            isCheckedAll: false,
            tbody: [],
            pageSizeList: [10, 20, 50, 100],
            isShowPageSizeList: false,
            eventTogglePageSizeList: null
        }
    },
    computed: {
        fixedAssets() {
            return this.$store.state.fixedAssets.data
        },
        isLoading() {
            return this.$store.state.fixedAssets.isLoading
        },
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: mỗi khi fixedAssets từ store thay đổi thì tính lại biến tbody
    */
    watch: {
        fixedAssets(newVal) {
            this.tbody = newVal.map(fixedAsset => ({ isChecked: false, ...fixedAsset }))
            this.isCheckedAll = false
            // set kích thước cho phần tử tr bonus
            this.$nextTick(() => {
                // phần kích thước độn thêm = chiều cao table__wrapper - chiều cao thead - số dòng  * chiều cao 1 dòng dữ liệu, 2 là độ dài của border trên và dưới của table__wrapper
                let newHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.tableHead.offsetHeight - (newVal.length + 1) * this.$refs.tableFooter.offsetHeight - 2
                newHeight = newHeight > 0 ? newHeight : 0;
                this.$refs.trBonus.style.height = `${newHeight}px`
            })
        }
    }
}
</script>

<style scoped>
.table__body td:nth-child(2) {}

.tableWrapper {
    position: relative;
}

.table__nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.table__footer__select__options {
    bottom: calc(100% + 2px);
    left: 0;
    position: absolute;
    font-family: mMisa Font;
    background-color: #fff;
    width: 100%;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.323);
    border-radius: var(--radius-border);
    overflow: hidden;
}

.table__footer__select__option {
    padding: 4px 8px;
    width: 100%;
}

.table__footer__select__option:hover {
    background-color: rgba(67, 195, 227, 0.668);
    cursor: pointer;
}

.table__footer__select__head {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--radius-border);
    padding: 4px 8px;
    border: 1px solid #ccc;
    width: 60px;
    font-family: mMisa Font;
    cursor: pointer;
}

.table__footer__select {
    position: relative;
}

.table-wrapper {
    border: 1px solid var(--color-border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    border-radius: var(--radius-border);
    position: relative;
    height: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
}

.table-wrapper.isLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

.table {
    width: 100%;
    background-color: #fff;
    border-spacing: 0;
    min-width: max-content;
}

.table th {
    text-align: left;
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
    padding: 0px 8px;
    height: 38px;
    white-space: nowrap;
}

.table td {
    padding: 0 8px;
    font-size: 13px;
    height: 40px;
    font-weight: 400;
    font-family: mMisa Font;
    white-space: nowrap;
}

.table td:last-child>* {
    opacity: 0;
    visibility: hidden;
}

.table .table__body tr:hover {
    background-color: rgba(26, 164, 200, .2);
}

.table tr:hover td:last-child>* {
    opacity: 1;
    visibility: visible;
}

.table td:not(:nth-child(3))::first-letter {
    text-transform: capitalize;
}

.table td:nth-child(n+4):nth-child(-n+6) {
    white-space: unset;
}

.table td:nth-child(n+3):nth-child(-n+6) {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.table tbody:not(.table__footer) tr td,
.table th {
    border-bottom: 1px solid var(--color-border);
}

.table td:first-child,
.table th:first-child {
    padding-left: 16px;
}

.table__function {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 12px;
}

.table th:nth-child(n + 7):nth-child(-n + 10),
.table td:nth-child(n + 7):nth-child(-n + 10) {
    text-align: right;
}

.table th:last-child,
.table td:last-child {
    text-align: center;
}

.table__function__button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
}

.table__footer {
    position: sticky;
    bottom: 0;
    background-color: #fff;
}

.table__footer td {
    font-family: Misa Font;

}

.table__footer__td {
    position: relative;
}

.table__footer__left {
    position: absolute;
    display: flex;
    align-items: center;
    column-gap: 24px;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: max-content;
}

.table__footer__total {
    font-size: 11px;
}

.table__footer__conclusion {
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
}

.table thead {
    position: sticky;
    background-color: #eee;
    top: 0;
}

.table-wrapper::-webkit-scrollbar-button:single-button {
    background-color: #bbbbbb;
    display: block;
    border: none;
    height: 38px;
    width: 0;
    opacity: 0;
    background-color: transparent;
}
</style>