<template>
    <ul class="paginate">
        <li @click="setPage(currentPage - 1)" :class="{ unactive: currentPage <= 1 }" class="paginate__icon">
            <div class="icon-arrow-left"></div>
        </li>
        <li @click="setPage(num)" :class="{ active: num == currentPage }" v-for="num in paginates" :key="num"
            class="paginate__item">
            {{ num }}
        </li>
        <li @click="setPage(currentPage + 1)" :class="{ unactive: currentPage >= totalPage }" class="paginate__icon">
            <div class="icon-arrow-right"></div>
        </li>
    </ul>
</template>

<script>
export default {
    components: {
    },

    data() {
        return {
            sizeDisplay: 2
        }
    },
    computed: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: tạo ra array để render số trang
        * @return dữ liệu phân trang
        */
        paginates() {
            const result = []
            for (let i = 1; i <= this.totalPage; i++) {
                if (i <= this.sizeDisplay || i > this.totalPage - this.sizeDisplay || i == this.currentPage) {
                    result.push(i)
                }
            }

            if (this.currentPage > this.sizeDisplay + 1) {
                result.splice(this.sizeDisplay, 0, '...')
            }

            if (this.currentPage < this.totalPage - this.sizeDisplay) {
                result.splice(result.length - this.sizeDisplay, 0, '...')
            }

            return result;
        },

        /**
         * @return giá trị page hiện tại
         */
        currentPage() {
            return this.$store.state.currentPage
        },

        /**
         * @return tổng số page
         */
        totalPage() {
            return this.$store.getters.totalPage
        }
    },

    methods: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: set page
        * @param {Number} page giá trị page muốn set 
        */
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
    background-color: #ddd;
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