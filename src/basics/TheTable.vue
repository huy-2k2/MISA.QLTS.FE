<template>
    <div ref="tableWrapper" :class="{ isLoading }" class="table-wrapper custom-scrollbar">
        <div v-show="$store.state.totalAsset == 0 && !isLoading" class="table__nodata">
            <img src="../assets/image/nodata.png" alt="">
        </div>
        <MisaPopup :isHasClose="false" :isShow="isLoading">
            <MisaLoading></MisaLoading>
        </MisaPopup>
        <table v-if="!isLoading" class="table">
            <thead ref="tableHead">
                <tr>
                    <th scope="col">
                        <MisaInputCheckbox @changInput="handleCheckAll" v-model="isCheckedAll">
                        </MisaInputCheckbox>
                    </th>
                    <th scope="col">
                        <MisaToolTip :tooltip="resource.tHead[0].tooltip">
                            {{ resource.tHead[0].text }}
                        </MisaToolTip>
                    </th>
                    <th scope="col">{{ resource.tHead[1] }}</th>
                    <th scope="col">{{ resource.tHead[2] }}</th>
                    <th scope="col">{{ resource.tHead[3] }}</th>
                    <th scope="col">{{ resource.tHead[4] }}</th>
                    <th scope="col">{{ resource.tHead[5] }}</th>
                    <th scope="col">{{ resource.tHead[6] }}</th>
                    <th scope="col">
                        <MisaToolTip :tooltip="resource.tHead[7].tooltip">
                            {{ resource.tHead[7].text }}
                        </MisaToolTip>
                    </th>
                    <th scope="col">{{ resource.tHead[8] }}</th>
                    <th scope="col">{{ resource.tHead[9] }}</th>
                </tr>
            </thead>
            <tbody ref="tbody" class="table__body">
                <tr @click="handleClickTr($event, index)" :class="{ isActive: index == indexActive }" class="table__tr"
                    @dblclick="handleEdit(tr, $event)" v-for="(tr, index) in  tbody " :key="tr.td2">
                    <td class="no_action" scope="row">
                        <MisaInputCheckbox v-model="tbody[index].isChecked">
                        </MisaInputCheckbox>
                    </td>
                    <td>{{ index + 1 + $store.state.pageSize * ($store.state.currentPage - 1) }}</td>
                    <td>
                        <MisaToolTip :tooltip="tr.fixedAssetCode">
                            <span class="text">
                                {{ tr.fixedAssetCode }}
                            </span>
                        </MisaToolTip>
                    </td>
                    <td>
                        <MisaToolTip :tooltip="tr.fixedAssetName">
                            <span class="text">
                                {{ tr.fixedAssetName }}
                            </span>
                        </MisaToolTip>
                    </td>
                    <td>
                        <MisaToolTip :tooltip="tr.fixedAssetCategoryName">
                            <span class="text">
                                {{ tr.fixedAssetCategoryName }}
                            </span>
                        </MisaToolTip>
                    </td>
                    <td>
                        <MisaToolTip :tooltip="tr.departmentName">
                            <span class="text">
                                {{ tr.departmentName }}
                            </span>
                        </MisaToolTip>
                    </td>
                    <td>{{ convert.toCurrency(tr.quantity) }}</td>
                    <td>{{ convert.toCurrency(tr.cost) }}</td>
                    <td> 0 </td>
                    <td>{{ convert.toCurrency(tr.cost) }}</td>
                    <td class="no_action">
                        <div class="table__function">
                            <MisaToolTip :tooltip="resource.tooltip.edit">
                                <button @click="handleEdit(tr)" class="table__function__button table__function__edit">
                                    <div class="icon-pen-edit"></div>
                                </button>
                            </MisaToolTip>
                            <MisaToolTip :tooltip="resource.tooltip.duplicate">
                                <button @click="handleDuplicate(tr)"
                                    class="table__function__button table__function__detail">
                                    <div class="icon-file-detail"></div>
                                </button>
                            </MisaToolTip>
                        </div>
                    </td>
                </tr>
                <tr></tr>
            </tbody>
            <tbody class="table__footer">
                <tr></tr>
                <tr ref="tableFooter">
                    <td class="table__footer__td">
                        <div class="table__footer__left">
                            <p class="table__footer__total"
                                v-html="resource.fixedAssetDetail.totalFixedAsset.format(`<strong>${convert.toCurrency($store.state.totalAsset)}</strong>`)">

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
                                    <div @click="handleSetPageSize(pageSize)" v-for=" pageSize  in  pageSizeList "
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
        <MisaPopup :isShow="isShowRemove" :isHasClose="false">
            <MisaDialog :text="dialogText" @click1="handleRemove" @click2="isShowRemove = false" quantity="2"
                :button1="this.resource.buttons.delete" :button2="this.resource.buttons.notConfirm">
            </MisaDialog>
        </MisaPopup>
        <MisaPopup :isShow="isShowRemoveContextMenu" :isHasClose="false">
            <MisaDialog :text="dialogTextContextMenu" @click1="handleRemove(true)" @click2="isShowRemoveContextMenu = false"
                quantity="2" :button1="this.resource.buttons.delete" :button2="this.resource.buttons.notConfirm">
            </MisaDialog>
        </MisaPopup>
        <MisaPopup :isShow="isShowForm" @close="isShowForm = false">
            <TheForm :fixedAssetId="fixedAssetId" :typeForm="typeForm" @clickClose="isShowForm = false"></TheForm>
        </MisaPopup>
    </div>
    <ul ref="contextMenu" v-if="isShowContextMenu" class="context_menu">
        <li @click="handleContextMenuAdd">{{ resource.contextMenu.add }}
        </li>
        <li @click="handleContextMenuEdit">{{ resource.contextMenu.edit }}</li>
        <li @click="handleContextMenuRemove">{{ resource.contextMenu.delete }}</li>
        <li @click="handleContextMenuDuplicate">{{ resource.contextMenu.duplicate }}</li>
    </ul>
