<template>
    <div class="tooltip">
        <div @mouseover="isShow = true" @mouseleave="isShow = false" class="tooltip__element">
            <slot></slot>
        </div>
        <div ref="tooltipContent" v-show="isShow" :class="{ right: isRight }" class="tooltip__content">{{ tooltip }}</div>
    </div>
</template>

<script>
export default {
    props: {
        tooltip: {
            type: String,
            default: '',

        }
    },
    data() {
        return {
            isShow: true,
            isRight: false
        }
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: khi component được mounted, kiểm tra xem tooltip có hiện thị quá kích thước màn hay không
     */
    mounted() {
        const coor = this.$refs.tooltipContent.getBoundingClientRect();
        // nếu tooltip hiện thị quá kích thước màn, thì cho tooltip hiển thị bắt đầu từ bên phải (right: 0)
        if (coor.x + coor.width >= window.innerWidth) {
            this.isRight = true
        }
        this.isShow = false

    }

}
</script>

<style scoped>
.tooltip {
    position: relative;
}

.tooltip__content {
    position: absolute;
    width: max-content;
    font-size: 13px;
    font-family: mMisa font;
    color: #000;
    font-weight: 400;
    background-color: #fff;
    top: calc(100% + 2px);
    left: 0;
    padding: 2px 4px;
    border: 1px solid rgba(40, 82, 92, 0.711);
    z-index: 1000;
}

.tooltip__content.right {
    right: 0;
    left: unset;
}
</style>