<template>
    <div class="wrapper">
        <div class="header__top">
            <TheHeader :isMain="false"></TheHeader>
        </div>
        <div class="main">
            <div class="header__bottom">
                <h3 class="header__bottom__title">{{ resource.titlePage[7] }}</h3>
                <div class="header__bottom__right">
                    <MisaButton :shadow="true" @clickButton="isShowFormIncrement = true" :text="resource.buttons.add">
                    </MisaButton>
                    <div class="header__bottom__right__select">
                        <div ref="directHead" @click="isShowDirectionDisplay = !isShowDirectionDisplay"
                            class="header__bottom__right__icon">
                            <div v-if="isShowVer" class="icon-option-display-ver"></div>
                            <div v-else class="icon-option-display-hor"></div>
                            <div class="icon-down-black"></div>
                        </div>
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
                            <MisaToolTip v-if="totalChecked > 1" :tooltip="resource.tooltip.delete">
                                <div class="icon-bin"></div>
                            </MisaToolTip>
                            <MisaToolTip :tooltip="resource.tooltip.print">
                                <div class="icon-print"></div>
                            </MisaToolTip>
                            <MisaToolTip :tooltip="resource.tooltip.expand">
                                <div class="icon-expand"></div>
                            </MisaToolTip>
                        </div>
                    </div>
                    <div class="page__top__table">
                        <MisaTable :isDisplayFeature="false" @changeCheckboxData="(data) => checkboxData = data"
                            :isLoading="$store.state.ls.licenses.isLoading" :headData="headDataTop" :bodyData="bodyDataTop"
                            :isHasCheckbox="true" :footer="footerTop" @setPageSize="handleSetPageSize"
                            @setPage="handleSetPage">
                        </MisaTable>
                    </div>
                </div>
                <div ref="pageBottom" class="page__bottom">
                    <div class="page__bottom__head">
                        <h3 class="page__bottom__title">{{ resource.titlePage[8] }}</h3>
                        <div @click="isBottomFull = !isBottomFull" class="page__bottom__icon">
                            <div v-if="isBottomFull" class="icon-close-expand"></div>
                            <div v-else class="icon-open-expand"></div>
                        </div>
                        <div @mousedown="handleMouseDown" class="page__bottom__move">
                            <div class="icon-move"></div>
                        </div>
                    </div>
                    <div class="page__bottom__table">
                        <MisaTable :headData="headDataBottom" :bodyData="bodyDataBottom" :isHasCheckbox="false">
                        </MisaTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MisaPopup @close="isShowFormIncrement = false" :isShow="isShowFormIncrement" :isHasClose="true">
        <TheFormIncrement></TheFormIncrement>
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
export default {
    components: {
        TheHeader,
        MisaButton,
        MisaTextField,
        MisaToolTip,
        MisaTable,
        MisaPopup,
        TheFormIncrement,
    },
    data() {
        return {
            headDataTop: [
                {
                    data: this.resource.tHead[10],
                    type: this.$enum.dataType.string
                },
                {
                    data: this.resource.tHead[11],
                    type: this.$enum.dataType.dateTime
                },
                {
                    data: this.resource.tHead[12],
                    type: this.$enum.dataType.dateTime
                },
                {
                    data: this.resource.tHead[13],
                    type: this.$enum.dataType.double
                },
                {
                    data: this.resource.tHead[14],
                    type: this.$enum.dataType.string
                },
            ],
            bodyDataTop: {
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

            headDataBottom: [
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
            bodyDataBottom: {
                body: [
                ]
            },
            isBottomFull: false,
            isShowFormIncrement: false,
            boudingClient: null,
            eventMouseUp: null,
            isShowDirectionDisplay: false,
            isShowVer: false,
            eventCloseExtentComponent: null,
            eventMouseMove: null,
            textSearch: "",
            checkboxData: []
        }
    },
    beforeMount() {
        this.eventMouseUp = () => this.boudingClient = null
        this.eventMouseMove = (event) => {
            if (this.boudingClient != null) {
                const distance = this.boudingClient.coordinateMouseY - event.y
                const newHeightTop = this.boudingClient.pageTopHeight - distance
                const newHeightBottom = this.boudingClient.pageBottomHeight + distance

                const heightPage = this.$refs.page.clientHeight
                if (newHeightTop < heightPage && newHeightBottom < heightPage) {
                    this.$refs.pageTop.style.height = `${newHeightTop}px`
                    this.$refs.pageBottom.style.height = `${newHeightBottom}px`
                }
            }
        }
        this.eventCloseExtentComponent = (e) => {
            if (!this.$refs.directHead.contains(e.target) && !this.$refs.directOption.contains(e.target)) {
                this.isShowDirectionDisplay = false
            }
        }
        window.addEventListener('mouseup', this.eventMouseUp)
        window.addEventListener('mousemove', this.eventMouseMove)
        window.addEventListener('click', this.eventCloseExtentComponent)
    },
    async mounted() {
        await this.$store.dispatch('getDepartments')
        await this.$store.dispatch('getFixedAssetCategorys')
        this.$store.dispatch("getFilterLicenses")
    },
    beforeUnmount() {
        window.removeEventListener('mouseup', this.eventMouseUp)
        window.removeEventListener('mousemove', this.eventMouseMove)
        window.removeEventListener('click', this.eventCloseExtentComponent)
    },
    methods: {
        handleMouseDown(event) {
            this.boudingClient = {
                coordinateMouseY: event.y,
                pageTopHeight: this.$refs.pageTop.clientHeight,
                pageBottomHeight: this.$refs.pageBottom.clientHeight
            }
        },
        handleSetPage(page) {
            this.$store.commit("setLicenses", ["currentPage", page])
            this.$store.dispatch("getFilterLicenses")
        },
        handleSetPageSize(pageSize) {
            this.$store.commit("setLicenses", ["pageSize", pageSize])
            this.$store.commit("setLicenses", ["currentPage", 1])
            this.$store.dispatch("getFilterLicenses")
        },
        handleSearchLicenses(event) {
            if (event.key == "Enter") {
                this.$store.commit("setLicenses", ["filterTextSearch", this.textSearch])
                this.$store.commit("setLicenses", ["currentPage", 1])
                this.$store.dispatch("getFilterLicenses")
            }
        }
    },
    computed: {
        footerTop() {
            return {
                paging: {
                    totalData: this.$store.state.ls.licenses.totalLicense,
                    pageSize: this.$store.state.ls.licenses.pageSize,
                    currentPage: this.$store.state.ls.licenses.currentPage,
                },
                data: [
                    '', '', '', '', '',
                    { type: this.$enum.dataType.double, data: this.convert.toCurrency(this.$store.state.ls.licenses.totalCost) },
                    '',
                    ''
                ]
            }
        },
        licenses() {
            return this.$store.state.ls.licenses.data
        },
        totalChecked() {
            return this.checkboxData.reduce((total, isChecked) => total + (isChecked ? 1 : 0), 0)
        }
    },
    watch: {
        licenses(newVal) {
            this.bodyDataTop.body = newVal.map(license => [
                license.license_code,
                this.convert.toCurrentDate(license.create_day),
                this.convert.toCurrentDate(license.use_day),
                license.fixed_assets.reduce((total, fixed_asset) => total + fixed_asset.cost, 0),
                license.content
            ])
        },
        textSearch(newVal) {
            if (!newVal) {
                this.$store.commit("setLicenses", ["filterTextSearch", newVal])
                this.$store.commit("setLicenses", ["currentPage", 1])
                this.$store.dispatch("getFilterLicenses")
            }
        },
        checkboxData: {
            handler(newVal) {
                let body = []
                for (let i = 0; i < newVal.length; i++) {
                    if (!newVal[i])
                        continue
                    body = body.concat(this.licenses[i].fixed_assets.map(fixedAsset => {
                        const department = this.$store.getters.departmentById(fixedAsset.department_id)
                        return [
                            fixedAsset.fixed_asset_code,
                            fixedAsset.fixed_asset_name,
                            department.departmentName,
                            fixedAsset.cost,
                            fixedAsset.depreciation_annual,
                            "0"
                        ]
                    }))
                }
                this.bodyDataBottom.body = body
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.header__bottom__right__select {
    position: relative;
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
    cursor: all-scroll;
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
    height: calc(100vh - 110px);
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

.header__bottom__title {
    font-size: 20px;
    font-family: mMisa Font;

}
</style>