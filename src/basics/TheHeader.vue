<template>
    <div class="header">
        <div class="header__top">
            <h4 class="header__top__title" :class="{ isSub: !isMain }">{{ resource.titlePage[1] }}</h4>
            <ul class="header__top__list">
                <li class="header__top__item" :class="{ isSub: !isMain }">
                    {{ resource.fixedAssetDetail.financialDepartment }}
                </li>
                <li v-show="isMain" class="header__top__item">
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
    </div>
</template>

<script>
import MisaInputNumber from '../components/MisaInputNumber.vue'
export default {
    components: {
        MisaInputNumber,

    },
    props: {
        isMain: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
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
    padding: 0 12px;
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

.header__top__title.isSub {
    font-size: 16px;
}

.header__top__item.isSub {
    font-size: 14px;
}
</style>