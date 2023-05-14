<template>
    <div :class="{ isLoading }" class="table-wrapper custom-scrollbar">
        <MisaLoading v-if="isLoading"></MisaLoading>
        <table v-else class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <MisaInputCheckbox @changeChecked="handleCheckAll" :checked="isCheckedAll">
                        </MisaInputCheckbox>
                    </th>
                    <th scope="col">
                        <TheToolTip tooltip="Số thứ tự">
                            STT
                        </TheToolTip>
                    </th>
                    <th scope="col">Mã tài sản</th>
                    <th scope="col">Tên tài sản</th>
                    <th scope="col">Loại tài sản</th>
                    <th scope="col">Bộ phận sử dụng</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Nguyên giá</th>
                    <th scope="col">
                        <TheToolTip tooltip="Hao mòn/khấu hao lũy kế">
                            HM/KH lũy kế
                        </TheToolTip>
                    </th>
                    <th scope="col">Giá trị còn lại</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody ref="tbody" class="table__body">
                <tr @dblclick="handleEdit(tr, index, $event)" v-for="(tr, index) in tbody" :key="tr.td2">
                    <td scope="row">
                        <MisaInputCheckbox @changeChecked="(checked) => handleCheck(checked, index)"
                            :checked="tr.isChecked">
                        </MisaInputCheckbox>
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ tr.td2 }}</td>
                    <td>{{ tr.td3 }}</td>
                    <td>{{ tr.td4 }}</td>
                    <td>{{ tr.td5 }}</td>
                    <td>{{ tr.td6 }}</td>
                    <td>{{ convertCurrency(tr.td7) }}</td>
                    <td>{{ convertCurrency(tr.td8) }}</td>
                    <td>{{ convertCurrency(tr.td9) }}</td>
                    <td>
                        <div class="table__function">
                            <TheToolTip tooltip="Sửa">
                                <button @click="handleEdit(tr)" class="table__function__button table__function__edit">
                                    <div class="icon-pen-edit"></div>
                                </button>
                            </TheToolTip>
                            <TheToolTip tooltip="Nhân bản">
                                <button @click="handleDuplicate(tr)"
                                    class="table__function__button table__function__detail">
                                    <div class="icon-file-detail"></div>
                                </button>
                            </TheToolTip>
                        </div>
                    </td>

                </tr>
            </tbody>
            <tbody class="table__footer">
                <tr>
                    <td class="table__footer__td">
                        <div class="table__footer__left">
                            <p class="table__footer__total">Tổng số: <strong>200</strong> bản ghi</p>
                            <MisaSelect></MisaSelect>
                            <MisaPaginate></MisaPaginate>
                        </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="table__footer__conclusion">13</td>
                    <td class="table__footer__conclusion">249.000.00</td>
                    <td class="table__footer__conclusion">45.000.000</td>
                    <td class="table__footer__conclusion">123.000.000</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <ThePopup :isShow="isShowRemove" :isHasClose="false">
            <MisaDialog :text="dialogText" @click1="handleRemove" @click2="isShowRemove = false" quantity="2" button1="Xóa"
                button2="Không">
            </MisaDialog>
        </ThePopup>
        <ThePopup :isShow="isShowForm" @close="isShowForm = false">
            <TheForm :assetId="assetId" :typeForm="typeForm" @clickClose="isShowForm = false"></TheForm>
        </ThePopup>
    </div>
</template>

