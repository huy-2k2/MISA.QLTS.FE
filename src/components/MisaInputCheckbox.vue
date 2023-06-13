<template>
    <div class="input_checkbox">
        <input v-model="value" @change="$emit('changInput')" :id="uuid" type="checkbox">
        <label :for="uuid">
            <div class="input_checkbox__icon">
                <div class="icon-checkbox"></div>
            </div>
        </label>
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
    computed: {
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
        modelValue: {

        }
    }

}
</script>

<style scoped>
.input_checkbox {
    display: flex;
    align-items: center;
}

.input_checkbox input {
    width: 0;
    height: 0;
}

.input_checkbox label {
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
}

.input_checkbox label:hover {
    box-shadow: 0 0 0 3px #1aa5c859;
}

.input_checkbox .input_checkbox__icon {
    display: none;
}

.input_checkbox input:checked+label {
    border-color: transparent;
    background-color: transparent;
}

.input_checkbox input:checked+label:hover {
    border-color: #1aa5c859;
}

.input_checkbox input:checked+label .input_checkbox__icon {
    display: block;
}
</style>