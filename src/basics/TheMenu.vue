<template>
    <div class="menu" :class="{ active: isActive }">
        <div class="menu__head">
            <div class="menu__head__icon">
                <div class="menu-main-icon"></div>
            </div>
            <h3 class="menu__head__title menu__hidden">Misa qlts</h3>
        </div>
        <ul class="menu__body">
            <RouterLink to="/" class="menu__item">
                <div class="menu__item__icon">
                    <div class="menu-item-icon-1"></div>
                </div>
                <div class="menu__item__text menu__hidden">Tổng quan</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
            <RouterLink to="/asset" class="menu__item active">
                <div class="menu__item__icon">
                    <div class="icon--unactive menu-item-icon-2"></div>
                    <div class="icon--active menu-item-icon-2--active"></div>
                </div>
                <div class="menu__item__text menu__hidden">Tài sản</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
            <TheToolTip tooltip="Tài sản hệ thống đường bộ">
                <RouterLink to="/asset-htdb" class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-3"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">Tài sản HT-ĐB</div>
                    <div class="menu__item__expand menu__hidden"></div>
                </RouterLink>
            </TheToolTip>
            <RouterLink to="/tool" class="menu__item">
                <div class="menu__item__icon">
                    <div class="menu-item-icon-4"></div>
                </div>
                <div class="menu__item__text menu__hidden">Công cụ dụng cụ</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
            <RouterLink to="/category" class="menu__item">
                <div class="menu__item__icon">
                    <div class="menu-item-icon-5"></div>
                </div>
                <div class="menu__item__text menu__hidden">Danh mục</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
            <RouterLink to="/search" class="menu__item">
                <div class="menu__item__icon">
                    <div class="menu-item-icon-6"></div>
                </div>
                <div class="menu__item__text menu__hidden">Tra cứu</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
            <RouterLink to="/report" class="menu__item">
                <div class="menu__item__icon">
                    <div class="menu-item-icon-7"></div>
                </div>
                <div class="menu__item__text menu__hidden">Báo cáo</div>
                <div class="menu__item__expand menu__hidden"></div>
            </RouterLink>
        </ul>
        <div class="menu__footer">
            <button @click="isActive = true" class="menu__footer__button menu__footer__button--right">
                <div class="icon-arrow-right--white"></div>
            </button>
            <button @click="isActive = false" class="menu__footer__button menu__footer__button--left">
                <div class="icon-arrow-left--white"></div>
            </button>
        </div>
    </div>
</template>

<script scoped>
import { RouterLink } from 'vue-router';
import TheToolTip from './TheToolTip.vue';
export default {
    data() {
        return {
            isActive: true
        }
    },
    components: { RouterLink, TheToolTip }
}
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: #1c3247;
    height: 100%;
}

.menu__head {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
    column-gap: 12px;
}

.menu__head__title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
}

.menu__body {
    padding: 8px 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}

.menu__item {
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    justify-content: center;
    text-decoration: none;
}


.menu__item:hover {
    background-color: #164753c2;
}

.menu__item.router-link-exact-active {
    background-color: #1aa4c8;
}

.menu__item__text {
    color: #fff;
    font-weight: 400;
    font-family: mMisa Font;
    font-size: 14px;
    flex-grow: 1;
}

.icon--active {
    display: none;
}

.menu__item.active .icon--active {
    display: block;
}

.menu__item.active .icon--unactive {
    display: none;
}

.menu__footer {
    padding: 8px 16px;
    border-top: 1px solid var(--color-border);
}

.menu__footer__button {
    background-color: transparent;
    cursor: pointer;
    outline: none;
    padding: 6px 8px;
    border: var(--radius-border);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    float: right;
}

.menu__hidden {
    display: none;
}

.menu.active .menu__hidden {
    display: block;
}

.menu.active .menu__footer__button.menu__footer__button--left {
    display: block;
}

.menu .menu__footer__button.menu__footer__button--left {
    display: none;
}

.menu.active .menu__footer__button.menu__footer__button--right {
    display: none;
}
</style>