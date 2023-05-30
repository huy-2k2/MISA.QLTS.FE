<template>
    <div class="header">
        <div class="header__top">
            <h4 class="header__top__title">Danh sách tài sản</h4>
            <ul class="header__top__list">
                <li class="header__top__item">
                    Sở tài chính
                </li>
                <li class="header__top__item">
                    <MisaInputNumber></MisaInputNumber>
                </li>
                <li class="header__top__item">
                    <div class="icon-header-bell"></div>
                </li>
                <li class="header__top__item">
                    <div class="icon-header-rec"></div>
                </li>
                <li class="header__top__item">
                    <div class="icon-header-help"></div>
                </li>
                <li class="header__top__item">
                    <div class="icon-header-user"></div>
                    <div class="icon-down">
                    </div>
                </li>
            </ul>
        </div>
        <div class="header__bottom">
            <MisaTextField v-model="textSearch" icon="icon-search" placeholder="Tìm kiếm tài sản"></MisaTextField>
            <div ref="fixedAssetCategoryCode" class="header__bottom__select">
                <MisaCombobox fieldText="fixedAssetCategoryName" fieldValue="fixedAssetCategoryCode"
                    :isLoading="$store.state.fixedAssetCategorys.isLoading" :data="$store.state.fixedAssetCategorys.data"
                    label="" :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption"
                    icon="icon-header-filter" v-model="fixedAssetCategoryCode" placeholder="Loại tài sản"
                    @enter="handleEnterToTab('departmentCode')">
                </MisaCombobox>
            </div>
            <div ref="departmentCode" class="header__bottom__select">
                <MisaCombobox fieldText="departmentName" fieldValue="departmentCode" label=""
                    :isLoading="$store.state.departments.isLoading" :data="$store.state.departments.data"
                    :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption" icon="icon-header-filter"
                    v-model="departmentCode" placeholder="Bộ phận sử dụng"
                    @enter="handleEnterToTab('fixedAssetCategoryCode')">
                </MisaCombobox>
            </div>
            <div class="header__bottom__right">
                <MisaButton @clickButton="isShowPopup = true" text="Thêm tài sản" icon="icon-small-plus--white">
                </MisaButton>
                <TheToolTip tooltip="Xuất khẩu">
                    <MisaButtonIcon @clickButton="handleExportExcel" icon="icon-excel"></MisaButtonIcon>
                </TheToolTip>
                <TheToolTip tooltip="Xóa">
                    <MisaButtonIcon :isDisable="isDiableRemove" @clickButton="emitter.emit('multiDelete')" icon="icon-bin">
                    </MisaButtonIcon>
                </TheToolTip>
            </div>
        </div>
        <ThePopup :isShow="isShowPopup" @close="isShowPopup = false">
            <TheForm :typeForm="$enum.typeForm.add" @clickClose="isShowPopup = false"></TheForm>
        </ThePopup>
    </div>
</template>

<script>
import MisaInputNumber from '../components/MisaInputNumber.vue'
import MisaTextField from '../components/MisaTextField.vue'
import MisaButton from '../components/MisaButton.vue'
import MisaButtonIcon from '../components/MisaButtonIcon.vue'
import ThePopup from './ThePopup.vue'
import TheForm from './TheForm.vue'
import TheToolTip from './TheToolTip.vue'
import MisaCombobox from '@/components/MisaCombobox.vue'
import { getFixedAssetsExcelApi } from '@/js/api'
export default {
    components: {
        MisaInputNumber,
        MisaTextField,
        MisaButton,
        MisaButtonIcon,
        ThePopup,
        TheForm,
        TheToolTip,
        MisaCombobox
    },
    data() {
        return {
            isDiableRemove: true,
            isShowPopup: false,
            departmentCode: null,
            fixedAssetCategoryCode: null,
            textSearch: "",
            settTimeOutDebounce: null
        }
    },
    methods: {

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

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: download file excel khi người dùng ấn vào nút xuất khẩu
         */
        handleExportExcel() {
            getFixedAssetsExcelApi((data) => {
                // khi có dữ liệu thì download file
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'FixedAssets.xlsx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
            })
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
        }
    },
    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Lắng nghe sự kiện thay đổi trạng thái remove button từ component TheTable
     */
    mounted() {
        this.emitter.on('disableBtnRemove', (isDisable) => {
            this.isDiableRemove = isDisable
        })
    },
    unmounted() {

    }
}
</script>

<style scoped>
.header {
    width: 100%;
    flex-shrink: 0;
}

.header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 16px;
    background-color: #fff;
}

.header__top__list {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 26px;
}

.header__top__title {
    font-size: 20px;
    font-weight: bold;
    font-family: mMisa Font;
}

.header__top__item:nth-child(2) {
    height: 30px;
    display: flex;
    align-items: center;
    background-color: rgba(26, 164, 200, .2);
    border-radius: var(--radius-border);
    margin-right: 6px;
}

.header__top__item:last-child {
    display: flex;
    align-items: center;
    column-gap: 8px;
}

.header__bottom {
    background-color: #f4f7ff;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 16px;
    column-gap: 16px;
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
    min-width: 280px;
}
</style>