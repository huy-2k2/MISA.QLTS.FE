<template>
  <div>
    <RouterView></RouterView>
    <ToastMessage :text="toastMessageContent" v-if="isShowToastMessage"></ToastMessage>
    <MisaPopup :isHasClose="false" :isShow="isShowDialog">
      <MisaDialog :text="dialogMessage" @click1="isShowDialog = false" quantity="1" button1="Đóng">
      </MisaDialog>
    </MisaPopup>
  </div>
</template>

<script>
import ToastMessage from './components/MisaToastMessage.vue';
import MisaPopup from './components/MisaPopup.vue';
import MisaDialog from './components/MisaDialog.vue';
// import MainLayout from './layouts/MainLayout.vue';
import { RouterView } from 'vue-router';
export default {
  name: 'App',
  components: {
    ToastMessage,
    MisaPopup,
    MisaDialog,
    RouterView
  },
  data() {
    return {
      isShowToastMessage: false,
      isShowDialog: false,
      dialogMessage: '',
      toastMessageContent: '',
      eventSetToastMessage: null,
      eventSetDialogMessage: null,
    }
  },

  /**
   * author: Nguyen Quoc Huy
   * created at: 30/04/2023
   * description: lắng nghe các sự kiện toạn cục, và set một vài biến toàn cục
   */
  mounted() {
    // lắng nghe sự kiện hiện toast messaage
    this.eventSetToastMessage = (text) => {
      this.isShowToastMessage = true
      this.toastMessageContent = text;
      setTimeout(() => this.isShowToastMessage = false, 3000)

    }
    this.emitter.on("setToastMessage", this.eventSetToastMessage);

    // lắng nghe sự kiện hiện dialog thông báo lỗi call api
    this.eventSetDialogMessage = (text) => {
      this.dialogMessage = text;
      this.isShowDialog = true
    }
    this.emitter.on("setDialogMessage", this.eventSetDialogMessage);
  },

  beforeUnmount() {
    this.emitter.off("setToastMessage", this.eventSetToastMessage)
    this.emitter.off("setDialogMessage", this.eventSetDialogMessage)
  }
}
</script>

<style>
@import url(./css/icon.css);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: Misa Font;
  src: url('./assets/font/Roboto/Roboto-Medium.ttf');
}

@font-face {
  font-family: mMisa Font;
  src: url('./assets/font/Roboto/Roboto-Regular.ttf');
}

@font-face {
  font-family: bMisa Font;
  src: url('./assets/font/Roboto/Roboto-Bold.ttf');
}

body {
  font-family: Misa Font;
}

:root {
  --radius-border: 4px;
  --color-border: #afafaf;
}

.label {
  display: flex;
  align-items: center;
  justify-content: start;
  column-gap: 5px;
  font-size: 13px;
  font-family: mMisa Font;
  margin-bottom: 8px;
  user-select: none;
}

.field__validate__label::first-letter {
  text-transform: uppercase;
}

.label__required {
  color: rgb(227, 42, 42);
  margin-bottom: -5px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border: 5px solid white;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #b0b0b0;
  background-clip: padding-box;
}

.field__validate__error,
.field__validate__error strong {
  font-size: 12px;
  font-weight: 400;
  font-family: mMisa Font;
  color: rgba(255, 0, 0, 0.673);
  display: block;
  margin-top: 2px;
}

.form .field__validate__error {
  min-height: 14.4px;
}

.field__validate__error::first-letter {
  text-transform: capitalize;
}

.field__validate__error strong {
  display: inline;
}

.form__title {
  font-size: 18px;
  font-family: mMisa Font;
}

.upper_first::first-letter {
  text-transform: capitalize;
  display: block;
}

input {
  color: #000;
}

a {
  text-decoration: none;
}


td *,
th * {
  display: block;
}


th *::first-letter,
td *::first-letter {
  text-transform: capitalize !important;
}
</style>
