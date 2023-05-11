<template>
    <form @submit.prevent="handleSubmit" class="form">
        <div class="form__top">
            <div class="form__head">
                <h3 class="form__title">{{ typeForm == 'edit' ? 'Sửa tài sản' : typeForm == 'duplicate' ? 'Nhân bản tài sản'
                    :
                    'Thêm tài sản' }}</h3>
            </div>
            <div class="form__body">
                <div ref="assetCode" class="form__body__item form__body__item--1">
                    <TextfieldForm @blur="validateassetCode" :error="errors.assetCode" v-model="form.assetCode"
                        label="Mã tài sản" placeholder="Nhập mã tài sản">
                    </TextfieldForm>
                </div>
                <div ref="assetName" class="form__body__item form__body__item--2">
                    <TextfieldForm @blur="validateassetName" :error="errors.assetName" v-model="form.assetName"
                        label="Tên tài sản" placeholder="Nhập tên tài sản">
                    </TextfieldForm>
                </div>
                <div ref="departmentCode" class="form__body__item form__body__item--1">
                    <MyCombobox fieldText="email" fieldValue="id" url="https://jsonplaceholder.typicode.com/users"
                        :isInHeader="true" @blurcombobox="validateDepartmentCode" :error="errors.departmentCode"
                        v-model="form.departmentCode" label="Mã bộ phận sử dụng" placeholder="Chọn mã bộ phận sử dụng">
                    </MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm v-model="form.departmentName" :disable="true" label="Tên bộ phận sử dụng"
                        :required="false" placeholder="Nhập tên bộ phận sử dụng">
                    </TextfieldForm>
                </div>
                <div ref="assetTypeCode" class="form__body__item form__body__item--1">
                    <MyCombobox fieldText="name" fieldValue="id" url="https://jsonplaceholder.typicode.com/users"
                        :isInHeader="true" @blurcombobox="validateassetTypeCode" :error="errors.assetTypeCode"
                        v-model="form.assetTypeCode" label="Mã loại tài sản" placeholder="Chọn mã loại tài sản">
                    </MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm v-model="form.assetTypeName" :disable="true" :required="false" label="Tên loại tài sản"
                        placeholder="Nhập tên loại tài sản">
                    </TextfieldForm>
                </div>
                <div ref="quantity" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateQuantity" :error="errors.quantity" label="Số lượng" v-model="form.quantity"
                        min="1">
                    </NumberForm>
                </div>
                <div ref="price" class="form__body__item form__body__item--1">
                    <NumberForm @blur="handleBlurPrice" :error="errors.price" :currrency="true" :icon="false"
                        label="Nguyên giá" v-model="form.price" min="0"></NumberForm>
                </div>
                <div ref="useDuration" class="form__body__item form__body__item--1">
                    <NumberForm @blur="handleBlurUseDuration" :error="errors.useDuration" :icon="false"
                        label="Số năm sử dụng" v-model="form.useDuration" min="0">
                    </NumberForm>
                </div>
                <div ref="loseRate" class="form__body__item form__body__item--1">
                    <NumberForm @blur="handleBlurloseRate" step="0.01" :error="errors.loseRate" label="Tỷ lệ hao mòn (%)"
                        v-model="form.loseRate" min="0"></NumberForm>
                </div>
                <div ref="loseRateYear" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateloseRateYear" :error="errors.loseRateYear" :currrency="true" :icon="false"
                        label="Giá trị hao mòn năm" v-model="form.loseRateYear" min="0">
                    </NumberForm>
                </div>
                <div ref="currentYear" class="form__body__item form__body__item--1">
                    <NumberForm :icon="false" :disable="true" label="Năm theo dõi" :required="false">
                    </NumberForm>
                </div>
                <div ref="buyDate" class="form__body__item form__body__item--1">
                    <InputDate @blurdate="handleBlurBuyDate" :error="errors.buyDate" v-model="form.buyDate"
                        label="Ngày mua"></InputDate>
                </div>
                <div ref="useDate" class="form__body__item form__body__item--1">
                    <InputDate @blurdate="validateUseDate" v-model="form.useDate" :error="errors.useDate"
                        label="Ngày bắt đầu sử dụng">
                    </InputDate>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <MyButton type="button" @click="handleCancel" :isSub="true" text="Hủy"></MyButton>
            <div ref="submitButton">
                <MyButton type="submit" text="Lưu"></MyButton>
            </div>
        </div>
        <ThePopup :isShow="isShowCancel" :isHasClose="false">
            <MyDialog text="Bạn có muốn hủy bỏ khai báo tài sản này?" @click1="$emit('clickClose')"
                @click2="handleCloseCancel" quantity="2" button1="Hủy bỏ" button2="Không">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && !typeForm" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleStore" @click3="$emit('clickClose')" @click2="handleCloseStore" quantity="3" button1="Lưu"
                button2="Không lưu" button3="Hủy bỏ">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && typeForm == 'edit'" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleEdit" @click3="$emit('clickClose')" @click2="handleCloseStore" quantity="3" button1="Lưu"
                button2="Không lưu" button3="Hủy bỏ">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && typeForm == 'duplicate'" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleDuplicate" @click3="$emit('clickClose')" @click2="handleCloseStore" quantity="3"
                button1="Lưu" button2="Không lưu" button3="Hủy bỏ">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowError" :isHasClose="false">
            <MyDialog :text="errorNotifi" :isHasClose="false" @click1="handleCloseError" quantity="1" button1="Đóng">
            </MyDialog>
        </ThePopup>
    </form>
