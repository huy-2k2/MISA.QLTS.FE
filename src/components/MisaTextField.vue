<template>
    <label :for="uuid" class="textfield">
        <div class="textfield__icon">
            <div :class="icon"></div>
        </div>
        <div class="textfield__input">
            <input :id="uuid" v-model="value" @keyup="$emit('keyupinput', $event)" type="text" :placeholder="placeholder">
        </div>
    </label>
</template>

<script>
import { uuid } from 'vue-uuid'

export default {
    emits: ["keyupinput", "update:modelValue"],
    data() {
        return {
            // tạo id duy nhất dùng cho label
            uuid: uuid.v1()
        }
    },
    props: {
        // icon của input
        icon: String,
        // placeholder của input
        placeholder: String,
        // model value
        modelValue: {

        }
    },
    computed: {
        // lấy value từ model value
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
}
</script>

<style scoped>
.textfield {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 12px;
    height: 36px;
    column-gap: 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    background-color: #fff;
    width: 100%;
}

.textfield:has(input:focus) {
    border-color: #1aa4c8;
}

.textfield__icon {
    flex-shrink: 0;
}

.textfield__input {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.textfield__input input {
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
}

.textfield__input input::placeholder {
    font-style: italic;
}
</style>