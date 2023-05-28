<template>
    <div v-if="isShow" class="popup">
        <div class="popup__content">
            <div v-if="isHasClose" class="popup__close">
                <div @click="$emit('close')" class="icon-close"></div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: Boolean,
        isHasClose: {
            type: Boolean,
            default: true
        }
    },
}
</script>

<style scoped>
.popup {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.274);
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