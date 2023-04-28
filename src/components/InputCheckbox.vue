<template>
    <div class="input_checkbox">
        <input :id="uuid" type="checkbox">
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
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.input_checkbox .input_checkbox__icon {
    display: none;
}

.input_checkbox input:checked+label {
    border-color: transparent;
}

.input_checkbox input:checked+label .input_checkbox__icon {
    display: block;
}
</style>