</template>

<script>
import NumberForm from '@/components/NumberForm.vue';
import TextfieldForm from '@/components/TextfieldForm.vue';
import InputDate from '@/components/InputDate.vue';
import MyButton from '@/components/MyButton.vue';
import MyCombobox from '@/components/MyCombobox.vue';
import ThePopup from './ThePopup.vue';
import MyDialog from '@/components/MyDialog.vue';

export default {
    props: {
        typeForm: String,
        trChoose: Object
    },
    data() {
        return {
            isShowError: false,
            isChanged: false,
            isShowStore: false,
            isShowCancel: false,
            form: {
                assetCode: 'TS00001',
                quantity: '1',
                price: '0',
                loseRateYear: '0',
                currentYear: new Date().getFullYear(),
                buyDate: this.toCurrentDate(),
                useDate: this.toCurrentDate()
            },
            errors: {},
            eventKeyDown: null
        }
    },
    computed: {
        errorNotifi() {
            return Object.values(this.errors).map(error => error ? `<p>${error}.</p>` : '').join('')
        },
        loseRateYearValue() {
            return Number.parseInt(this.form.loseRate / 100 * this.form.price)
        }
    },
    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Hàm khỏi tạo giá trị cho dữ liệu form trong trường hợp form là form eidt hoạc form nhân bản
     */
    beforeMount() {
        // kiểm tra xem component cha có truyền dữ liệu để khởi tạo cho giá trị input của form hay không
        if (this.trChoose) {
            this.form.assetCode = this.trChoose.td2
            this.form.assetName = this.trChoose.td3
            this.form.quantity = this.trChoose.td6
            this.form.price = this.trChoose.td7
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: Focus vào input đầu tiên khi mở form, và xử lý sự kiện taborder cho  form
    */
    mounted() {
        this.$refs.assetCode.querySelector('input').focus()
        this.eventKeyDown = (event) => {
            if (event.key == 'Tab') {
                // nếu như button cuối cùng đang được focus mà ấn tab thì sẽ focus quay trở về input đầu tiên
                if (this.$refs.submitButton.querySelector('button:focus')) {
                    this.$refs.assetCode.querySelector('input').focus()
                    event.preventDefault();

                }
            }
        }
        window.addEventListener('keydown', this.eventKeyDown)
    },
    unmounted() {
        window.removeEventListener('keydown', this.eventKeyDown)
    },
    methods: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur nguyên giá thì valiate lại giá trị hao mòn năm
        */
        handleBlurPrice() {
            this.validatePrice()
            if (this.form.loseRateYear?.toString().length)
                this.validateloseRateYear()
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur tỷ lệ hao mòn thì valiate lại giá trị hao mòn năm
        */
        handleBlurloseRate() {
            this.validateloseRate()
            if (this.form.loseRateYear)
                this.validateloseRateYear()
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: khi blur ngày mua thì valiate lại ngày sử dụng
         */
        handleBlurBuyDate() {
            this.validateBuyDate()
            if (this.form.useDate)
                this.validateUseDate()
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur số năm sử dụng thì validate luôn tỉ lệ hao mòn
        */
        handleBlurUseDuration() {
            this.validateUseDuration()
            if (this.form.loseRate?.toString().length)
                this.validateloseRate()
        },
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: xử lý sự kiện khi người dùng ấn nút hủy
         */
        handleCancel() {
            // kiểm tra xem người dùng đã thay nhập vào input nào chưa
            if (this.isChanged)
                this.isShowCancel = true
            else
                // emit sự kiện đóng form cho component cha
                this.$emit('clickClose')
        },

        /**
         * author: Nguyen Quoc Huy
         * @param {Object}
         * created at: 30/04/2023
         * description: hàm set value cho các giá trị input của form
         */

        /**
         * author: Nguyen Quoc Huy
         * created at: 07/05/2023
         * description: khi đóng dialog xác nhận hủy form thì focus vào ô input đầu tiên
         */
        handleCloseCancel() {
            this.isShowCancel = false
            this.$refs.assetCode.querySelector('input').focus()
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 07/05/2023
         * description: khi đóng dialog xác nhận lưu form thì focus vào ô input đầu tiên
         */
        handleCloseStore() {
            this.isShowStore = false
            this.$refs.assetCode.querySelector('input').focus()
        },
        /**
         * author: Nguyen Quoc Huy
         * created at: 07/05/2023
         * description: khi đóng dialog thông báo lỗi validate thì sẽ focus vào ô nhập dữ liệu bị sai đầu tiên
         */
        handleCloseError() {
            this.isShowError = false
            for (const property in this.errors) {
                if (this.errors[property]) {
                    this.$refs[property].querySelector('input').focus()
                    break
                }
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: xử lý việc lưu dữ liệu, gọi api. hiện thông báo tương ứng ...
         */
        handleStore() {
            // emit sự kiện đóng form cho component cha
            this.$emit('clickClose')
            // hiện thông báo
            this.emitter.emit("setToastMessage", 'Lưu dữ liệu thành công');
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: xử lý việc sửa dữ liệu, gọi api. hiện thông báo tương ứng ...
         */
        handleEdit() {
            // emit sự kiện đóng form cho component cha
            this.$emit('clickClose')
            // hiện thông báo
            this.emitter.emit("setToastMessage", 'Thay đổi dữ liệu thành công');
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: xử lý việc nhân bản dữ liệu, gọi api. hiện thông báo tương ứng ...
        */
        handleDuplicate() {
            // emit sự kiện đóng form cho component cha
            this.$emit('clickClose')
            // hiện thông báo
            this.emitter.emit("setToastMessage", 'Nhân bản dữ liệu thành công');
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: xử lý sự kiện khi người dùng ấn nút lưu
       */
        handleSubmit() {
            this.errors = {}
            // validate lại tất cả các input, thứ tự validate sẽ ảnh hướng đến input đầu tiên được focus khi gặp lỗi
            this.validateassetCode()
            this.validateassetName()
            this.validateDepartmentCode()
            this.validateassetTypeCode()
            this.validateQuantity()
            this.validatePrice()
            this.validateUseDuration()
            this.validateloseRate()
            this.validateloseRateYear()
            this.validateBuyDate()
            this.validateUseDate()
            console.log(this.form);
            // kiểm tra xem có error nào không, nếu có thì kết thúc hàm
            for (const property in this.errors) {
                if (this.errors[property]) {
                    this.isShowError = true
                    return
                }
            }
            // nếu không có lỗi, hiện dialog xác nhận lưu
            this.isShowStore = true
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường assetCode
        */
        validateassetCode() {
            let length = { min: 0, max: 255 }
            // gán lại cho error là rỗng
            this.errors.assetCode = ''
            // kiểm tra assetcode khác rỗng
            if (!this.validateRequired(this.form.assetCode))
                this.errors.assetCode = 'Cần nhập mã tài sản'
            // kiểm tra assetcode có length hợp lệ
            else if (!this.validateLength(this.form.assetCode, length.min, length.max))
                this.errors.assetCode = `Cần nhập mã tài sản từ ${length.min} đến ${length.max} kí tự`
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường assetTypeName
         */
        validateassetName() {
            let length = { min: 0, max: 255 }
            // gán lại error là rỗng
            this.errors.assetName = ''
            // kiểm tra  assettypename khác rỗng
            if (!this.validateRequired(this.form.assetName))
                this.errors.assetName = 'Cần nhập tên tài sản'
            // kiểm tra assetname có length hợp lệ
            else if (!this.validateLength(this.form.assetName, length.min, length.max))
                this.errors.assetName = `Cần nhập tên tài sản từ ${length.min} đến ${length.max} kí tự`
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường departmentcode
         */
        validateDepartmentCode() {
            // gán lại error là rỗng
            this.errors.departmentCode = ''
            // kiểm tra  departmentcode khác rỗng
            if (!this.validateRequired(this.form.departmentCode))
                this.errors.departmentCode = 'Cần nhập tên bộ phận sử dụng'
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường assettypecode
        */
        validateassetTypeCode() {
            // gán lại error là rỗng
            this.errors.assetTypeCode = ''
            // kiểm tra  assettypecode khác rỗng
            if (!this.validateRequired(this.form.assetTypeCode))
                this.errors.assetTypeCode = 'Cần nhập mã loại tài sản'
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường buydate
        */
        validateBuyDate() {
            // gán lại error là rỗng
            this.errors.buyDate = ''
            // kiểm tra buydate khác rỗng
            if (!this.validateRequired(this.form.buyDate))
                this.errors.buyDate = 'Cần nhập ngày mua'
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: hàm validate trường usedate
       */
        validateUseDate() {
            // gán lại error là rỗng
            this.errors.useDate = ''
            // kiểm tra usedate khác rỗng
            if (!this.validateRequired(this.form.useDate))
                this.errors.useDate = 'Cần nhập ngày sử dụng'
            // kiểm tra use date phải sau buydate
            else if (this.form.buyDate && this.form.useDate && this.form.buyDate > this.form.useDate)
                this.errors.useDate = 'Ngày bắt đầu sử dụng phải sau ngày mua'
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường quantity
         */
        validateQuantity() {
            // gán lại error là rỗng
            this.errors.quantity = ''
            // kiểm tra quantity khác rỗng
            if (!this.validateRequired(this.form.quantity))
                this.errors.quantity = 'Cần nhập số lượng'
            // kiểm tra quantity phải là số nguyên
            else if (!this.validateInterger(this.form.quantity))
                this.errors.quantity = 'Cần nhập số lượng là số nguyên'
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường price
         */
        validatePrice() {
            // gán lại error là rỗng
            this.errors.price = ''
            //kiểm tra price khác rỗng
            if (!this.validateRequired(this.form.price))
                this.errors.price = 'Cần nhập nguyên giá'
            // kiểm tra price là số nguyên
            else if (!this.validateInterger(this.form.price))
                this.errors.price = 'Cần nhập nguyên giá là số nguyên'
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường useDuration
        */
        validateUseDuration() {
            // gán lại error là rỗng
            this.errors.useDuration = ''
            // kiểm tra useDuration khác rỗng
            if (!this.validateRequired(this.form.useDuration))
                this.errors.useDuration = 'Cần nhập số năm sử dụng'
            // kiểm tra useDuration là số nguyên
            else if (!this.validateInterger(this.form.useDuration))
                this.errors.useDuration = 'Cần nhập số năm sử dụng là số nguyên'
            else if (this.form.useDuration <= 0)
                this.errors.useDuration = 'Số năm sử dụng phải lớn hơn 0'

        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường useDuration
         */
        validateloseRate() {
            // gán lại error là rỗng
            this.errors.loseRate = ''
            // kiểm tra useDuration khác rỗng
            if (!this.validateRequired(this.form.loseRate))
                this.errors.loseRate = 'Cần nhập tỷ lệ hao mòn'
            // kiểm tra useDuration là số thực
            else if (!this.validateRealNumber(this.form.loseRate))
                this.errors.loseRate = 'Cần nhập tỷ lệ hao mòn là số thực'
            // kiểm tra Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng
            else if (this.form.useDuration > 0) {
                if (this.toRounded(1 / this.form.useDuration * 100) != this.toRounded(this.form.loseRate))
                    this.errors.loseRate = 'Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng'
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường loseRateYear
         */
        validateloseRateYear() {
            // gán lại error là rỗng
            this.errors.loseRateYear = ''
            // kiểm tra loseRateYear khác rỗng
            if (!this.validateRequired(this.form.loseRateYear))
                this.errors.loseRateYear = 'Cần nhập giá trị hao mòn năm'
            // kiểm tra giá trị hao mòn năm phải bằng tỷ lệ hao mòn* Nguyên giá
            if (this.form.loseRate && this.form.price) {
                if (this.loseRateYearValue != this.form.loseRateYear) {
                    this.errors.loseRateYear = 'Giá trị hao mòn năm phải bằng tỷ lệ hao mòn* Nguyên giá'
                }
            }
            //kiểm tra hao mòn năm phải nhỏ hơn hoạc bằng nguyên giá
            if (Number.parseInt(this.form.loseRateYear) > Number.parseInt(this.form.price)) {
                this.errors.loseRateYear = 'Hao mòn năm phải nhỏ hơn hoạc bằng nguyên giá'
            }
        },


        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm kiểm tra khác rỗng
         */
        validateRequired(value) {
            // nếu là string thì value.trim() khác rỗng, các giá trị khác thì phải null hoạc undefined
            if (typeof value == 'string' && !value.trim() || value == null || value == undefined)
                return false
            return true
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: kiểm tra một số có phải là số nguyên hay không
         */
        validateInterger(value) {
            return Number.isInteger(Number.parseFloat(value))
        },


        /**
         * author: Nguyen Quoc Huy
         * created at: 07/05/2023
         * description: kiểm tra một số có phải là số thực hay không
         */
        validateRealNumber(value) {
            return !Number.isNaN(Number.parseFloat(value))
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: kiểm tra một số có phải là số nguyên hay không
         */
        validateLength(value, min, max) {
            value = value.toString()
            return value.length >= min && value.length <= max
        }

    },
    watch: {
        form: {
            handler() {
                this.isChanged = true
            },
            deep: true
        }
    },
    components: { TextfieldForm, NumberForm, InputDate, MyCombobox, ThePopup, MyDialog, MyButton }
}
</script>

<style scoped>
.form {
    border-radius: var(--radius-border);
    overflow: hidden;
}

.form__top {
    background-color: #fff;
    padding: 20px 16px;
}

.form__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form__title {
    font-size: 18px;
    font-family: mMisa Font;
}

.form__body {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    width: 812px;
    column-gap: 16px;
    row-gap: 20px;
}

.form__body__item--1 {
    width: calc(calc(100% - 32px) / 3);
}

.form__body__item--2 {
    width: calc(calc(100% - calc(calc(100% - 32px) / 3) - 16px));
}

.form__bottom {
    background-color: #eee;
    height: 52px;
    display: flex;
    column-gap: 10px;
    padding: 0 16px;
    align-items: center;
    justify-content: flex-end;
}
</style>