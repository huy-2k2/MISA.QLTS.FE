<template>
    <div class="custom_select">
        <div ref="selectHead" @click="isShow = !isShow" class="custom_select__head">
            <div class="custom_select__icon">
                <div :class="icon"></div>
            </div>
            <div class="cutom_select__value">{{ text }}</div>
            <div class="custom_select__icon">
                <div class="icon-down"></div>
            </div>
        </div>
        <div ref="selectOptions" v-if="isShow" class="custom_select__options">
            <div @click="handleChoseItem(item)" v-for="item in options" :key="item" class="custom_select__item">
                <div class="custom_select__checked" v-if="text == item">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="32" d="M416 128L192 384l-96-96" />
                    </svg>
                </div>
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String
    },
    data() {
        return {
            text: this.label,
            options: ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"],
            isShow: false,
            windowClickEvent: null
        }
    },
    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Thêm sự kiện người dùng click vào màn hình để ẩn options của select
     */
    mounted() {
        this.windowClickEvent = (event) => {
            if (!this.$refs.selectHead.contains(event.target) && !this.$refs.selectOptions?.contains(event.target)) {
                this.isShow = false
            }
        }
        window.addEventListener('click', this.windowClickEvent)
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: Xóa sự kiện click vào màn hình khi component unmount
    */
    beforeUnmount() {
        window.removeEventListener('click', this.windowClickEvent)
    },

    methods: {
        /**
         * @param {Object} item 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng chọn item, set giá trị cho biến item và ẩn options
         */
        handleChoseItem(item) {
            this.text = item
            this.isShow = false
        }
    }
}
</script>

<style scoped>
.custom_select__checked {
    width: 20px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8px;
}

.custom_select__options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1;
    overflow-y: auto;
    max-height: 300px;
    background-color: #fff;
    border-radius: var(--radius-border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    padding: 4px;
}

.custom_select__item {
    font-family: mMisa Font;
    font-size: 13px;
    padding: 8px 36px;
    padding-right: 0;
    border-radius: var(--radius-border);
    cursor: pointer;
    position: relative;
}

.custom_select__item:hover {
    background-color: rgba(26, 164, 200, .2);
}

.custom_select {
    width: 100%;
    position: relative;
}

.custom_select__head {
    height: 36px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background-color: #fff;
}

.cutom_select__value {
    font-size: 13px;
    font-family: mMisa Font;
    flex-grow: 1;
    padding-left: 12px;
}
</style>