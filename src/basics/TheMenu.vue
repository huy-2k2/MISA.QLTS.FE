<template>
    <div class="menu" :class="{ active: isActive }">
        <div class="menu__head">
            <div class="menu__head__icon">
                <div class="menu-main-icon"></div>
            </div>
            <h3 class="menu__head__title menu__hidden">{{ resource.menu[0] }}</h3>
        </div>
        <ul class="menu__body">
            <RouterLink to="/" class="menu__parent">
                <div class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-1"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">{{ resource.menu[1] }}</div>
                </div>
            </RouterLink>
            <div class="menu__parent">
                <RouterLink to="/asset" class="menu__parent__link" exact-active-class="abc">
                    <div class="menu__item">
                        <div class="menu__item__icon">
                            <div class="icon--unactive menu-item-icon-2"></div>
                            <div class="icon--active menu-item-icon-2--active"></div>
                        </div>
                        <div class="menu__item__text menu__hidden">
                            <span>
                                {{ resource.menu[2].parent }}
                            </span>
                            <div class="menu__item__text__icon">
                                <span class="icon-down-thin">
                                </span>
                            </div>
                        </div>
                    </div>
                </RouterLink>
                <div class="menu__child">
                    <RouterLink class="menu__child__item menu__hidden" to="/write-asset">{{ resource.menu[2].children[0] }}
                    </RouterLink>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[1] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[2] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[3] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[4] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[5] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[6] }}</li>
                    <li class="menu__child__item menu__hidden">{{ resource.menu[2].children[7] }}</li>
                </div>
            </div>
            <MisaToolTip :tooltip="resource.menu[3].tooltip">
                <RouterLink to="/asset-htdb" class="menu__parent">
                    <div class="menu__item">
                        <div class="menu__item__icon">
                            <div class="menu-item-icon-3"></div>
                        </div>
                        <div class="menu__item__text menu__hidden">
                            <span>
                                {{ resource.menu[3].text }}
                            </span>
                            <div class="menu__item__text__icon">
                                <span class="icon-down-thin">
                                </span>
                            </div>
                        </div>
                    </div>
                </RouterLink>
            </MisaToolTip>
            <RouterLink to="/tool" class="menu__parent">
                <div class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-4"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">
                        <span>
                            {{ resource.menu[4] }}
                        </span>
                        <div class="menu__item__text__icon">
                            <span class="icon-down-thin">
                            </span>
                        </div>
                    </div>
                </div>
            </RouterLink>
            <RouterLink to="/category" class="menu__parent">
                <div class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-5"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">{{ resource.menu[5] }}</div>
                </div>
            </RouterLink>
            <RouterLink to="/search" class="menu__parent">
                <div class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-6"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">
                        <span>
                            {{ resource.menu[6] }}
                        </span>
                        <div class="menu__item__text__icon">
                            <span class="icon-down-thin">
                            </span>
                        </div>
                    </div>
                </div>
            </RouterLink>
            <RouterLink to="/report" class="menu__parent">
                <div class="menu__item">
                    <div class="menu__item__icon">
                        <div class="menu-item-icon-7"></div>
                    </div>
                    <div class="menu__item__text menu__hidden">
                        <span>
                            {{ resource.menu[7] }}
                        </span>
                        <div class="menu__item__text__icon">
                            <span class="icon-down-thin">
                            </span>
                        </div>
                    </div>
                </div>
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
import MisaToolTip from '../components/MisaToolTip.vue';
export default {
    data() {
        return {
            isActive: true
        }
    },
    components: { RouterLink, MisaToolTip }
}
</script>

<style scoped>
.menu__child {
    list-style: none;
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
    background-color: rgba(128, 128, 128, 0.2);
    display: none;
}

.menu__child * {
    color: rgba(225, 220, 220, 0.81);
}

.menu__child .menu__child__item {
    padding: 8px;
    padding-left: 42px;
    border-radius: 6px;
}

.menu__child .menu__child__item:hover {
    background-color: rgba(128, 128, 128, 0.1);

}

.menu__child .menu__child__item.router-link-active {
    background-color: rgba(128, 128, 128, 0.3);
}

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
    padding: 8px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}

.menu__parent {
    cursor: pointer;
    display: block;
}

.menu__parent.router-link-active .menu__child,
.menu__parent:has(.router-link-active) .menu__child {
    display: block;
}

.menu__item {
    display: flex;
    align-items: center;
    column-gap: 12px;
    padding: 8px;
    justify-content: center;
    border-radius: 6px;
}


.menu__item:hover {
    background-color: #164753c2;
}

.menu__parent.router-link-exact-active .menu__item,
.menu__parent:has(.router-link-active) .menu__item {
    background-color: #1aa4c8;
}

.menu__item__text {
    color: #fff;
    font-weight: 400;
    font-family: mMisa Font;
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 140px;
    padding-right: 8px;
}

.menu__item__text__icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu__parent:not(:has(.router-link-active)) .icon--active {
    display: none;
}

.menu__parent:has(.router-link-active) .icon--unactive {
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
    display: flex;
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