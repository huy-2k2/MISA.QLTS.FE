<template>
    <ul class="paginate">
        <li class="paginate__icon">
            <div class="icon-arrow-left"></div>
        </li>
        <li class="paginate__item active">1</li>
        <li class="paginate__item">2</li>
        <li class="paginate__item">...</li>
        <li class="paginate__item">10</li>
        <li class="paginate__icon">
            <div class="icon-arrow-right"></div>
        </li>
    </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
.paginate {
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 6px;
    list-style: none;
}

.paginate__item {
    font-size: 11px;
    padding: 4px 6px;
}

.paginate__item.active {
    border-radius: var(--radius-border);
    background-color: #f5f5f5;
}

.paginate__icon {
    padding-left: 12px;
    padding-right: 12px;
}
</style>