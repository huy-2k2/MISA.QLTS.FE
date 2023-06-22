<template>
    <div class="header">
        <div class="header__top">
            <h4 class="header__top__title">{{ resource.titlePage[1] }}</h4>
            <ul class="header__top__list">
                <li class="header__top__item">
                    {{ resource.fixedAssetDetail.financialDepartment }}
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
                    <div ref="userHead" @click="isShowOptionUser = !isShowOptionUser" class="header__top__item__head">
                        <div class="icon-header-user"></div>
                        <div class="icon-down">
                        </div>
                    </div>
                    <ul ref="userOption" v-show="isShowOptionUser" class="header__top__item__options">
                        <li @click="handleLogout">{{ resource.buttons.logout }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="header__bottom">
            <div class="header__bottom__textfield">
                <MisaTextField v-model="textSearch" icon="icon-search"
                    :placeholder="resource.fixedAssetDetail.searchPlaceholder"></MisaTextField>
            </div>
            <div ref="fixedAssetCategoryCode" class="header__bottom__select">
                <MisaCombobox fieldText="fixedAssetCategoryName" fieldValue="fixedAssetCategoryCode"
                    :isLoading="$store.state.fixedAssetCategorys.isLoading" :data="$store.state.fixedAssetCategorys.data"
                    label="" :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption"
                    icon="icon-header-filter" v-model="fixedAssetCategoryCode"
                    :placeholder="resource.placeholder.combobox.format(resource.fieldName.fixedAssetCategory)"
                    @enter="handleEnterToTab('departmentCode')">
                </MisaCombobox>
            </div>
            <div ref="departmentCode" class="header__bottom__select">
                <MisaCombobox fieldText="departmentName" fieldValue="departmentCode" label=""
                    :isLoading="$store.state.departments.isLoading" :data="$store.state.departments.data"
                    :isBoldPlaceHolder="true" :typeCombobox="$enum.typeCombobox.tableOption" icon="icon-header-filter"
                    v-model="departmentCode"
                    :placeholder="resource.placeholder.combobox.format(resource.fieldName.department)"
                    @enter="handleEnterToTab('fixedAssetCategoryCode')">
                </MisaCombobox>
            </div>
            <div class="header__bottom__right">
                <MisaButton @clickButton="isShowPopup = true" :text="resource.buttons.addFixedAsset"
                    icon="icon-small-plus--white">
                </MisaButton>
                <div class="header__bottom__right__file">
                    <MisaToolTip :tooltip="resource.tooltip.import">
                        <MisaButtonIcon @clickButton="isShowFormImport = true" icon="icon-excel">
                        </MisaButtonIcon>
                    </MisaToolTip>
                </div>
                <MisaToolTip :tooltip="resource.tooltip.delete">
                    <MisaButtonIcon :isDisable="isDiableRemove" @clickButton="emitter.emit('multiDelete')" icon="icon-bin">
                    </MisaButtonIcon>
                </MisaToolTip>
            </div>
        </div>
        <MisaPopup :isShow="isShowPopup" @close="isShowPopup = false">
            <TheForm :typeForm="$enum.typeForm.add" @clickClose="isShowPopup = false"></TheForm>
        </MisaPopup>
        <MisaPopup :isShow="isShowFormImport" @close="isShowFormImport = false">
            <TheFormImport @clickClose="isShowFormImport = false"></TheFormImport>
        </MisaPopup>
    </div>
</template>

<script>
import MisaInputNumber from '../components/MisaInputNumber.vue'
import MisaTextField from '../components/MisaTextField.vue'
import MisaButton from '../components/MisaButton.vue'
import MisaButtonIcon from '../components/MisaButtonIcon.vue'
import MisaPopup from '../components/MisaPopup.vue'
import TheForm from './TheForm.vue'
import MisaToolTip from '../components/MisaToolTip.vue'
import MisaCombobox from '@/components/MisaCombobox.vue'
import TheFormImport from './TheFormImport.vue'
export default {
    components: {
        MisaInputNumber,
        MisaTextField,
        MisaButton,
        MisaButtonIcon,
        MisaPopup,
        TheForm,
        MisaToolTip,
        MisaCombobox,
        TheFormImport
    },
    data() {
        return {
            isDiableRemove: true,
            isShowPopup: false,
            departmentCode: null,
            fixedAssetCategoryCode: null,
            textSearch: "",
            settTimeOutDebounce: null,
            isShowFormImport: false,
            isShowOptionUser: false,
            eventWindowClick: null
        }
    },
    methods: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 21/06/2023
        * description: xử lý sự kiện đăng xuất
        */
        handleLogout() {
            // xóa token trên local storage
            localStorage.setItem('bearer_token', '')
            this.$router.push('/login')
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

    /**
     * author: Nguyen Quoc Huy
     * created at: 20/06/2023
     * description: lắng nghe các sự kiện của window
     */
    beforeMount() {
        this.eventWindowClick = (e) => {
            if (!(this.$refs.userHead?.contains(e.target) || this.$refs.userOption?.contains(e.target))) {
                this.isShowOptionUser = false
            }
        }
        window.addEventListener('click', this.eventWindowClick)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 20/06/2023
     * description: hủy bỏ lắng nghe sự kiện
     */
    beforeUnmount() {
        window.removeEventListener('click', this.eventWindowClick)
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

.header__top__item {
    cursor: pointer;
    position: relative;
}

.header__top__item__head {
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 4px;
}

.header__top__item__options {
    position: absolute;
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
    list-style: none;
    top: calc(100% + 8px);
    right: 0;
    border-radius: var(--radius-border);
    overflow: hidden;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.351);
    background-color: #fff;
    z-index: 100;
}

.header__top__item__options li {
    white-space: nowrap;
    padding: 8px 16px;
}

.header__top__item__options li:hover {
    background-color: rgba(67, 195, 227, 0.668);
}

.header__top__item:nth-child(2) {
    height: 30px;
    display: flex;
    align-items: center;
    background-color: rgba(26, 164, 200, .2);
    border-radius: var(--radius-border);
    margin-right: 6px;
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

    .header__bottom__textfield input {
        width: 100px;
    }
}
</style>