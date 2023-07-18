<template>
    <div class="app">
        <div class="app__left">
            <TheMenu></TheMenu>
        </div>
        <div class="app__right">
            <RouterView v-if="isLogined"></RouterView>
        </div>
    </div>
</template>

<script>
import TheMenu from '../basics/TheMenu.vue'
import { RouterView } from 'vue-router';
import axios from 'axios';
import { BASE_API_URL } from '@/config';

export default {
    components: {
        TheMenu,
        RouterView,
    },
    data() {
        return {
            isLogined: false
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 21/06/2023
    * description: kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa thì quay về trang đăng nhập
    */
    async beforeCreate() {
        try {
            const token = localStorage.getItem('bearer_token')
            await axios.get(`${BASE_API_URL}auth`, { headers: { Authorization: `Bearer ${token}` } })
            this.isLogined = true
        } catch {
            this.$router.push('/login')
        }
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
    height: calc(100vh - 108px);
    padding: 0 12px;
    background-color: #f4f7ff;
    max-width: 100%;
    padding-bottom: 10px;
}

@media screen and (max-width: 1280px) {
    .body {
        padding: 0 8px;
        height: calc(100vh - 100px);
    }
}
</style>