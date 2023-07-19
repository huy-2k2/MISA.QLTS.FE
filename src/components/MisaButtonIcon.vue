<template>
    <button @click="$emit('clickButton')" :disabled="isDisable" class="button-icon">
        <div class="button">
            <div :class="icon"></div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        // class icon
        icon: String,

        // đánh dấu icon có đang disable không
        isDisable: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.button-icon {
    background-color: #ffffff;
    border-radius: 3px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.162);
    width: 36px;
    height: 36px;
    overflow: hidden;
    display: grid;
    place-content: center;
    border: none;
    cursor: pointer;
}

.button-icon:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.button-icon.disable {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>