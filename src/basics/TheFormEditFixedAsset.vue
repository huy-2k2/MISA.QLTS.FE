<template>
    <div class="main">
        <MisaPopup :isShow="isLoading" :isHasClose="false">
            <MisaLoading></MisaLoading>
        </MisaPopup>
        <div class="form">
            <h3 class="form__title">{{ resource.formTitle.editFixedAsset.format(this.fixedAsset?.fixed_asset_name || "") }}
            </h3>
            <div class="form__body">
                <div class="form__field">
                    <label class="label">
                        {{ resource.fieldName.department }}
                    </label>
                    <MisaDisableField :text="departmentName"></MisaDisableField>
                </div>
                <div class="form__price">
                    <div class="form__price__title">{{ resource.fieldName.cost }}</div>
                    <div class="form__price__body">
                        <div class="form__price__row">
                            <div class="form__price__col--big">
                                <div class="form__price__col__title">{{ resource.fieldName.source }}</div>
                            </div>
                            <div class="form__price__col--small">
                                <div class="form__price__col__title">{{ resource.fieldName.value }}</div>
                            </div>
                            <div @click="handleAddField(0)" v-if="!fields.length" class="form__price__add">
                                <MisaToolTip :tooltip="resource.tooltip.addIncrement">
                                    <div class="icon-add"></div>
                                </MisaToolTip>
                            </div>
                        </div>
                        <div class="form__fields custom-scrollbar">
                            <div v-for="(field, index) in fields" :key="field" class="form__price__row">
                                <div class="form__price__col--big">
                                    <MisaCombobox @blurcombobox="handleBlurBudgetId(index)" :error="errors[index]?.budgetId"
                                        fieldText="budget_name" fieldValue="budget_id" :data="budgets"
                                        :typeCombobox="$enum.typeCombobox.listOption"
                                        :placeholder="resource.placeholder.combobox.format(resource.fieldName.source)"
                                        v-model="field.budget_id" :isLoading="$store.state.ls.budgets.isLoading"
                                        v-on:update:modelValue="handleChangeField(index)" :isDisplayValue="false">
                                    </MisaCombobox>
                                </div>
                                <div class="form__price__col--small">
                                    <MisaNumberForm @blur="handleBlurBudgetValue(index)" :error="errors[index]?.budgetValue"
                                        :placeholder="resource.placeholder.input.format(resource.fieldName.budget)"
                                        :float="true" :currrency="true" v-model="field.budget_value" :icon="false"
                                        :required="false" v-on:update:modelValue="handleChangeField(index)">
                                    </MisaNumberForm>
                                </div>
                                <div class="form__price__control">
                                    <div @click="handleAddField(index)" class="form__price__button"
                                        :class="{ isDisable: budgets.length == fields.length }">
                                        <MisaToolTip :tooltip="resource.tooltip.addIncrement">
                                            <div class="icon-add"></div>
                                        </MisaToolTip>
                                    </div>
                                    <div @click="handleRemoveField(index)" class="form__price__button">
                                        <MisaToolTip :tooltip="resource.tooltip.removeIncrement">
                                            <div class="icon-remove"></div>
                                        </MisaToolTip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__price__row">
                            <div class="form__price__col--big">
                                <MisaDisableField text="tổng"></MisaDisableField>
                            </div>
                            <div class="form__price__col--small">
                                <MisaDisableField :text="totalValue" :isRight="true"></MisaDisableField>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form__bottom">
                <MisaButton @clickButton="isShowCancel = true" :isOutline="true" :text="resource.buttons.cancel">
                </MisaButton>
                <MisaToolTip tooltip="Ctrl S">
                    <MisaButton @clickButton="handleSubmit" :text="resource.buttons.save"></MisaButton>
                </MisaToolTip>
            </div>
        </div>
    </div>
    <MisaPopup :isShow="isShowCancel" :isHasClose="false">
        <MisaDialog :text="this.resource.dialogMessages.cancelSave" @click1="$emit('clickClose')"
            @click2="this.isShowCancel = false" quantity="2" :button1="this.resource.buttons.discard"
            :button2="this.resource.buttons.notConfirm">
        </MisaDialog>
    </MisaPopup>
</template>

