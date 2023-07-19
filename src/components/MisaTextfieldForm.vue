<template>
    <div :class="{ isError: error }" class="textfield_form">
        <label v-if="label" class="label" :for="uuid">
            <span class="field__validate__label">{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <input @blur="$emit('blur')" :disabled="disable" :placeholder="placeholder" v-model="value"
            class="textfield_form__input" type="text" :id="uuid">
        <span v-html="error" class="field__validate__error"></span>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
    data() {
        return {
            // id duy nhất để dùng cho label
            uuid: uuid.v1()
        }
    },
    computed: {
        // lấy value từ v-model
        value: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    props: {
        // model value
        modelValue: {

        },
        // lỗi khi validate
        error: {
            type: String,
            default: ''
        },
        // đánh dấu input là disable
        disable: {
            type: Boolean,
            default: false
        },
        // đánh dấu input là bắt buộc nhập
        required: {
            type: Boolean,
            default: true
        },
        // label của input
        label: String,
        // placeholder của input
        placeholder: String
    }
}
</script>

<style scoped>
.textfield_form {
    width: 100%;
}

.textfield_form.isError .textfield_form__input {
    border-color: rgb(227, 42, 42);
}

.textfield_form:has(input[disable]) {
    background-color: #eeeeeeaa;
}

.textfield_form__input {
    height: 36px;
    padding-left: 12px;
    padding-right: 12px;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-border);
    width: 100%;
}

.textfield_form .textfield_form__input:not(:disabled):hover,
.textfield_form .textfield_form__input:focus {
    border-color: #1aa4c8;
}

.textfield_form__input::placeholder {
    font-style: italic;
    color: #666;
}
</style>