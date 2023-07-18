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
                <MisaTable @setPage="handleSetPage" @setPageSize="handleSetPageSize"
                    :isLoading="$store.state.ls.selectFixedAssets.isLoading" :isDisplayFeature="false" :footer="footer"
                    :isHasCheckbox="true" :bodyData="bodyData" :headData="headData" :selectedList="listIdSelected"
                    @changeCheckboxData="(listId) => listIdSelected = listId"></MisaTable>
            </div>
            <div class="form__bottom">
                <MisaButton @clickButton="isShowCancel = true" :shadow="true" :isOutline="true"
                    :text="resource.buttons.discard">
                </MisaButton>
                <MisaButton @clickButton="handleSave" :shadow="true" :text="resource.buttons.confirm"></MisaButton>
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
import MisaTextField from '@/components/MisaTextField.vue';
import MisaTable from '@/components/MisaTable.vue';
import MisaButton from '@/components/MisaButton.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import MisaPopup from '@/components/MisaPopup.vue';
import { DEFAULT_PAGE_SIZE } from '@/config';
export default {
    emits: ['clickClose'],
    components: { MisaTextField, MisaTable, MisaButton, MisaDialog, MisaPopup },
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
                body: [
                ]
            },
            textSearch: "",
            listIdSelected: [],
            selectedList: [],
            isShowCancel: false,
            eventKeyDown: null,
        }
    },
    props: {
        licenseId: {
            type: String,
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
            this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
        },
        handleSetPageSize(pageSize) {
            this.$store.commit("setSelectFixedAssets", ['pageSize', pageSize])
            this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
            this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
        },
        handleSearch(event) {
            if (event.key == "Enter") {
                this.$store.commit("setSelectFixedAssets", ['filterTextSearch', this.textSearch])
                this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
                this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
            }
        },
        handleSave() {
            const oldList = this.$store.state.ls.selectedFixedAssets.allData
            this.$store.commit("setSelectedFixedAssets", ["allData", this.selectedList.reverse().concat(oldList)])
            this.$emit("clickClose")
        }
    },
    beforeMount() {
        this.$store.commit("setSelectFixedAssets", ['filterTextSearch', ""])
        this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
        this.$store.commit("setSelectFixedAssets", ['pageSize', DEFAULT_PAGE_SIZE])
        this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)

        this.eventKeyDown = (e) => {
            if (e.key == 's' || e.key == 'S') {
                if (e.ctrlKey) {
                    e.preventDefault()
                    this.handleSave()
                }
            }
        }
        window.addEventListener('keydown', this.eventKeyDown)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.eventKeyDown)
    },
    watch: {
        fixedAssets(newVal) {
            this.bodyData.body = newVal.map(fixedAsset => {
                const department = this.$store.getters.departmentById(fixedAsset.department_id)
                return [
                    fixedAsset.fixed_asset_code,
                    fixedAsset.fixed_asset_name,
                    department.departmentName,
                    this.convert.toCurrency(fixedAsset.cost),
                    this.convert.toCurrency(fixedAsset.depreciation_annual),
                    this.convert.toCurrency(fixedAsset.cost),
                ]
            })
            this.bodyData.listId = newVal.map(fixedAsset => fixedAsset.fixed_asset_id)
        },
        listIdSelected: {
            handler(newList) {
                this.bodyData.listId.forEach(id => {
                    const isExisted = newList.includes(id)
                    if (!isExisted) {
                        this.selectedList = this.selectedList.filter(fa => fa.fixed_asset_id != id)
                    } else {
                        const isFixedAssetExisted = this.selectedList.find(fa => fa.fixed_asset_id == id)
                        if (!isFixedAssetExisted) {
                            const newFixedAsset = this.fixedAssets.find(fa => fa.fixed_asset_id == id)
                            this.selectedList.push(newFixedAsset)
                        }
                    }
                })
            },
            deep: true
        },

        textSearch(newVal) {
            if (!newVal) {
                this.$store.commit("setSelectFixedAssets", ['filterTextSearch', ""])
                this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
                this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
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