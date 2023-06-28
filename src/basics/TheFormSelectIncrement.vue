<template>
    <div class="main">
        <div class="form">
            <h3 class="form__title">{{ resource.formTitle.fixedAssetIncrement }}</h3>
            <div class="form__head">
                <div class="form__field">
                    <MisaTextField icon="icon-search" :placeholder="resource.placeholder.searchFixedAsset"></MisaTextField>
                </div>
            </div>
            <div class="form__table">
                <MisaTable :footer="footer" :isHasCheckbox="true" :bodyData="bodyData" :headData="headData"></MisaTable>
            </div>
            <div class="form__bottom">
                <MisaButton :isOutline="true" :text="resource.buttons.discard"></MisaButton>
                <MisaButton :text="resource.buttons.confirm"></MisaButton>
            </div>
        </div>

    </div>
</template>

<script>
import MisaTextField from '@/components/MisaTextField.vue';
import MisaTable from '@/components/MisaTable.vue';
import MisaButton from '@/components/MisaButton.vue';
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
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                    ["TS0001", "Xe Toyota", "Hành chính sự nghiệp", "10000000", "0", "0"],
                ]
            },
            footer: {
                paging: {
                    totalData: 31,
                    pageSize: 20,
                    currentPage: 1,
                },
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