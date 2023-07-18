<template>
    <div class="combobox" :class="{ isError: error }">
        <label v-if="label" :for="uuid" class="label">
            <span class="field__validate__label">{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <label :for="uuid" ref="comboboxHead" class="combobox__head">
            <div v-if="icon" class="combobox__head__icon">
                <div class="icon-header-filter"></div>
            </div>
            <input ref="input" :id="uuid" @focus="this.isShow = true" @keydown="handleControll" @input="handleFilterOptions"
                v-model="item[isDisplayValue ? 'value' : 'text']" :class="{ isBoldPlaceHolder }" class="combobox__input"
                type="text" :placeholder="placeholder">
            <div class="combobox__icon">
                <div class="icon-down"></div>
            </div>
        </label>
        <div class="combobox__options__wrapper">
            <div ref="comboboxOptions" v-show="isShow" :class="{ isLoading }" class="combobox__options custom-scrollbar">
                <MyLoading v-show="isLoading"></MyLoading>
                <div v-show="typeCombobox == $enum.typeCombobox.listOption" @click="handleSetItem(option)"
                    v-for="(option) in  filterOptions " :key="option.value" class="combobox__item"
                    :class="{ active: option.value == value }">
                    <span class="combobox__item__text">{{ option.text }}</span>
                    <span class="combobox__item__icon" v-show="option.value == value">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="32" d="M416 128L192 384l-96-96" />
                        </svg>
                    </span>
                </div>
                <div v-show="typeCombobox == $enum.typeCombobox.tableOption && !isLoading" class="combobox__table">
                    <table>
                        <tr ref="comboboxThead">
                            <th>{{ resource.combobox[0][0] }}</th>
                            <th>{{ resource.combobox[0][1] }}</th>
                        </tr>
                        <tr class="combobox__tr" :class="{ active: option.value == value }" @click="handleSetItem(option)"
                            v-for="( option ) in  filterOptions " :key="option.value">
                            <td>{{ option.value }}</td>
                            <td>{{ option.text }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <span v-html="error" class="field__validate__error"></span>
</template>

<script>
import { uuid } from 'vue-uuid'
import MyLoading from './MisaLoading.vue'
export default {
    components: { MyLoading },
    emits: ['enter', 'blurcombobox', 'update:modelValue'],
    data() {
        return {
            // lưu value của thẻ input, và value của item người dùng chọn
            item: { value: null },
            // tạo id duy nhất cho thẻ input là label
            uuid: uuid.v1(),
            // ẩn hiện options của combobox
            isShow: false,
            eventWindowClick: null,
            // options lấy từ api
            options: [],
            // options khi đã được lọc qua tìm kiếm
            filterOptions: [],
            // ẩn hiện loading khi lấy dữ liệu từ api
        }
    },
    methods: {
        /**
        * @param {Event} event 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm xử lý sự kiện người dùng nhấn lên và xuống khi đang focus vào thẻ input, tự chọn option tương ứng, hoạc ấn tab hoạc ender để đóng combobox
        */
        handleControll(event) {
            let index = this.filterOptions.findIndex(option => option.value == this.item.value)
            if (event.code == 'ArrowDown' || event.code == 'ArrowUp') {
                event.preventDefault()
                if (event.code == "ArrowDown") {
                    // xử lý khi index đạt max
                    index = (index + 1) % this.filterOptions.length
                    this.handleSetItem({ ...this.filterOptions[index] }, true)

                } else if (event.code == 'ArrowUp') {
                    // xử lý khi index đạt min
                    index = index <= 0 ? this.filterOptions.length - 1 : index - 1
                    this.handleSetItem({ ...this.filterOptions[index] }, true)
                }

                // Xử lý scroll khi người dùng nhấn lên hoạc xuống

                // height của phần combobox body (không tính phần thead)
                const heightBody = this.$refs.comboboxOptions.clientHeight - this.$refs.comboboxThead.clientHeight
                // height của thead
                const heightOfTr = this.$refs.comboboxOptions.querySelector('.combobox__tr').clientHeight
                // số dòng hiển thị của combobox
                const numberOfTr = Math.floor(heightBody / heightOfTr)

                this.$refs.comboboxOptions.scroll({
                    top: index < (numberOfTr - 1) ? 0 : (index - (numberOfTr - 1)) * 30,
                    left: 0,
                    behavior: 'smooth'
                })
            }
            // sự kiện người dùng ấn tab để chuyển sang input tiếp theo
            if (event.code == 'Tab') {
                this.handleBlur()
            }
            if (event.code == "Enter") {
                this.$emit('enter')
                this.handleBlur()
                this.$refs.input.blur()
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý lọc dữ liệu khi người dùng gõ tìm kiếm ở thẻ input, dữ liệu lọc lưu vào biến filterOptions
        */
        handleFilterOptions() {
            this.filterOptions = this.options.filter(item => {
                const value = this.item[this.isDisplayValue ? "value" : "text"].toLowerCase()
                return item.text.toLowerCase().includes(value) || item.value.toString().toLowerCase().includes(value)
            })
        },

        /**
         * @param {Object} item 
         * @param {Boolean} isShow 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng chọn một option, emit giá trị được chọn cho componentcha, emit validate, set lại giá trị isShow
         */
        handleSetItem(item, isShow = false) {
            this.$emit('update:modelValue', item.value)
            this.item = { ...item }
            this.$emit('blurcombobox')
            this.isShow = isShow
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiệc khi người dùng blur khỏi thẻ input
        */
        handleBlur() {
            // set lại value cho thẻ input, trong trường hợp người dùng nhấn thêm vào ô input, value là giá trị set gần nhất trước đó
            if (this.item.value) {
                this.item = { ...this.options.find(item => item.value.toLowerCase() == this.item.value.toLowerCase()) }
                if (!this.item.value) {
                    if (this.value) {
                        this.$emit("update:modelValue", this.value)
                        this.item.value = this.value
                    }
                    else
                        this.$emit('update:modelValue', '')
                }
                else {
                    this.$emit('update:modelValue', this.item.value)
                }

            }
            // trường hợp người dùng xóa hết value thẻ input rồi blur, thì emit giá trị null cho component cha
            else {
                this.item = { value: null, text: null }
                if (this.value) {
                    this.$emit('update:modelValue', '')
                }
            }
            // emit validate và ẩn options
            this.$emit('blurcombobox')
            this.isShow = false
            this.filterOptions = this.options
        },

        /**
        * author: Nguyen Quoc Huy
        * @param {Event}
        * created at: 30/04/2023
        * description: Hàm chuyển đổi data từ prop của component cha về dữ liệu dạng {text, value}
        */
        convertDataToOptions() {
            this.options = this.data.map(option => {
                // key của text và key của value được lấy từ prop, vì dữ liệu của component cha truyền xuống có thể chưa qua xử lý
                const { [this.fieldText]: text, [this.fieldValue]: value } = option
                return { text, value }
            })
            this.filterOptions = this.options
            // trường hợp component cha truyền một giá trị mặc định
            if (this.value) {
                this.item = { ...this.options.find(item => item.value == this.value) }
            }
        }
    },
    computed: {
        value: {
            get() {
                return this.modelValue
            }
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: theo dõi sự kiện gọi api của app thành công thì lọc giá trị của data cho phù hợp với các trường của options
    */
    watch: {
        data() {
            this.convertDataToOptions()
        },
        value() {
            this.item.value = this.value
        }
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: khi component được mounted thì lắng nghe sự kiện người dùng click vào màn hình để xử lý blur combobox
     */
    mounted() {
        this.eventWindowClick = (e) => {
            if (this.isShow && document.contains(e.target) && !this.$refs.comboboxHead.contains(e.target) && !this.$refs.comboboxOptions.contains(e.target)) {
                this.handleBlur()
            }
        }
        window.addEventListener('mousedown', this.eventWindowClick)
        // convert data sang options 
        this.convertDataToOptions()
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: khi component unmounted thì bỏ lắng nghe sự kiện phía trên
    */
    beforeUnmount() {
        window.removeEventListener('mousedown', this.eventWindowClick)
    },
    props: {
        icon: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: true
        },
        label: String,
        placeholder: String,
        modelValue: {

        },
        error: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
        },
        isLoading: {
            type: Boolean,
        },
        fieldText: {
            type: String,
            default: ''
        },
        fieldValue: {
            type: String,
            default: ''
        },
        typeCombobox: {
            type: String,
        },
        isBoldPlaceHolder: {
            type: Boolean,
            default: false
        },
        isDisplayValue: {
            type: Boolean,
            default: true
        }
    },
}
</script>

<style scoped>
.combobox__table {
    min-width: 350px;
    padding: 4px;
}

.combobox__table table {
    width: 100%;
    border-spacing: 0;
}

.combobox__table th {
    font-family: bMisa Font;
    font-size: 14px;
    text-align: start;
    padding: 8px 0;
}

.combobox__table th:first-child {
    min-width: 50px;
    text-align: left;
    padding-left: 15px;
}

.combobox__table th:nth-child(2),
.combobox__table td:nth-child(2) {
    padding-left: 15px;
}

.combobox__table td:nth-child(2)::first-letter {
    text-transform: uppercase;
}

.combobox__table td:nth-child(2) {
    text-transform: lowercase;
}

.combobox__table tr {
    cursor: pointer;
}

.combobox__table td {
    padding: 6px 0;
    font-family: mMisa Font;
    font-weight: 400;
    font-size: 13px;
}

.combobox__table td:first-child {
    text-transform: uppercase;
    text-align: left;
    padding-left: 15px;
}

.combobox__head__icon {
    padding-left: 12px;
}

.combobox__item__icon {
    width: 20px;
    display: block;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
}

.combobox__item {
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
    padding: 8px 16px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
}

.combobox tr:first-child {
    background-color: rgba(67, 195, 227, 0.668);
}

.combobox__item:hover,
.combobox__table tr:hover:not(:first-child) {
    background-color: rgba(120, 215, 239, 0.164);
}

.combobox__item.active,
.combobox__table tr.active {
    background-color: rgba(120, 215, 239, 0.455) !important;
}

.combobox__options {
    background-color: #fff;
    overflow-y: auto;
    max-height: 250px;
}

.combobox__options__wrapper {
    border-radius: var(--radius-border);
    overflow: hidden;
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    min-width: 100%;
    z-index: 100;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.178);
}

.combobox__options.isLoading {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.combobox__icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
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
    display: flex;
    align-items: center;
    background-color: #fff;
}

.combobox.combobox.isError .combobox__head {
    border-color: rgb(227, 42, 42);
}

.combobox .combobox__head:has(.combobox__input:focus) {
    border-color: rgba(26, 164, 200, 1);
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

.combobox__input.isBoldPlaceHolder::placeholder {
    font-style: normal;
    color: #000;
}

.temp-input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
}
</style>