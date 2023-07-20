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
                    :isHasCheckbox="true" :bodyData="bodyData" :headData="headTable.headSelectFixedAssetTable"
                    :selectedList="listIdSelected" @changeCheckboxData="(listId) => listIdSelected = listId"></MisaTable>
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
            // dữ liệu của table
            bodyData: {
                body: [
                ]
            },

            // từ khóa tìm kiếm để filter
            textSearch: "",

            // danh sách id đã chọn 
            listIdSelected: [],

            // danh sách tài sản tương ứng với danh sách id đã chọn
            selectedList: [],

            // điều khiển hiển thị của dialog hủy
            isShowCancel: false,

            // sự kiện người dùng ấn phím
            eventKeyDown: null,
        }
    },
    props: {
        // id của chứng từ khi sửa
        licenseId: {
            type: String,
        }
    },
    computed: {
        /**
       * @description: lấy danh sách chọn tài sản từ store
       * @author: NQ Huy 04/05/2023
       * @return: danh sách chọn tài sản
       */
        fixedAssets() {
            return this.$store.state.ls.selectFixedAssets.data
        },

        /**
       * @description: lấy ra dữ liệu của footer của table
       * @author: NQ Huy 04/05/2023
       * @return: dữ liệu để hiện thị footer
       */
        footer() {
            return {
                paging: {
                    // tổng bản ghi
                    totalData: this.$store.state.ls.selectFixedAssets.totalAsset,
                    // kích thước trang
                    pageSize: this.$store.state.ls.selectFixedAssets.pageSize,
                    // trang hiện tại
                    currentPage: this.$store.state.ls.selectFixedAssets.currentPage,
                },
            }
        }
    },
    methods: {
        /**
       * @description: xử lý sự kiện khi người dùng chuyển trang
       * @param: {page}: page: trang đích
       * @author: NQ Huy 04/05/2023
       */
        handleSetPage(page) {
            this.$store.commit("setSelectFixedAssets", ['currentPage', page])
            this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
        },

        /**
         * @description: xử lý sự kiện khi người dùng thay đổi kích thước trang
         * @param: {pageSize}: page: kích thước trang
         * @author: NQ Huy 04/05/2023
         */
        handleSetPageSize(pageSize) {
            this.$store.commit("setSelectFixedAssets", ['pageSize', pageSize])
            this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
            this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
        },

        /**
        * @description: xử lý sự kiện khi người dùng thay tìm kiếm tài sản
        * @param: {event}: event
        * @author: NQ Huy 04/05/2023
        */
        handleSearch(event) {
            // trong trường hợp nhấn enter thì mới search
            if (event.key == "Enter") {
                this.$store.commit("setSelectFixedAssets", ['filterTextSearch', this.textSearch])
                this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
                this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)
            }
        },

        /**
        * @description: xử lý sự kiện khi người dùng ấn lưu
        * @author: NQ Huy 04/05/2023
        */
        handleSave() {
            // lấy ra danh sách có sẵn và nối với danh sách mới được thêm rồi lưu vào state
            const oldList = this.$store.state.ls.selectedFixedAssets.allData
            this.$store.commit("setSelectedFixedAssets", ["allData", this.selectedList.reverse().concat(oldList)])
            this.$emit("clickClose")
        }
    },

    /**
     * @description: khởi tạo dữ liệu, gọi api, lắng nghe các sự kiện
     * @author: NQ Huy 04/05/2023
     */
    beforeMount() {
        this.$store.commit("setSelectFixedAssets", ['filterTextSearch', ""])
        this.$store.commit("setSelectFixedAssets", ['currentPage', 1])
        this.$store.commit("setSelectFixedAssets", ['pageSize', DEFAULT_PAGE_SIZE])
        this.$store.dispatch("getFilterSelectFixedAsset", this.licenseId)

        this.eventKeyDown = (e) => {
            // trường hợp người dùng ấn ctrl S thì lưu
            if (e.key == 's' || e.key == 'S') {
                if (e.ctrlKey) {
                    e.preventDefault()
                    this.handleSave()
                }
            }
        }
        window.addEventListener('keydown', this.eventKeyDown)
    },

    /**
     * @description: khởi tạo dữ liệu, gọi api, lắng nghe các sự kiện
     * @author: NQ Huy 04/05/2023
     */
    beforeUnmount() {
        window.removeEventListener('keydown', this.eventKeyDown)
    },
    watch: {
        /**
         * @description: lắng nghe thay đổi của danh sách chọn tài sản (lắng nghe tham chiếu)
         * @param: {newVal}: newVal: giá trị mới
         * @author: NQ Huy 04/05/2023
         */
        fixedAssets(newVal) {
            // gán lại dữ liệu của table
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
            // gán lại list id của các dòng dữ liệu
            this.bodyData.listId = newVal.map(fixedAsset => fixedAsset.fixed_asset_id)
        },

        /**
         * @description: lắng nghe thay đổi của danh sách checkbox được chọn
         * @param: {newVal}: newVal: giá trị mới
         * @author: NQ Huy 04/05/2023
         */
        listIdSelected: {
            handler(newList) {
                // tính lại danh sách tài sản được chọn theo list danh sách id được chọn
                this.bodyData.listId.forEach(id => {
                    // nếu danh sách id chọn không chứa (id) thì xóa bản ghi tương ứng với (id) khỏi selectedList
                    const isExisted = newList.includes(id)
                    if (!isExisted) {
                        this.selectedList = this.selectedList.filter(fa => fa.fixed_asset_id != id)
                    }
                    // nếu danh sách id chọn chứa id, và selectedList chưa chứa tài sản có (id) thì thêm mới vào selectedList
                    else {
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

        /**
        * @description: lắng nghe thay đổi của danh sách field tìm kiếm
        * @param: {newVal}: newVal: giá trị mới
        * @author: NQ Huy 04/05/2023
        */
        textSearch(newVal) {
            // nếu người dùng xóa hết thì gọi lại để filter dữ liệu
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