<script>
import MisaCombobox from '@/components/MisaCombobox.vue';
import MisaNumberForm from '@/components/MisaNumberForm.vue';
import MisaToolTip from '@/components/MisaToolTip.vue';
import MisaButton from '@/components/MisaButton.vue';
import MisaPopup from '@/components/MisaPopup.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import MisaDisableField from '@/components/MisaDisableField.vue';
import MisaLoading from '@/components/MisaLoading.vue';
import { GetBudgetsByFixedAssetIdApi, getFixedAssetApi } from '@/js/api';
export default {
    emits: ["clickClose"],
    components: { MisaCombobox, MisaNumberForm, MisaToolTip, MisaButton, MisaPopup, MisaDialog, MisaDisableField, MisaLoading },
    data() {
        return {
            // điều khiển hiện thị của dialog hủy
            isShowCancel: false,

            // dữ liệu tài sản để hiển thị
            fixedAsset: null,

            // đánh dấu trạng thái loading dữ liệu
            isLoading: false,

            // sự kiện người dùng ấn phím
            eventKeyDown: null,

            // dữ liệu field
            fields: [
                {
                    budget_id: "",
                    budget_value: ""
                },
            ],

            // dữ liệu error validate
            errors: [],

            // dánh sách chứng từ xóa
            listIdRemove: [],

        }
    },
    props: {
        // id tài sản
        fixedAssetId: {
            type: String
        }
    },
    methods: {
        /**
         * @description: xử lý sự kiện khi người dùng blur khỏi combobox chọn nguồn ngân sách
         * @param: {index}: index: vị trí của field
         * @author: NQ Huy 04/05/2023
         */
        handleBlurBudgetId(index) {
            this.fields.forEach((field, i) => {
                const oldError = this.errors[i]?.budgetId
                const messageValidateDuplicateBudgetId = this.validateDuplicateBudgetId(field.budget_id, i)
                if (messageValidateDuplicateBudgetId)
                    this.errors[i] = { ...this.errors[i], budgetId: messageValidateDuplicateBudgetId }
                else {
                    if (oldError == this.getMessageDuplicateError()) {
                        this.errors[i].budgetId = null
                    }
                }
            })
            this.errors[index] = { ...this.errors[index], budgetId: this.validateBudgetId(this.fields[index].budget_id, index) }
        },

        /**
        * @description: xử lý sự kiện khi người dùng blur khỏi input nhập ngân sách
        * @param: {index}: index: vị trí của field
        * @author: NQ Huy 04/05/2023
        */
        handleBlurBudgetValue(index) {
            this.errors[index] = {
                ...this.errors[index],
                budgetValue: this.validateBudgetValue(this.fields[index].budget_value)
            }
        },

        /**
        * @description: xử lý sự kiện khi người dùng thay đổi budget_detail
        * @param: {index}: index: vị trí của field
        * @author: NQ Huy 04/05/2023
        */
        handleChangeField(index) {
            if (this.fields[index].budget_detail_id)
                // đánh dấu budget_detail đã được thay đổi để udpate
                this.fields[index].is_changed = true
        },

        /**
        * @description: validate combobox nguồn ngân sách
        * @param: {budgetId, index}: budgetId: id nguồn ngân sách, index: vị trí của field
        * @author: NQ Huy 04/05/2023
        * @return: message lỗi
        */
        validateBudgetId(budgetId, index) {
            if (!this.validate.validateRequired(budgetId)) {
                return this.resource.validateMessage.notEmpty
            }
            return this.validateDuplicateBudgetId(budgetId, index)
        },

        /**
        * @description: validate nguồn ngân sách bị trùng
        * @param: {budgetId, index}: budgetId: id nguồn ngân sách, index: vị trí của field
        * @author: NQ Huy 04/05/2023
        * @return: message lỗi
        */
        validateDuplicateBudgetId(budgetId, index) {
            const isExisted = this.fields.find((field, i) => field.budget_id && field.budget_id == budgetId && i < index)
            if (isExisted) {
                return this.getMessageDuplicateError()
            }
        },

        /**
         * @description: lấy ra message nguồn ngân sách trùng
         * @author: NQ Huy 04/05/2023
         * @return: message lỗi
         */
        getMessageDuplicateError() {
            return this.resource.validateMessage.duplicate.format(this.resource.fieldName.source)
        },

        /**
         * @description: validate giá trị ngân sách
         * @author: NQ Huy 04/05/2023
         * @return: message lỗi
         */
        validateBudgetValue(value) {
            if (!this.validate.validateRequired(value)) {
                return this.resource.validateMessage.notEmpty
            }
            else if (!this.validate.validateRealNumber(value)) {
                return this.resource.validateMessage.realNumber.format(this.resource.fieldName.budgetValue)
            }
        },

        /**
         * @description: xử lý sự kiện người dùng thêm field
         * @author: NQ Huy 04/05/2023
         */
        handleAddField(index) {
            if (this.fields.length < this.budgets.length)
                this.fields.splice(index + 1, 0, { budget_id: null, budget_value: null })
        },

        /**
         * @description: xử lý sự kiện người dùng xóa field
         * @author: NQ Huy 04/05/2023
         */
        handleRemoveField(index) {
            const detailId = this.fields[index].budget_detail_id
            if (detailId)
                this.listIdRemove.push(detailId)
            this.fields.splice(index, 1)
        },

        /**
        * @description: xử lý sự kiện người dùng submit
        * @author: NQ Huy 04/05/2023
        */
        handleSubmit() {
            // validate lỗi
            let isError = false
            this.fields.forEach((field, index) => {
                const budgetIdError = this.validateBudgetId(field.budget_id, index)
                const budgetValueError = this.validateBudgetValue(field.budget_value)
                const error = {
                    budgetId: budgetIdError,
                    budgetValue: budgetValueError
                }
                this.errors[index] = error
                if (budgetValueError || budgetIdError)
                    isError = true
            })
            if (!isError) {
                // nếu không có lỗi thì commit vào store để lưu dữ liệu budget_detail
                const oldListId = this.$store.state.ls.listIdDeleted.budgetDetail
                this.$store.commit("setListIdDeleted", ["budgetDetail", [...oldListId, ...this.listIdRemove]])
                this.$store.dispatch("setBudgetDetails", { fixed_asset_id: this.fixedAssetId, budgets: this.fields })
                this.$emit("clickClose")
            }
        }
    },
    computed: {
        /**
         * @description: tính tổng giá trị nguồn ngân sách
         * @author: NQ Huy 04/05/2023
         * @return: trả về tổng giá trị nguồn ngân sách
         */
        totalValue() {
            const result = this.fields.reduce((total, field) => total + (field.budget_value ? Number.parseFloat(field.budget_value) : 0), 0)
            return this.convert.toCurrency(result)
        },

        /**
         * @description: trả về danh sách nguồn ngân sách
         * @author: NQ Huy 04/05/2023
         * @return: trả về danh sách nguồn ngân sách
         */
        budgets() {
            return this.$store.state.ls.budgets.data
        },

        /**
        * @description: trả về tên department của tài sản
        * @author: NQ Huy 04/05/2023
        * @return: trả về tên department của tài sản
        */
        departmentName() {
            if (this.fixedAsset) {
                const department = this.$store.getters.departmentById(this.fixedAsset.department_id)
                return department.departmentName
            }
            return ""
        }
    },

    /**
     * @description: load các dữ liệu ban đầu
     * @author: NQ Huy 04/05/2023
     */
    async beforeMount() {
        const budgetDetail = this.$store.getters.budgetDetailByFixedAssetId(this.fixedAssetId)
        this.isLoading = true
        // load dữ liệu của tài sản
        const { data: fixedAsset } = await getFixedAssetApi(this.fixedAssetId)
        this.fixedAsset = fixedAsset
        if (!budgetDetail) {
            // load dữ liệu ngân sách của tài sản
            const { data: budgets } = await GetBudgetsByFixedAssetIdApi(this.fixedAssetId)
            if (budgets.length) {
                this.fields = budgets.map((field) => ({ budget_detail_id: field.budget_detail.budget_detail_id, budget_id: field.budget_id, budget_value: field.budget_detail.budget_value }))
            }
        }
        else {
            if (budgetDetail.budgets.length)
                this.fields = budgetDetail.budgets.map(b => b)
            else
                this.fields = [
                    {
                        budget_id: "",
                        budget_value: ""
                    }
                ]
        }
        this.isLoading = false
    },

    /**
     * @description: lắng nghe cách sự kiện
     * @author: NQ Huy 04/05/2023
     */
    mounted() {
        this.eventKeyDown = (e) => {
            // sự kiện ấn ctrl s để lưu form
            if (e.key == "s" || e.key == "S") {
                if (e.ctrlKey) {
                    e.preventDefault()
                    this.handleSubmit()
                }
            }
        },
            window.addEventListener("keydown", this.eventKeyDown)
    },

    /**
     * @description: hủy lắng nghe các sự kiện
     * @author: NQ Huy 04/05/2023
     */
    beforeUnmount() {
        window.removeEventListener("keydown", this.eventKeyDown)
    }
}
</script>

