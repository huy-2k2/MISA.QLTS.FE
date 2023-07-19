<template>
    <div v-if="isShow" class="popup">
        <div class="popup__content">
            <div v-if="isHasClose" class="popup__close">
                <TheToolTip :tooltip="resource.tooltip.close">
                    <div @click="$emit('close')" class="icon-close"></div>
                </TheToolTip>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import TheToolTip from './MisaToolTip.vue';

export default {
    props: {
        // điều khiển trạng thái hiển thị của popup
        isShow: Boolean,

        // đánh dấu popup có button close ở góc hay không
        isHasClose: {
            type: Boolean,
            default: true
        }
    },
    components: { TheToolTip }
}
</script>

<style scoped>
.popup {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 100;
}

.popup__content {
    border-radius: var(--radius-border);
    position: relative;
}

.popup__close {
    position: absolute;
    right: 16px;
    top: 20px;
    cursor: pointer;
}
</style>