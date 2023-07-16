<template>
    <form @submit.prevent="handleSubmit" class="import">
        <h3 class="form__title import__title">{{ resource.formTitle.import }}</h3>
        <div class="import__body">
            <div class="import__row">
                <div class="import_field">
                    <label for="import_input_file" class="label">
                        {{ resource.placeholder.combobox.format(resource.fieldName.fileImport) }}
                    </label>
                    <input @change="handleFileChange" ref="inputFile" type="file" id="import_input_file">
                </div>
                <div class="import__field">
                    <label class="label">
                        {{ resource.placeholder.combobox.format(resource.fieldName.dataType) }}
                    </label>
                    <div class="import__radio__wrapper">
                        <div class="import__radio__item">
                            <MisaInputRadio radioValue="department" label="Phòng ban" v-model="typeImport"></MisaInputRadio>
                        </div>
                        <div class="import__radio__item">
                            <MisaInputRadio radioValue="fixedAsset" label="Tài sản" v-model="typeImport"></MisaInputRadio>
                        </div>
                        <div class="import__radio__item">
                            <MisaInputRadio radioValue="fixedAssetCategory" label="Loại tài sản" v-model="typeImport">
                            </MisaInputRadio>
                        </div>
                    </div>
                </div>
            </div>
            <MisaPopup :isShow="isLoading" :isHasClose="false">
                <MisaLoading></MisaLoading>
            </MisaPopup>

            <div v-if="table != null && !isLoading" class="table_wrapper custom-scrollbar">
                <table class="table">
                    <thead class="thead">
                        <th>
                            <MisaToolTip :tooltip="resource.tHead[0].tooltip">
                                {{ resource.tHead[0].text }}
                            </MisaToolTip>
                        </th>
                        <th :class="`type_${th.importData.data_type}`" v-for="th in table.thead" :key="th">{{ th.th }}</th>
                    </thead>
                    <tbody>
                        <tr v-for="(tr, index) in table.tbody" :key="tr">
                            <td>{{ index + 1 }}</td>

                            <td :class="`type_${table.thead[indexCol].importData.data_type} ${table.errorOfTable[index][indexCol] && 'error'}`"
                                v-for="(td, indexCol) in tr" :key="td">
                                <MisaToolTip :tooltip="table.errorOfTable[index][indexCol]">
                                    <div class="wrap">
                                        <span class="text">
                                            {{ formatData(td, table.thead[indexCol].importData.data_type) }}
                                        </span>
                                    </div>
                                </MisaToolTip>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="import__bottom">
            <MisaButton :isOutline="true" @clickButton="$emit('clickClose')" :text="resource.buttons.cancel"></MisaButton>
            <MisaButton :disabled="!isPassed" type="submit" :text="resource.buttons.import">
            </MisaButton>
        </div>
    </form>
</template>

