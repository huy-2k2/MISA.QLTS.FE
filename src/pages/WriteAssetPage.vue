<template>
    <div class="wrapper">
        <div class="header__top">
            <TheHeader :isMain="false"></TheHeader>
        </div>
        <div class="main">
            <div class="header__bottom">
                <h3 class="header__bottom__title">{{ resource.titlePage[7] }}</h3>
                <div class="header__bottom__right">
                    <MisaButton :shadow="true" @clickButton="handleAddLicense" :text="resource.buttons.add">
                    </MisaButton>
                    <div class="header__bottom__right__select">
                        <MisaToolTip :tooltip="resource.tooltip.changeDisplay">
                            <div ref="directHead" @click="isShowDirectionDisplay = !isShowDirectionDisplay"
                                class="header__bottom__right__icon">
                                <div v-if="isShowVer" class="icon-option-display-ver"></div>
                                <div v-else class="icon-option-display-hor"></div>
                                <div class="icon-down-black"></div>
                            </div>
                        </MisaToolTip>
                        <ul ref="directOption" v-show="isShowDirectionDisplay" class="header__bottom__right__options">
                            <li @click="isShowVer = true; isShowDirectionDisplay = false">
                                <span class="icon-option-display-ver">
                                </span>
                                <span>{{ resource.displayOption.ver }}</span>
                            </li>
                            <li @click="isShowVer = false; isShowDirectionDisplay = false">
                                <span class="icon-option-display-hor">
                                </span>
                                <span>{{ resource.displayOption.hor }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div ref="page" class="page" :class="{ isBottomFull, isShowVer }">
                <div ref="pageTop" class="page__top">
                    <div class="page__top__head">
                        <div class="page__top__field">
                            <MisaTextField @keyupinput="handleSearchLicenses" v-model="textSearch" icon="icon-search"
                                :placeholder="resource.placeholder.searchCertificate">
                            </MisaTextField>
                        </div>
                        <div class="page__top__right">
                            <MisaToolTip v-if="checkboxData.length > 1" :tooltip="resource.tooltip.delete">
                                <div @click="handleRemoveByListId" class="icon-bin"></div>
                            </MisaToolTip>
                            <MisaToolTip :tooltip="resource.tooltip.print">
                                <div class="icon-print"></div>
                            </MisaToolTip>
                            <MisaToolTip :tooltip="resource.tooltip.expand">
                                <div class="page__top__right__icon">
                                    <div class="icon-expand"></div>
                                </div>
                            </MisaToolTip>
                        </div>
                    </div>
                    <div class="page__top__table">
                        <MisaTable
                            :contextMenu="[resource.contextMenu.add, resource.contextMenu.edit, resource.contextMenu.delete]"
                            @context_0="handleAddLicense" @activeTr="handleActiveTableBottomTr"
                            @context_1="handleEditLicense" @context_2="handleRemoveByIndex" :isDisplayFeature="false"
                            @changeCheckboxData="(data) => checkboxData = data" :selectedList="checkboxData"
                            :isLoading="$store.state.ls.licenses.isLoading" :headData="this.headTable.headLicenseTable"
                            :bodyData="bodyDataTop" :isHasCheckbox="true" :footer="footerTop"
                            @setPageSize="handleSetPageSize" :indexActiveFromParent="indexActiveTableTop"
                            @dbClickTr="handleEditLicense" @feature_0="handleEditLicense" @feature_1="handleRemoveByIndex"
                            @setPage="handleSetPage">
                        </MisaTable>
                    </div>
                </div>
                <div ref="pageBottom" class="page__bottom">
                    <div class="page__bottom__head">
                        <h3 class="page__bottom__title">{{ resource.titlePage[8] }}</h3>
                        <div @click="isBottomFull = !isBottomFull" class="page__bottom__icon">
                            <MisaToolTip v-if="isBottomFull" :tooltip="resource.tooltip.zoomIn">
                                <div class="icon-close-expand"></div>
                            </MisaToolTip>
                            <MisaToolTip v-else :tooltip="resource.tooltip.zoomOut">
                                <div class="icon-open-expand">
                                </div>
                            </MisaToolTip>
                        </div>
                        <div @mousedown="handleMouseDown" class="page__bottom__move">
                            <div class="icon-move"></div>
                        </div>
                    </div>
                    <div class="page__bottom__table">
                        <MisaTable :isLoading="loadingTableBottom" :headData="this.headTable.headFixedAssetOfLicenseTable"
                            :bodyData="bodyDataBottom" :isHasCheckbox="false">
                        </MisaTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MisaPopup @close="isShowFormIncrement = false" :isShow="isShowFormIncrement" :isHasClose="true">
        <TheFormIncrement @doneSubmitAdd="handleDoneSubmitAdd" :licenseId="licenseId" :typeForm="typeForm"
            @clickClose="isShowFormIncrement = false">
        </TheFormIncrement>
    </MisaPopup>
    <MisaPopup :isShow="isShowRemove" :isHasClose="false">
        <MisaDialog :text="textNofiti" quantity="2" :button2="this.resource.buttons.notConfirm"
            :button1="this.resource.buttons.delete" @click2="isShowRemove = false" @click1="handleDeleteLicense">
        </MisaDialog>
    </MisaPopup>
</template>

<script>
import TheHeader from '@/basics/TheHeader.vue'
import MisaButton from '@/components/MisaButton.vue';
import MisaTextField from '@/components/MisaTextField.vue';
import MisaToolTip from '@/components/MisaToolTip.vue';
import MisaTable from '@/components/MisaTable.vue';
import MisaPopup from '@/components/MisaPopup.vue';
import TheFormIncrement from '@/basics/TheFormIncrement.vue';
import MisaDialog from '@/components/MisaDialog.vue';
import { deleteListLicenseApi, getListFixedAssetByLicenseId } from '@/js/api';
export default {
    components: {
        TheHeader,
        MisaButton,
        MisaTextField,
        MisaToolTip,
        MisaTable,
        MisaPopup,
        TheFormIncrement,
        MisaDialog,
    },
    data() {
        return {
            // dữ liệu của table license
            bodyDataTop: {
                // tính tăng sửa và xóa trên từng dòng
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
            // dữ liệu của table tài sản thuộc chứng từ
            bodyDataBottom: {
                body: [
                ],
                listId: []
            },
            // điều khiển table tài sản thuộc chứng từ có full chiều cao không
            isBottomFull: false,
            // điều khiển hiển thị của form thêm, sửa chứng từ
            isShowFormIncrement: false,
            // tạo độ ban đầu khi kéo chiều cao của 2 table
            boudingClient: null,
            // lưu sự kiện người dùng ấn chuột xuống
            eventMouseUp: null,
            // điều khiển hiện thị của select "thay đổi chế độ hiển thị", 
            isShowDirectionDisplay: false,
            // điều khiển hiển thị của dialog xóa chứng từ
            isShowRemove: false,
            //text thông báo cho từng loại dialog
            textNofiti: "",
            // điều hiển chế độ hiển thị dọc hoạc ngang
            isShowVer: false,
            // list id chứng từ người dùng muốn xóa
            listIdRemove: [],
            // sự kiện đóng các component khi click ra điểm khác
            eventCloseExtentComponent: null,
            // sự kiện người dùng di chuột
            eventMouseMove: null,
            // kiểu form thêm hoạc sửa (của chứng từ)
            typeForm: "",
            // từ khóa tìm kiếm của table chứng từ
            textSearch: "",
            // lưu id dùng cho xóa, sửa chứng từ
            licenseId: "",
            // lưu dữ liệu đã được check trong table license
            checkboxData: [],
            // lưu vị trí active của table license
            indexActiveTableTop: -1,
            // kiểm tra loading của table tài sản thuộc chứng từ
            loadingTableBottom: false,
        }
    },

    /**
     * @description: add các sự kiện trước khi component hiển thị
     * @author: NQ Huy 04/05/2023
     */
    beforeMount() {
        // lúc người dùng nhả chuột thì bỏ biến lưu tọa độ
        this.eventMouseUp = () => this.boudingClient = null

        this.eventMouseMove = (event) => {
            // nếu người dùng di chuột và đang giữ chuột
            if (this.boudingClient != null) {
                // tính toán độ khoảng cách di chuột từ lúc nhấn chuột
                const distance = this.boudingClient.coordinateMouseY - event.y

                // tính kích thước mới cho talbe top
                const newHeightTop = this.boudingClient.pageTopHeight - distance

                // tính kích thước mới cho table bottom
                const newHeightBottom = this.boudingClient.pageBottomHeight + distance

                const heightPage = this.$refs.page.clientHeight
                // kiểm tra các kích thước mới có vượt quá kích thước màn hình không
                if (newHeightTop < heightPage && newHeightBottom < heightPage) {
                    // gán lại các kích thước mới
                    this.$refs.pageTop.style.height = `${newHeightTop}px`
                    this.$refs.pageBottom.style.height = `${newHeightBottom}px`
                }
            }
        }

        //hủy bọ hiển thị của các combbox, select khi người dùng ấn ra điểm khác
        this.eventCloseExtentComponent = (e) => {
            if (!this.$refs.directHead.contains(e.target) && !this.$refs.directOption.contains(e.target)) {
                this.isShowDirectionDisplay = false
            }
        }

        // add các sự kiện vào window
        window.addEventListener('mouseup', this.eventMouseUp)
        window.addEventListener('mousemove', this.eventMouseMove)
        window.addEventListener('click', this.eventCloseExtentComponent)
    },

    /**
     * @description: gọi api lấy các dữ liệu để hiển thị
     * @author: NQ Huy 04/05/2023
     */
    async mounted() {
        await this.$store.dispatch('getDepartments')
        await this.$store.dispatch('getFixedAssetCategorys')
        this.$store.dispatch("getFilterLicenses")
        this.$store.dispatch('getBudgets')
    },

    /**
    * @description: hủy bỏ lắng nghe các sự kiện khi component chết
    * @author: NQ Huy 04/05/2023
    */
    beforeUnmount() {
        window.removeEventListener('mouseup', this.eventMouseUp)
        window.removeEventListener('mousemove', this.eventMouseMove)
        window.removeEventListener('click', this.eventCloseExtentComponent)
    },


    methods: {
        /**
         * @description: sử lý sự kiện khi thêm mới chứng từ thành công
         * @author: NQ Huy 04/05/2023
         */
        async handleDoneSubmitAdd() {
            // tải lại danh sách chứng từ
            this.$store.commit("setLicenses", ["currentPage", 1])
            this.textSearch = ""

            await this.$store.dispatch("getFilterLicenses")
            // để table danh sách chứng từ active dòng đầu tiên
            this.indexActiveTableTop = 0
        },

        /**
         * @description: xử lý sự kiện khi người dùng ấn nút xóa nhiều
         * @author: NQ Huy 04/05/2023
         */
        handleRemoveByListId() {
            // hiển thị form thông báo xóa
            this.isShowRemove = true
            this.listIdRemove = this.checkboxData

            // tạo thông báo và hiển thị
            const length = this.checkboxData.length < 10 ? `0${this.checkboxData.length}` : this.checkboxData.length
            this.textNofiti = this.resource.dialogMessages.removeMultiLicense.format(`<strong>${length}</strong>`)
        },

        /**
         * @description: xử lý sự kiện khi người dùng ấn nút 1 bản ghi
         * @author: NQ Huy 04/05/2023
         */
        handleRemoveByIndex(index) {
            // lấy ra chứng từ cần xóa
            const license = this.$store.state.ls.licenses.data[index]
            this.listIdRemove = [license.license_id]
            // tạo thông báo và hiển thị
            this.isShowRemove = true
            this.textNofiti = this.resource.dialogMessages.removeLicense.format(`<strong>${license.license_code}</strong>`)
        },

        /**
        * @description: hàm xóa chứng từ, gọi api...
        * @author: NQ Huy 04/05/2023
        */
        async handleDeleteLicense() {
            // gọi api để xóa chứng từ
            await deleteListLicenseApi(this.listIdRemove)

            // gọi api lấy lại danh sách chứng từ sau khi xóa
            this.$store.commit("setLicenses", ["currentPage", 1])
            await this.$store.dispatch("getFilterLicenses")

            // emit toast message
            this.emitter.emit("setToastMessage", this.resource.toastMessage.delete);

            // kiểm tra trong list checkboxData có phần tử nào bị xóa thì bỏ đi
            this.checkboxData = this.checkboxData.filter(id => !this.listIdRemove.includes(id))
            this.isShowRemove = false
        },

        /**
         * @description: xử lý sự kiện khi vị trí active của table chứng từ thay đổi
         * @param: {index}: index: vị trí active mới của table danh sách chứng từ
         * @author: NQ Huy 04/05/2023
         */
        async handleActiveTableBottomTr(index) {
            this.indexActiveTableTop = index
            // nếu bỏ active thì xóa dữ liệu của table tài sản
            if (index == -1) {
                this.bodyDataBottom.body = []
            }
            else {
                // lấy ra id chứng từ mới tương ứng với vị trí active
                const license_id = this.$store.state.ls.licenses.data[index]?.license_id
                if (!license_id)
                    return
                // load lại danh sách tài sản tương ứng với chứng từ
                this.loadingTableBottom = true
                // gọi api để lấy dữ liệu
                const { data: fixedAssets } = await getListFixedAssetByLicenseId(license_id)

                // add dữ liệu lấy từ api vào table tài sản
                this.bodyDataBottom.body = fixedAssets.map(fa => {
                    const department = this.$store.getters.departmentById(fa.department_id)
                    return [
                        fa.fixed_asset_code,
                        fa.fixed_asset_name,
                        department.departmentName,
                        this.convert.toCurrency(fa.cost),
                        this.convert.toCurrency(fa.depreciation_annual),
                        this.convert.toCurrency(fa.cost),
                    ]
                })
                this.loadingTableBottom = false
            }
        },

        /**
         * @description: xử lý sự kiện người dùng ấn nút sửa tài sản
         * @param: {index}: index: vị trí của chứng từ cần sửa
         * @author: NQ Huy 04/05/2023
         */
        handleEditLicense(index) {
            // lấy ra id của chứng từ, gán typeForm là edit, hiển thị form
            this.licenseId = this.$store.state.ls.licenses.data[index].license_id
            this.typeForm = this.$enum.typeForm.edit
            this.isShowFormIncrement = true
        },

        /**
         * @description: xử lý sự kiện  khi người dùng ấn nút thêm chứng từ
         * @param: {index}: index: vị trí của chứng từ cần sửa
         * @author: NQ Huy 04/05/2023
         */
        handleAddLicense() {
            // show form, gán typeForm là add
            this.isShowFormIncrement = true
            this.typeForm = this.$enum.typeForm.add
        },

        /**
         * @description: xử lý sự kiện khi người dùng ấn chuột xuống ở nút dịch chuyển độ cao hai table
         * @param: {event}: event: event của sự kiện
         * @author: NQ Huy 04/05/2023
         */
        handleMouseDown(event) {
            // đánh dấu boudingClient là tọa độ của điểm vừa nhấn
            this.boudingClient = {
                coordinateMouseY: event.y,
                pageTopHeight: this.$refs.pageTop.clientHeight,
                pageBottomHeight: this.$refs.pageBottom.clientHeight
            }
        },

        /**
         * @description: sự kiện thay đổi trang hiện tại của table chứng từ
         * @param: {page}: page: giá trị thay đổi đến
         * @author: NQ Huy 04/05/2023
         */
        handleSetPage(page) {
            // set lại biến currentPage và gọi lại api
            this.$store.commit("setLicenses", ["currentPage", page])
            this.$store.dispatch("getFilterLicenses")
        },

        /**
         * @description: sự kiện thay đổi kích trước trang của table chứng từ
         * @param: {pageSize}: pageSize: kích thước page
         * @author: NQ Huy 04/05/2023
         */
        handleSetPageSize(pageSize) {
            // commit lại pageSize, currentPage và gọi lại api
            this.$store.commit("setLicenses", ["pageSize", pageSize])
            this.$store.commit("setLicenses", ["currentPage", 1])
            this.$store.dispatch("getFilterLicenses")
        },

        /**
         * @description: sự kiện người dùng tìm kiếm chứng từ
         * @param: {event}: event của sự kiện
         * @author: NQ Huy 04/05/2023
         */
        handleSearchLicenses(event) {
            // nếu người dùng ấn enter thì search
            if (event.key == "Enter") {
                // commit từ khóa tìm kiếm, commit về page đầu tiên
                this.$store.commit("setLicenses", ["filterTextSearch", this.textSearch])
                // gọi lại dữ liệu
                this.$store.commit("setLicenses", ["currentPage", 1])
                this.$store.dispatch("getFilterLicenses")
            }
        }
    },
    computed: {
        /**
         * @description: lấy dữ liệu của footer của table danh sách chứng từ
         * @author: NQ Huy 04/05/2023
         */
        footerTop() {
            return {
                paging: {
                    // tổng số bản ghi
                    totalData: this.$store.state.ls.licenses.totalLicense,
                    // kích trước trang
                    pageSize: this.$store.state.ls.licenses.pageSize,
                    // trang hiện tại
                    currentPage: this.$store.state.ls.licenses.currentPage,
                },
                data: [
                    '', '', '', '', '',
                    // tổng nguyên giá
                    { type: this.$enum.dataType.double, data: this.convert.toCurrency(this.$store.state.ls.licenses.totalCost) },
                    '',
                ]
            }
        },

        /**
         * @description: lấy dữ liệu của chứng từ (mảng)
         * @author: NQ Huy 04/05/2023
         */
        licenses() {
            return this.$store.state.ls.licenses.data
        },
    },
    watch: {
        /**
        * @description: lắng nghe thay đổi của danh sách chứng từ (lắng nghe giá trị tham chiếu)
        * @author: NQ Huy 04/05/2023
        */
        licenses(newVal) {
            // thay đổi dữ liệu của table license
            this.bodyDataTop.body = newVal.map(license => {
                return [
                    license.license_code,
                    this.convert.toCurrentDate(license.use_day, false),
                    this.convert.toCurrentDate(license.create_day, false),
                    this.convert.toCurrency(license.cost),
                    license.content
                ]
            })
            // gán lại danh sách id của table license
            this.bodyDataTop.listId = newVal.map(license => license.license_id)

            // hiển thị lại table danh sách tài sản thuộc chứng từ
            this.handleActiveTableBottomTr(this.indexActiveTableTop)
        },

        /**
         * @description: lắng nghe thay đổi từ khóa tìm kiếm chứng từ
         * @author: NQ Huy 04/05/2023
         */
        textSearch(newVal) {
            // nếu người dùng xóa hết input tìm kiếm thì gọi lại api
            if (!newVal) {
                this.$store.commit("setLicenses", ["filterTextSearch", newVal])
                this.$store.commit("setLicenses", ["currentPage", 1])
                this.$store.dispatch("getFilterLicenses")
            }
        },
    }
}
</script>

<style scoped>
.page__top__right__icon {
    width: 16px;
    display: flex;
    justify-content: flex-end;
}

.header__bottom__right__select {
    position: relative;
    display: flex;
}

.header__bottom__right__options {
    position: absolute;
    list-style: none;
    font-size: 13px;
    font-family: mMisa Font;
    background-color: #fff;
    border-radius: var(--radius-border);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
    top: calc(100% + 5px);
    right: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 1000;
}

.header__bottom__right__options li {
    display: flex;
    align-items: center;
    column-gap: 16px;
    padding: 8px 12px;
    width: max-content;
    cursor: pointer;
    width: 100%;
}

.header__bottom__right__options span {
    white-space: nowrap;
}

.header__bottom__right__options li:hover {
    background-color: #40caed4f;
}

.page__bottom__move {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -5px);
    cursor: n-resize;
}

.page.isBottomFull .page__bottom__move {
    display: none;
}

.page__bottom__head {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    padding: 0 16px;
    font-size: 14px;
    font-family: mMisa Font;
    position: relative;
}

.page__bottom__table {
    height: calc(100% - 38px);
}

.page__bottom__icon {
    cursor: pointer;
}

.page {
    height: calc(100vh - 117px);
}

.page__top {
    height: 60%;
    overflow: hidden;
}

.page__top__table {
    height: calc(100% - 68px);
}

.page__bottom {
    height: 40%;
    overflow: hidden;
    padding-top: 5px;
}

.page.isBottomFull .page__bottom {
    height: 100% !important;
}

.page.isBottomFull .page__top {
    height: 0 !important;
}

.page.isShowVer .page__bottom {
    display: none !important;
}

.page.isShowVer .page__top {
    height: 100% !important;
}

.page__top__head {
    background-color: #fff;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}

.page__top__right {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 20px;
}

.page__top__right * {
    cursor: pointer;
}

.page__top__field {
    width: 300px;
}

.wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.main {
    padding: 0 12px;
    border-top: 1px solid var(--color-border);
    background-color: #f4f7ff;
    flex-grow: 1;
}

.header__top {
    flex-shrink: 0;
}

.header__bottom {
    padding: 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__bottom__right {
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    column-gap: 16px;
}

.header__bottom__right__icon {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 18px;
    padding: 0 10px;
    border-radius: 6px;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    height: 100%;
}

.header__bottom__right__icon:hover {
    background-color: #cccccc6c;
}

.header__bottom__title {
    font-size: 20px;
    font-family: mMisa Font;

}
</style>