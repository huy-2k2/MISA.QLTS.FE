<template>
    <div class="field-disable" :class="{ isRight }">
        <div class="field-disable__text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    props: {
        // text hiển thị
        text: {},
        // đánh dấu chiều hiển thị (trái hoạc phải)
        isRight: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.field-disable {
    padding: 0 12px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    background-color: #efefef4d;
    font-size: 13px;
    font-family: mMisa Font;
    border-radius: var(--radius-border);
    border: 1px solid var(--color-border);
}

.field-disable__text {
    display: block;
}

.field-disable__text::first-letter {
    text-transform: capitalize;
}

.field-disable.isRight {
    justify-content: flex-end;
}
</style>