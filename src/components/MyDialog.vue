<template>
    <div class="dialog">
        <div class="dialog__head">
            <div class="dialog__icon">
                <div class="icon-warning"></div>
            </div>
            <div class="dialog__title" v-html="text"></div>
        </div>
        <div class="dialog__control">
            <MyButton @clickButton="$emit('click2')" v-if="quantity >= 2" :isSub="true" :text="button2"></MyButton>
            <MyButton @clickButton="$emit('click3')" v-if="quantity >= 3" :isSub="true" :text="button3"></MyButton>
            <MyButton @clickButton="$emit('click1')" :text="button1"></MyButton>
        </div>
    </div>
</template>

<script>
import MyButton from './MyButton.vue'
export default {
    components: { MyButton },
    props: {
        text: {
            type: String,
            default: ''
        },
        quantity: [String, Number],
        button1: {
            type: String,
            default: ''
        },
        button2: {
            type: String,
            default: ''
        },
        button3: {
            type: String,
            default: ''
        },
    },
    methods: {
    }

}
</script>

<style>
.dialog {
    background-color: #fff;
    border-radius: var(--radius-border);
    padding: 40px 20px 20px 30px;
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.155);
    max-width: 600px;
    min-width: 400px;
}

.dialog__head {
    display: flex;
    align-items: center;
    column-gap: 24px;
}

.dialog__title {
    font-family: mMisa Font;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.6;
}

.dialog__control {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    margin-top: 20px;
}

.dialog__control .button--sub {
    border: 1px solid var(--color-border);
}

.dialog__control .button--sub:nth-child(2) {
    border-color: #1aa4c8;
    color: #1aa4c8;
}
</style>