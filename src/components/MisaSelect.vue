<template>
    <select class="select_pure" name="" id="">
        <option v-for="item in items" :key="item" value="">{{ item }}</option>
    </select>
</template>

<script>
export default {
    props: {
        items: {

        }
    }
}
</script >

<style scoped>
.select_pure {
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: 3px;
    font-size: 11px;
    padding: 4px 8px;
    padding-right: 16px;
}
</style>