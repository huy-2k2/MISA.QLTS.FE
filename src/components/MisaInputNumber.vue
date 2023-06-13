<template>
    <div class="input_number">
        <p class="input_number__title">{{ resource.fixedAssetDetail.year }}</p>
        <input class="input_number__input" type="text" value="2021">
        <div class="input_number__control">
            <div class="input_number__up">
                <div class="icon-up "></div>
            </div>
            <div class="input_number__down">
                <div class="icon-down "></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.input_number {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
    padding: 8px 12px;
}

.input_number__title {
    font-size: 13px;
}

.input_number__input {
    border: none;
    outline: none;
    width: 30px;
    font-size: 13px;
    font-weight: 700;
    font-family: bMisa Font;
    background-color: transparent;
}

.input_number__control {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
}

.input_number__input::-webkit-inner-spin-button,
.input_number__input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>