</template>

<script>
import MisaDialog from '@/components/MisaDialog.vue'
import MisaInputCheckbox from '../components/MisaInputCheckbox.vue'
import MisaPaginate from '../components/MisaPaginate.vue'
import MisaPopup from '../components/MisaPopup.vue'
import MisaToolTip from '../components/MisaToolTip.vue'
import TheForm from './TheForm.vue'
import MisaLoading from '@/components/MisaLoading.vue'
// import axios from 'axios'
// import { BASE_API_URL } from '@/config'
import { deleteFixedAssetsApi } from '@/js/api'
export default {
    methods: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * @param {interger} index
         * @param event
         * description: Xử lý sự kiện khi click vào nút 1 dòng dữ liệu, xủ lý toggle active, ctrl click, shift click
         */
        handleClickTr(event, index) {
            // kiểm tra xem có click vào các phần tử đặc biệt như checkbox, button sửa, nhân bản hay không
            const noActionElements = this.$refs.tbody.querySelectorAll('.no_action')
            for (let elm of noActionElements) {
                if (elm.contains(event.target))
                    return
            }
            // trường hợp giữ ctrl rồi click
            if (event.ctrlKey) {
                this.tbody[index].isChecked = !this.tbody[index].isChecked
            }
            // trường hợp giữ shift rồi click
            else if (event.shiftKey) {
                if (this.indexActive != -1) {
                    // đánh dấu checked cho các phần tử nhầm trong khoảng shift
                    const min = Math.min(this.indexActive, index)
                    const max = Math.max(this.indexActive, index)
                    // nếu trong đoạn min đến max mã đã check thì bỏ checked, nếu có ít nhất 1 phần tử chưa checked thì checked = true cho tất cả
                    let checked = true
                    for (let i = min; i <= max; i++) {
                        if (!this.tbody[i].isChecked) {
                            checked = false
                            break
                        }
                    }

                    for (let i = min; i <= max; i++) {
                        this.tbody[i].isChecked = !checked
                    }

                }
            }
            // trường hợp click để active dòng dữ liệu
            else
                this.indexActive = this.indexActive == index ? -1 : index
        },
        /**
          * author: Nguyen Quoc Huy
          * created at: 30/05/2023
          * description: Xử lý sự kiện khi click vào nút thêm mới ở contextmenu
          */
        handleContextMenuAdd() {
            this.typeForm = this.$enum.typeForm.add;
            this.isShowForm = true;
            this.fixedAssetId = null
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: Xử lý sự kiện khi click vào nút sửa ở contextmenu
         */
        handleContextMenuEdit() {
            this.typeForm = this.$enum.typeForm.edit;
            this.isShowForm = true
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: Xử lý sự kiện khi click vào nút nhân bản ở contextmenu
         */
        handleContextMenuDuplicate() {
            this.typeForm = this.$enum.typeForm.duplicate;
            this.isShowForm = true
        },


        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: Xử lý sự kiện khi click vào nút xóa ở contextmenu
         */
        handleContextMenuRemove() {
            this.isShowRemoveContextMenu = true
            const fixedAsset = this.tbody.find(tr => tr.fixedAssetId == this.fixedAssetId)
            this.dialogTextContextMenu = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${fixedAsset.fixedAssetCode} - ${fixedAsset.fixedAssetName}</strong>`)}`
        },

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
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở thead 
         */
        handleCheckAll() {
            // tất cả checkbox ở tr có cùng giá trị với checkbox ở thead
            this.tbody.forEach(tr => tr.isChecked = this.isCheckedAll)
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * @param {Boolean} isContextMenu 
        * description: Hàm xử lý sự kiện khi người dùng click button remove tài sản
        */
        handleRemove(isContextMenu) {
            // lấy ra danh sách id tài sản cần xóa
            // nếu là xóa ở contextmenu thì chỉ cần lấy biến fixedAssetId mà không cần filter để tìm bản ghi đã được checked
            const removeFixedAssetCodeList = isContextMenu ? [this.fixedAssetId] : this.tbody.filter(fixedAsset => fixedAsset.isChecked).map(fixedAsset => fixedAsset.fixedAssetId)
            deleteFixedAssetsApi(removeFixedAssetCodeList, () => {
                this.isCheckedAll = false
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
                // tính lại giá trị tổng số trang
                const newTotalPage = Math.ceil((this.$store.state.totalAsset - removeFixedAssetCodeList.length) / this.$store.state.pageSize)
                // nếu trang hiện tại lớn hơn tổng số trang mới thì currentPage = newTotalPage
                if (this.$store.state.currentPage > newTotalPage) {
                    this.$store.commit("setCurrentPage", newTotalPage || 1)
                }
                this.$store.dispatch("getFilterFixedAsset")
            }, () => {
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
            }
            )
        },

        /**
        * author: Nguyen Quoc Huy
        * @param {Object} tr
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click vào button sửa tài sản
        */
        handleEdit(tr, event) {
            // kiểm tra xem có click vào các phần tử đặc biệt như checkbox hay button thêm, nhân bản hay không
            if (event) {
                const noActionElements = this.$refs.tbody.querySelectorAll('.no_action')
                for (let elm of noActionElements) {
                    if (elm.contains(event.target))
                        return
                }
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
        MisaPopup,
        MisaToolTip,
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
                this.dialogText = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${checkedTrs[0].fixedAssetCode} - ${checkedTrs[0].fixedAssetName}</strong>`)}`
            // tạo thông báo khi xóa nhiều bản
            else {
                this.dialogText = this.resource.dialogMessages.removeMultiFixedAsset.format(`<strong>${checkedTrs.length < 10 ? '0' + checkedTrs.length : checkedTrs.length}</strong>`)
            }
            this.isShowRemove = true
        });

        // lắng nghe sự kiện ẩn select page size, context menu khi click vào màn hình
        this.eventCloseExtentComponent = (event) => {
            // đóng contextmenu khi click chuột trái
            if (!this.$refs.contextMenu?.contains(event.target))
                this.isShowContextMenu = false
            if (!(this.$refs.selectPageSizeHead?.contains(event.target) || this.$refs.selectPageSizeOption?.contains(event.target)))
                this.isShowPageSizeList = false
        }

        // lắng nghe sự kiện context menu
        this.eventContextMenu = (event) => {
            const trs = this.$refs.tbody.querySelectorAll('.table__tr');
            // vị trí của dòng dữ click chuột phải
            let index = -1
            trs.forEach((tr, i) => {
                // kiểm tra xem dòng nào được click chuột
                if (tr.contains(event.target)) {
                    event.preventDefault();
                    index = i
                }
            })
            // nếu không dòng nào click thì kết thúc hàm và đóng contextmenu
            if (index == -1) {
                this.isShowContextMenu = false
                return
            }
            this.fixedAssetId = this.tbody[index].fixedAssetId
            this.isShowContextMenu = true
            // tính toán tọa độ để hiện thị contextmenu sao cho nó không bị tràn qua ngoài table
            this.$nextTick(() => {
                const contextMenu = this.$refs.contextMenu
                const wrapCoordinate = this.$refs.tableWrapper.getBoundingClientRect()
                const alphaX = event.clientX + contextMenu.clientWidth - wrapCoordinate.right > 0 ? 1 : 0
                const alphaY = event.clientY + contextMenu.clientHeight - wrapCoordinate.bottom > 0 ? 1 : 0
                contextMenu.style.left = event.clientX - contextMenu.clientWidth * alphaX + 'px'
                contextMenu.style.top = event.clientY - contextMenu.clientHeight * alphaY + 'px'
            })
        },
            // lắng nghe sự kiện lên xuống dòng dữ liệu trong table
            this.eventControlTable = (event) => {
                // nếu chưa có dòng nào được active hoạc con chuột đang focus vào ô input nào đó thì dừng hàm
                if (this.indexActive == -1 || event.target.nodeName != "BODY")
                    return
                if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
                    event.preventDefault()
                    if (event.key == 'ArrowUp') {
                        this.indexActive = this.indexActive > 0 ? this.indexActive - 1 : this.tbody.length - 1
                    } else {
                        this.indexActive = (this.indexActive + 1) % this.tbody.length
                    }

                    const tableWrapper = this.$refs.tableWrapper
                    // tính độ cao của tbody
                    const heightTableBody = tableWrapper.clientHeight - this.$refs.tableHead.clientHeight - this.$refs.tableFooter.clientHeight
                    // tính độ cao của 1 dòng
                    const heightRow = this.$refs.tbody.querySelector('.table__tr').clientHeight
                    // tính số dòng trong 1 table
                    const rowOfTable = Math.floor(heightTableBody / heightRow)
                    // tính tọa độ scroll
                    let scrollTop = this.indexActive < (rowOfTable - 1) ? 0 : (this.indexActive - (rowOfTable - 1)) * heightRow
                    // scroll
                    tableWrapper.scroll({
                        top: scrollTop,
                        behavior: 'smooth'
                    })
                }
            }
        window.addEventListener('click', this.eventCloseExtentComponent)
        window.addEventListener('contextmenu', this.eventContextMenu)
        window.addEventListener('keydown', this.eventControlTable)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: thực hiện xóa các trình lắng nghe sự kiện khi unmount
     */
    unmounted() {
        // xóa sự kiện ẩn select page size khi click vào màn hình
        window.removeEventListener('click', this.eventCloseExtentComponent)
        // xóa sự kiện contextmenu
        window.removeEventListener('contextmenu', this.eventContextMenu)
        // xóa sự kiện liên xuống dòng dữ liệu trong table
        window.removeEventListener('keyup', this.eventControlTable)
    },

    data() {
        return {
            fixedAssetId: null,
            typeForm: null,
            isShowForm: false,
            isShowRemoveContextMenu: false,
            dialogText: '',
            dialogTextContextMenu: '',
            isShowRemove: false,
            isCheckedAll: false,
            tbody: [],
            pageSizeList: [10, 20, 50, 100],
            isShowPageSizeList: false,
            isShowContextMenu: false,
            eventCloseExtentComponent: null,
            eventContextMenu: null,
            indexActive: -1,
            eventControlTable: null
        }
    },
    computed: {
        // danh sánh tài sản
        fixedAssets() {
            return this.$store.state.fixedAssets.data
        },
        // đánh dấu load xong hay chưa cho danh sách tài sản
        isLoading() {
            return this.$store.state.fixedAssets.isLoading
        },
        // tổng số dòng được chọn
        totalTrChecked() {
            return this.tbody.reduce((total, tr) => total + (tr.isChecked ? 1 : 0), 0)
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: mỗi khi fixedAssets từ store thay đổi thì tính lại biến tbody
    */
    watch: {
        fixedAssets(newVal) {
            // lấy thêm các thông tin về department, fixed asset category
            this.tbody = newVal.map(fixedAsset => ({
                isChecked: false,
                ...fixedAsset,
                fixedAssetCategoryName: this.$store.getters.fixedAssetCategoryById(fixedAsset.fixedAssetCategoryId)?.fixedAssetCategoryName,
                departmentName: this.$store.getters.departmentById(fixedAsset.departmentId)?.departmentName
            }))
            this.isCheckedAll = false
            this.indexActive = -1
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: mỗi khi tổng số bản ghi được chọn thay đổi thì emit sự kiện disableBtnRemove, gán lại biến isChecckedAll
         */
        totalTrChecked(newVal) {
            this.emitter.emit('disableBtnRemove', newVal == 0)
            this.isCheckedAll = newVal == this.tbody.length
        },
    }
}
</script>

<style scoped>
.context_menu {
    list-style: none;
    position: fixed;
    background-color: #fff;
    font-family: mMisa Font;
    font-size: 13px;
    border-radius: var(--radius-border);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.225);
    overflow: hidden;
    top: 50%;
    left: 50%;
}

.context_menu li {
    padding: 8px 12px;
    cursor: pointer;
}

.context_menu li:hover {
    background-color: rgba(67, 195, 227, 0.668);
}

.table .table__body .table__tr.isActive {
    background-color: rgba(26, 165, 200, 0.507);
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
    position: relative;
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
    height: 100%;
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
    user-select: none;
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

.table td:not(:nth-child(3))::first-letter,
.table td:not(:nth-child(3)) *::first-letter {
    text-transform: capitalize;
}

.table td:nth-child(n+4):nth-child(-n+6) {
    white-space: unset;
}

.table td:nth-child(n+3):nth-child(-n+6) .text {
    display: block;
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
    background-color: #eee;
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
    display: block;
    border: none;
    height: 38px;
    width: 0;
    opacity: 0;
    background-color: #eee;
}
</style>