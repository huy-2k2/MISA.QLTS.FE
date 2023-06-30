<template>
    <div class="form">
        <div class="form__top">
            <div class="form__head">
                <h3 class="form__title">{{ formTitle }}</h3>
            </div>
            <div class="form__body">
                <div ref="fixedAssetCode" class="form__body__item form__body__item--1">
                    <MisaTextfieldForm @blur="validateFixedAssetCode" :error="errors.fixedAssetCode"
                        v-model="form.fixedAssetCode" :label="resource.fieldName.fixedAssetCode"
                        :placeholder="resource.placeholder.input.format(resource.fieldName.fixedAssetCode)">
                    </MisaTextfieldForm>
                </div>
                <div ref="fixedAssetName" class="form__body__item form__body__item--2">
                    <MisaTextfieldForm @blur="validateFixedAssetName" :error="errors.fixedAssetName"
                        v-model="form.fixedAssetName" :label="resource.fieldName.fixedAssetName"
                        :placeholder="resource.placeholder.input.format(resource.fieldName.fixedAssetName)">
                    </MisaTextfieldForm>
                </div>
                <div ref="departmentCode" class="form__body__item form__body__item--1">
                    <MisaCombobox fieldText="departmentName" fieldValue="departmentCode"
                        :isLoading="$store.state.fa.departments.isLoading" :data="$store.state.fa.departments.data"
                        :typeCombobox="$enum.typeCombobox.tableOption" @blurcombobox="validateDepartmentCode"
                        :error="errors.departmentCode" v-model="form.departmentCode"
                        :label="resource.fieldName.departmentCode"
                        :placeholder="resource.placeholder.combobox.format(resource.fieldName.departmentCode)"
                        @enter="handleEnterToTab('fixedAssetCategoryCode')">
                    </MisaCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <MisaTextfieldForm v-model="form.departmentName" :disable="true"
                        :label="resource.fieldName.departmentName" :required="false"
                        :placeholder="resource.placeholder.input.format(resource.fieldName.departmentName)">
                    </MisaTextfieldForm>
                </div>
                <div ref="fixedAssetCategoryCode" class="form__body__item form__body__item--1">
                    <MisaCombobox fieldText="fixedAssetCategoryName" fieldValue="fixedAssetCategoryCode"
                        :isLoading="$store.state.fa.fixedAssetCategorys.isLoading"
                        :data="$store.state.fa.fixedAssetCategorys.data" :typeCombobox="$enum.typeCombobox.tableOption"
                        @blurcombobox="validateFixedAssetCategoryCode" :error="errors.fixedAssetCategoryCode"
                        v-model="form.fixedAssetCategoryCode" :label="resource.fieldName.fixedAssetCategoryCode"
                        :placeholder="resource.placeholder.combobox.format(resource.fieldName.fixedAssetCategoryCode)"
                        @enter="handleEnterToTab('quantity')">
                    </MisaCombobox>
                </div>
                <div class="form__body__item form__body__item--2">
                    <MisaTextfieldForm v-model="form.fixedAssetCategoryName" :disable="true" :required="false"
                        :label="resource.fieldName.fixedAssetCategoryName"
                        :placeholder="resource.placeholder.input.format(resource.fieldName.fixedAssetCategoryName)">
                    </MisaTextfieldForm>
                </div>
                <div ref="quantity" class="form__body__item form__body__item--1">
                    <MisaNumberForm :placeholder="resource.placeholder.input.format(resource.fieldName.quantity)"
                        :currrency="true" @blur="validateQuantity" :error="errors.quantity"
                        :label="resource.fieldName.quantity" v-model="form.quantity" min="1">
                    </MisaNumberForm>
                </div>
                <div ref="cost" class="form__body__item form__body__item--1">
                    <MisaNumberForm :placeholder="resource.placeholder.input.format(resource.fieldName.cost)"
                        @blur="handleBlurCost" :error="errors.cost" :currrency="true" :icon="false"
                        :label="resource.fieldName.cost" :float="true" v-model="form.cost" min="0">
                    </MisaNumberForm>
                </div>
                <div ref="lifeTime" class="form__body__item form__body__item--1">
                    <MisaNumberForm :placeholder="resource.placeholder.input.format(resource.fieldName.lifeTime)"
                        @blur="handleBlurLifeTime" :error="errors.lifeTime" :currrency="true" :icon="false"
                        :label="resource.fieldName.lifeTime" v-model="form.lifeTime" min="0">
                    </MisaNumberForm>
                </div>
                <div ref="depreciationRate" class="form__body__item form__body__item--1">
                    <MisaNumberForm :placeholder="resource.placeholder.input.format(resource.fieldName.depreciationRate)"
                        @blur="handleBlurDepreciationRate" :currrency="true" :float="true" :error="errors.depreciationRate"
                        :label="resource.fieldName.depreciationRate + ' (%)'" v-model="form.depreciationRate" min="0">
                    </MisaNumberForm>
                </div>
                <div ref="depreciationAnnual" class="form__body__item form__body__item--1">
                    <MisaNumberForm @blur="validateDepreciationAnnual" :error="errors.depreciationAnnual" :currrency="true"
                        :icon="false"
                        :placeholder="resource.placeholder.input.format(resource.fieldName.depreciationAnnual)"
                        :label="resource.fieldName.depreciationAnnual" :float="true" v-model="form.depreciationAnnual"
                        min="0">
                    </MisaNumberForm>
                </div>
                <div ref="currentYear" class="form__body__item form__body__item--1">
                    <MisaNumberForm :icon="false" :disable="true" :label="resource.fieldName.trackedYear"
                        v-model="form.trackedYear" :required="false">
                    </MisaNumberForm>
                </div>
                <div ref="purchaseDate" class="form__body__item form__body__item--1">
                    <MisaInputDate @blurdate="handleBlurPurchaseDate" :error="errors.purchaseDate"
                        v-model="form.purchaseDate" :label="resource.fieldName.purchaseDate"></MisaInputDate>
                </div>
                <div ref="useDate" class="form__body__item form__body__item--1">
                    <MisaInputDate @blurdate="validateUseDate" v-model="form.useDate" :error="errors.useDate"
                        :label="resource.fieldName.useDate">
                    </MisaInputDate>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <MisaButton type="button" @click="handleCancel" :isOutline="true" :text="resource.buttons.cancel"></MisaButton>
            <div ref="submitButton">
                <MisaToolTip tooltip="Ctrl S">
                    <MisaButton :disabled="isSubmiting" @click="handleSubmit" :text="resource.buttons.save">
                    </MisaButton>
                </MisaToolTip>
            </div>
        </div>
        <MisaPopup :isShow="isShowCancel" :isHasClose="false">
            <MisaDialog :text="this.resource.dialogMessages.cancelSave" @click1="$emit('clickClose')"
                @click2="handleCloseCancel" quantity="2" :button1="this.resource.buttons.discard"
                :button2="this.resource.buttons.notConfirm">
            </MisaDialog>
        </MisaPopup>
        <MisaPopup :isShow="isShowStore" :isHasClose="false">
            <MisaDialog :text="this.resource.dialogMessages.cancelSaveChanged" @click1="handleSubmit"
                @click2="$emit('clickClose')" @click3="handleCloseStore" quantity="3" :button1="this.resource.buttons.save"
                :button3="this.resource.buttons.noSave" :button2="this.resource.buttons.discard">
            </MisaDialog>
        </MisaPopup>
        <MisaPopup :isShow="isShowError" :isHasClose="false">
            <MisaDialog :text="errorNotifi" :isHasClose="false" @click1="handleCloseError" quantity="1"
                :button1="this.resource.buttons.close">
            </MisaDialog>
        </MisaPopup>
        <MisaPopup :isShow="!isLoaded && typeForm != $enum.typeForm.add" :isHasClose="false">
            <MisaLoading></MisaLoading>
        </MisaPopup>
    </div>
