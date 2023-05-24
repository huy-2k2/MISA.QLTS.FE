<template>
    <div class="form">
        <div class="form__top">
            <div class="form__head">
                <h3 class="form__title">{{ formTitle }}</h3>
            </div>
            <div class="form__body">
                <div ref="assetCode" class="form__body__item form__body__item--1">
                    <MisaTextfieldForm @blur="validateassetCode" :error="errors.assetCode" v-model="form.assetCode"
                        label="Mã tài sản" placeholder="Nhập mã tài sản">
                    </MisaTextfieldForm>
                </div>
                <div ref="assetName" class="form__body__item form__body__item--2">
                    <MisaTextfieldForm @blur="validateassetName" :error="errors.assetName" v-model="form.assetName"
                        label="Tên tài sản" placeholder="Nhập tên tài sản">
                    </MisaTextfieldForm>
                </div>
                <div ref="departmentCode" class="form__body__item form__body__item--1">
                    <MisaCombobox fieldText="departmentName" fieldValue="departmentCode"
                        :isLoading="$store.state.departments.isLoading" :data="$store.state.departments.data"
                        :typeCombobox="$enum.typeCombobox.tableOption" @blurcombobox="validateDepartmentCode"
                        :error="errors.departmentCode" v-model="form.departmentCode" label="Mã bộ phận sử dụng"
                        placeholder="Chọn mã bộ phận sử dụng">
                    </MisaCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <MisaTextfieldForm v-model="form.departmentName" :disable="true" label="Tên bộ phận sử dụng"
                        :required="false" placeholder="Nhập tên bộ phận sử dụng">
                    </MisaTextfieldForm>
                </div>
                <div ref="assetTypeCode" class="form__body__item form__body__item--1">
                    <MisaCombobox fieldText="assetTypeName" fieldValue="assetTypeCode"
                        :isLoading="$store.state.assetTypes.isLoading" :data="$store.state.assetTypes.data"
                        :typeCombobox="$enum.typeCombobox.tableOption" @blurcombobox="validateassetTypeCode"
                        :error="errors.assetTypeCode" v-model="form.assetTypeCode" label="Mã loại tài sản"
                        placeholder="Chọn mã loại tài sản">
                    </MisaCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <MisaTextfieldForm v-model="form.assetTypeName" :disable="true" :required="false"
                        label="Tên loại tài sản" placeholder="Nhập tên loại tài sản">
                    </MisaTextfieldForm>
                </div>
                <div ref="quantity" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="validateQuantity" :error="errors.quantity" label="Số lượng"
                        v-model="form.quantity" min="1">
                    </MisaNumberForm>
                </div>
                <div ref="price" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="handleBlurPrice" :error="errors.price" :currrency="true" :icon="false"
                        label="Nguyên giá" :float="true" v-model="form.price" min="0"></MisaNumberForm>
                </div>
                <div ref="useDuration" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="handleBlurUseDuration" :error="errors.useDuration" :icon="false"
                        label="Số năm sử dụng" v-model="form.useDuration" min="0">
                    </MisaNumberForm>
                </div>
                <div ref="loseRate" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="handleBlurloseRate" :float="true" :error="errors.loseRate"
                        label="Tỷ lệ hao mòn (%)" v-model="form.loseRate" min="0"></MisaNumberForm>
                </div>
                <div ref="loseRateYear" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="validateloseRateYear" :error="errors.loseRateYear" :currrency="true"
                        :icon="false" label="Giá trị hao mòn năm" :float="true" v-model="form.loseRateYear" min="0">
                    </MisaNumberForm>
                </div>
                <div ref="currentYear" class="form__body__item form__body__item--1">
                    <MisaNumberForm :icon="false" :disable="true" label="Năm theo dõi" v-model="form.trackYear"
                        :required="false">
                    </MisaNumberForm>
                </div>
                <div ref="buyDate" class="form__body__item form__body__item--1">
                    <MisaInputDate @blurdate="handleBlurBuyDate" :error="errors.buyDate" v-model="form.buyDate"
                        label="Ngày mua"></MisaInputDate>
                </div>
                <div ref="useDate" class="form__body__item form__body__item--1">
                    <MisaInputDate @blurdate="validateUseDate" v-model="form.useDate" :error="errors.useDate"
                        label="Ngày bắt đầu sử dụng">
                    </MisaInputDate>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <MisaButton type="button" @click="handleCancel" :isSub="true" text="Hủy"></MisaButton>
            <div ref="submitButton">
                <MisaButton @click="handleSubmit" text="Lưu"></MisaButton>
            </div>
        </div>
        <ThePopup :isShow="isShowCancel" :isHasClose="false">
            <MisaDialog text="Bạn có muốn hủy bỏ khai báo tài sản này?" @click1="$emit('clickClose')"
                @click2="handleCloseCancel" quantity="2" button1="Hủy bỏ" button2="Không">
            </MisaDialog>
        </ThePopup>
        <ThePopup :isShow="isShowStore" :isHasClose="false">
            <MisaDialog
                text="Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?"
                @click1="handleSubmit" @click3="$emit('clickClose')" @click2="handleCloseStore" quantity="3" button1="Lưu"
                button2="Không lưu" button3="Hủy bỏ">
            </MisaDialog>
        </ThePopup>
        <ThePopup :isShow="isShowError" :isHasClose="false">
            <MisaDialog :text="errorNotifi" :isHasClose="false" @click1="handleCloseError" quantity="1" button1="Đóng">
            </MisaDialog>
        </ThePopup>
    </div>