<script>
import MisaDialog from '@/components/MisaDialog.vue'
import MisaInputCheckbox from '../components/MisaInputCheckbox.vue'
import MisaPaginate from '../components/MisaPaginate.vue'
import MisaSelect from '../components/MisaSelect.vue'
import ThePopup from './ThePopup.vue'
import TheToolTip from './TheToolTip.vue'
import TheForm from './TheForm.vue'
import MisaLoading from '@/components/MisaLoading.vue'
export default {
    methods: {

        /**
         * @param {Interget} value 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm chuyển giá trị number thành tiền tệ, gọi hàm global function 
         */
        convertCurrency(value) {
            return this.toCurrency(value)
        },

        /**
         * @param {Boolean} checked 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở thead 
         */
        handleCheckAll(checked) {
            this.isCheckedAll = checked
            // tất cả checkbox ở tr có cùng giá trị với checkbox ở thead
            this.tbody.forEach(tr => tr.isChecked = checked)
            // emit sự kiện thay đổi trạng thái của remove button cho header
            this.emitter.emit('disableBtnRemove', !checked)
        },

        /**
         * @param {Boolean} checked 
         * @param {Interger} index 
         * author: Nguyen Quoc Huy
         * created at: 30/04/2023
         * description: Hàm xử lý sự kiện khi người dùng click vào checkbox ở tr
         */
        handleCheck(checked, index) {
            // gán giá trị isChecked tương ứng
            this.tbody[index].isChecked = checked
            let countChecked = 0
            // kiểm tra xem tất cả các ô đã được checked chưa, nếu rồi thì gán isCheckedAll là true (để checked ở thead là true)
            this.tbody.forEach(tr => countChecked += tr.isChecked ? 1 : 0)
            this.isCheckedAll = countChecked == this.tbody.length
            // emit sự kiện thay đổi trạng thái button remove cho header
            this.emitter.emit('disableBtnRemove', countChecked == 0)
        },

        /**
        * author: Nguyen Quoc Huy
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click button remove tài sản
        */
        handleRemove() {
            // xóa tất cả các dòng có checked là true
            this.tbody = this.tbody.filter(tr => !tr.isChecked)
            this.isCheckedAll = false
            this.isShowRemove = false
        },

        /**
        * author: Nguyen Quoc Huy
        * @param {Object} tr
        * created at: 30/04/2023
        * description: Hàm xử lý sự kiện khi người dùng click vào button sửa tài sản
        */
        handleEdit(tr, index, event) {
            // nếu dbclick vào input checkbox thì không mở form edit
            if (index != undefined && event != undefined) {
                if (this.$refs.tbody.querySelectorAll('td:first-child')[index].contains(event.target))
                    return
            }
            this.isShowForm = true;
            this.typeForm = this.$enum.typeForm.edit;
            // gán giá trị dữ liệu sửa bằng giá trị ở dòng người dùng click 
            this.assetId = tr
        },

        /**
       * author: Nguyen Quoc Huy
       * @param {Object} tr
       * created at: 30/04/2023
       * description: Hàm xử lý sự kiện khi người dùng click vào button nhân bản
       */
        handleDuplicate(tr) {
            // mở form duplicate
            this.isShowForm = true;
            this.typeForm = this.$enum.typeForm.duplicate;
            // gán giá trị dữ liệu nhân bản bằng giá trị ở dòng người dùng click 
            this.assetId = tr

        }
    },
    components: {
        MisaInputCheckbox,
        MisaPaginate,
        MisaSelect,
        MisaDialog,
        ThePopup,
        TheToolTip,
        TheForm,
        MisaLoading
    },

    beforeMount() {
        setTimeout(() => {
            this.isLoading = false
        }, 1000)
    },

    /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: Hàm lắng nghe các global event khi component được mounted
     */
    mounted() {
        // lắng nghe sự kiện multidelte từ header
        this.emitter.on("multiDelete", () => {
            const checkedTrs = this.tbody.filter(tr => tr.isChecked)
            // nếu chưa có checkbox nào được chọn thì kết thúc hàm
            if (!checkedTrs.length)
                return
            // tạo thông báo khi bản xóa 1 bản
            else if (checkedTrs.length == 1)
                this.dialogText = `Bạn có muốn xóa tài sản <strong>${checkedTrs[0].td2} - ${checkedTrs[0].td3}</strong>?`
            // tạo thông báo khi xóa nhiều bản
            else {
                this.dialogText = `<strong>${checkedTrs.length < 10 ? '0' + checkedTrs.length : checkedTrs.length}</strong> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`
            }
            this.isShowRemove = true
        });
    },
    data() {
        return {
            isLoading: true,
            assetId: null,
            typeForm: null,
            isShowForm: false,
            dialogText: '',
            isShowRemove: false,
            isCheckedAll: false,
            tbody: [
                {
                    isChecked: false,
                    td2: 'MXT88612',
                    td3: 'Máy tính xách tay Lenovo',
                    td4: 'Máy vi tính sách tay',
                    td5: 'Phòng Hành chính kế toán',
                    td6: '1',
                    td7: '1000000',
                    td8: '1000000',
                    td9: '8775000'
                },
                {
                    isChecked: false,
                    td2: 'MXT88618',
                    td3: 'Máy tính xách tay Fujitsu',
                    td4: 'Máy vi tính sách tay',
                    td5: 'Phòng Hành chính kế toán',
                    td6: '1',
                    td7: '8000000',
                    td8: '1125000',
                    td9: '8775000'
                },
                {
                    isChecked: false,
                    td2: 'MXT88618',
                    td3: 'Máy tính xách tay Fujitsu',
                    td4: 'Máy vi tính sách tay',
                    td5: 'Phòng Hành chính kế toán',
                    td6: '1',
                    td7: '10000000',
                    td8: '1125000',
                    td9: '8775000'
                },
                {
                    isChecked: false,
                    td2: 'MXT88618',
                    td3: 'Máy tính xách tay Fujitsu',
                    td4: 'Máy vi tính sách tay',
                    td5: 'Phòng Hành chính kế toán',
                    td6: '1',
                    td7: '10000000',
                    td8: '1125000',
                    td9: '8775000'
                },
            ]
        }
    }
}
</script>

