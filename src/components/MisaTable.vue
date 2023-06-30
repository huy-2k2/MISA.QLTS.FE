<template>
    <div class="wrapper">
        <div ref="tableWrapper" :class="{ isHasFooter: footer?.data && body?.length, isLoading }"
            class="table-wrapper custom-scrollbar">
            <div v-show="!body?.length && !isLoading" class="table__nodata">
                <img src="../assets/image/nodata.png" alt="">
            </div>
            <MisaLoading v-if="isLoading"></MisaLoading>
            <table class="table" v-if="!isLoading && bodyData">
                <thead ref="tableHead">
                    <tr>
                        <th ref="tHead" scope="col" v-if="isHasCheckbox" class="no_action">
                            <MisaInputCheckbox @changInput="handleCheckAll" v-model="isCheckedAll">
                            </MisaInputCheckbox>
                        </th>
                        <th scope="col">
                            <MisaToolTip :tooltip="resource.tHead[0].tooltip">
                                {{ resource.tHead[0].text }}
                            </MisaToolTip>
                        </th>
                        <th v-for="th in headData" :key="th" :class="`type-${th.type}`">
                            <MisaToolTip v-if="th.tooltip" :tooltip="th.tooltip">
                                {{ th.data }}
                            </MisaToolTip>
                            <div v-else>{{ th.data }}</div>
                        </th>
                        <th v-if="bodyData.features && isDisplayFeature">{{ resource.tHead[9] }}</th>
                    </tr>
                </thead>
                <tbody class="tbody" ref="tbody">
                    <tr @click="handleClickTr($event, index)" @dblclick="handleDbClickTr($event, index)" class="table__tr"
                        v-for="(tr, index) in body" :key="tr" :class="{ isActive: index == indexActive }">
                        <td v-if="isHasCheckbox" class="no_action">
                            <MisaInputCheckbox v-model="checkboxData[index]">
                            </MisaInputCheckbox>
                        </td>
                        <td>{{ index + baseIndex + 1 }}</td>
                        <td v-for=" (td, i) in tr" :key="td" :class="`type-${headData[i].type}`">
                            <MisaToolTip :tooltip="bodyData.features && !isDisplayFeature && isHoverFeature ? '' : td">
                                <div class="td__content">
                                    <span class="text"
                                        v-if="headData[i].type == $enum.dataType.interger || headData[i].type == $enum.dataType.double">
                                        {{ convert.toCurrency(td) }}
                                    </span>
                                    <span class="text" v-else>{{ td }}</span>
                                    <div class="table__function table__function--abs"
                                        v-if="bodyData.features && !isDisplayFeature && i == tr.length - 1">
                                        <MisaToolTip @mouseover="isHoverFeature = true" @mouseout="isHoverFeature = false"
                                            v-for="(feature, j) in bodyData.features" :key="feature"
                                            :tooltip="feature.tooltip">
                                            <button @click="$emit(`feature_${j}`, index)" class=" table__function__button">
                                                <div :class="feature.icon"></div>
                                            </button>
                                        </MisaToolTip>
                                    </div>

                                </div>
                            </MisaToolTip>
                        </td>
                        <td v-if="bodyData.features && isDisplayFeature" class="no_action">
                            <div class="table__function">
                                <MisaToolTip v-for="(feature, j) in bodyData.features" :key="feature"
                                    :tooltip="feature.tooltip">
                                    <button @click="$emit(`feature_${j}`, index)" class=" table__function__button">
                                        <div :class="feature.icon"></div>
                                    </button>
                                </MisaToolTip>
                            </div>
                        </td>
                    </tr>
                    <tr></tr>
                </tbody>
                <tbody v-if="footer" class="table__footer">
                    <tr>
                    </tr>
                    <tr v-if="body?.length" ref="tableFooter">
                        <td v-for="(td) in footer.data" :key="td" :class="`type-${td.type}`">
                            {{ td.data }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table__border" v-show="footer.paging && footer.data && body?.length"></div>
        <div v-if="footer.paging" class="table__paginate">
            <p class="table__paginate__total"
                v-html="resource.fixedAssetDetail.totalFixedAsset.format(`<strong>${this.convert.toCurrency(footer.paging?.totalData)}</strong>`)">
            </p>
            <div class="table__paginate__select">
                <div ref="selectPageSizeHead" @click="isShowPageSizeList = !isShowPageSizeList"
                    class="table__paginate__select__head">
                    <div class="table__paginate__select__value">{{ footer.paging.pageSize }}</div>
                    <div class="table__paginate__select__icon">
                        <div v-show="!isShowPageSizeList" class="icon-down"></div>
                        <div v-show="isShowPageSizeList" class="icon-up"></div>
                    </div>
                </div>
                <div ref="selectPageSizeOption" v-show="isShowPageSizeList" class="table__paginate__select__options">
                    <div @click="$emit('setPageSize', pageSize); isShowPageSizeList = false"
                        v-for=" pageSize in pageSizeList " :key="pageSize"
                        :class="{ active: pageSize == footer.paging.pageSize }" class="table__paginate__select__option">
                        {{ pageSize }}
                    </div>
                </div>
            </div>
            <MisaPaginate :totalData="footer.paging.totalData" :currentPage="footer.paging.currentPage"
                :pageSize="footer.paging.pageSize" @setPage="(page) => $emit('setPage', page)">
            </MisaPaginate>
        </div>
        <div v-if="!footer" class="table__bonus"></div>
    </div>
    <ul ref="contextMenu" v-if="indexContextMenu != -1 && contextMenu" class="context_menu">
        <li @click="$emit(`context_${index}`, indexContextMenu)" v-for="(context, index) in contextMenu" :key="context">{{
            context }}</li>
    </ul>
</template>

<script>
import MisaToolTip from './MisaToolTip.vue'
import MisaLoading from './MisaLoading.vue';
import MisaPaginate from './MisaPaginate.vue';
import MisaInputCheckbox from './MisaInputCheckbox.vue';
import { uuid } from 'vue-uuid';
export default {
    components: { MisaToolTip, MisaLoading, MisaPaginate, MisaInputCheckbox },
    props: {
        isLoading: {
            type: Boolean,
            default: false
        },
        headData: {
            type: Array
        },
        bodyData: {
            type: [Object, Boolean],
            default: false
        },
        baseIndex: {
            type: Number,
            default: 0
        },
        footer: {
            type: [Boolean, Object],
            default: false
        },
        isHasCheckbox: {
            type: Boolean
        },
        contextMenu: {
            type: [Array, Boolean]
        },
        isDisplayFeature: {
            type: Boolean,
            default: true
        }
    },
    emits: ["setPageSize", "setPage", "dbClickTr", "changeCheckboxData", "feature_0", "feature_1", "context_0", "context_1", "context_2", "context_3"],
    data() {
        return {
            pageSizeList: [10, 20, 50, 300],
            isShowPageSizeList: false,
            isCheckedAll: false,
            isHoverFeature: false,
            checkboxData: [],
            indexActive: -1,
            eventCloseExtentComponent: null,
            eventControlTable: null,
            eventContextMenu: null,
            indexContextMenu: -1,
            uuid: uuid.v1()
        }
    },

    methods: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 30/05/2023
        * @param {interger} index
        * @param event
        * description: Xử lý sự kiện khi click vào nút 1 dòng dữ liệu, xủ lý toggle active, ctrl click, shift click
        */
        handleClickTr(event, index) {
            // kiểm tra xem có click vào các phần tử đặc biệt như checkbox, button sửa, nhân bản hay không
            const noActionElements = this.$refs.tbody.querySelectorAll('.no_action')
            for (let elm of noActionElements) {
                if (elm.contains(event.target))
                    return
            }
            // trường hợp giữ ctrl rồi click
            if (event.ctrlKey) {
                this.checkboxData[index] = !this.checkboxData[index]
            }
            // trường hợp giữ shift rồi click
            else if (event.shiftKey) {
                if (this.indexActive != -1) {
                    // đánh dấu checked cho các phần tử nhầm trong khoảng shift
                    const min = Math.min(this.indexActive, index)
                    const max = Math.max(this.indexActive, index)
                    // nếu trong đoạn min đến max mã đã check thì bỏ checked, nếu có ít nhất 1 phần tử chưa checked thì checked = true cho tất cả
                    let checked = true
                    for (let i = min; i <= max; i++) {
                        if (!this.checkboxData[i]) {
                            checked = false
                            break
                        }
                    }

                    for (let i = min; i <= max; i++) {
                        this.checkboxData[i] = !checked
                    }

                }
            }
            // trường hợp click để active dòng dữ liệu
            else {
                this.indexActive = this.indexActive == index ? -1 : index
                this.emitter.emit('activeTableTr', this.uuid)
            }
        },

        handleDbClickTr(event, index) {
            const noActionElements = this.$refs.tbody.querySelectorAll('.no_action')
            for (let elm of noActionElements) {
                if (elm.contains(event.target))
                    return
            }
            this.$emit('dbClickTr', index)
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở thead 
        */
        handleCheckAll() {
            // tất cả checkbox ở tr có cùng giá trị với checkbox ở thead
            this.checkboxData = this.body.map(() => this.isCheckedAll)
        },
    },

    /**
   * author: Nguyen Quoc Huy
   * created at: 30/04/2023
   * description: Hàm lắng nghe các global event, local event khi component được mounted
   */
    beforeMount() {
        this.emitter.on("activeTableTr", id => {
            if (this.uuid != id)
                this.indexActive = -1
        })
        // lắng nghe sự kiện ẩn select page size, context menu khi click vào màn hình
        this.eventCloseExtentComponent = (event) => {
            if (!(this.$refs.selectPageSizeHead?.contains(event.target) || this.$refs.selectPageSizeOption?.contains(event.target)))
                this.isShowPageSizeList = false

            // đóng contextmenu khi click chuột trái
            if (!this.$refs.contextMenu?.contains(event.target))
                this.indexContextMenu = -1


        }

        // lắng nghe sự kiện lên xuống dòng dữ liệu trong table
        this.eventControlTable = (event) => {

            // nếu chưa có dòng nào được active hoạc con chuột đang focus vào ô input nào đó thì dừng hàm
            if (this.indexActive == -1 || event.target.nodeName != "BODY")
                return
            if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
                event.preventDefault()
                if (event.key == 'ArrowUp') {
                    this.indexActive = this.indexActive > 0 ? this.indexActive - 1 : this.body.length - 1
                } else {
                    this.indexActive = (this.indexActive + 1) % this.body.length
                }

                const tableWrapper = this.$refs.tableWrapper
                // tính độ cao của tbody
                const heightTableBody = tableWrapper.clientHeight - this.$refs.tableHead.clientHeight - (this.$refs.tableFooter?.clientHeight || 0)
                // tính độ cao của 1 dòng
                const heightRow = this.$refs.tbody.querySelector('.table__tr').clientHeight
                // tính số dòng trong 1 table
                const rowOfTable = Math.floor(heightTableBody / heightRow)
                // tính tọa độ scroll
                let scrollTop = this.indexActive < (rowOfTable - 1) ? 0 : (this.indexActive - (rowOfTable - 1)) * heightRow
                // scroll
                tableWrapper.scroll({
                    top: scrollTop,
                    behavior: 'smooth'
                })
            }
        }

        // lắng nghe sự kiện context menu
        this.eventContextMenu = (event) => {
            if (!this.contextMenu)
                return
            const trs = this.$refs.tbody.querySelectorAll('.table__tr');
            // vị trí của dòng dữ click chuột phải
            let index = -1
            trs.forEach((tr, i) => {
                // kiểm tra xem dòng nào được click chuột
                if (tr.contains(event.target)) {
                    event.preventDefault();
                    index = i
                }
            })
            // nếu không dòng nào click thì kết thúc hàm và đóng contextmenu
            if (index == -1) {
                return
            }
            this.indexContextMenu = index
            // tính toán tọa độ để hiện thị contextmenu sao cho nó không bị tràn qua ngoài table
            this.$nextTick(() => {
                const contextMenu = this.$refs.contextMenu
                const wrapCoordinate = this.$refs.tableWrapper.getBoundingClientRect()
                const alphaX = event.clientX + contextMenu.clientWidth - wrapCoordinate.right > 0 ? 1 : 0
                const alphaY = event.clientY + contextMenu.clientHeight - wrapCoordinate.bottom > 0 ? 1 : 0
                contextMenu.style.left = event.clientX - contextMenu.clientWidth * alphaX + 'px'
                contextMenu.style.top = event.clientY - contextMenu.clientHeight * alphaY + 'px'
            })
        }
        window.addEventListener('click', this.eventCloseExtentComponent)
        window.addEventListener('keydown', this.eventControlTable)
        window.addEventListener('contextmenu', this.eventContextMenu)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: thực hiện xóa các trình lắng nghe sự kiện khi unmount
     */
    beforeUnmount() {
        // xóa sự kiện ẩn select page size khi click vào màn hình
        window.removeEventListener('click', this.eventCloseExtentComponent)
        // xóa sự kiện contextmenu
        window.removeEventListener('contextmenu', this.eventContextMenu)
        // xóa sự kiện liên xuống dòng dữ liệu trong table
        window.removeEventListener('keydown', this.eventControlTable)
    },

    computed: {
        body() {
            return this.bodyData.body
        },

        // tổng số dòng được chọn
        totalTrChecked() {
            return this.checkboxData.reduce((total, checkbox) => total + (checkbox ? 1 : 0), 0)
        }
    },

    watch: {
        body(newVal) {
            this.checkboxData = newVal?.map(() => false)
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: mỗi khi tổng số bản ghi được chọn thay đổi thì emit sự kiện disableBtnRemove, gán lại biến isChecckedAll
         */
        totalTrChecked(newVal) {
            this.isCheckedAll = newVal != 0 && newVal == this.body.length
            this.$emit('changeCheckboxData', this.checkboxData)
        },
    },

}
</script>

<style>
.table__paginate {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 38px;
    width: 100%;
    background-color: #fff;
    padding-left: 16px;
    column-gap: 16px;
}

.context_menu {
    list-style: none;
    position: fixed;
    background-color: #fff;
    font-family: mMisa Font;
    font-size: 13px;
    border-radius: var(--radius-border);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.225);
    overflow: hidden;
    top: 50%;
    left: 50%;
}

.context_menu li {
    padding: 8px 12px;
    cursor: pointer;
}

.td__content {
    position: relative;
}

.table__function--abs {
    position: absolute;
    right: 0;
    top: calc(50% - 12px);
}

.table__function--abs button {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 3px 0 rgba(56, 148, 241, 0.4);
}

.table__border {
    height: 2px;
    width: 100%;
    background-color: #ccc;
}

.table__paginate__select {
    font-size: 13px;
}

.context_menu li:hover {
    background-color: rgba(67, 195, 227, 0.668);
}

.table .tbody .table__tr.isActive {
    background-color: rgba(26, 165, 200, 0.507);
}

.table__nodata {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table__nodata img {
    max-height: 100%;
    object-fit: cover;
}

.table__paginate__select__options {
    bottom: calc(100% + 2px);
    left: 0;
    position: absolute;
    font-family: mMisa Font;
    background-color: #fff;
    width: 100%;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.323);
    border-radius: var(--radius-border);
    overflow: hidden;
}

.table__paginate__select__option {
    padding: 4px 8px;
    width: 100%;
    text-align: left;
}

.table__paginate__select__option:hover,
.table__paginate__select__option.active {
    background-color: rgba(67, 195, 227, 0.668);
    cursor: pointer;
}


.table__paginate__select__head {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--radius-border);
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    width: 60px;
    font-family: mMisa Font;
    cursor: pointer;
}

