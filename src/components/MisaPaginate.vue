<template>
    <ul class="paginate">
        <li class="paginate__icon">
            <div class="icon-arrow-left"></div>
        </li>
        <li @click="setCurrentPage(num)" :class="{ active: num == $store.state.currentPage }" v-for="num in paginates"
            :key="num" class="paginate__item">
            {{ num }}
        </li>
        <li class="paginate__icon">
            <div class="icon-arrow-right"></div>
        </li>

    </ul>
</template>

<script>
export default {
    computed: {
        paginates() {
            const totalPage = this.$store.getters.totalPage;
            let result = []
            for (let i = 0; i < totalPage; i++)
                result.push(i + 1)
            return result
        }
    },
    methods: {
        setCurrentPage(currentPage) {
            this.$store.dispatch('setCurrentPage', currentPage)
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
}
</style>