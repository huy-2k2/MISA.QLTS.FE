<template>
    <div class="combobox" :class="{ isInHeader, isError: error }">
        <label v-if="label" :for="uuid" class="label">
            <span>{{ label }}</span>
            <span v-if="required" class="label__required">*</span>
        </label>
        <div ref="comboboxHead" class="combobox__head">
            <div v-if="icon" class="combobox__head__icon">
                <div class="icon-header-filter"></div>
            </div>
            <input :id="uuid" @focus="handleFocus" @keyup="handleControll" @keydown="handleTabOut"
                @input="handleFilterOptions" v-model="item.value" :class="{ isBoldPlaceHolder }" class="combobox__input"
                type="text" :placeholder="placeholder">
            <div class="combobox__icon">
                <div class="icon-down"></div>
            </div>
        </div>

        <div ref="comboboxOptions" v-show="isShow" :class="{ isLoading }" class="combobox__options custom-scrollbar">
            <MyLoading v-show="isLoading"></MyLoading>
            <div v-show="!isInHeader" @click="handleSetItem(option)" v-for="option in filterOptions" :key="option.value"
                class="combobox__item" :class="{ active: option.value == item.value }">
                <span class="combobox__item__text">{{ option.text }}</span>
                <span class="combobox__item__icon" v-show="option.value == item.value">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="32" d="M416 128L192 384l-96-96" />
                    </svg>
                </span>
            </div>
            <table class="combobox__table" v-show="isInHeader">
                <tr>
                    <th>Mã</th>
                    <th>Tên</th>
                </tr>
                <tr :class="{ active: option.value == item.value }" @click="handleSetItem(option)"
                    v-for="option in filterOptions" :key="option.value">
                    <td>{{ option.value }}</td>
                    <td>{{ option.text }}</td>
                </tr>
            </table>
        </div>
        <span class="field__validate__error">{{ error }}</span>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import axios from 'axios'
import MyLoading from './MyLoading.vue'
export default {
    components: { MyLoading },
    data() {
        return {
            // lưu value của thẻ input, và value của item người dùng chọn
            item: { text: null, value: null },
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
            isLoading: true,
        }
    },
    methods: {
        handleFocus() {
            this.isShow = true
        },
        /**
        * @param {Event} event 
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm xử lý sự kiện người dùng nhấn lên và xuống khi đang focus vào thẻ input, tự chọn option tương ứng
        */
        handleControll(event) {
            let index = this.filterOptions.findIndex(option => option.value == this.item.value)
            if (event.code == 'ArrowDown' || event.code == 'ArrowUp') {
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
                this.$refs.comboboxOptions.scroll({
                    top: index < 7 ? 0 : (index - 7) * 30,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý lọc dữ liệu khi người dùng gõ tìm kiếm ở thẻ input, dữ liệu lọc lưu vào biến filterOptions
        */
        handleFilterOptions() {
            this.filterOptions = this.options.filter(item => item.text.toLowerCase().includes(this.item.text.toLowerCase()))
        },

        /**
         * @param {Object} item 
         * @param {Boolean} isShow 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng chọn một option, emit giá trị được chọn cho componentcha, emit validate, set lại giá trị isShow
         */
        handleSetItem(item, isShow = false) {
            this.$emit('selectCombobox', { name: this.name, value: item.value, text: item.text })
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
            // set lại value cho thẻ input, trong trường hợp người dùng nhấn thêm vào ô input, value thẻ input được set lại là giá trị của item được chọn trước đó
            if (this.item.text && this.item.value) {
                this.item = { ...this.options.find(item => item.value == this.item.value) }
            }
            // trường hợp người dùng xóa hết value thẻ input rồi blur, thì emit giá trị null cho component cha
            else {
                this.item = { value: null, text: null }
                if (this.value) {
                    this.$emit('selectCombobox', { name: this.name, value: '', text: '' })
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
         * description: hàm xử lý sự kiện người dùng tab ra khỏi thẻ input, gọi hàm xử lý blur phía trên
         */
        handleTabOut(event) {
            if (event.code == 'Tab') {
                this.handleBlur()
            }
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: hàm khởi tạo giá trị cho combobox
    */
    beforeMount() {
        //gọi api để lấy dữ liệu options và đặt cho các biến options, filterOptions
        axios.get(this.url)
            .then(({ data }) => {
                this.options = data.map(option => {
                    const { [this.fieldText]: text, [this.fieldValue]: value } = option
                    return { text, value }
                })
                this.filterOptions = this.options
                this.isLoading = false
                if (this.value) {
                    this.item = { ...this.options.find(item => item.value == this.value) }
                }
            }).catch(({ message }) => {
                console.log(message)
            })
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
        window.addEventListener('click', this.eventWindowClick)
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: khi component unmounted thì bỏ lắng nghe sự kiện phía trên
    */
    beforeUnmount() {
        window.removeEventListener('click', this.eventWindowClick)
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
        },
        url: {
            type: String,
            default: ''
        },
        fieldText: {
            type: String,
            default: ''
        },
        fieldValue: {
            type: String,
            default: ''
        },
        isInHeader: {
            type: Boolean,
            default: false
        },
        isBoldPlaceHolder: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style scoped>
.combobox__table {
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
    text-align: center;
}

.combobox__table th:nth-child(2),
.combobox__table td:nth-child(2) {
    padding-left: 30px;
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
    text-align: center;
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

.combobox__item:hover,
.combobox__table tr:hover:not(:first-child) {
    background-color: rgba(26, 164, 200, .2);
}

.combobox__item.active,
.combobox__table tr.active {
    color: rgba(26, 164, 200, 1);
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
    min-width: 100%;
    z-index: 100;
}

.combobox.isError .combobox__options {
    top: calc(100% - 18px);
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
</style>