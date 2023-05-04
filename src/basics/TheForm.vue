<template>
    <form @submit.prevent="handleSubmit" class="form">
        <div class="form__top">
            <div class="form__head">
                <h3 class="form__title">Thêm tài sản</h3>
            </div>
            <div class="form__body">
                <div ref="legacyCode" class="form__body__item form__body__item--1">
                    <TextfieldForm @blur="validateLegacyCode" :error="errors.legacyCode" @input="setValue"
                        :value="form.legacyCode" name="legacyCode" label="Mã tài sản" placeholder="Nhập mã tài sản">
                    </TextfieldForm>
                </div>
                <div ref="legacyName" class="form__body__item form__body__item--2">
                    <TextfieldForm @blur="validateLegacyName" :error="errors.legacyName" @input="setValue"
                        :value="form.legacyName" name="legacyName" label="Tên tài sản" placeholder="Nhập tên tài sản">
                    </TextfieldForm>
                </div>
                <div ref="departmentCode" class="form__body__item form__body__item--1">
                    <MyCombobox fieldText="email" fieldValue="id" url="https://jsonplaceholder.typicode.com/users"
                        @blurcombobox="validateDepartmentCode" :error="errors.departmentCode" @select="setValue"
                        :value="form.departmentCode" name="departmentCode" label="Mã bộ phận sử dụng"
                        placeholder="Chọn mã bộ phận sử dụng"></MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm :value="form.departmentName" :disable="true" label="Tên bộ phận sử dụng"
                        :required="false" placeholder="Nhập tên bộ phận sử dụng">
                    </TextfieldForm>
                </div>
                <div ref="legacyTypeCode" class="form__body__item form__body__item--1">
                    <MyCombobox fieldText="name" fieldValue="id" url="https://jsonplaceholder.typicode.com/users"
                        @blurcombobox="validateLegacyTypeCode" :error="errors.legacyTypeCode" @select="setValue"
                        :value="form.legacyTypeCode" name="legacyTypeCode" label="Mã loại tài sản"
                        placeholder="Chọn mã loại tài sản"></MyCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <TextfieldForm :value="form.legacyTypeName" :disable="true" :required="false" label="Tên loại tài sản"
                        placeholder="Nhập tên loại tài sản">
                    </TextfieldForm>
                </div>
                <div ref="quantity" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateQuantity" :error="errors.quantity" @change="setValue" label="Số lượng"
                        name="quantity" :value="form.quantity" min="1">
                    </NumberForm>
                </div>
                <div ref="price" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validatePrice" :error="errors.price" :currrency="true" @change="setValue"
                        :icon="false" name="price" label="Nguyên giá" :value="form.price" min="0"></NumberForm>

                </div>
                <div ref="useDuration" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateUseDuration" :error="errors.useDuration" @change="setValue" :icon="false"
                        name="useDuration" label="Số năm sử dụng" :value="form.useDuration" min="0">
                    </NumberForm>
                </div>
                <div ref="looseRate" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateLooseRate" step="0.01" :error="errors.looseRate" @change="setValue"
                        label="Tỷ lệ hao mòn (%)" name="looseRate" :value="form.looseRate" min="0"></NumberForm>
                </div>
                <div ref="looseRateYear" class="form__body__item form__body__item--1">
                    <NumberForm @blur="validateLooseRateYear" :error="errors.looseRateYear" @change="setValue" :icon="false"
                        name="looseRateYear" label="Giá trị hao mòn năm" :value="form.looseRateYear" min="0">
                    </NumberForm>
                </div>
                <div ref="currentYear" class="form__body__item form__body__item--1">
                    <NumberForm @change="setValue" :icon="false" :disable="true" name="currentYear" label="Năm theo dõi"
                        :required="false" :value="form.currentYear" min="1">
                    </NumberForm>
                </div>
                <div ref="buyDate" class="form__body__item form__body__item--1">
                    <InputDate @blurdate="validateBuyDate" @select="setValue" :error="errors.buyDate" :value="form.buyDate"
                        name="buyDate" label="Ngày mua"></InputDate>
                </div>
                <div ref="useDate" class="form__body__item form__body__item--1">
                    <InputDate @blurdate="validateUseDate" @select="setValue" :error="errors.useDate" :value="form.useDate"
                        name="useDate" label="Ngày bắt đầu sử dụng">
                    </InputDate>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <MyButton type="button" @click="handleCancel" :isSub="true" text="Hủy"></MyButton>
            <MyButton type="submit" text="Lưu"></MyButton>
        </div>
        <ThePopup :isShow="isShowCancel" :isHasClose="false">
            <MyDialog text="Bạn có muốn hủy bỏ khai báo tài sản này?" @click1="$emit('clickClose')"
                @click2="isShowCancel = false" quantity="2" button1="Hủy bỏ" button2="Không">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && !typeForm" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleStore" @click3="$emit('clickClose')" @click2="isShowStore = false" quantity="3" button1="Lưu"
                button2="Không lưu" button3="Hủy bỏ">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && typeForm == 'edit'" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleEdit" @click3="$emit('clickClose')" @click2="isShowStore = false" quantity="3" button1="Lưu"
                button2="Không lưu" button3="Hủy bỏ">
            </MyDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore && typeForm == 'duplicate'" :isHasClose="false">
            <MyDialog text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleDuplicate" @click3="$emit('clickClose')" @click2="isShowStore = false" quantity="3"
                button1="Lưu" button2="Không lưu" button3="Hủy bỏ">
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
            isChanged: false,
            isShowStore: false,
            isShowCancel: false,
            form: {
                legacyCode: 'TS00001',
                legacyName: '',
                departmentCode: '',
                departmentName: '',
                legacyTypeCode: '',
                legacyTypeName: '',
                quantity: '1',
                price: '1000',
                useDuration: '1',
                looseRate: '6.67',
                looseRateYear: '0',
                currentYear: new Date().getFullYear(),
                buyDate: this.toCurrentDate(),
                useDate: this.toCurrentDate()
            },
            errors: {}
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
            this.form.legacyCode = this.trChoose.td2
            this.form.legacyName = this.trChoose.td3
            this.form.quantity = this.trChoose.td6
            this.form.price = this.trChoose.td7
            this.form.departmentCode = this.form.departmentName = 1
            this.form.legacyTypeCode = this.form.legacyTypeName = 2
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: Focus vào input đầu tiên khi mở form
    */
    mounted() {
        this.$refs.legacyCode.querySelector('input').focus()
    },
    methods: {
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
        setValue({ name, value }) {
            // nếu input được set là departmentcode thì tìm và gán giá trị tương ứng cho input legacytypename
            if (name == 'departmentCode')
                this.form.departmentName = value ? value : ''
            // nếu input được set là legacytypecode thì tìm và gán giá trị tương ứng cho input legacytypename
            else if (name == 'legacyTypeCode')
                this.form.legacyTypeName = value ? value : ''
            this.form[name] = value
            this.isChanged = true
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
            // validate lại tất cả các input, thứ tự validate sẽ ảnh hướng đến input đầu tiên được focus khi gặp lỗi
            this.validateLegacyCode()
            this.validateLegacyName()
            this.validateDepartmentCode()
            this.validateLegacyTypeCode()
            this.validateQuantity()
            this.validatePrice()
            this.validateUseDuration()
            this.validateLooseRate()
            this.validateLooseRateYear()
            this.validateBuyDate()
            this.validateUseDate()
            console.log(this.form);
            // kiểm tra xem có error nào không, nếu có thì kết thúc hàm
            for (const property in this.errors) {
                if (this.errors[property]) {
                    this.$refs[property].querySelector('input').focus()
                    return
                }
            }
            // nếu không có lỗi, hiện dialog xác nhận lưu
            this.isShowStore = true
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường legacyCode
        */
        validateLegacyCode() {
            // gán lại cho error là rỗng
            this.errors.legacyCode = ''
            // kiểm tra legacycode khác rỗng
            if (!this.validateRequired(this.form.legacyCode))
                this.errors.legacyCode = 'Cần nhập mã tài sản'
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường legacyTypeName
         */
        validateLegacyName() {
            // gán lại error là rỗng
            this.errors.legacyName = ''
            // kiểm tra  legacytypename khác rỗng
            if (!this.validateRequired(this.form.legacyName))
                this.errors.legacyName = 'Cần nhập tên tài sản'
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
        * description: hàm validate trường legacytypecode
        */
        validateLegacyTypeCode() {
            // gán lại error là rỗng
            this.errors.legacyTypeCode = ''
            // kiểm tra  legacytypecode khác rỗng
            if (!this.validateRequired(this.form.legacyTypeCode))
                this.errors.legacyTypeCode = 'Cần nhập mã loại tài sản'
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
            else if (!Number.isInteger(Number.parseFloat(this.form.quantity)))
                this.errors.quantity = 'Cần nhập số nguyên'
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
            else if (!Number.isInteger(Number.parseInt(this.form.price)))
                this.errors.price = 'Cần nhập số nguyên'
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
            else if (!Number.isInteger(Number.parseFloat(this.form.useDuration)))
                this.errors.useDuration = 'Cần nhập số nguyên'
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường useDuration
         */
        validateLooseRate() {
            // gán lại error là rỗng
            this.errors.looseRate = ''
            // kiểm tra useDuration khác rỗng
            if (!this.validateRequired(this.form.looseRate))
                this.errors.looseRate = 'Cần nhập tỷ lệ hao mòn'
            // kiểm tra useDuration là số thực
            else if (Number.parseFloat(this.form.looseRate))
                this.errors.looseRate = ''
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường LooseRateYear
         */
        validateLooseRateYear() {
            // gán lại error là rỗng
            this.errors.looseRateYear = ''
            // kiểm tra LooseRateYear khác rỗng
            if (!this.validateRequired(this.form.looseRateYear))
                this.errors.looseRateYear = 'Cần nhập giá trị hao mòn năm'
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