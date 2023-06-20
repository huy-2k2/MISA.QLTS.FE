<template>
    <div class="app">
        <div class="app__left">
            <TheMenu></TheMenu>
        </div>
        <div class="app__right">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script>
import TheMenu from '../basics/TheMenu.vue'
import { RouterView } from 'vue-router';

export default {
    components: {
        TheMenu,
        RouterView
    },
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
    height: calc(100vh - 126px);
    padding: 0 16px;
    background-color: #f4f7ff;
    max-width: 100%;
}

@media screen and (max-width: 1280px) {
    .body {
        padding: 0 8px;
        height: calc(100vh - 110px);
    }
}
</style>