</template>

<script>
import MisaNumberForm from '@/components/MisaNumberForm.vue';
import MisaTextfieldForm from '@/components/MisaTextfieldForm.vue';
import MisaInputDate from '@/components/MisaInputDate.vue';
import MisaButton from '@/components/MisaButton.vue';
import MisaCombobox from '@/components/MisaCombobox.vue';
import ThePopup from './ThePopup.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import { BASE_API_URL } from '@/config';
import axios from 'axios';

export default {
    props: {
        typeForm: String,
        assetId: String
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
                price: '',
                loseRateYear: '',
                trackYear: new Date().getFullYear(),
                buyDate: this.toCurrentDate(),
                useDate: this.toCurrentDate()
            },
            errors: {},
            eventKeyDown: null
        }
    },
    computed: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Tạo error validate cho dialog khi người dùng ấn submit
         */
        errorNotifi() {
            return Object.values(this.errors).map(error => error ? `<p>${error}.</p>` : '').join('')
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm tính giá trị hao mòn năm từ tỷ lệ hao mòn và nguyên giá
         */
        loseRateYearValue() {
            // kiểm tra xem người dùng đã nhập nguyên giá và tỷ lệ hao mòn chưa
            if (this.form.loseRate && this.form.price) {
                // kiểm tra xem giá trị hao mòn năm có phải là số nguyên không
                if (Number.isInteger(Number.parseFloat(this.toRounded(this.form.loseRate / 100 * this.form.price)))) {
                    return Number.parseInt(this.form.loseRate / 100 * this.form.price)
                }
                // Nếu hao mòn năm không là số nguyên thì làm tròn 2 số sau phần thập phân
                else {
                    return this.toRounded(this.form.loseRate / 100 * this.form.price)
                }
            }
            else
                return ''
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm lấy tiêu đề của form dựa vào prop typeForm
         */
        formTitle() {
            return this.typeForm == this.$enum.typeForm.edit ? 'Sửa tài sản' : this.typeForm == this.$enum.typeForm.duplicate ? 'Nhân bản tài sản' : 'Thêm tài sản'
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm lấy tỷ lệ hao mòn từ form để sử dụng watch, (watch thuộc tính)
         */
        loseRate() {
            return this.form.loseRate
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm lấy nguyên giá từ form để sử dụng watch, (watch thuộc tính)
        */
        price() {
            return this.form.price
        }
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Hàm khỏi tạo giá trị cho dữ liệu form trong trường hợp form là form eidt hoạc form nhân bản
     */
    beforeMount() {
        // gọi api để lấy dữ liệu về tài sản được chọn
        if (this.assetId) {
            axios.get(`${BASE_API_URL}assets/${this.assetId}`)
                .then(({ data }) => {
                    const department = this.$store.getters.departmentById(data.departmentId)
                    const assetType = this.$store.getters.assetTypeById(data.assetTypeId)
                    this.form.assetCode = data.assetCode
                    this.form.assetName = data.assetName
                    this.form.departmentCode = department.departmentCode
                    this.form.assetTypeCode = assetType.assetTypeCode
                    this.form.quantity = data.quantity
                    this.form.price = data.price
                    this.form.useDuration = data.useDuration
                    this.form.loseRate = data.loseRate
                    this.form.trackYear = data.trackYear
                    this.form.buyDate = data.buyDate.substring(0, 10)
                    this.form.useDate = data.useDate.substring(0, 10)
                })
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
                // nếu ấn đang ở input đầu tiên mà ấn shift tab thì đến thằng button cuối cùng
                if (event.shiftKey) {
                    if (this.$refs.assetCode.querySelector('input:focus')) {
                        this.$refs.submitButton.querySelector('button').focus();
                        // this.$refs.submitButton.querySelectorAll('button')[1].focus();
                        event.preventDefault()
                    }
                    // nếu như button cuối cùng đang được focus mà ấn tab thì sẽ focus quay trở về input đầu tiên
                } else {
                    if (this.$refs.submitButton.querySelector('button:focus')) {
                        this.$refs.assetCode.querySelector('input').focus()
                        event.preventDefault();
                    }
                }
            }
            // kiểm tra nếu người dùng ấn ctrl s thì submimt form
            else if (event.key == 's') {
                if (event.ctrlKey) {
                    this.handleSubmit()
                    event.preventDefault()
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
            // kiểm tra xem người dùng đã thay nhập vào input nào chưa và kiểu form là edit
            if (this.isChanged && this.typeForm == this.$enum.typeForm.edit)
                this.isShowStore = true
            else
                this.isShowCancel = true
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
            this.emitter.emit("setToastMessage", this.toastMessages.addAssetSuccess[this.$store.state.language]);
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: xử lý việc sửa dữ liệu, gọi api. hiện thông báo tương ứng ...
         */
        handleEdit() {
            axios.put(`${BASE_API_URL}assets/${this.assetId}`, {
                assetCode: this.form.assetCode,
                departmentId: this.$store.getters.departmentByCode(this.form.departmentCode).departmentId,
                assetTypeId: this.$store.getters.assetTypeByCode(this.form.assetTypeCode).assetTypeId,
                assetName: this.form.assetName,
                quantity: this.form.quantity,
                price: this.form.price,
                useDuration: this.form.useDuration,
                trackYear: this.form.trackYear,
                buyDate: this.form.buyDate,
                useDate: this.form.useDate,
                loseRate: this.form.loseRate,
                loseRateYear: this.form.loseRateYear
            }).then(({ data }) => {
                console.log(data);
                // emit sự kiện đóng form cho component cha
                this.$emit('clickClose')
                // hiện thông báo
                this.emitter.emit("setToastMessage", this.toastMessages.editAssetSuccess[this.$store.state.language]);

            })
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
            this.emitter.emit("setToastMessage", this.toastMessages.duplicateAssetSuccess[this.$store.state.language]);
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: xử lý sự kiện khi người dùng ấn nút lưu
       */
        handleSubmit() {
            this.isShowStore = false
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
            // thực hiện sửa nếu form là edit
            if (this.typeForm == this.$enum.typeForm.edit) {
                this.handleEdit()
            }
            // thực hiện nhân bản nếu form là duplicate
            else if (this.typeForm == this.$enum.typeForm.duplicate)
                this.handleDuplicate()
            // thự hiện lưu
            else
                this.handleStore()
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
            // else if (!this.validateInterger(this.form.price))
            //     this.errors.price = 'Cần nhập nguyên giá là số nguyên'
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
            if (!this.validateRequired(this.form.loseRateYear)) {
                this.errors.loseRateYear = 'Cần nhập giá trị hao mòn năm'
                return
            }
            // kiểm tra giá trị hao mòn năm phải bằng tỷ lệ hao mòn* Nguyên giá
            if (this.form.loseRate && this.form.price) {
                if (this.loseRateYearValue != this.form.loseRateYear) {
                    this.errors.loseRateYear = 'Giá trị hao mòn năm phải bằng tỷ lệ hao mòn* Nguyên giá'
                    return
                }
            }
            //kiểm tra hao mòn năm phải nhỏ hơn hoạc bằng nguyên giá
            if (Number.parseInt(this.form.loseRateYear) > Number.parseInt(this.form.price)) {
                this.errors.loseRateYear = 'Hao mòn năm phải nhỏ hơn hoạc bằng nguyên giá'
                return
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
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Lắng nghe sự thay đổi của form để sử lý các sự kiện như tự chọn tên bộ phận sử dụng, tên loại tài sản...
         */
        form: {
            handler() {
                // đánh dấu form đã được thay đổi
                this.isChanged = true
                // nếu departmentCode thay đổi thì tự động điền cho departmentName
                if (this.form.departmentCode) {
                    this.form.departmentName = this.$store.state.departments.data.find(department => department.departmentCode == this.form.departmentCode).departmentName
                }
                // nếu assetTypeCode thay đổi thì tự động điền cho assetTypeName
                if (this.form.assetTypeCode)
                    this.form.assetTypeName = this.$store.state.assetTypes.data.find(assettype => assettype.assetTypeCode == this.form.assetTypeCode).assetTypeName
            },
            deep: true
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: tính giá trị của hao mòn năm khi tỷ lệ hao mòn thay đổi
        */
        loseRate() {
            this.form.loseRateYear = this.loseRateYearValue
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: tính giá trị của hao mòn năm khi nguyên giá thay đổi
        */
        price() {
            this.form.loseRateYear = this.loseRateYearValue
        }
    },
    components: { MisaTextfieldForm, MisaNumberForm, MisaInputDate, MisaCombobox, ThePopup, MisaDialog, MisaButton }
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