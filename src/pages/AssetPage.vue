<template>
    <MainLayout>
        <TheHeader></TheHeader>
        <div class="body">
            <TheTable></TheTable>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'
import TheTable from '../basics/TheTable.vue'
import TheHeader from '@/basics/TheHeader.vue';

export default {
    components: {
        MainLayout,
        TheHeader,
        TheTable
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: lấy dữ liệu về phòng ban, loại tài sản, tài sản
     */
    mounted() {
        this.$store.dispatch('getDepartments')
        this.$store.dispatch('getFixedAssetCategorys')
        this.$store.dispatch("getFilterFixedAsset")
        // this.$store.dispatch('resetState')
        // this.$store.dispatch('getAssets')
    }
}
</script>

<style></style>