<script>
import MisaButton from '@/components/MisaButton.vue'
import MisaInputRadio from '@/components/MisaInputRadio.vue';
import MisaLoading from '@/components/MisaLoading.vue';
import { postImportFileApi } from '@/js/api';
import MisaToolTip from '@/components/MisaToolTip.vue';
import MisaPopup from '@/components/MisaPopup.vue';
export default {
    components: { MisaButton, MisaInputRadio, MisaToolTip, MisaLoading, MisaPopup },
    emits: ['clickClose'],
    data() {
        return {
            typeImport: "fixedAsset",
            isPassed: false,
            table: null,
            isLoading: false
        }
    },
    watch: {
        /**
        * author: Nguyen Quoc Huy
        * created at: 30/05/2023
        * description: khi người dùng thay đổi kiểu table để import thì reset lại dữ liệu
        */
        typeImport() {
            this.handleReset()
        }
    },
    methods: {
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: reset data khi submit thành công hoạc khi thay đổi kiểu dữ liệu import
         */
        handleReset() {
            this.$refs.inputFile.value = ""
            this.isPassed = false
            this.errorMessage = ""
            this.table = null
        },
        /**
       * author: Nguyen Quoc Huy
       * created at: 30/05/2023
       * description: xử lý khi validate hoạc submit không thành công
       */
        handleValidateFail(data) {
            // trường hợp file bị lỗi hoạc không đúng định dạng
            this.isPassed = data.isPassed
            // nếu dữ liệu lỗi thì reset lại input
            if (!data.isPassed)
                this.$refs.inputFile.value = ""
            // lấy dữ liệu từ api để in ra table
            this.table = {
                thead: data.tHead.map((th, index) => ({ th, importData: data.listImportData.find(importData => importData.import_column_index == index + 1) })),
                tbody: data.rawEntities,
            }
            // lấy dữ liệu lỗi
            const errorOfTable = []
            for (let row = 0; row < data.rawEntities.length; row++) {
                const errorOfRow = []
                for (let col = 0; col < data.rawEntities[row].length; col++) {
                    // lấy ra tên trường hiện tại
                    const fieldNameError = this.table.thead[col].importData.prop_name
                    // lấy ra lỗi từ tên trường hiện tại
                    const cellError = data.errorOfTable[row].filter(error => error.fieldNameError == fieldNameError).map(error => `<p>- ${error.message}.</p>`).join("")
                    errorOfRow.push(cellError)
                }
                errorOfTable.push(errorOfRow)
            }
            this.table.errorOfTable = errorOfTable
        },
        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: sự kiện người dùng nhấn vào nút nhập khẩu thì submit data
         */
        async handleSubmit() {
            const formData = new FormData()
            const file = this.$refs.inputFile.files[0]
            formData.append("file", file)
            if (!this.isPassed)
                return
            this.isLoading = true
            try {
                postImportFileApi(this.typeImport, formData, true)
                this.emitter.emit("setToastMessage", this.resource.toastMessage.import)
                this.isLoading = false
                if (this.typeImport == "fixedAsset")
                    this.$store.dispatch("getFilterFixedAsset")
                else if (this.typeImport == 'fixedAssetCategory')
                    this.$store.dispatch('getFixedAssetCategorys')
                else if (this.typeImport == 'department')
                    this.$store.dispatch('getDepartments')
                // submit thành công thì hiện thông báo
                this.handleReset()
            }
            catch ({ response: { data } }) {
                this.isLoading = false
                if (data.errorCode == this.$enum.errorCode.invalidData) {
                    // hiện lại lỗi
                    this.handleFileChange(data.data)
                }
            }
        },

        /**
       * author: Nguyen Quoc Huy
       * created at: 30/05/2023
       * description: format data theo đúng định dạng (tiền, số lượng, thời gian)
       */
        formatData(value, type) {
            // nếu kiểu dữ liệu là double hoạc interger
            if (type == this.$enum.dataType.double || type == this.$enum.dataType.interger) {
                if (!isNaN(value))
                    return this.convert.toCurrency(value)
            }
            // nếu kiểu dữ liệu là thời gian
            else if (type == this.$enum.dataType.dateTime) {
                const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2}):(\d{2})$/;
                if (regex.test(value)) {
                    return this.convert.toCurrentDate(value)
                }
            }
            return value
        },

        /**
         * author: Nguyen Quoc Huy
         * created at: 30/05/2023
         * description: sự kiện khi người dùng chọn file thì validate file đó
         */
        async handleFileChange() {
            const formData = new FormData()
            const file = this.$refs.inputFile.files[0]
            formData.append("file", file)
            this.isLoading = true
            try {
                const { data } = await postImportFileApi(this.typeImport, formData, false)
                this.isLoading = false
                this.handleValidateFail(data)
            }
            catch {
                this.handleReset()
                this.isLoading = false
            }

        }
    }
}
</script>

<style scoped>
.table_wrapper {
    margin-top: 20px;
    max-height: 500px;
    max-width: calc(100vw - 100px);
    overflow: auto;
    position: relative;
    border-left: 1px solid var(--color-border);
}

.table_wrapper::-webkit-scrollbar-button:single-button:vertical:decrement {
    display: block;
    border: none;
    height: 38px;
    width: 0;
    opacity: 0;
    background-color: #fff;
}

.table {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-spacing: 0;
    min-width: max-content;

}

.type_2,
.type_3,
.type_5 {
    text-align: right !important;
}

.type_0 {
    text-align: left !important;
}

.table th {
    text-align: left;
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
    padding: 0px 8px;
    height: 38px;
    white-space: nowrap;
    border-bottom: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    background-color: #eee;
    position: sticky;
    top: 0;
    border-top: 1px solid var(--color-border);
    text-align: center;
}



.table th:first-child {
    z-index: 1;
}

.table th::first-letter {
    text-transform: uppercase;
}

.table td {
    padding: 0 8px;
    font-size: 13px;
    height: 40px;
    font-weight: 400;
    font-family: mMisa Font;
    white-space: nowrap;
    border-bottom: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
    text-align: center;
}

.table td.error {
    background-color: rgb(227, 42, 42);
    cursor: pointer;
}

.table td.error .text {
    color: #fff;
}

.table td .wrap {
    display: flex;
    align-items: center;
    height: 100%;
}

.table td>* {
    height: 100%;
}

.table td .text {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    flex-grow: 1;
}

.table td:first-child {
    text-align: center;
}

.table th:first-child {
    text-align: center;
}

.import {
    min-width: 800px;
    max-width: 100%;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 0;
    border-radius: var(--radius-border);
    overflow: hidden;
}

.import__title {
    padding-left: 20px;
}

.import__body {
    min-height: 500px;
    padding: 0 20px;
    margin-top: 20px;
}

.import__bottom {
    background-color: #eee;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    column-gap: 10px;
}

.import__row {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.import__loading {
    width: 100%;
    display: flex;
    justify-content: center;
}

.import__radio__wrapper {
    display: flex;
    align-items: start;
    column-gap: 16px;
}
</style>