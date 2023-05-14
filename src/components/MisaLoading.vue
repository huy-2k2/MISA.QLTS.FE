<template>
    <div class="loading"></div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    border: 3px solid rgba(26, 164, 200, 1);
    border-top-color: transparent;
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
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