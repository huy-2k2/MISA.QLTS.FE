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
                <MisaButtonIcon :isDisable="!toatlChecked" @clickButton="handleMultipleDelete" icon="icon-bin">
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
        <MisaTable :headData="headData" :isHasCheckbox="true"
            :baseIndex="($store.state.fa.currentPage - 1) * $store.state.fa.pageSize"
            :isLoading="$store.state.fa.fixedAssets.isLoading" :bodyData="bodyData" :footer="footer"
            :contextMenu="[resource.contextMenu.add, resource.contextMenu.edit, resource.contextMenu.delete, resource.contextMenu.duplicate]"
            @setPageSize="handleSetPageSize" @setPage="handleSetPage" @feature_0="handleEdit" @feature_1="handleDuplicate"
            @changeCheckboxData="(checkboxData) => this.checkboxData = checkboxData" @dbClickTr="handleEdit"
            @context_0="handleAdd" @context_1="handleEdit" @context_3="handleDuplicate" @context_2="handleDelete">
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
            isDiableRemove: true,
            isShowForm: false,
            isShowRemoveContextMenu: false,
            departmentCode: null,
            fixedAssetCategoryCode: null,
            textSearch: "",
            settTimeOutDebounce: null,
            isShowFormImport: false,
            typeForm: null,
            fixedAssetId: null,
            checkboxData: [],
            isShowRemove: false,
            dialogText: '',
            bodyData: {
                features: [
                    {
                        tooltip: this.resource.tooltip.edit,
                        icon: 'icon-pen-edit',
                    },
                    {
                        tooltip: this.resource.tooltip.duplicate,
                        icon: 'icon-file-detail'
                    }
                ]
            },
            headData: [
                {
                    data: this.resource.tHead[1],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[2],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[3],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[4],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[5],
                    type: this.$enum.dataType.interger
                },
                {
                    data: this.resource.tHead[6],
                    type: this.$enum.dataType.double
                },
                {
                    data: this.resource.tHead[7].text,
                    type: this.$enum.dataType.double,
                    tooltip: this.resource.tHead[7].tooltip
                },
                {
                    data: this.resource.tHead[8],
                    type: this.$enum.dataType.double
                },
            ]
        }
    },

    watch: {
        departmentCode() {
            this.handleFilter()
        },
        fixedAssetCategoryCode() {
            this.handleFilter()
        },
        textSearch() {
            this.handleFilter()
        },


        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: mỗi khi fixedAssets từ store thay đổi thì tính lại biến tbody
         */
        fixedAssets(newVal) {
            this.bodyData.body = newVal.map(fixedAsset => {
                const fixedAssetCategory = this.$store.getters.fixedAssetCategoryById(fixedAsset.fixedAssetCategoryId)
                const department = this.$store.getters.departmentById(fixedAsset.departmentId)
                return [
                    fixedAsset.fixedAssetCode,
                    fixedAsset.fixedAssetName,
                    fixedAssetCategory.fixedAssetCategoryName,
                    department.departmentName,
                    fixedAsset.quantity,
                    fixedAsset.cost,
                    '0',
                    '0'
                ]
            })
        },

    },

    computed: {
        // danh sánh tài sản
        fixedAssets() {
            return this.$store.state.fa.fixedAssets.data
        },

        // footer của table
        footer() {
            return {
                paging: {
                    totalData: this.$store.state.fa.totalAsset,
                    pageSize: this.$store.state.fa.pageSize,
                    currentPage: this.$store.state.fa.currentPage,
                },
                data: [
                    '', '', '', '', '', '',
                    { type: this.$enum.dataType.interger, data: this.convert.toCurrency(this.$store.state.fa.totalQuantity) },
                    { type: this.$enum.dataType.double, data: this.convert.toCurrency(this.$store.state.fa.totalCost) },
                    { type: this.$enum.dataType.double, data: 0 },
                    { type: this.$enum.dataType.double, data: 0 },
                    ''
                ]
            }
        },
        toatlChecked() {
            return this.checkboxData.reduce((total, checkbox) => total + (checkbox ? 1 : 0), 0)
        },
        listFixedAssetRemove() {
            const result = []
            for (let i in this.checkboxData) {
                if (this.checkboxData[i])
                    result.push(this.fixedAssets[i])
            }
            return result
        }
    },

    methods: {
        handleRemove(isContextMenu) {
            const removeFixedAssetIdList = isContextMenu ? [this.fixedAssetId] : this.listFixedAssetRemove.map(fixedAsset => fixedAsset.fixedAssetId)
            deleteFixedAssetsApi(removeFixedAssetIdList, () => {
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
                // tính lại giá trị tổng số trang
                const newTotalPage = Math.ceil((this.$store.state.fa.totalAsset - removeFixedAssetIdList.length) / this.$store.state.fa.pageSize)
                // nếu trang hiện tại lớn hơn tổng số trang mới thì currentPage = newTotalPage
                if (this.$store.state.fa.currentPage > newTotalPage) {
                    this.$store.commit("setCurrentPage", newTotalPage || 1)
                }
                this.$store.dispatch("getFilterFixedAsset")
            }, () => {
                this.isShowRemove = false
                this.isShowRemoveContextMenu = false
            }
            )
        },

        handleDelete(index) {
            const fixedAsset = this.fixedAssets[index]
            this.fixedAssetId = fixedAsset.fixedAssetId
            this.dialogText = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${fixedAsset.fixedAssetCode} - ${fixedAsset.fixedAssetName}</strong>`)}`
            this.isShowRemoveContextMenu = true
        },

        handleMultipleDelete() {
            // nếu chưa có checkbox nào được chọn thì kết thúc hàm
            if (!this.listFixedAssetRemove.length)
                return
            // tạo thông báo khi bản xóa 1 bản
            else if (this.listFixedAssetRemove.length == 1)
                this.dialogText = `${this.resource.dialogMessages.removeFixedAsset.format(`<strong>${this.listFixedAssetRemove[0].fixedAssetCode} - ${this.listFixedAssetRemove[0].fixedAssetName}</strong>`)}`
            // tạo thông báo khi xóa nhiều bản
            else {
                this.dialogText = this.resource.dialogMessages.removeMultiFixedAsset.format(`<strong>${this.listFixedAssetRemove.length < 10 ? '0' + this.listFixedAssetRemove.length : this.listFixedAssetRemove.length}</strong>`)
            }
            this.isShowRemove = true
        },

        /**
       * @param {Boolean} checked 
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: Hàm xử lý sự kiện khi người dùng nhấn thêm mới
       */
        handleAdd() {
            this.isShowForm = true
            this.fixedAssetId = null
            this.typeForm = this.$enum.typeForm.add
        },

        /**
        * @param {Boolean} checked 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng nhấn sửa
        */
        handleEdit(index) {
            this.isShowForm = true
            this.fixedAssetId = this.$store.state.fa.fixedAssets.data[index].fixedAssetId
            this.typeForm = this.$enum.typeForm.edit
        },

        /**
        * @param {Boolean} checked 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng nhấn nhân bản trên dòng dữ liệu
        */
        handleDuplicate(index) {
            this.isShowForm = true
            this.fixedAssetId = this.$store.state.fa.fixedAssets.data[index].fixedAssetId
            this.typeForm = this.$enum.typeForm.duplicate
        },


        /**
         * @param {Boolean} checked 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng thay đổi trang hiện tại
         */
        handleSetPage(page) {
            this.$store.commit("setCurrentPage", page)
            this.$store.dispatch("getFilterFixedAsset")
        },

        /**
       * @param {Boolean} checked 
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: Hàm xử lý sự kiện khi người dùng thay đổi size của page
       */
        handleSetPageSize(pageSize) {

            this.$store.commit("setPageSize", pageSize)
            this.$store.commit("setCurrentPage", 1)
            this.$store.dispatch("getFilterFixedAsset")
        },


        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: các combobox khi ấn enter thì chuyển sang input tiếp theo, nên cần có sự kiện enter cho combobox
         */
        handleEnterToTab(nextInput) {
            const input = this.$refs[nextInput].querySelector('input')
            input.focus()
            input.select()
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description:khi người dùng nhập vào các input lọc dữ liệu thì thực hiện lọc
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
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: lấy dữ liệu về phòng ban, loại tài sản, tài sản
     */
    async mounted() {
        await this.$store.dispatch('getDepartments')
        await this.$store.dispatch('getFixedAssetCategorys')

        this.$store.dispatch("getFilterFixedAsset")
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/05/2023
     * description: reset dữ liệu trang
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