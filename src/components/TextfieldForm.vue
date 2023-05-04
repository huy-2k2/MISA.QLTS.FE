<template>
    <div class="textfield_form">
        <label class="label" :for="uuid">
            <span class="field__validate__label">{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <input @blur="$emit('blur')" @input="$emit('input', { name: name, value: $event.target.value })" :disabled="disable"
            :placeholder="placeholder" :value="value" class="textfield_form__input" type="text" :id="uuid">
        <span class="field__validate__error">{{ error }}</span>
    </div>
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
        value: {
            type: [String, Number],
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        error: {
            type: String,
            default: ''
        },
        disable: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: true
        },
        label: String,
        placeholder: String
    }
}
</script>

<style scoped>
.textfield_form {
    width: 100%;
}

.textfield_form[data-error] .textfield_form__input {
    border-color: rgba(255, 0, 0, 0.673);
}

.textfield_form:has(input[disable]) {
    background-color: #eeeeeeaa;
}

.textfield_form__input {
    height: 36px;
    padding-left: 12px;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    width: 100%;
}

.textfield_form__input:not(:disabled):hover,
.textfield_form__input:focus {
    border-color: #1aa4c8;
}

.textfield_form__input::placeholder {
    font-style: italic;
    color: #666;
}
</style>