<template>
    <TheHeader></TheHeader>
    <div class="header__bottom">
        <div class="header__bottom__textfield">
            <MisaTextField v-model="textSearch" icon="icon-search"
                :placeholder="resource.fixedAssetDetail.searchPlaceholder"></MisaTextField>
        </div>
        <div ref="fixedAssetCategoryCode" class="header__bottom__select">
            <MisaCombobox fieldText="fixedAssetCategoryName" fieldValue="fixedAssetCategoryCode"
                :isLoading="$store.state.fa.fixedAssetCategorys.isLoading" :data="$store.state.fa.fixedAssetCategorys.data"
                label="" :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption" icon="icon-header-filter"
                v-model="fixedAssetCategoryCode"
                :placeholder="resource.placeholder.combobox.format(resource.fieldName.fixedAssetCategory)"
                @enter="handleEnterToTab('departmentCode')">
            </MisaCombobox>
        </div>
        <div ref="departmentCode" class="header__bottom__select">
            <MisaCombobox fieldText="departmentName" fieldValue="departmentCode" label=""
                :isLoading="$store.state.fa.departments.isLoading" :data="$store.state.fa.departments.data"
                :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption" icon="icon-header-filter"
                v-model="departmentCode" :placeholder="resource.placeholder.combobox.format(resource.fieldName.department)"
                @enter="handleEnterToTab('fixedAssetCategoryCode')">
            </MisaCombobox>
        </div>
        <div class="header__bottom__right">
            <MisaButton :shadow="true" @clickButton="handleAdd" :text="resource.buttons.addFixedAsset"
                icon="icon-small-plus--white">
            </MisaButton>
            <div class="header__bottom__right__file">
                <MisaToolTip :tooltip="resource.tooltip.import">
                    <MisaButtonIcon @clickButton="isShowFormImport = true" icon="icon-excel">
                    </MisaButtonIcon>
                </MisaToolTip>
            </div>
            <MisaToolTip :tooltip="resource.tooltip.delete">
                <MisaButtonIcon :isDisable="!listIdSelected.length" @clickButton="handleMultipleDelete" icon="icon-bin">
                </MisaButtonIcon>
            </MisaToolTip>
        </div>
    </div>
    <MisaPopup :isShow="isShowForm" @close="isShowForm = false">
        <TheForm :typeForm="typeForm" @clickClose="isShowForm = false" :fixedAssetId="fixedAssetId"></TheForm>
    </MisaPopup>
    <MisaPopup :isShow="isShowFormImport" @close="isShowFormImport = false">
        <TheFormImport @clickClose="isShowFormImport = false"></TheFormImport>
    </MisaPopup>
    <MisaPopup :isShow="isShowRemove" :isHasClose="false">
        <MisaDialog :text="dialogText" @click1="handleRemove" @click2="isShowRemove = false" quantity="2"
            :button1="this.resource.buttons.delete" :button2="this.resource.buttons.notConfirm">
        </MisaDialog>
    </MisaPopup>
    <MisaPopup :isShow="isShowRemoveContextMenu" :isHasClose="false">
        <MisaDialog :text="dialogText" @click1="handleRemove(true)" @click2="isShowRemoveContextMenu = false" quantity="2"
            :button1="this.resource.buttons.delete" :button2="this.resource.buttons.notConfirm">
        </MisaDialog>
    </MisaPopup>
    <div class="body">
        <MisaTable :headData="this.headTable.headFixedAssetTable" :isHasCheckbox="true"
            :baseIndex="($store.state.fa.currentPage - 1) * $store.state.fa.pageSize"
            :isLoading="$store.state.fa.fixedAssets.isLoading" :bodyData="bodyData" :footer="footer"
            :contextMenu="[resource.contextMenu.add, resource.contextMenu.edit, resource.contextMenu.delete, resource.contextMenu.duplicate]"
            @setPageSize="handleSetPageSize" @setPage="handleSetPage" @feature_0="handleEdit" @feature_1="handleDuplicate"
            @changeCheckboxData="(listId) => listIdSelected = listId" @dbClickTr="handleEdit" @context_0="handleAdd"
            @context_1="handleEdit" @context_3="handleDuplicate" @context_2="handleDelete" :selectedList="listIdSelected">
        </MisaTable>
    </div>
</template>