<style scoped>
.form {
    background-color: #fff;
    border-radius: var(--radius-border);
    width: 850px;
    max-width: 100%;
}

.form__title {
    padding: 20px;
    display: block;
    max-width: 600px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.form__price {
    margin-top: 16px;
}

.form__price__add {
    position: absolute;
    left: calc(100% + 16px);
    top: 0;
    cursor: pointer;
}

.form__field {
    width: 600px;
}

.form__body {
    padding: 0 20px;
}

.form__price__title::first-letter {
    text-transform: uppercase;
}

.form__price__body {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.label {
    display: block;
}

.label::first-letter {
    text-transform: capitalize;
}

.form__price__row {
    width: 600px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    column-gap: 8px;
    position: relative;
}

.form__price__col__title {
    font-size: 14px;
    font-family: mMisa Font;
    text-align: left;
}

.form__price__col__title::first-letter {
    text-transform: capitalize;
}

.form__price__col--big {
    width: calc(66.67% - 4px);
}

.form__price__col--small {
    width: calc(33.33% - 4px);
}

.form__price__control {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    position: absolute;
    top: 10px;
    left: calc(100% + 16px);
}

.form__price__button {
    cursor: pointer;
}

.form__price__button.isDisable {
    cursor: not-allowed;
    opacity: 0.5;
}

.form__fields {
    height: 300px;
    /* overflow-y: auto; */
    /* scroll-behavior: auto; */
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.form__bottom {
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    padding: 8px 20px;
    border-radius: inherit;
    margin-top: 20px;
}
</style>