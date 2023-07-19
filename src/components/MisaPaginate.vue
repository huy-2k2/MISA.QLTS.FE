<template>
    <ul class="paginate">

        <MisaToolTip :tooltip="resource.tooltip.prevPage">
            <li @click="setPage(currentPage - 1)" :class="{ unactive: currentPage <= 1 }" class="paginate__icon">
                <div class="icon-arrow-left"></div>
            </li>
        </MisaToolTip>
        <li @click="setPage(num)" :class="{ active: num == currentPage }" v-for="num in paginates" :key="num"
            class="paginate__item">
            {{ num }}
        </li>
        <MisaToolTip :tooltip="resource.tooltip.nextPage">
            <li @click="setPage(currentPage + 1)" :class="{ unactive: currentPage >= totalPage }" class="paginate__icon">
                <div class="icon-arrow-right"></div>
            </li>
        </MisaToolTip>
    </ul>
</template>

<script>
import MisaToolTip from './MisaToolTip.vue'
export default {
    components: {
        MisaToolTip
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

            if (this.totalPage > 2 * this.sizeDisplay) {
                if (this.currentPage > this.sizeDisplay + 1) {
                    result.splice(this.sizeDisplay, 0, '...')
                }

                if (this.currentPage < this.totalPage - this.sizeDisplay) {
                    result.splice(result.length - this.sizeDisplay, 0, '...')
                }
            }


            return result;
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: tính tổng số trang
       * @return tổng số trang
       */
        totalPage() {
            return Math.ceil(this.totalData / this.pageSize)
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
            if (Number.isInteger(page) && page >= 1 && page <= this.totalPage) {
                this.$emit('setPage', page)

            }
        }
    },
    props: {
        // tổng số bản ghi
        totalData: {
            type: Number
        },
        // trang hiện tại
        currentPage: {
            type: Number
        },
        // kích thước trang
        pageSize: {
            type: Number
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