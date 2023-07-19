<template>
    <div class="radio">
        <label :for="uuid" class="label">{{ label }}</label>
        <input class="radio__input" :value="radioValue" v-model="value" :id="uuid" type="radio">
        <div class="radio__checked" v-if="radioValue == modelValue">
            <div class="icon-radio"></div>
        </div>
        <label :for="uuid" v-else class="radio__unchecked"></label>
    </div>
</template>

<script >
import { uuid } from 'vue-uuid';
export default {
    props: {
        // model value
        modelValue: {

        },

        // label của input
        label: {
            type: String,
            default: ""
        },

        // giá trị của input
        radioValue: {

        }
    },
    data() {
        return {
            // tạo id duy nhất để dùng cho label
            uuid: uuid.v1(),
        }
    },
    computed: {
        // lấy value từ model value
        value: {
            set(value) {
                this.$emit('update:modelValue', value)
            },
            get() {
                return this.modelValue
            }
        }
    }
}
</script>

<style scoped>
.radio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.label {
    font-size: 12px;
}

.radio__input {
    display: none;
}

.radio__checked {
    border-radius: 50%;
}

.radio__unchecked {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #1aa4c8;
    cursor: pointer;
}

.radio__unchecked:hover,
.radio__checked:hover {
    box-shadow: 0 0 0 5px #1aa5c829;
}
</style>