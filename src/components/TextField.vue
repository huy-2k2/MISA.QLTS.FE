<template>
    <label :for="uuid" class="textfield">
        <div class="textfield__icon">
            <div :class="icon"></div>
        </div>
        <input :id="uuid" class="textfield__input" type="text" :placeholder="placeholder">
    </label>
</template>

<script>
import { uuid } from 'vue-uuid'

export default {
    data() {
        return {
            uuid: uuid.v1()
        }
    },
    props: {
        icon: String,
        placeholder: String
    },
}
</script>

<style scoped>
.textfield {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: start;
    column-gap: 8px;
    border: 1px solid var(--color-border);
    padding: 0 12px;
    border-radius: var(--radius-border);
    background-color: #fff;
}

.textfield:has(input:focus) {
    border-color: #1aa4c8;
}

.textfield__icon {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
}

.textfield__input {
    border: none;
    background-color: transparent;
    outline: none;
    flex-grow: 1;
    width: 120px;
}

.textfield__input {
    font-size: 14px;
}

.textfield__input::placeholder {
    font-style: italic;
    font-size: 13px;
}
</style>