<template>
    <div class="table-wrapper custom-scrollbar">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <InputCheckbox></InputCheckbox>
                    </th>
                    <th title="Số thứ tự" scope="col">STT</th>
                    <th scope="col">Mã tài sản</th>
                    <th scope="col">Tên tài sản</th>
                    <th scope="col">Loại tài sản</th>
                    <th scope="col">Bộ phận sử dụng</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Nguyên giá</th>
                    <th title="Hao mòn/ khấu hao lũy kế" scope="col">HM/KH lũy kế</th>
                    <th scope="col">Giá trị còn lại</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr>
                    <td scope="row">
                        <InputCheckbox></InputCheckbox>
                    </td>
                    <td>1</td>
                    <td>MXT88618</td>
                    <td>Máy tính sách tay Fujitsu</td>
                    <td scope="row">Máy vi tính sách tay</td>
                    <td>Phòng Hành chính Kế toán</td>
                    <td>1</td>
                    <td>10.000.000</td>
                    <td>1.125.000</td>
                    <td>8.775.000</td>
                    <td>
                        <div class="table__function">
                            <button class="table__function__button table__function__edit">
                                <div class="icon-pen-edit"></div>
                            </button>
                            <button class="table__function__button table__function__detail">
                                <div class="icon-file-detail"></div>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        <InputCheckbox></InputCheckbox>
                    </td>
                    <td>2</td>
                    <td>MXT88618</td>
                    <td>Máy tính sách tay Fujitsu</td>
                    <td scope="row">Máy vi tính sách tay</td>
                    <td>Phòng Hành chính Kế toán</td>
                    <td>1</td>
                    <td>10.000.000</td>
                    <td>1.125.000</td>
                    <td>8.775.000</td>
                    <td>
                        <div class="table__function">
                            <button class="table__function__button table__function__edit">
                                <div class="icon-pen-edit"></div>
                            </button>
                            <button class="table__function__button table__function__detail">
                                <div class="icon-file-detail"></div>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        <InputCheckbox></InputCheckbox>
                    </td>
                    <td>3</td>
                    <td>MXT88618</td>
                    <td>Máy tính sách tay Fujitsu</td>
                    <td scope="row">Máy vi tính sách tay</td>
                    <td>Phòng Hành chính Kế toán</td>
                    <td>1</td>
                    <td>10.000.000</td>
                    <td>1.125.000</td>
                    <td>8.775.000</td>
                    <td>
                        <div class="table__function">
                            <button class="table__function__button table__function__edit">
                                <div class="icon-pen-edit"></div>
                            </button>
                            <button class="table__function__button table__function__detail">
                                <div class="icon-file-detail"></div>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody class="table__footer">
                <tr>
                    <td class="table__footer__td">
                        <div class="table__footer__left">
                            <p class="table__footer__total">Tổng số: <strong>200</strong> bản ghi</p>
                            <MySelect></MySelect>
                            <MyPaginate></MyPaginate>
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
    </div>
</template>

<script>
import InputCheckbox from '../components/InputCheckbox.vue'
import MyPaginate from '../components/MyPaginate.vue'
import MySelect from '../components/MySelect.vue'
export default {
    components: {
        InputCheckbox,
        MyPaginate,
        MySelect
    }
}
</script>

<style scoped>
.table-wrapper {
    border: 1px solid var(--color-border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, .16);
    border-radius: var(--radius-border);
    position: relative;
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

.table-wrapper {
    position: relative;
    max-height: 100%;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: auto;
}

.table thead {
    position: sticky;
    background-color: #fff;
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