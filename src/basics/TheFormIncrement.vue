<template>
    <div v-show="!isShowChoseFixedAssetForm" class="form">
        <div class="form__head">
            <h3 v-if="typeForm == $enum.typeForm.add" class="form__title">{{ resource.formTitle.addIncrement }}</h3>
            <h3 v-if="typeForm == $enum.typeForm.edit" class="form__title">{{ resource.formTitle.editIncrement }}</h3>
        </div>
        <div class="form__top">
            <h4 class="form__top__title">{{ resource.formTitle.infoIncrement }}</h4>
            <div class="form__top__body">
                <div class="form__top__fields">
                    <div ref="licenseCode" class="form__top__field">
                        <MisaTextfieldForm @blur="validateLicenseCode" :error="errors.licenseCode"
                            v-model="form.license_code"
                            :placeholder="resource.placeholder.input.format(resource.fieldName.incrementCode)"
                            :label="resource.fieldName.incrementCode"></MisaTextfieldForm>
                    </div>
                    <div ref="useDay" class="form__top__field">
                        <MisaInputDate @blurdate="validateUseDay" :error="errors.useDay" v-model="form.use_day"
                            :label="resource.fieldName.useDate">
                        </MisaInputDate>
                    </div>
                    <div ref="createDay" class="form__top__field">
                        <MisaInputDate @blurdate="validateCreateDay" :error="errors.createDay" v-model="form.create_day"
                            :label="resource.fieldName.incrementDay"></MisaInputDate>
                    </div>
                </div>
                <div class="form__top__fields">
                    <div class="form__top__field--full">
                        <MisaTextfieldForm :required="false" v-model="form.content"
                            :placeholder="resource.placeholder.input.format(resource.fieldName.note)"
                            :label="resource.fieldName.note"></MisaTextfieldForm>
                    </div>
                </div>
            </div>
        </div>
        <div class="form__bottom">
            <h4 class="form__bottom__title">{{ resource.formTitle.detailIncrement }}</h4>
            <div class="form__bottom__head">
                <div class="form__bottom__field">
                    <MisaTextField v-model="textSearch" @keyupinput="handleSearch" icon="icon-search"
                        :placeholder="resource.placeholder.searchFixedAsset"></MisaTextField>
                </div>
                <div ref="selectedFixedAssets">
                    <MisaButton @clickButton="isShowChoseFixedAssetForm = true" :shadow="true"
                        :text="resource.buttons.choseFixedAsset" :isOutline="true"></MisaButton>
                </div>

            </div>
            <div class="form__bottom__table">
                <MisaTable :contextMenu="[resource.contextMenu.add, resource.contextMenu.edit, resource.contextMenu.delete]"
                    @setPage="handleSetPage" @setPageSize="handleSetPageSize" :isDisplayFeature="false"
                    @context_0="isShowChoseFixedAssetForm = true" @context_1="handleEditFixedAsset"
                    @context_2="handleRemoveFixedAsset" @feature_0="handleEditFixedAsset"
                    @feature_1="handleRemoveFixedAsset" :footer="footer" @dbClickTr="handleEditFixedAsset"
                    :bodyData="bodyData" :headData="headTable.headSelectedFixedAssetTable">
                </MisaTable>
            </div>
        </div>
        <div class="form__footer">
            <MisaButton @clickButton="isShowCancel = true" :shadow="true" :text="resource.buttons.cancel" :isOutline="true">
            </MisaButton>
            <MisaToolTip tooltip="Ctrl S">
                <div ref="submitButton">
                    <MisaButton :isLoading="isSubmiting" @clickButton="handleSubmit" :shadow="true"
                        :text="resource.buttons.save"></MisaButton>
                </div>
            </MisaToolTip>
        </div>
    </div>
    <MisaPopup :isShow="isShowChoseFixedAssetForm" :isHasClose="true" @close="isShowChoseFixedAssetForm = false">
        <TheFormSelectIncrement :licenseId="typeForm != $enum.typeForm.edit ? null : licenseId"
            @clickClose="isShowChoseFixedAssetForm = false">
        </TheFormSelectIncrement>
    </MisaPopup>
    <MisaPopup :isShow="isShowEditFixedAssetForm" :isHasClose="true" @close="isShowEditFixedAssetForm = false">
        <TheFormEditFixedAsset :fixedAssetId="fixedAssetId" @clickClose="isShowEditFixedAssetForm = false">
        </TheFormEditFixedAsset>
    </MisaPopup>
    <MisaPopup :isShow="isShowCancel" :isHasClose="false">
        <MisaDialog
            :text="this.resource.dialogMessages[typeForm == $enum.typeForm.edit ? 'cancelSaveEditLicense' : 'cancelSaveLicense']"
            @click1="$emit('clickClose')" @click2="this.isShowCancel = false" quantity="2"
            :button1="this.resource.buttons.discard" :button2="this.resource.buttons.notConfirm">
        </MisaDialog>
    </MisaPopup>
    <MisaPopup :isShow="isShowError" :isHasClose="false">
        <MisaDialog :text="errorNotifi" :isHasClose="false" @click1="handleCloseError" quantity="1"
            :button1="this.resource.buttons.close">
        </MisaDialog>
    </MisaPopup>
    <MisaPopup :isShow="isLoading" :isHasClose="false">
        <MisaLoading></MisaLoading>
    </MisaPopup>
