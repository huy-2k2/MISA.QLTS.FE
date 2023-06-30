<template>
    <div v-show="!isShowChoseFixedAssetForm" class="form">
        <div class="form__head">
            <h3 class="form__title">{{ resource.formTitle.addIncrement }}</h3>
        </div>
        <div class="form__top">
            <h4 class="form__top__title">{{ resource.formTitle.infoIncrement }}</h4>
            <div class="form__top__body">
                <div class="form__top__fields">
                    <div class="form__top__field">
                        <MisaTextfieldForm v-model="form.licenseCode"
                            :placeholder="resource.placeholder.input.format(resource.fieldName.incrementCode)"
                            :label="resource.fieldName.incrementCode"></MisaTextfieldForm>
                    </div>
                    <div class="form__top__field">
                        <MisaInputDate :label="resource.fieldName.useDate"></MisaInputDate>
                    </div>
                    <div class="form__top__field">
                        <MisaInputDate :label="resource.fieldName.incrementDay"></MisaInputDate>
                    </div>
                </div>
                <div class="form__top__fields">
                    <div class="form__top__field">
                        <MisaTextfieldForm :required="false"
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
                <MisaButton @clickButton="isShowChoseFixedAssetForm = true" :shadow="true"
                    :text="resource.buttons.choseFixedAsset" :isOutline="true"></MisaButton>
            </div>
            <div class="form__bottom__table">
                <MisaTable @setPage="handleSetPage" @setPageSize="handleSetPageSize" :isDisplayFeature="false"
                    @feature_0="isShowEditFixedAssetForm = true" :footer="footer" :bodyData="bodyData" :headData="headData">
                </MisaTable>
            </div>
        </div>
        <div class="form__footer">
            <MisaButton :shadow="true" :text="resource.buttons.cancel" :isOutline="true"></MisaButton>
            <MisaButton :shadow="true" :text="resource.buttons.save"></MisaButton>
        </div>
    </div>
    <MisaPopup :isShow="isShowChoseFixedAssetForm" :isHasClose="true" @close="isShowChoseFixedAssetForm = false">
        <TheFormSelectIncrement @clickClose="isShowChoseFixedAssetForm = false"></TheFormSelectIncrement>
    </MisaPopup>
    <MisaPopup :isShow="isShowEditFixedAssetForm" :isHasClose="true" @close="isShowEditFixedAssetForm = false">
        <TheFormEditFixedAsset></TheFormEditFixedAsset>
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
import { getRecommendLicenseCodeApi } from '@/js/api';
import { DEFAULT_PAGE_SIZE } from '@/config';
export default {
    components: { MisaTextfieldForm, MisaInputDate, MisaTextField, MisaButton, MisaTable, MisaPopup, TheFormSelectIncrement, TheFormEditFixedAsset },
    data() {
        return {
            isShowChoseFixedAssetForm: false,
            isShowEditFixedAssetForm: false,
            textSearch: "",
            form: {},
            headData: [
                {
                    data: this.resource.tHead[1],
                    type: this.$enum.dataType.string
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
                ]
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
        }
    },
    computed: {
        paginateSelectedFixedAsset() {
            return this.$store.getters.paginateSelectedFixedAsset()
        }
    },
    watch: {
        paginateSelectedFixedAsset(newVal) {
            this.bodyData.body = newVal.listPaginated.map(fixedAsset => {
                const department = this.$store.getters.departmentById(fixedAsset.department_id)
                return [fixedAsset.fixed_asset_code, fixedAsset.fixed_asset_name, department.departmentName, fixedAsset.cost, fixedAsset.depreciation_annual, fixedAsset.cost]
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
    beforeMount() {
        getRecommendLicenseCodeApi((data) => {
            this.form.licenseCode = data
        })
    }
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
    padding: 0 20px;
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
    justify-content: center;
    column-gap: 20px;
}

.form__top__field {
    flex-grow: 1;
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