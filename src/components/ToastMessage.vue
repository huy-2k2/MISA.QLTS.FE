<template>
    <div class="toastmessage" :class="{ active: isShow }">
        <div class="toastmessage__icon">
            <div class="icon-checked-green"></div>
        </div>
        <div class="toastmessage__text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        isShow: Boolean
    }
}
</script>

<style scoped>
.toastmessage {
    position: fixed;
    background-color: #fff;
    right: 20px;
    top: 20px;
    border-radius: var(--radius-border);
    display: none;
    align-items: center;
    justify-content: start;
    column-gap: 20px;
    padding: 12px 0 12px 20px;
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.223);
    min-width: 300px;
}

.toastmessage.active {
    display: flex;
    animation: fadein 3s forwards;
}

.toastmessage__text {
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
}

@keyframes fadein {
    0% {
        transform: translateX(calc(100% + 20px));
    }

    10% {
        transform: translateX(0);
    }

    100% {
        visibility: hidden;
    }
}
</style>