<template>
    <div class="main">
        <div class="form">
            <h3 class="form__title">{{ resource.formTitle.fixedAssetIncrement }}</h3>
            <div class="form__head">
                <div class="form__field">
                    <MisaTextField @keyupinput="handleSearch" v-model="textSearch" icon="icon-search"
                        :placeholder="resource.placeholder.searchFixedAsset"></MisaTextField>
                </div>
            </div>
            <div class="form__table">
                <MisaTable @changeCheckboxData="handleChangeCheckboxData" @setPage="handleSetPage"
                    @setPageSize="handleSetPageSize" :isLoading="$store.state.ls.selectFixedAssets.isLoading"
                    :isDisplayFeature="false" :footer="footer" :isHasCheckbox="true" :bodyData="bodyData"
                    :headData="headData"></MisaTable>
            </div>
            <div class="form__bottom">
                <MisaButton :shadow="true" :isOutline="true" :text="resource.buttons.discard">
                </MisaButton>
                <MisaButton @clickButton="handleSave" :shadow="true" :text="resource.buttons.confirm"></MisaButton>
            </div>
        </div>

    </div>
</template>

<script>
import MisaTextField from '@/components/MisaTextField.vue';
import MisaTable from '@/components/MisaTable.vue';
import MisaButton from '@/components/MisaButton.vue';
import { DEFAULT_PAGE_SIZE } from '@/config';
export default {
    components: { MisaTextField, MisaTable, MisaButton },
    data() {
        return {
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
                        tooltip: this.resource.tooltip.duplicate,
                        icon: 'icon-file-detail'
                    }
                ],
                body: [
                ]
            },
            textSearch: "",
            seletedFixedAssets: []
        }
    },
    computed: {
        fixedAssets() {
            return this.$store.state.ls.selectFixedAssets.data
        },
        footer() {
            return {
                paging: {
                    totalData: this.$store.state.ls.selectFixedAssets.totalAsset,
                    pageSize: this.$store.state.ls.selectFixedAssets.pageSize,
                    currentPage: this.$store.state.ls.selectFixedAssets.currentPage,
                },
            }
        }
    },
    methods: {
        handleSetPage(page) {
            this.$store.commit("setSelectFixedAssets", ['currentPage', page])
            this.$store.dispatch("getFilterSelectFixedAsset")
        },
        handleSetPageSize(pageSize) {
            this.$store.commit("setSelectFixedAssets", ['pageSize', pageSize])
            this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
            this.$store.dispatch("getFilterSelectFixedAsset")
        },
        handleSearch(event) {
            if (event.key == "Enter") {
                this.$store.commit("setSelectFixedAssets", ['filterTextSearch', this.textSearch])
                this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
                this.$store.dispatch("getFilterSelectFixedAsset")
            }
        },
        handleChangeCheckboxData(checkboxData) {
            const newList = []
            checkboxData.forEach((isChecked, index) => {
                if (isChecked) {
                    const fixedAsset = this.$store.state.ls.selectFixedAssets.data[index]
                    newList.push(fixedAsset)
                }
            })
            this.seletedFixedAssets = newList
        },
        handleSave() {
            const oldList = this.$store.state.ls.selectedFixedAssets.allData
            this.$store.commit("setSelectedFixedAssets", ["allData", oldList.concat(this.seletedFixedAssets)])
            this.$emit("clickClose")
        }
    },
    beforeMount() {
        this.$store.commit("setSelectFixedAssets", ['filterTextSearch', ""])
        this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
        this.$store.commit("setSelectFixedAssets", ['pageSize', DEFAULT_PAGE_SIZE])
        this.$store.dispatch("getFilterSelectFixedAsset")
    },
    watch: {
        fixedAssets(newVal) {
            this.bodyData.body = newVal.map(fixedAsset => {
                const department = this.$store.getters.departmentById(fixedAsset.department_id)
                return [
                    fixedAsset.fixed_asset_code,
                    fixedAsset.fixed_asset_name,
                    department.departmentName,
                    fixedAsset.cost,
                    fixedAsset.depreciation_annual,
                    fixedAsset.cost
                ]
            })
        },

        textSearch(newVal) {
            if (!newVal) {
                this.$store.commit("setSelectFixedAssets", ['filterTextSearch', ""])
                this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
                this.$store.dispatch("getFilterSelectFixedAsset")
            }
        }
    }
}
</script>

<style scoped>
.form {
    width: 1000px;
    max-width: 100%;
    background-color: #fff;
    border-radius: var(--radius-border);
}

.form__title {
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
}

.form__head {
    padding: 20px;
}

.form__field {
    width: 300px;
}

.form__table {
    height: 500px;
}

.form__bottom {
    display: flex;
    justify-content: flex-end;
    column-gap: 10px;
    padding: 8px 20px;
    background-color: #eee;
    border-radius: inherit;
}
</style>