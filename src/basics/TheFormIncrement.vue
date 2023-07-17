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
                <MisaTable @setPage="handleSetPage" @setPageSize="handleSetPageSize" :isDisplayFeature="false"
                    @feature_0="handleEditFixedAsset" @feature_1="handleRemoveFixedAsset" :footer="footer"
                    :bodyData="bodyData" :headData="headData">
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
    emits: ['clickClose'],
    components: { MisaToolTip, MisaTextfieldForm, MisaInputDate, MisaTextField, MisaButton, MisaTable, MisaPopup, MisaDialog, TheFormSelectIncrement, TheFormEditFixedAsset, MisaLoading },
    props: {
        typeForm: {
            type: String
        },
        licenseId: {
            type: String
        }
    },
    data() {
        return {
            isShowChoseFixedAssetForm: false,
            isShowEditFixedAssetForm: false,
            textSearch: "",
            isShowCancel: false,
            isShowError: false,
            isLoading: false,
            eventKeyDown: null,
            isSubmiting: false,
            errors: {},
            fixedAssetId: null,
            budgetData: [],
            form: {
                use_day: this.convert.toCurrentDate(),
                create_day: this.convert.toCurrentDate(),
            },
            headData: [
                {
                    data: this.resource.tHead[1],
                    type: this.$enum.dataType.string,
                },
                {
                    data: this.resource.tHead[2],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[4],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[6],
                    type: this.$enum.dataType.double
                },
                {
                    data: this.resource.tHead[15],
                    type: this.$enum.dataType.double
                },
                {
                    data: this.resource.tHead[8],
                    type: this.$enum.dataType.double
                },
            ],
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
        handleCloseError() {
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
        async handleSubmit() {
            this.isSubmiting = true
            await this.validateLicenseCode()
            this.validateUseDay()
            this.validateCreateDay()
            this.validateSelectedFixedAssets()

            if (this.errorNotifi) {
                this.isShowError = true
                this.isSubmiting = false
            } else {
                const list_fixed_asset = this.$store.state.ls.selectedFixedAssets.allData.map(fa => {
                    return {
                        fixed_asset_id: fa.fixed_asset_id,
                        license_detail_id: fa.license_detail_id,
                        budgets: this.$store.getters.budgetDetailByFixedAssetId(fa.fixed_asset_id)?.budgets
                    }
                })
                const bodyRequest = {
                    list_fixed_asset: list_fixed_asset.reverse(),
                    license: this.form,
                    list_fixed_asset_id_delete: this.$store.state.ls.listIdDeleted.licenseDetail,
                    list_budget_detail_id_delete: this.$store.state.ls.listIdDeleted.budgetDetail,
                }
                if (this.typeForm == this.$enum.typeForm.add) {
                    await postLicenseApi(bodyRequest)
                    // emit sự kiện đóng form cho component cha
                    this.$emit('clickClose')
                    // hiện thông báo
                    this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                    // tải lại danh sách tài sản
                    this.$store.dispatch("getFilterLicenses")

                } else if (this.typeForm == this.$enum.typeForm.edit) {
                    await putLicenseApi(this.licenseId, bodyRequest)
                    this.$emit('clickClose')
                    // hiện thông báo
                    this.emitter.emit("setToastMessage", this.resource.toastMessage[this.typeForm]);
                    // tải lại danh sách tài sản
                    this.$store.dispatch("getFilterLicenses")
                }
                this.isSubmiting = false
            }
        },
        async validateLicenseCode() {
            this.errors.licenseCode = ""
            const length = { min: 0, max: 100 }
            const fieldName = this.resource.fieldName.incrementCode
            if (!this.validateRequired(this.form.license_code)) {
                this.errors.licenseCode = this.resource.validateMessage.required.format(fieldName)
                return
            }
            if (!this.validate.validateLength(this.form.license_code, length.min, length.max)) {
                this.errors.licenseCode = this.resource.validateMessage.length.format(fieldName, length.min, length.max)
                return
            }
            const licenseId = this.typeForm == this.$enum.typeForm.edit ? this.licenseId : ""
            const { data: isCodeExisted } = await getLicenseCodeExistedApi(this.form.license_code, licenseId)
            if (isCodeExisted) {
                this.errors.licenseCode = this.resource.validateMessage.duplicate.format(fieldName)
            }
        },
        validateUseDay() {
            this.errors.useDay = ""
            const fieldName = this.resource.fieldName.useDate
            if (!this.validateRequired(this.form.use_day)) {
                this.errors.useDay = this.resource.validateMessage.required.format(fieldName)
            }
        },
        validateCreateDay() {
            this.errors.createDay = ""
            const fieldName = this.resource.fieldName.incrementDay
            if (!this.validateRequired(this.form.create_day)) {
                this.errors.createDay = this.resource.validateMessage.required.format(fieldName)
            }
        },
        validateSelectedFixedAssets() {
            this.errors.selectedFixedAssets = ""
            const selectedFixedAssets = this.$store.state.ls.selectedFixedAssets.allData
            if (!selectedFixedAssets.length) {
                this.errors.selectedFixedAssets = this.resource.validateMessage.seletedFixedAssets;
            }
        },
        handleRemoveFixedAsset(index) {
            const fixedAsset = this.paginateSelectedFixedAsset.listPaginated[index]
            if (fixedAsset.license_detail_id) {
                const oldListId = this.$store.state.ls.listIdDeleted.licenseDetail
                this.$store.commit("setListIdDeleted", ["licenseDetail", [...oldListId, fixedAsset.license_detail_id]])
            }
            this.$store.dispatch("removeSelectedFixedAsset", fixedAsset.fixed_asset_id)
        },
        handleSetPage(page) {
            this.$store.commit("setSelectedFixedAssets", ["currentPage", page])
        },
        handleSetPageSize(pageSize) {
            this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
            this.$store.commit("setSelectedFixedAssets", ["pageSize", pageSize])
        },
        handleSearch(event) {
            if (event.key == "Enter") {
                this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
                this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", this.textSearch])
            }
        },
        handleEditFixedAsset(index) {
            this.fixedAssetId = this.paginateSelectedFixedAsset.listPaginated[index].fixed_asset_id
            this.isShowEditFixedAssetForm = true
        },

        validateRequired(value) {
            // nếu là string thì value.trim() khác rỗng, các giá trị khác thì phải null hoạc undefined
            if (typeof value == 'string' && !value.trim() || value == null || value == undefined) {
                return false
            }
            return true
        },
    },
    computed: {
        paginateSelectedFixedAsset() {
            return this.$store.getters.paginateSelectedFixedAsset()
        },
        errorNotifi() {
            return Object.values(this.errors).map(error => error ? `<p>- ${this.convert.toUpperFirstChar(error)}.</p>` : '').join('')
        }
    },
    watch: {
        paginateSelectedFixedAsset(newVal) {
            this.bodyData.body = newVal.listPaginated.map(fixedAsset => {
                const department = this.$store.getters.departmentById(fixedAsset.department_id)
                return [
                    fixedAsset.fixed_asset_code, fixedAsset.fixed_asset_name, department.departmentName,
                    this.convert.toCurrency(fixedAsset.cost),
                    this.convert.toCurrency(fixedAsset.depreciation_annual),
                    this.convert.toCurrency(fixedAsset.cost),
                ]
            })
            this.footer.data = ["", "", "", "",
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalCost) },
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalDepreciationAnnual) },
                { type: this.$enum.dataType.double, data: this.convert.toCurrency(newVal.totalCost) },
            ]
            this.footer.paging = {
                totalData: newVal.totalData,
                pageSize: this.$store.state.ls.selectedFixedAssets.pageSize,
                currentPage: this.$store.state.ls.selectedFixedAssets.currentPage,
            }
        },
        textSearch(newVal) {
            if (!newVal) {
                this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
                this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", ""])
            }
        }
    },
    async beforeMount() {
        if (this.typeForm == this.$enum.typeForm.add) {
            const { data: code } = await getRecommendLicenseCodeApi()
            this.form.license_code = code
            this.$store.commit("setSelectedFixedAssets", ["allData", []])
        } else if (this.typeForm == this.$enum.typeForm.edit) {
            this.isLoading = true

            const { data: license } = await getLicenseByIdApi(this.licenseId)
            this.form = {
                license_code: license.license_code,
                use_day: this.convert.toCurrentDate(license.use_day),
                create_day: this.convert.toCurrentDate(license.create_day),
                content: license.content
            }

            const { data: fixedAssets } = await getListFixedAssetByLicenseId(this.licenseId)
            this.$store.commit("setSelectedFixedAssets", ["allData", fixedAssets])

            this.isLoading = false
        }

        this.$store.commit("setSelectedFixedAssets", ["currentPage", 1])
        this.$store.commit("setSelectedFixedAssets", ["pageSize", DEFAULT_PAGE_SIZE])
        this.$store.commit("setSelectedFixedAssets", ["filterTextSearch", ""])
        this.$store.commit("setBudgetDetails", [])
        this.$store.commit("setListIdDeleted", ["licenseDetail", []])
        this.$store.commit("setListIdDeleted", ["budgetDetail", []])
    },
    mounted() {
        this.$refs.licenseCode.querySelector('input').focus()
        this.eventKeyDown = (e) => {
            if (e.key == "Tab") {
                if (e.shiftKey) {
                    if (this.$refs.licenseCode.querySelector("input:focus")) {
                        this.$refs.submitButton.querySelector("button").focus()
                        e.preventDefault()
                    }
                } else {
                    if (this.$refs.submitButton.querySelector("button:focus")) {
                        this.$refs.licenseCode.querySelector("input").focus()
                        e.preventDefault()
                    }
                }
            } else if (e.key == "s" || e.key == "S") {
                if (e.ctrlKey && !this.isShowEditFixedAssetForm) {
                    e.preventDefault()
                    this.handleSubmit()
                }
            }
        }
        window.addEventListener("keydown", this.eventKeyDown)
    },
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