</template>

<script>
import MisaTextfieldForm from '@/components/MisaTextfieldForm.vue'
import MisaInputDate from '@/components/MisaInputDate.vue';
import MisaTextField from '@/components/MisaTextField.vue';
import MisaButton from '@/components/MisaButton.vue';
import MisaTable from '@/components/MisaTable.vue';
import MisaPopup from '@/components/MisaPopup.vue';
import TheFormSelectIncrement from '@/basics/TheFormSelectIncrement.vue';
import TheFormEditFixedAsset from '@/basics/TheFormEditFixedAsset.vue';
import { getLicenseByIdApi, getLicenseCodeExistedApi, getListFixedAssetByLicenseId, getRecommendLicenseCodeApi, postLicenseApi, putLicenseApi } from '@/js/api';
import { DEFAULT_PAGE_SIZE } from '@/config';
import MisaDialog from '@/components/MisaDialog.vue';
import MisaLoading from '@/components/MisaLoading.vue';
import MisaToolTip from '@/components/MisaToolTip.vue';
export default {
    emits: ['clickClose', 'doneSubmitAdd'],
    components: { MisaToolTip, MisaTextfieldForm, MisaInputDate, MisaTextField, MisaButton, MisaTable, MisaPopup, MisaDialog, TheFormSelectIncrement, TheFormEditFixedAsset, MisaLoading },
    props: {
        // type form là sửa hoạc thêm
        typeForm: {
            type: String
        },

        // id chứng từ trong trường hợp form sửa
        licenseId: {
            type: String
        }
    },
    data() {
        return {
            // điểu khiển hiện thị của form chọn tài sản
            isShowChoseFixedAssetForm: false,

            // điều khiển hiển thị của form sửa tài sản
            isShowEditFixedAssetForm: false,

            // từ khóa tìm kiếm tài sản
            textSearch: "",

            // điều khiển hiện thị của dialog hủy
            isShowCancel: false,

            // điểu khiển hiển thị của dialog error
            isShowError: false,

            // đánh dấu là đang load dữ liệu
            isLoading: false,

            // sự kiện người dùng ấn phím
            eventKeyDown: null,

            // đánh dấu là đang submit dữ liệu
            isSubmiting: false,

            // chứa thông tin lỗi validate
            errors: {},

            // id tài sản để truyền vào form sửa tài sản
            fixedAssetId: null,

            // dữ liệu của form chứng từ
            form: {
                use_day: this.convert.toCurrentDate(),
                create_day: this.convert.toCurrentDate(),
            },

            // dữ liệu của table 
            bodyData: {
                features: [
                    {
                        tooltip: this.resource.tooltip.edit,
                        icon: 'icon-pen-edit',
                    },
                    {
                        tooltip: this.resource.tooltip.delete,
                        icon: 'icon-bin'
                    }
                ],
                body: [
                ],
                listId: []
            },

            // footer của table
            footer: {
                paging: {
                    totalData: 0,
                    pageSize: DEFAULT_PAGE_SIZE,
                    currentPage: 1,
                },
                data: [
                ]
            }
        }
    },
    methods: {
        /**
         * @description: xử lý sự kiện khi đóng dialog message lỗi
         * @author: NQ Huy 04/05/2023
         */
        handleCloseError() {
            //  đóng dialog thì focus vào field lỗi đầu tiên
            for (const p in this.errors) {
                if (this.errors[p]) {
                    console.log(p);
                    const input = this.$refs[p]?.querySelector("input")
                    const button = this.$refs[p]?.querySelector("button")
                    if (input) {
                        input.focus()
                    } else if (button) {
                        button.focus()
                    }
                    break
                }
            }
            this.isShowError = false
        },

        /**
       * @description: xử lý sự kiện khi đóng submit form
       * @author: NQ Huy 04/05/2023
       */
        async handleSubmit() {
            try {
                this.isSubmiting = true
                // validate các trường dữ liệu
                await this.validateLicenseCode()
                this.validateUseDay()
                this.validateCreateDay()
                this.validateSelectedFixedAssets()


                if (this.errorNotifi) {
                    this.isShowError = true
                    this.isSubmiting = false
                }
                // trong trường hợp validate không có lỗi
                else {
                    // tạo danh sách tài sản, trong mỗi tài sản thì có nhiều kinh phí
                    const list_fixed_asset = this.$store.state.ls.selectedFixedAssets.allData.map(fa => {
                        return {
                            fixed_asset_id: fa.fixed_asset_id,
                            license_detail_id: fa.license_detail_id,
                            budgets: this.$store.getters.budgetDetailByFixedAssetId(fa.fixed_asset_id)?.budgets
                        }
                    })

                    // tạo body request theo form của backend
                    const bodyRequest = {
                        list_fixed_asset: list_fixed_asset.reverse(),
                        license: this.form,
                        list_fixed_asset_id_delete: this.$store.state.ls.listIdDeleted.licenseDetail,
                        list_budget_detail_id_delete: this.$store.state.ls.listIdDeleted.budgetDetail,
                    }
                    // tronng trường hợp form là thêm
                    if (this.typeForm == this.$enum.typeForm.add) {
                        // gọi api để post dữ liệu
                        await postLicenseApi(bodyRequest)
                        // emit sự kiện đóng form cho component cha
                        this.$emit('clickClose')
                        // hiện thông báo
                        this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                        this.$emit('doneSubmitAdd')

                    }
                    // trong trường hợp form là sửa
                    else if (this.typeForm == this.$enum.typeForm.edit) {
                        // put api sửa dữ liệu
                        await putLicenseApi(this.licenseId, bodyRequest)
                        this.$emit('clickClose')
                        // hiện thông báo
                        this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                        // tải lại danh sách tài sản
                        this.$store.dispatch("getFilterLicenses")
                    }
                    this.isSubmiting = false
                }
            } catch {
                this.isSubmiting = false
            }
        },

        /**
         * @description: validate mã chứng từ
         * @author: NQ Huy 04/05/2023
         */
        async validateLicenseCode() {
            this.errors.licenseCode = ""
            const length = { min: 0, max: 100 }
            const fieldName = this.resource.fieldName.incrementCode

            // valdiate required
            if (!this.validate.validateRequired(this.form.license_code)) {
                this.errors.licenseCode = this.resource.validateMessage.required.format(fieldName)
                return
            }
            // validate độ dài
            if (!this.validate.validateLength(this.form.license_code, length.min, length.max)) {
                this.errors.licenseCode = this.resource.validateMessage.length.format(fieldName, length.min, length.max)
                return
            }
            // validate mã trùng
            const licenseId = this.typeForm == this.$enum.typeForm.edit ? this.licenseId : ""
            const { data: isCodeExisted } = await getLicenseCodeExistedApi(this.form.license_code, licenseId)
            if (isCodeExisted) {
                this.errors.licenseCode = this.resource.validateMessage.duplicate.format(fieldName)
            }
        },

        /**
        * @description: validate use day
        * @author: NQ Huy 04/05/2023
        */
        validateUseDay() {
            this.errors.useDay = ""
            const fieldName = this.resource.fieldName.useDate
            if (!this.validate.validateRequired(this.form.use_day)) {
                this.errors.useDay = this.resource.validateMessage.required.format(fieldName)
            }
        },

        /**
        * @description: validate create day
        * @author: NQ Huy 04/05/2023
        */
        validateCreateDay() {
            this.errors.createDay = ""
            const fieldName = this.resource.fieldName.incrementDay
            if (!this.validate.validateRequired(this.form.create_day)) {
                this.errors.createDay = this.resource.validateMessage.required.format(fieldName)
            }
        },

        /**
         * @description: validate phải chọn ít nhất 1 tài sản
         * @author: NQ Huy 04/05/2023
         */
        validateSelectedFixedAssets() {
            this.errors.selectedFixedAssets = ""
            const selectedFixedAssets = this.$store.state.ls.selectedFixedAssets.allData
            if (!selectedFixedAssets.length) {
                this.errors.selectedFixedAssets = this.resource.validateMessage.seletedFixedAssets;
            }
        },

        /**
         * @description: xử lý sự kiện người dùng xóa tài sản đã được chọn
         * @author: NQ Huy 04/05/2023
         */
        handleRemoveFixedAsset(index) {
            const fixedAsset = this.paginateSelectedFixedAsset.listPaginated[index]
            if (fixedAsset.license_detail_id) {
                const oldListId = this.$store.state.ls.listIdDeleted.licenseDetail
                this.$store.commit("setListIdDeleted", ["licenseDetail", [...oldListId, fixedAsset.license_detail_id]])
            }
            this.$store.dispatch("removeSelectedFixedAsset", fixedAsset.fixed_asset_id)
        },

        /**
         * @description: xử lý sự kiện người dùng chuyển trang
         * @author: NQ Huy 04/05/2023
         */
        handleSetPage(page) {
            this.$store.commit("setSelectedFixedAssets", ["currentPage", page])
        },

        /**
         * @description: xử lý sự kiện người dùng set kích thước page
         * @author: NQ Huy 04/05/2023
         */
        handleSetPageSize(pageSize) {
            this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
            this.$store.commit("setSelectedFixedAssets", ["pageSize", pageSize])
        },

        /**
         * @description: xử lý sự kiện người dùng tìm kiếm tài sản đã chọn
         * @author: NQ Huy 04/05/2023
         */
        handleSearch(event) {
            // filter khi ấn enter
            if (event.key == "Enter") {
                this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
                this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", this.textSearch])
            }
        },

        /**
         * @description: xử lý sự kiện người dùng tìm kiếm tài sản đã chọn
         * @param {index}: vị trí của tài sản sửa khi ấn sửa (form chọn nguồn chi phí)
         * @author: NQ Huy 04/05/2023
         */
        handleEditFixedAsset(index) {
            this.fixedAssetId = this.paginateSelectedFixedAsset.listPaginated[index]?.fixed_asset_id
            this.isShowEditFixedAssetForm = !!this.fixedAssetId
        },
    },
    computed: {
        /**
       * @description: trả về dữ liệu của table tài sản đã chọn
       * @author: NQ Huy 04/05/2023
       * @return: trả về dữ liệu của table tài sản đã chọn
       */
        paginateSelectedFixedAsset() {
            return this.$store.getters.paginateSelectedFixedAsset()
        },

        /**
       * @description: trả về lỗi valiate để hiện ra dialog
       * @author: NQ Huy 04/05/2023
       * @return: toàn bộ lỗi 
       */
        errorNotifi() {
            return Object.values(this.errors).map(error => error ? `<p>- ${this.convert.toUpperFirstChar(error)}.</p>` : '').join('')
        }
    },
    watch: {
        /**
         * @description: lắng nghe thay đổi dữ liệu của table selectedFixedAsset
         * @param: {newVal}: newVal: giá trị mới
         * @author: NQ Huy 04/05/2023
         */
        paginateSelectedFixedAsset(newVal) {
            // set lại body của table tài sản đã chọn
            this.bodyData.body = newVal.listPaginated.map(fixedAsset => {
                const department = this.$store.getters.departmentById(fixedAsset.department_id)
                return [
                    fixedAsset.fixed_asset_code, fixedAsset.fixed_asset_name, department.departmentName,
                    this.convert.toCurrency(fixedAsset.cost),
                    this.convert.toCurrency(fixedAsset.depreciation_annual),
                    this.convert.toCurrency(fixedAsset.cost),
                ]
            })

            // set lại footer của table tài sản đã chọn
            this.footer.data = ["", "", "", "",
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalCost) },
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalDepreciationAnnual) },
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalCost) },
            ]

            // set lại paging của table tài sản đã chọn
            this.footer.paging = {
                totalData: newVal.totalData,
                pageSize: this.$store.state.ls.selectedFixedAssets.pageSize,
                currentPage: this.$store.state.ls.selectedFixedAssets.currentPage,
            }
        },

        /**
         * @description: theo dõi thay đổi của text search filter
         * @param: {newVal}: newVal: giá trị mới
         * @author: NQ Huy 04/05/2023
         */
        textSearch(newVal) {
            // nếu người dùng xóa hết thì filter lại
            if (!newVal) {
                this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
                this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", ""])
            }
        }
    },

    /**
    * @description: load giữ liệu ban đầu, lắng nghe các sự kiện
    * @author: NQ Huy 04/05/2023
    */
    async beforeMount() {
        try {
            // trường hợp form là add thì load mã gợi ý
            if (this.typeForm == this.$enum.typeForm.add) {
                const { data: code } = await getRecommendLicenseCodeApi()
                this.form.license_code = code
                this.$store.commit("setSelectedFixedAssets", ["allData", []])
            }
            // trường hợp form là sửa thì load dữ liệu của chứng từ
            else if (this.typeForm == this.$enum.typeForm.edit) {
                this.isLoading = true

                const { data: license } = await getLicenseByIdApi(this.licenseId)
                this.form = {
                    license_code: license.license_code,
                    use_day: this.convert.toCurrentDate(license.use_day),
                    create_day: this.convert.toCurrentDate(license.create_day),
                    content: license.content
                }

                // tải dữ liệu về tài sản của chứng từ
                const { data: fixedAssets } = await getListFixedAssetByLicenseId(this.licenseId)
                this.$store.commit("setSelectedFixedAssets", ["allData", fixedAssets])

                this.isLoading = false

                // commit các dữ liệu vừa load được
                this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
                this.$store.commit("setSelectedFixedAssets", ["pageSize", DEFAULT_PAGE_SIZE])
                this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", ""])
                this.$store.commit("setBudgetDetails", [])
                this.$store.commit("setListIdDeleted", ["licenseDetail", []])
                this.$store.commit("setListIdDeleted", ["budgetDetail", []])
            }
        } catch {
            this.isLoading = false
            this.$emit('clickClose')
        }
    },

    /**
  * @description:lắng nghe các sự kiện
  * @author: NQ Huy 04/05/2023
  */
    mounted() {
        // ban đầu focus vào input mã chứng từ
        this.$refs.licenseCode.querySelector('input').focus()
        this.eventKeyDown = (e) => {
            if (e.key == "Tab") {
                // sự kiện shift tab để chuyển focus
                if (e.shiftKey) {
                    // nếu đang focus vào input mã chứng từ rồi ấn shift tab thì focus vào button cuối cùng
                    if (this.$refs.licenseCode.querySelector("input:focus")) {
                        this.$refs.submitButton.querySelector("button").focus()
                        e.preventDefault()
                    }
                } else {
                    // nếu ở button cuối cùng rồi ấn tab thì quay về input đầu tiên
                    if (this.$refs.submitButton.querySelector("button:focus")) {
                        this.$refs.licenseCode.querySelector("input").focus()
                        e.preventDefault()
                    }
                }
            }
            // sự kiện người dùng ấn ctr s thì lưu form
            else if (e.key == "s" || e.key == "S") {
                if (e.ctrlKey && !this.isShowEditFixedAssetForm && !this.isShowChoseFixedAssetForm) {
                    e.preventDefault()
                    this.handleSubmit()
                }
            }
        }
        window.addEventListener("keydown", this.eventKeyDown)
    },

    /**
    * @description: hủy bỏ lắng nghe sự kiện
    * @author: NQ Huy 04/05/2023
    */
    beforeUnmount() {
        window.removeEventListener("keydown", this.eventKeyDown)
    },
}
</script>

<style scoped>
.form {
    background-color: #f4f7ff;
    width: 1000px;
    max-width: 100%;
    border-radius: var(--radius-border);
}

.form__head {
    padding: 20px;
    font-size: 18px;
    font-family: mMisa Font;
    border-radius: inherit;
    background-color: #fff;
}

.form__top,
.form__bottom {
    padding: 0 20px 10px 20px;
    margin-top: 10px;
}

.form__top__title,
.form__bottom__title {
    font-size: 16px;
    font-family: mMisa Font;
    margin-bottom: 10px;
}

.form__top__body {
    width: 100%;
    background-color: #fff;
    border-radius: var(--radius-border);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 10px;
    padding: 20px;
}

.form__top__fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.form__top__field {
    width: calc(33.3% - 10px);
}

.form__top__field--full {
    width: 100%;
}

.form__bottom__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: #fff;
}

.form__bottom__field {
    width: 350px;
}

.form__bottom__table {
    height: 250px;
}

.form__footer {
    display: flex;
    justify-content: flex-end;
    padding: 8px 20px;
    column-gap: 10px;
    background-color: #eee;
    border-radius: inherit;
}
</style>