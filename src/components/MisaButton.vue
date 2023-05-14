<template>
    <button @click="$emit('clickButton')" :type="type" class="button" :class="{ ['button--sub']: isSub }">
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
}

.button:focus {
    border: 2px solid #61dbf985 !important;
    outline: none;
}

.button.button--sub {
    color: #000;
    background-color: #fff;
}

.button:hover {
    opacity: 0.6;
}
</style>