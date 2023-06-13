<template>
    <button :disabled="disabled" @click="$emit('clickButton')" :type="type" class="button"
        :class="{ ['button--sub']: isSub }">
        <div class="button__icon">
            <div :class="icon"></div>
        </div>
        <p class="button__text">{{ text }}</p>
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        text: String,
        icon: String,
        type: {
            type: String,
            default: ''
        },
        isSub: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

}
</script>

<style scoped>
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;
    color: #fff;
    font-size: 13px;
    height: 36px;
    padding: 0 12px;
    cursor: pointer;
    min-width: 110px;
    background-color: #1aa4c8;
    border-radius: 3px;
    border: none;
    user-select: none;
}

.button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.button:focus {
    outline: none;
    box-shadow: 0 0 1px 2px #33c3eb57;
}

.button.button--sub {
    color: #000;
    background-color: #fff;
    border: 1px solid #aaa;
}

.button:hover {
    background-color: #097998;
}

.button.button--sub:hover {
    background-color: #1aa4c8;
    border-color: transparent;
    color: #fff;
}
</style>