<script>
import TheHeader from '@/basics/TheHeader.vue';
import MisaTextField from '../components/MisaTextField.vue'
import MisaButton from '../components/MisaButton.vue'
import MisaButtonIcon from '../components/MisaButtonIcon.vue'
import MisaPopup from '../components/MisaPopup.vue'
import TheForm from '../basics/TheForm.vue'
import MisaToolTip from '../components/MisaToolTip.vue'
import MisaCombobox from '@/components/MisaCombobox.vue'
import TheFormImport from '../basics/TheFormImport.vue'
import MisaTable from '@/components/MisaTable.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import { deleteFixedAssetsApi } from '@/js/api';
import { DEFAULT_PAGE_SIZE } from '@/config';

export default {
    components: {
        TheHeader,
        MisaTextField,
        MisaButton,
        MisaButtonIcon,
        MisaPopup,
        TheForm,
        MisaToolTip,
        MisaCombobox,
        TheFormImport,
        MisaTable,
        MisaDialog,

    },
    data() {
        return {
            // điều khiển trạng thái của nút xóa nhiều ở đầu table danh sách tài sản
            isDiableRemove: true,
            // điều khiển hiển thị của form thêm, sửa tài sản
            isShowForm: false,
            // điều khiển hiện thị của form xóa trong th dùng contextmenu
            isShowRemoveContextMenu: false,
            // biến lưu departmentCode của combobox filter
            departmentCode: null,
            // danh sách id đã được chọn bởi checkbox của table
            listIdSelected: [],
            // biến lưu fixedAssetCategoryCode của combobox filter
            fixedAssetCategoryCode: null,
            // biến lưu từ khóa tìm kiếm khi filter tài sản
            textSearch: "",
            // timeout debounce khi filter
            settTimeOutDebounce: null,
            // điều khiển hiển thị của form import
            isShowFormImport: false,
            // điều khiển trạng thái của form (thêm, sửa, nhân bản)
            typeForm: null,
            // lưu id tài sản khi sửa hoạc nhân bản
            fixedAssetId: null,
            // biến điều khiển hiện thị dialog remove
            isShowRemove: false,
            // dữ liệu hiển thị của các dialog
            dialogText: '',
            // dữ liệu của table danh sách tài sản
            bodyData: {
                // tính năng trên mỗi dòng dữ liệu (sửa, xóa)
                features: [
                    {
                        tooltip: this.resource.tooltip.edit,
                        icon: 'icon-pen-edit',
                    },
                    {
                        tooltip: this.resource.tooltip.duplicate,
                        icon: 'icon-file-detail'
                    }
                ],
                body: []
            },
        }
    },

    watch: {
        /**
        * @description: khi departmentCoder ở filter thay đổi thì gọi lại dữ liệu
        * @author: NQ Huy 04/05/2023
        */
        departmentCode() {
            this.handleFilter()
        },

        /**
        * @description: khi fixedAssetCategoryCode ở filter thay đổi thì gọi lại dữ liệu
        * @author: NQ Huy 04/05/2023
        */
        fixedAssetCategoryCode() {
            this.handleFilter()
        },

        /**
        * @description: khi từ khóa tìm kiếm ở filter thay đổi thì gọi lại dữ liệu
        * @author: NQ Huy 04/05/2023
        */
        textSearch() {
            this.handleFilter()
        },

        /**
        * @description: mỗi khi fixedAssets từ store thay đổi thì tính lại biến tbody
        * @return: {newVal}: newVal: giá trị danh sách tài sản mới
        * @author: NQ Huy 04/05/2023
        */
        fixedAssets(newVal) {
            // tạo lại dữ liệu cho table fixed asset
            this.bodyData.body = newVal.map(fixedAsset => {
                // lấy ra loại tài sản tương ứng
                const fixedAssetCategory = this.$store.getters.fixedAssetCategoryById(fixedAsset.fixedAssetCategoryId)
                // lấy ra phòng ban tương ứng
                const department = this.$store.getters.departmentById(fixedAsset.departmentId)
                return [
                    fixedAsset.fixedAssetCode,
                    fixedAsset.fixedAssetName,
                    fixedAssetCategory.fixedAssetCategoryName,
                    department.departmentName,
                    this.convert.toCurrency(fixedAsset.quantity),
                    this.convert.toCurrency(fixedAsset.cost),
                    '0',
                    this.convert.toCurrency(fixedAsset.cost),

                ]
            })
            this.bodyData.listId = newVal.map(fixedAsset => fixedAsset.fixedAssetId)
        },

    },

    computed: {
        /**
        * @description: lấy ra danh sách tài sản từ state
        * @author: NQ Huy 04/05/2023
        */
        fixedAssets() {
            return this.$store.state.fa.fixedAssets.data
        },

        /**
       * @description: lấy ra dữ liệu của footer
       * @author: NQ Huy 04/05/2023
       */
        footer() {
            return {
                paging: {
                    // tổng số bản ghi
                    totalData: this.$store.state.fa.totalAsset,
                    // kích thước trang
                    pageSize: this.$store.state.fa.pageSize,
                    // trang hiện tại
                    currentPage: this.$store.state.fa.currentPage,
                },
                data: [
                    '', '', '', '', '', '',
                    // tổng số lượng
                    { type: this.$enum.dataType.interger, data: this.convert.toCurrency(this.$store.state.fa.totalQuantity) },
                    // tổng nguyên giá
                    { type: this.$enum.dataType.double, data: this.convert.toCurrency(this.$store.state.fa.totalCost) },
                    { type: this.$enum.dataType.double, data: 0 },
                    { type: this.$enum.dataType.double, data: 0 },
                    ''
                ]
            }
        },

    },

    methods: {
        /**
         * @description: gọi api để xóa tài sản
         * @param: {isContextMenu}: isContextMenu: kiểm tra có phải dùng context menu để xóa không
         * @author: NQ Huy 07/06/2023
         */
        async handleRemove(isContextMenu) {
            const removeFixedAssetIdList = isContextMenu ? [this.fixedAssetId] : this.listIdSelected
            try {
                await deleteFixedAssetsApi(removeFixedAssetIdList)
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
                // tính lại giá trị tổng số trang
                const newTotalPage = Math.ceil((this.$store.state.fa.totalAsset - removeFixedAssetIdList.length) / this.$store.state.fa.pageSize)
                // nếu trang hiện tại lớn hơn tổng số trang mới thì currentPage = newTotalPage
                if (isContextMenu)
                    this.listIdSelected = this.listIdSelected.filter(id => id != this.fixedAssetId)
                else
                    this.listIdSelected = []
                if (this.$store.state.fa.currentPage > newTotalPage) {
                    this.$store.commit("setCurrentPage", newTotalPage || 1)
                }
                this.emitter.emit("setToastMessage", this.resource.toastMessage.delete);
                this.$store.dispatch("getFilterFixedAsset")
            } catch {
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
            }
        },

        /**
       * @description: sự kiện người dùng xóa 1 tài sản
       * @param: {index}: index: vị trí tài sản cần xóa
       * @author: NQ Huy 07/06/2023
       */
        handleDelete(index) {
            const fixedAsset = this.fixedAssets[index]
            this.fixedAssetId = fixedAsset.fixedAssetId
            this.dialogText = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${fixedAsset.fixedAssetCode} - ${fixedAsset.fixedAssetName}</strong>`)}`
            this.isShowRemoveContextMenu = true
        },

        /**
         * @description: sự kiện người dùng xóa nhiều tài tài sản
         * @author: NQ Huy 07/06/2023
         */
        handleMultipleDelete() {
            // nếu chưa có checkbox nào được chọn thì kết thúc hàm
            if (!this.listIdSelected.length)
                return
            // tạo thông báo khi bản xóa 1 bản
            else if (this.listIdSelected.length == 1) {
                console.log(this.listIdSelected);
                const fixedAsset = this.fixedAssets.find(fa => fa.fixedAssetId == this.listIdSelected[0])
                this.dialogText = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${fixedAsset.fixedAssetCode} - ${fixedAsset.fixedAssetName}</strong>`)}`
            }
            // tạo thông báo khi xóa nhiều bản
            else {
                this.dialogText = this.resource.dialogMessages.removeMultiFixedAsset.format(`<strong>${this.listIdSelected.length < 10 ? '0' + this.listIdSelected.length : this.listIdSelected.length}</strong>`)
            }
            this.isShowRemove = true
        },

        /**
         * @description: sự kiện người dùng ấn nút thêm mới
         * @author: NQ Huy 07/06/2023
         */
        handleAdd() {
            this.isShowForm = true
            this.fixedAssetId = null
            this.typeForm = this.$enum.typeForm.add
        },

        /**
         * @description: sự kiện người dùng ấn sửa tài sản
         * @param: {index}: index: vị trí tài sản cần sửa
         * @author: NQ Huy 07/06/2023
         */
        handleEdit(index) {
            this.isShowForm = true
            this.fixedAssetId = this.$store.state.fa.fixedAssets.data[index].fixedAssetId
            this.typeForm = this.$enum.typeForm.edit
        },

        /**
         * @description: Hàm xử lý sự kiện khi người dùng nhấn nhân bản trên dòng dữ liệu
         * @param: {index}: index: vị trí tài sản cần nhân bản
         * @author: NQ Huy 07/06/2023
         */
        handleDuplicate(index) {
            this.isShowForm = true
            this.fixedAssetId = this.$store.state.fa.fixedAssets.data[index].fixedAssetId
            this.typeForm = this.$enum.typeForm.duplicate
        },

        /**
         * @description:  Hàm xử lý sự kiện khi người dùng thay đổi trang hiện tại
         * @param: {page}: page: giá trị page hiện tại cần set đến
         * @author: NQ Huy 07/06/2023
         */
        handleSetPage(page) {
            this.$store.commit("setCurrentPage", page)
            this.$store.dispatch("getFilterFixedAsset")
        },

        /**
         * @description:  Hàm xử lý sự kiện khi người dùng thay đổi size của page
         * @param: {pageSize}: pageSize: kích thước page cần set đến
         * @author: NQ Huy 07/06/2023
         */
        handleSetPageSize(pageSize) {
            this.$store.commit("setPageSize", pageSize)
            this.$store.commit("setCurrentPage", 1)
            this.$store.dispatch("getFilterFixedAsset")
        },

        /**
         * @description:  các combobox khi ấn enter thì chuyển sang input tiếp theo, nên cần có sự kiện enter cho combobox
         * @param: {nextInput}: nextInput: input tiếp theo cần focus đến khi enter ở combobox
         * @author: NQ Huy 07/06/2023
         */
        handleEnterToTab(nextInput) {
            const input = this.$refs[nextInput].querySelector('input')
            input.focus()
            input.select()
        },


        /**
        * @description: khi người dùng nhập vào các input lọc dữ liệu thì thực hiện lọc
        * @author: NQ Huy 07/06/2023
        */
        handleFilter() {
            clearTimeout(this.settTimeOutDebounce)

            // lấy ra department và fixedAssetCategory từ mã code
            const department = this.$store.getters.departmentByCode(this.departmentCode)
            const fixedAssetCategory = this.$store.getters.fixedAssetCategoryByCode(this.fixedAssetCategoryCode)

            const departmentId = department?.departmentId
            const fixedAssetCategoryId = fixedAssetCategory?.fixedAssetCategoryId

            // bebounce 500ms thì call api
            this.settTimeOutDebounce = setTimeout(() => {
                this.$store.commit("setFilter", { departmentId, fixedAssetCategoryId, textSearch: this.textSearch })
                this.$store.commit("setCurrentPage", 1)

                this.$store.dispatch("getFilterFixedAsset")
            }, 500)
        },
    },



    /**
    * @description: lấy dữ liệu về phòng ban, loại tài sản, tài sản
    * @author: NQ Huy 07/06/2023
    */
    async mounted() {
        await this.$store.dispatch('getDepartments')
        await this.$store.dispatch('getFixedAssetCategorys')

        this.$store.dispatch("getFilterFixedAsset")
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/05/2023
     * description:
     */

    /**
     * @description: reset dữ liệu trang
     * @author: NQ Huy 07/06/2023
     */
    unmounted() {
        this.$store.commit('setPageSize', DEFAULT_PAGE_SIZE)
        this.$store.commit('setCurrentPage', 1)
        this.$store.commit('setFilter', {})
    },
}
</script>

<style scoped>
.header__bottom {
    background-color: #f4f7ff;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 12px;
    column-gap: 12px;
}

.header__bottom__right {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-left: auto;
    column-gap: 12px;
}

.header__bottom__right .button__icon {
    width: 10px;
    transform: scale(1.5);
}

.header__bottom__select {
    width: 280px;
    flex-shrink: 0;
}

.header__bottom__textfield {
    width: 230px;
    flex-shrink: 0;
}

.header__bottom__right__file {
    position: relative;
}

.header__bottom__right__file__input {
    position: absolute;
    inset: 0;
    background-color: red;
    /* opacity: 0; */
    cursor: pointer;
    opacity: 0;
}

.header__bottom__right__file__input::-webkit-file-upload-button {
    cursor: pointer;
}

@media screen and (max-width: 1280px) {
    .header__bottom__select {
        width: 204px;
    }

    .header__bottom__textfield {
        width: 160px;
    }

    .header__bottom {
        column-gap: 8px;
        padding: 8px;
    }

    .header__bottom__right {
        column-gap: 4px;
    }
}
</style>