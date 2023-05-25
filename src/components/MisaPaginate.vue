<template>
    <ul class="paginate">
        <li @click="setPage(currentPage - 1)" :class="{ unactive: currentPage <= 1 }" class="paginate__icon">
            <div class="icon-arrow-left"></div>
        </li>
        <li @click="setPage(num)"
            :class="{ active: num == currentPage || (!Number.isInteger(num) && (currentPage > 2 && currentPage < totalPage - 1)) }"
            v-for="num in paginates" :key="num" class="paginate__item">
            {{ num }}
        </li>
        <li @click="setPage(currentPage + 1)" :class="{ unactive: currentPage >= totalPage }" class="paginate__icon">
            <div class="icon-arrow-right"></div>
        </li>
    </ul>
</template>

<script>
export default {

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: tạo ra array để render số trang
    */
    computed: {
        paginates() {
            let result = []
            for (let i = 1; i <= this.totalPage; i++) {
                // chỉ hiện 2 page đầu và 2 page cuối
                if (i <= 2 || i >= this.totalPage - 1)
                    result.push(i)
                // các page ở giữa thì thay bằng ...
                else {
                    if (i == 3) {
                        result.push('. . .')
                    }
                }
            }
            return result
        },
        currentPage() {
            return this.$store.state.currentPage
        },
        totalPage() {
            return this.$store.getters.totalPage
        }
    },

    /**
   * author: Nguyen Quoc Huy
   * created at: 30/04/2023
   * description: set page
   */
    methods: {
        setPage(page) {
            if (Number.isInteger(page) && page >= 1 && page <= this.$store.getters.totalPage) {
                this.$store.commit('setCurrentPage', page)
                this.$store.dispatch("getFilterFixedAsset")
            }
        }
    }
}
</script>

<style scoped>
.paginate {
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 6px;
    list-style: none;
}

.paginate__item {
    font-size: 11px;
    padding: 4px 6px;
    cursor: pointer;
}

.paginate__item.active {
    border-radius: var(--radius-border);
    background-color: #eee;
}

.paginate__icon {
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
}

.paginate__icon.unactive {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>