.table__paginate__select {
    position: relative;
}

.wrapper {
    height: 100%;
    max-width: 100%;
    user-select: none;
}


.table-wrapper {
    height: calc(100% - 38px);
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    position: relative;
}

.table-wrapper.isHasPaging {
    height: calc(100% - 76px);
}

.table-wrapper.isLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.table {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-spacing: 0;
    min-width: max-content;
}

.table__bonus {
    width: 100%;
    height: 38px;
    background-color: #fff;
}

.table th {
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
    padding: 0px 10px;
    height: 38px;
    white-space: nowrap;
}

.table td {
    padding: 0 10px;
    font-size: 13px;
    height: 40px;
    font-weight: 400;
    font-family: mMisa Font;
    white-space: nowrap;
    user-select: none;
    text-align: center;
}

.table td .text {
    display: block;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.table .tbody tr:hover {
    background-color: rgba(26, 164, 200, .2);
}

.table tbody:not(.table__footer) tr td,
.table th {
    border-bottom: 1px solid var(--color-border);
}

.table td:first-child,
.table th:first-child {
    padding-left: 16px;
}


.table__function {
    display: none;
    align-items: center;
    justify-content: center;
    column-gap: 12px;
}

tr:hover .table__function {
    display: flex;
}


.table th:last-child,
.table td:last-child {
    text-align: center;
}

.table__function__button {
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
}

.table__footer {
    position: sticky;
    bottom: 0;
}

.table__footer tr {
    background-color: #eee;
}



.table__footer td {
    font-family: Misa Font;
    height: 38px;

}

.table__paginate__total {
    font-size: 11px;
}

.table thead {
    position: sticky;
    background-color: #eee;
    top: 0;
    z-index: 10;
}

.table-wrapper::-webkit-scrollbar-button:single-button:vertical:decrement,
.table-wrapper.isHasFooter::-webkit-scrollbar-button:single-button:vertical:increment {
    display: block;
    border: none;
    height: 38px;
    width: 0;
    opacity: 0;
    background-color: #eee;
}

.type-0 {
    text-align: left !important;
}

.type-2,
.type-3 {
    text-align: right !important;
}
</style>