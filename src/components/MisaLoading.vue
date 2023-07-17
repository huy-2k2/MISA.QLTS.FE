<template>
    <div class="loading" :class="{ notPrimary }"></div>
</template>

<script>
export default {
    props: {
        notPrimary: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.loading {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    border: 3px solid rgba(26, 164, 200, 1);
    border-top-color: transparent !important;
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

.loading.notPrimary {
    border-color: #ffffffae;
    height: 25px;
    width: 25px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>