</template>

<script>
import MisaNumberForm from '@/components/MisaNumberForm.vue';
import MisaTextfieldForm from '@/components/MisaTextfieldForm.vue';
import MisaInputDate from '@/components/MisaInputDate.vue';
import MisaButton from '@/components/MisaButton.vue';
import MisaCombobox from '@/components/MisaCombobox.vue';
import MisaPopup from '../components/MisaPopup.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import { editFixedAssetApi, getFixedAssetApi, getFixedAssetCodeExistedApi, getRecommendFixedAssetCodeApi, postFixedAssetApi } from '@/js/api';
import MisaLoading from '@/components/MisaLoading.vue';
import MisaToolTip from '../components/MisaToolTip.vue';

export default {
    props: {
        typeForm: String,
        fixedAssetId: String
    },
    data() {
        return {
            isShowError: false,
            isChanged: false,
            isShowStore: false,
            isShowCancel: false,
            isLoaded: false,
            isSubmiting: false,
            form: {
                quantity: '1',
                trackedYear: new Date().getFullYear(),
                purchaseDate: this.convert.toCurrentDate(),
                useDate: this.convert.toCurrentDate(),
                cost: '0',
                lifeTime: '0',
                depreciationRate: '0',
                depreciationAnnual: '0'
            },
            errors: {},
            eventKeyDown: null,
        }
    },
    computed: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Tạo error validate cho dialog khi người dùng ấn submit
         */
        errorNotifi() {
            return Object.values(this.errors).map(error => error ? `<p>- ${this.convert.toUpperFirstChar(error)}.</p>` : '').join('')
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm tính giá trị hao mòn năm từ tỷ lệ hao mòn và nguyên giá
         */
        depreciationAnnualValue() {
            // kiểm tra xem người dùng đã nhập nguyên giá và tỷ lệ hao mòn chưa
            if (this.form.depreciationRate && this.form.cost) {
                // kiểm tra xem giá trị hao mòn năm có phải là số nguyên không
                if (Number.isInteger(Number.parseFloat(this.convert.toRounded(this.form.depreciationRate / 100 * this.form.cost)))) {
                    return Number.parseInt(this.form.depreciationRate / 100 * this.form.cost)
                }
                // Nếu hao mòn năm không là số nguyên thì làm tròn 2 số sau phần thập phân
                else {
                    return this.convert.toRounded(this.form.depreciationRate / 100 * this.form.cost)
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
            return this.resource.formTitle[this.typeForm]
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm lấy tỷ lệ hao mòn từ form để sử dụng watch, (watch thuộc tính)
         */
        depreciationRate() {
            return this.form.depreciationRate
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm lấy nguyên giá từ form để sử dụng watch, (watch thuộc tính)
        */
        cost() {
            return this.form.cost
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm lấy mã bộ phận từ form để sử dụng watch, (watch thuộc tính)
         */
        departmentCode() {
            return this.form.departmentCode
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm lấy mã loại tài sản form để sử dụng watch, (watch thuộc tính)
        */
        fixedAssetCategoryCode() {
            return this.form.fixedAssetCategoryCode
        }
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Hàm khỏi tạo giá trị cho dữ liệu form trong trường hợp form là form eidt hoạc form nhân bản
     */
    beforeMount() {
        // dùng 2 biến bool để kiểm tra cả hai câu lệnh gọi api đề đã thực hiện xong
        let isGetFixedAssetSuccess = !this.fixedAssetId
        let isGetAssetCodeSuccess = this.typeForm == this.$enum.typeForm.edit
        // gọi api để lấy dữ liệu về tài sản được chọn
        if (this.fixedAssetId) {
            getFixedAssetApi(this.fixedAssetId, (data) => {
                const department = this.$store.getters.departmentById(data.department_id)
                const fixedAssetCategory = this.$store.getters.fixedAssetCategoryById(data.fixed_asset_category_id)
                this.form.fixedAssetName = data.fixed_asset_name
                this.form.departmentCode = department.departmentCode
                this.form.departmentName = department.departmentName
                this.form.fixedAssetCategoryCode = fixedAssetCategory.fixedAssetCategoryCode
                this.form.fixedAssetCategoryName = fixedAssetCategory.fixedAssetCategoryName
                this.form.quantity = data.quantity
                this.form.cost = this.convert.toRounded(data.cost)
                this.form.lifeTime = data.life_time
                this.form.depreciationRate = this.convert.toRounded(data.depreciation_rate)
                this.form.depreciationAnnual = this.convert.toRounded(data.depreciation_annual)
                this.form.trackedYear = data.tracked_year
                this.form.purchaseDate = data.purchase_date.substring(0, 10)
                this.form.useDate = data.use_date.substring(0, 10)
                if (this.typeForm == this.$enum.typeForm.edit)
                    this.form.fixedAssetCode = data.fixed_asset_code
                // đánh dấu là đã lấy dữ liệu thành công
                isGetFixedAssetSuccess = true
                // nếu lấy mã code thành công thì load thành công
                if (isGetAssetCodeSuccess) {
                    this.$nextTick(() => this.isLoaded = true)
                }
            }, () => this.$emit('clickClose'))
        }
        // nếu là form thêm mới hoạc duplicate thì lấy gợi ý mã tài sản
        if (this.typeForm != this.$enum.typeForm.edit) {
            getRecommendFixedAssetCodeApi((data) => {
                this.form.fixedAssetCode = `${data}`
                // đánh dấu lấy data thành công
                isGetAssetCodeSuccess = true
                // nếu lấy tài sản thành công thì đánh dấu là load thành công
                if (isGetFixedAssetSuccess) {
                    this.$nextTick(() => this.isLoaded = true)
                }
            }, () => this.$emit('clickClose'))
        }
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 30/04/2023
    * description: Focus vào input đầu tiên khi mở form, và xử lý sự kiện taborder cho  form
    */
    mounted() {
        this.$refs.fixedAssetCode.querySelector('input').focus()
        this.eventKeyDown = (event) => {
            if (event.key == 'Tab') {
                // nếu ấn đang ở input đầu tiên mà ấn shift tab thì đến thằng button cuối cùng
                if (event.shiftKey) {
                    if (this.$refs.fixedAssetCode.querySelector('input:focus')) {
                        this.$refs.submitButton.querySelector('button').focus();
                        event.preventDefault()
                    }
                    // nếu như button cuối cùng đang được focus mà ấn tab thì sẽ focus quay trở về input đầu tiên
                } else {
                    if (this.$refs.submitButton.querySelector('button:focus')) {
                        this.$refs.fixedAssetCode.querySelector('input').focus()
                        event.preventDefault();
                    }
                }
            }
            // kiểm tra nếu người dùng ấn ctrl s thì submimt form
            else if (event.key == 's' || event.key == 'S') {
                if (event.ctrlKey) {
                    this.handleSubmit()
                    event.preventDefault()
                }
            }
            console.log(event)
        }
        window.addEventListener('keydown', this.eventKeyDown)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: bỏ lắng nghe các sự kiện khi unmount
     */
    unmounted() {
        window.removeEventListener('keydown', this.eventKeyDown)
    },
    methods: {

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: các combobox khi ấn enter thì chuyển sang input tiếp theo, nên cần có sự kiện enter cho combobox
       */
        handleEnterToTab(nextInput) {
            const input = this.$refs[nextInput].querySelector('input')
            input.focus()
            input.select()
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur nguyên giá thì validate lại giá trị hao mòn năm
        */
        handleBlurCost() {
            this.validateCost()
            if (this.form.depreciationAnnual?.toString().length)
                this.validateDepreciationAnnual()
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur tỷ lệ hao mòn thì valiate lại giá trị hao mòn năm
        */
        handleBlurDepreciationRate() {
            this.validateDepreciationRate()
            if (this.form.depreciationAnnual)
                this.validateDepreciationAnnual()
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: khi blur ngày mua thì valiate lại ngày sử dụng
         */
        handleBlurPurchaseDate() {
            this.validatePurchaseDate()
            if (this.form.useDate)
                this.validateUseDate()
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: khi blur số năm sử dụng thì validate luôn tỉ lệ hao mòn
        */
        handleBlurLifeTime() {
            this.validateLifeTime()
            if (this.form.depreciationRate?.toString().length)
                this.validateDepreciationRate()
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
            this.$refs.fixedAssetCode.querySelector('input').focus()
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 07/05/2023
         * description: khi đóng dialog xác nhận lưu form thì focus vào ô input đầu tiên
         */
        handleCloseStore() {
            this.isShowStore = false
            this.$refs.fixedAssetCode.querySelector('input').focus()
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
         * description: xử lý việc sửa dữ liệu, gọi api. hiện thông báo tương ứng ...
         */
        handleEdit() {
            // tạo query body
            const putBody = {
                fixed_asset_code: this.form.fixedAssetCode,
                fixed_asset_name: this.form.fixedAssetName,
                department_id: this.$store.getters.departmentByCode(this.form.departmentCode).departmentId,
                fixed_asset_category_id: this.$store.getters.fixedAssetCategoryByCode(this.form.fixedAssetCategoryCode).fixedAssetCategoryId,
                quantity: this.form.quantity,
                cost: this.form.cost,
                life_time: this.form.lifeTime,
                tracked_year: this.form.trackedYear,
                purchase_date: this.form.purchaseDate,
                use_date: this.form.useDate,
                depreciation_rate: this.form.depreciationRate,
                depreciation_annual: this.form.depreciationAnnual
            }
            // submit
            editFixedAssetApi(this.fixedAssetId, putBody, () => {
                // emit sự kiện đóng form cho component cha
                this.$emit('clickClose')
                // hiện thông báo
                this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                this.$store.dispatch("getFilterFixedAsset")
                this.isSubmiting = false
            }, () => this.isSubmiting = false)
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: xử lý việc nhân bản dữ liệu, gọi api. hiện thông báo tương ứng ...
        */
        handleStore() {
            const postBody = {
                fixed_asset_code: this.form.fixedAssetCode,
                fixed_asset_name: this.form.fixedAssetName,
                department_id: this.$store.getters.departmentByCode(this.form.departmentCode).departmentId,
                fixed_asset_category_id: this.$store.getters.fixedAssetCategoryByCode(this.form.fixedAssetCategoryCode).fixedAssetCategoryId,
                quantity: this.form.quantity,
                cost: this.form.cost,
                life_time: this.form.lifeTime,
                tracked_year: this.form.trackedYear,
                purchase_date: this.form.purchaseDate,
                use_date: this.form.useDate,
                depreciation_rate: this.form.depreciationRate,
                depreciation_annual: this.form.depreciationAnnual
            }
            postFixedAssetApi(postBody, () => {
                // emit sự kiện đóng form cho component cha
                this.$emit('clickClose')
                // hiện thông báo
                this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                // tải lại danh sách tài sản
                this.$store.dispatch("getFilterFixedAsset")

                this.isSubmiting = false
            }, () => this.isSubmiting = false)
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: xử lý sự kiện khi người dùng ấn nút lưu
       */
        async handleSubmit() {
            console.log('submit form add');
            this.isSubmiting = true
            this.isShowStore = false
            this.errors = {}
            // validate lại tất cả các input, thứ tự validate sẽ ảnh hướng đến input đầu tiên được focus khi gặp lỗi
            await this.validateFixedAssetCode()
            this.validateFixedAssetName()
            this.validateDepartmentCode()
            this.validateFixedAssetCategoryCode()
            this.validateQuantity()
            this.validateCost()
            this.validateLifeTime()
            this.validateDepreciationRate()
            this.validateDepreciationAnnual()
            this.validatePurchaseDate()
            this.validateUseDate()
            // kiểm tra xem có error nào không, nếu có thì kết thúc hàm
            for (const property in this.errors) {
                if (this.errors[property]) {
                    this.isShowError = true
                    this.isSubmiting = false
                    return
                }
            }
            // thực hiện sửa nếu form là edit
            if (this.typeForm == this.$enum.typeForm.edit) {
                this.handleEdit()
            }
            // với nhận bản hoạc thêm
            else {
                this.handleStore()
            }
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường fixedAssetCode
        */
        async validateFixedAssetCode() {
            const fieldName = this.resource.fieldName.fixedAssetCode
            let length = { min: 0, max: 100 }
            // gán lại cho error là rỗng
            this.errors.fixedAssetCode = ''
            // kiểm tra fixedAssetCode khác rỗng
            if (!this.validateRequired(this.form.fixedAssetCode)) {
                this.errors.fixedAssetCode = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra fixedAssetCode có length hợp lệ
            else if (!this.validateLength(this.form.fixedAssetCode, length.min, length.max)) {
                this.errors.fixedAssetCode = this.resource.validateMessage.length.format(fieldName, length.min, length.max)
            }
            else {
                // nếu là form thêm thêm hoạc nhân bản thì id không cần thiết
                const id = this.typeForm == this.$enum.typeForm.edit ? this.fixedAssetId : ''
                const response = await getFixedAssetCodeExistedApi(this.form.fixedAssetCode, id)
                if (response) {
                    this.errors.fixedAssetCode = this.resource.validateMessage.duplicate.format(fieldName)
                }
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường fixedAssetCategoryName
         */
        validateFixedAssetName() {
            const fieldName = this.resource.fieldName.fixedAssetName
            let length = { min: 0, max: 255 }
            // gán lại error là rỗng
            this.errors.fixedAssetName = ''
            // kiểm tra  fixedAssetName khác rỗng
            if (!this.validateRequired(this.form.fixedAssetName)) {
                this.errors.fixedAssetName = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra fixedAssetName có length hợp lệ
            else if (!this.validateLength(this.form.fixedAssetName, length.min, length.max)) {
                this.errors.fixedAssetName = this.resource.validateMessage.length.format(fieldName, length.min, length.max)
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường departmentcode
         */
        validateDepartmentCode() {
            const fieldName = this.resource.fieldName.departmentCode
            // gán lại error là rỗng
            this.errors.departmentCode = ''
            // kiểm tra  departmentcode khác rỗng
            if (!this.validateRequired(this.form.departmentCode)) {
                this.errors.departmentCode = this.resource.validateMessage.required.format(fieldName)
            }
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường fixedAssetCategorycode
        */
        validateFixedAssetCategoryCode() {
            const fieldName = this.resource.fieldName.fixedAssetCategoryCode
            // gán lại error là rỗng
            this.errors.fixedAssetCategoryCode = ''
            // kiểm tra  fixedAssetCategorycode khác rỗng
            if (!this.validateRequired(this.form.fixedAssetCategoryCode)) {
                this.errors.fixedAssetCategoryCode = this.resource.validateMessage.required.format(fieldName)
            }
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường purchaseDate
        */
        validatePurchaseDate() {
            const fieldName = this.resource.fieldName.purchaseDate
            // gán lại error là rỗng
            this.errors.purchaseDate = ''
            // kiểm tra purchaseDate khác rỗng
            if (!this.validateRequired(this.form.purchaseDate)) {
                this.errors.purchaseDate = this.resource.validateMessage.required.format(fieldName)
            }
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/04/2023
       * description: hàm validate trường usedate
       */
        validateUseDate() {
            const fieldName = this.resource.fieldName.useDate
            // gán lại error là rỗng
            this.errors.useDate = ''
            // kiểm tra usedate khác rỗng
            if (!this.validateRequired(this.form.useDate)) {
                this.errors.useDate = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra use date phải sau purchaseDate
            else if (this.form.purchaseDate && this.form.useDate && this.form.purchaseDate > this.form.useDate) {
                this.errors.useDate = this.resource.validateMessage.higher.format(fieldName, this.resource.fieldName.purchaseDate)
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường quantity
         */
        validateQuantity() {
            const fieldName = this.resource.fieldName.quantity
            // gán lại error là rỗng
            this.errors.quantity = ''
            // kiểm tra quantity khác rỗng
            if (!this.validateRequired(this.form.quantity)) {
                this.errors.quantity = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra quantity phải là số nguyên
            else if (!this.validateInterger(this.form.quantity)) {
                this.errors.quantity = this.resource.validateMessage.interger.format(fieldName)
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường cost
         */
        validateCost() {
            const fieldName = this.resource.fieldName.cost
            // gán lại error là rỗng
            this.errors.cost = ''
            //kiểm tra cost khác rỗng
            if (!this.validateRequired(this.form.cost)) {
                this.errors.cost = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra cost là số nguyên
            else if (!this.validateInterger(this.form.cost)) {
                this.errors.cost = this.resource.validateMessage.interger.format(fieldName)
            }
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: hàm validate trường lifeTime
        */
        validateLifeTime() {
            const max = 10000
            const fieldName = this.resource.fieldName.lifeTime
            // gán lại error là rỗng
            this.errors.lifeTime = ''
            // kiểm tra lifeTime khác rỗng
            if (!this.validateRequired(this.form.lifeTime)) {
                this.errors.lifeTime = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra lifeTime là số nguyên
            else if (!this.validateInterger(this.form.lifeTime)) {
                this.errors.lifeTime = this.resource.validateMessage.interger.format(fieldName)
            }
            // kiểm tra là số dương
            else if (this.form.lifeTime <= 0) {
                this.errors.lifeTime = this.resource.validateMessage.positive.format(fieldName)
            }
            else if (this.form.lifeTime > max) {
                this.errors.lifeTime = this.resource.validateMessage.lower.format(fieldName, max)
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường lifeTime
         */
        validateDepreciationRate() {
            const fieldName = this.resource.fieldName.depreciationRate
            const max = 100
            // gán lại error là rỗng
            this.errors.depreciationRate = ''
            // kiểm tra lifeTime khác rỗng
            if (!this.validateRequired(this.form.depreciationRate)) {
                this.errors.depreciationRate = this.resource.validateMessage.required.format(fieldName)
            }
            // kiểm tra lifeTime là số thực
            else if (!this.validateRealNumber(this.form.depreciationRate)) {
                this.errors.depreciationRate = this.resource.validateMessage.realNumber.format(fieldName)
            }
            else if (this.form.depreciationRate <= 0) {
                this.errors.depreciationRate = this.resource.validateMessage.positive.format(fieldName)
            }
            else if (this.form.depreciationRate > max) {
                this.errors.depreciationRate = this.resource.validateMessage.lower.format(fieldName, max)
            }

            // kiểm tra Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng
            else if (this.convert.toRounded(1 / this.form.lifeTime * 100) != this.convert.toRounded(this.form.depreciationRate)) {
                this.errors.depreciationRate = this.resource.validateMessage.equal.format(fieldName, `1 / ${this.resource.fieldName.lifeTime}`)
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: hàm validate trường depreciationAnnual
         */
        validateDepreciationAnnual() {
            const fieldName = this.resource.fieldName.depreciationAnnual
            // gán lại error là rỗng
            this.errors.depreciationAnnual = ''
            // kiểm tra depreciationAnnual khác rỗng
            if (!this.validateRequired(this.form.depreciationAnnual)) {
                this.errors.depreciationAnnual = this.resource.validateMessage.required.format(fieldName)
                return
            }
            // kiểm tra giá trị hao mòn năm phải bằng tỷ lệ hao mòn* Nguyên giá
            if (this.form.depreciationRate && this.form.cost) {
                if (this.depreciationAnnualValue != this.form.depreciationAnnual) {
                    this.errors.depreciationAnnual = this.resource.validateMessage.equal.format(fieldName, `${this.resource.fieldName.depreciationRate} * ${this.resource.fieldName.cost}`)
                    return
                }
            }
            //kiểm tra hao mòn năm phải nhỏ hơn hoạc bằng nguyên giá
            if (Number.parseInt(this.form.depreciationAnnual) > Number.parseInt(this.form.cost)) {
                this.errors.depreciationAnnual = this.resource.validateMessage.lower.format(fieldName, this.resource.fieldName.cost)
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
            if (typeof value == 'string' && !value.trim() || value == null || value == undefined) {
                return false
            }

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
         * description: Lắng nghe sự thay đổi của form để đánh dấu form đã thay đổi
         */
        form: {
            handler() {
                // đánh dấu form đã được thay đổi   
                if (this.isLoaded)
                    this.isChanged = true
            },
            deep: true
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: tính giá trị của hao mòn năm khi tỷ lệ hao mòn thay đổi
        */
        depreciationRate() {
            if (this.isLoaded) {
                this.form.depreciationAnnual = this.depreciationAnnualValue
            }
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: tính giá trị của hao mòn năm khi nguyên giá thay đổi
        */
        cost() {
            if (this.isLoaded) {
                this.form.depreciationAnnual = this.depreciationAnnualValue
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: điền tên bộ phận sử dụng khi mã bộ phận sử dụng thay đổi
         */
        departmentCode() {
            if (this.isLoaded) {
                this.form.departmentName = this.$store.getters.departmentByCode(this.departmentCode)?.departmentName || ""
            }
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: điền tên mã loại tài sản, số năm sử dụng, tỷ lệ hoa mòn khi mã bộ phận sử dụng thay đổi
         */
        fixedAssetCategoryCode(newVal, oldVal) {
            if (this.isLoaded) {
                if (newVal != oldVal) {
                    const fixedAssetCategory = this.$store.getters.fixedAssetCategoryByCode(newVal)
                    this.form.fixedAssetCategoryName = fixedAssetCategory?.fixedAssetCategoryName || ''
                    this.form.lifeTime = fixedAssetCategory?.lifeTime || ""
                    this.form.depreciationRate = fixedAssetCategory?.depreciationRate || ""
                }
            }
        }

    },
    components: { MisaTextfieldForm, MisaNumberForm, MisaInputDate, MisaCombobox, MisaPopup, MisaDialog, MisaButton, MisaLoading, MisaToolTip }
}
</script>

<style scoped>
.form {
    border-radius: var(--radius-border);
    overflow: hidden;
    resize: horizontal;
    max-width: calc(100vw - 80px);
    min-width: 812px;
    width: 812px;
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

.form__body {
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    width: 100%;
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