<template>
    <div class="app">
        <div class="app__left">
            <TheMenu></TheMenu>
        </div>
        <div class="app__right">
            <TheHeader></TheHeader>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import TheMenu from '../basics/TheMenu.vue'
import TheHeader from '../basics/TheHeader.vue';

export default {
    components: {
        TheMenu,
        TheHeader
    }
}
</script>

<style>
.app {
    display: flex;
    align-items: stretch;
    justify-content: start;
    height: 100vh;
}

.app__left {
    flex-shrink: 0;
}

.app__right {
    max-width: calc(100% - 72px);
    flex-grow: 1;
}

.app:has(.menu.active) .app__right {
    max-width: calc(100% - 206px);
}

.body {
    height: calc(100vh - 116px);
    padding: 0 16px;
    background-color: #f4f7ff;
    max-width: 100%;
}
</style>