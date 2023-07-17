<template>
    <button :disabled="disabled || isLoading" @click="$emit('clickButton')" :type="type" class="button"
        :class="{ ['button--sub']: isSub, ['button--outline']: isOutline, hasShadow: shadow }">
        <div class="button__icon">
            <div :class="icon"></div>
        </div>
        <div v-if="isLoading">
            <MisaLoading :notPrimary="true"></MisaLoading>
        </div>
        <p v-else class="button__text">{{ text }}</p>
    </button>
</template>

<script>
import MisaLoading from './MisaLoading.vue';
export default {
    components: { MisaLoading },
    emits: ["clickButton"],
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
        isOutline: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        shadow: {
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
    border: 1px solid transparent;
}

.button:disabled {
    opacity: 0.4 !important;
    cursor: not-allowed;
}

.button:hover {
    background-color: #107f9b;
}

.button:focus {
    box-shadow: 0 0 0 2px #86d4e899 !important;
    outline: none;
}

.button.button--outline {
    background-color: #fff;
    color: #000;
    border-color: var(--color-border);
}

.button.button--outline:hover,
.button.button--outline:focus {
    background-color: #1aa4c8;
    color: #fff;
    border-color: transparent;

}

.button.button--sub {
    background-color: #fff;
    color: #1aa4c8;
    border-color: #1aa4c8;
}

.button.button.button--sub:hover {
    background-color: #107f9b36;
}

.button.hasShadow {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.15);
}
</style>