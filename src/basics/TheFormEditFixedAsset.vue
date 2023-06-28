<template>
    <div class="main">
        <div class="form">
            <h3 class="form__title">{{ resource.formTitle.editFixedAsset.format("Xe Toyota") }}</h3>
            <div class="form__body">
                <div class="form__field">
                    <MisaTextfieldForm :required="false" :disable="true" v-model="department"
                        :label="resource.fieldName.department"></MisaTextfieldForm>
                </div>
                <div class="form__price">
                    <div class="form__price__title">{{ resource.fieldName.cost }}</div>
                    <div class="form__price__body">
                        <div class="form__price__row">
                            <div class="form__price__col">
                                <div class="form__price__col__title">{{ resource.fieldName.source }}</div>
                            </div>
                            <div class="form__price__col">
                                <div class="form__price__col__title">{{ resource.fieldName.value }}</div>
                            </div>
                        </div>
                        <div class="form__fields custom-scrollbar">
                            <div v-for="(field, index) in fields" :key="field" class="form__price__row">
                                <div class="form__price__col--big">
                                    <MisaCombobox fieldText="sourceName" fieldValue="sourceCode" :data="source"
                                        :typeCombobox="$enum.typeCombobox.listOption"
                                        :placeholder="resource.placeholder.combobox.format(resource.fieldName.source)"
                                        v-model="field.combobox" :isLoading="false" :isDisplayValue="false">
                                    </MisaCombobox>
                                </div>
                                <div class="form__price__col--small">
                                    <MisaNumberForm :currrency="true" v-model="field.cost" :icon="false" :required="false">
                                    </MisaNumberForm>
                                </div>
                                <div class="form__price__control">
                                    <div @click="handleAddField(index)" class="form__price__button">
                                        <MisaToolTip :tooltip="resource.tooltip.addIncrement">
                                            <div class="icon-add"></div>
                                        </MisaToolTip>
                                    </div>
                                    <div @click="handleRemoveField(index)" class="form__price__button">
                                        <MisaToolTip :tooltip="resource.tooltip.removeIncrement">
                                            <div class="icon-remove"></div>
                                        </MisaToolTip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form__price__row">
                            <div class="form__price__col--big">
                                <MisaTextfieldForm :disable="true" :required="false" v-model="totalText">
                                </MisaTextfieldForm>
                            </div>
                            <div class="form__price__col--small">
                                <MisaNumberForm :currrency="true" :icon="false" :disable="true" :required="false"
                                    v-model="totalVale">
                                </MisaNumberForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form__bottom">
                <MisaButton :isOutline="true" :text="resource.buttons.cancel"></MisaButton>
                <MisaButton :text="resource.buttons.save"></MisaButton>
            </div>
        </div>
    </div>
</template>

<script>
import MisaTextfieldForm from '@/components/MisaTextfieldForm.vue';
import MisaCombobox from '@/components/MisaCombobox.vue';
import MisaNumberForm from '@/components/MisaNumberForm.vue';
import MisaToolTip from '@/components/MisaToolTip.vue';
import MisaButton from '@/components/MisaButton.vue';

export default {
    components: { MisaTextfieldForm, MisaCombobox, MisaNumberForm, MisaToolTip, MisaButton },
    data() {
        return {
            totalText: 'Tổng',
            totalVale: '100000000',
            department: "Trung tâm GDTX",
            source: [
                { sourceCode: "1", sourceName: 'Ngân sách Tỉnh' },
                { sourceCode: "2", sourceName: 'Ngân sách Huyện' },
                { sourceCode: "3", sourceName: 'Ngân sách Trung ương' },
            ],
            fields: [
                {
                    combobox: "1",
                    cost: "1000000"
                },
                {
                    combobox: "1",
                    cost: "1000000"
                },
            ]
        }
    },
    methods: {
        handleAddField(index) {
            this.fields.splice(index + 1, 0, { combobox: null, cost: null })
        },
        handleRemoveField(index) {
            this.fields.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.form {
    background-color: #fff;
    border-radius: var(--radius-border);
    width: 700px;
    max-width: 100%;
}

.form__title {
    padding: 20px;
}

.form__field {
    width: 500px;
}

.form__body {
    padding: 0 20px;
    height: 500px;
}

.form__price__title::first-letter {
    text-transform: uppercase;
}

.form__price__body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 2px;
}

.form__price__row {
    width: 500px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    column-gap: 8px;
    position: relative;
}

.form__price__col__title {
    font-size: 14px;
    font-family: mMisa Font;
    text-align: left;
}

.form__price__col__title::first-letter {
    text-transform: capitalize;
}

.form__price__col--big {
    width: calc(66.67% - 4px);
}

.form__price__col--small {
    width: calc(33.33% - 4px);
}

.form__price__control {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    position: absolute;
    top: 10px;
    left: calc(100% + 16px);
}

.form__price__button {
    cursor: pointer;
}

.form__fields {
    height: 300px;
    overflow-y: auto;
    scroll-behavior: auto;
}

.form__bottom {
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    padding: 8px 20px;
    border-radius: inherit;
}
</style>