<template>
    <div class="header">
        <div class="header__top">
            <h4 class="header__top__title">Danh sách tài sản</h4>
            <ul class="header__top__list">
                <li class="header__top__item">
                    Sở tài chính
                </li>
                <li class="header__top__item">
                    <InputNumber></InputNumber>
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
            <TextField icon="icon-search" placeholder="Tìm kiếm tài sản"></TextField>
            <div class="header__bottom__select">
                <MyCombobox fieldText="email" fieldValue="id" url="https://jsonplaceholder.typicode.com/users" label=""
                    :isBoldPlaceHolder="true" :isInHeader="true" icon="icon-header-filter" v-model="assetTypeCode"
                    placeholder="Loại tài sản">
                </MyCombobox>
            </div>
            <div class="header__bottom__select">
                <MyCombobox fieldText="email" fieldValue="id" url="https://jsonplaceholder.typicode.com/users" label=""
                    :isBoldPlaceHolder="true" :isInHeader="true" icon="icon-header-filter" v-model="departmentCode"
                    placeholder="Bộ phận sử dụng">
                </MyCombobox>
            </div>
            <div class="header__bottom__right">
                <MyButton @click="isShowPopup = true" text="Thêm tài sản" icon="icon-small-plus--white"></MyButton>
                <TheToolTip tooltip="Xuất khẩu">
                    <ButtonIcon icon="icon-excel"></ButtonIcon>
                </TheToolTip>
                <TheToolTip tooltip="Xóa">
                    <ButtonIcon :isDisable="isDiableRemove" @click="emitter.emit('multiDelete')" icon="icon-bin">
                    </ButtonIcon>
                </TheToolTip>
            </div>
        </div>
        <ThePopup :isShow="isShowPopup" @close="isShowPopup = false">
            <TheForm @clickClose="isShowPopup = false"></TheForm>
        </ThePopup>
    </div>
</template>

<script>
import InputNumber from '../components/InputNumber.vue'
import TextField from '../components/TextField.vue'
import MyButton from '../components/MyButton.vue'
import ButtonIcon from '../components/ButtonIcon.vue'
import ThePopup from './ThePopup.vue'
import TheForm from './TheForm.vue'
import TheToolTip from './TheToolTip.vue'
import MyCombobox from '@/components/MyCombobox.vue'
export default {
    components: {
        InputNumber,
        TextField,
        MyButton,
        ButtonIcon,
        ThePopup,
        TheForm,
        TheToolTip,
        MyCombobox
    },
    data() {
        return {
            isDiableRemove: true,
            isShowPopup: false,
            departmentCode: null,
            assetTypeCode: null
        }
    },
    methods: {
        /**
         * author: Nguyen Quoc Huy
         * @param {Object}
         * created at: 30/04/2023
         * description: Hàm set value cho các input của header, gồm có input search, 2 combobox
         */
        setValue({ name, value }) {
            this[name] = value
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