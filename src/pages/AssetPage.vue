<template>
    <TheHeader></TheHeader>
    <div class="body">
        <TheTable></TheTable>
    </div>
</template>

<script>
import TheTable from '../basics/TheTable.vue'
import TheHeader from '@/basics/TheHeader.vue';
import { DEFAULT_PAGE_SIZE } from '@/config';

export default {
    components: {
        TheHeader,
        TheTable
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

<style></style>