<style scoped>
.table-wrapper {
    border: 1px solid var(--color-border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    border-radius: var(--radius-border);
    position: relative;
    max-height: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
}

.table-wrapper.isLoading {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
    width: 100%;
}

.table {
    width: 100%;
    background-color: #fff;
    border-spacing: 0;
    min-width: max-content;
}

.table th {
    text-align: left;
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
    padding: 11px 8px;
    white-space: nowrap;
}

.table td {
    padding: 12px 8px;
    font-size: 13px;
    font-weight: 400;
    font-family: mMisa Font;
    white-space: nowrap;
}

.table td:last-child>* {
    opacity: 0;
    visibility: hidden;
}

.table .table__body tr:hover {
    background-color: rgba(26, 164, 200, .2);
}

.table tr:hover td:last-child>* {
    opacity: 1;
    visibility: visible;
}


.table td:nth-child(n+4):nth-child(-n+6) {
    white-space: unset;
}

.table tbody tr td,
.table th {
    border-bottom: 1px solid var(--color-border);
}

.table td:first-child,
.table th:first-child {
    padding-left: 16px;
}

.table__function {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 12px;
}

.table th:nth-child(n + 7):nth-child(-n + 10),
.table td:nth-child(n + 7):nth-child(-n + 10) {
    text-align: right;
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
    background-color: #fff;
}

.table__footer td {
    font-family: Misa Font;
}

.table__footer__td {
    position: relative;

}

.table__footer__left {
    position: absolute;
    display: flex;
    align-items: center;
    column-gap: 24px;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: max-content;
}

.table__footer__total {
    font-size: 11px;
}

.table__footer__conclusion {
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
}

.table thead {
    position: sticky;
    background-color: #eeeeee59;
    top: 0;
}

.table-wrapper::-webkit-scrollbar-button:single-button {
    background-color: #bbbbbb;
    display: block;
    border: none;
    height: 38px;
    width: 0;
    opacity: 0;
    background-color: transparent;
}
</style>