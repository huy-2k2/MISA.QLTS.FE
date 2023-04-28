<template>
    <div ref="combobox" class="combobox">
        <label :for="uuid" class="label">
            <span>{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <div @click="isShow = true" class="combobox__head">
            <input @input="handleFilterOptions" v-model="item.text" class="combobox__input" type="text"
                :placeholder="placeholder">
            <div class="combobox__icon">
                <div class="icon-down"></div>
            </div>
            <div v-if="isShow" class="combobox__options custom-scrollbar">
                <div @click="handleSetItem(item)" v-for="item in filterOptions" :key="item.value" class="combobox__item">{{
                    item.text }}</div>
            </div>
        </div>
        <span class="field__validate__error">{{ error }}</span>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
    data() {
        return {
            item: { text: null, value: null },
            uuid: uuid.v1(),
            isShow: false,
            eventWindowClick: null,
            options: [
                {
                    "value": 1,
                    "text": "Leanne Graham",
                },
                {
                    "value": 2,
                    "text": "Ervin Howell",
                },
                {
                    "value": 3,
                    "text": "Clementine Bauch",
                },
                {
                    "value": 4,
                    "text": "Patricia Lebsack",
                },
                {
                    "value": 5,
                    "text": "Chelsey Dietrich",
                },
                {
                    "value": 6,
                    "text": "Mrs. Dennis Schulist",
                },
                {
                    "value": 7,
                    "text": "Kurtis Weissnat",
                },
                {
                    "value": 8,
                    "text": "Nicholas Runolfsdottir V",
                },
                {
                    "value": 9,
                    "text": "Glenna Reichert",
                },
                {
                    "value": 10,
                    "text": "Clementina DuBuque",
                }
            ],
            filterOptions: null
        }
    },
    methods: {
        handleFilterOptions() {
            this.filterOptions = this.options.filter(item => item.text.toLowerCase().includes(this.item.text.toLowerCase()))
        },
        handleSetItem(item) {
            this.$emit('select', { name: this.name, value: item.value })
            this.item = { ...item }
            this.isShow = false
        }
    },
    beforeMount() {
        this.filterOptions = this.options
    },
    mounted() {
        this.eventWindowClick = (e) => {
            if (!this.$refs.combobox.contains(e.target)) {
                if (this.item.text && this.item.value) {
                    this.item = { ...this.options.filter(item => item.value == this.item.value)[0] }
                } else {
                    this.item = { value: null, text: null }
                    this.$emit('select', { name: this.name, value: '' })
                }
                if (this.isShow) {
                    this.$emit('blurcombobox')
                }
                this.isShow = false
                this.filterOptions = this.options

            }
        }
        window.addEventListener('click', this.eventWindowClick)
    },
    beforeUnmount() {
        window.removeEventListener('click', this.eventWindowClick)
    },
    props: {
        required: {
            type: Boolean,
            default: true
        },
        label: String,
        placeholder: String,
        value: {
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        }
    },
}
</script>

<style>
.combobox__item {
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
    padding: 8px 16px;
    cursor: pointer;
}

.combobox__item:hover {
    background-color: rgba(26, 164, 200, .2);
}

.combobox__options {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.178);
    border-radius: var(--radius-border);
    max-height: 250px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 100;
}

.combobox__icon {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
}

.combobox {
    width: 100%;
    position: relative;
}

.combobox__head {
    height: 36px;
    width: 100%;
    position: relative;
    border-radius: var(--radius-border);
    border: 1px solid var(--color-border);
}

.combobox__input {
    width: 100%;
    border: none;
    outline: none;
    height: 100%;
    padding-left: 12px;
    border-radius: var(--radius-border);
}

.combobox__input::placeholder {
    font-style: italic;
    color: #666;
}
</style>