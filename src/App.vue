<template>
  <div>
    <router-view></router-view>
    <ToastMessage :text="toastMessageContent" :isShow="isShowToastMessage"></ToastMessage>
    <ThePopup :isHasClose="false" :isShow="isShowDialog">
      <MisaDialog :text="dialogMessage" @click1="isShowDialog = false" quantity="1" button1="Đóng">
      </MisaDialog>
    </ThePopup>
  </div>
</template>

<script>
import ToastMessage from './components/MisaToastMessage.vue';
import { RouterView } from 'vue-router';
import ThePopup from './basics/ThePopup.vue';
import MisaDialog from './components/MisaDialog.vue';
export default {
  name: 'App',
  components: {
    ToastMessage,
    RouterView,
    ThePopup,
    MisaDialog
  },
  data() {
    return {
      isShowToastMessage: false,
      isShowDialog: false,
      dialogMessage: '',
      toastMessageContent: ''
    }
  },

  /**
   * author: Nguyen Quoc Huy
   * created at: 30/04/2023
   * description: lắng nghe các sự kiện toạn cục, và set một vài biến toàn cục
   */
  mounted() {
    // lắng nghe sự kiện hiện toast messaage
    this.emitter.on("setToastMessage", text => {
      this.toastMessageContent = text;
      this.isShowToastMessage = true
      setTimeout(() => this.isShowToastMessage = false, 3000)
    });

    // lắng nghe sự kiện hiện dialog thông báo lỗi call api
    this.emitter.on("setDialogMessage", text => {
      this.dialogMessage = text;
      this.isShowDialog = true
    });
    // set biến store language là vietnam
    this.$store.dispatch('setLanguage', this.$enum.languages.vietnam)
  },
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
  border-radius: 8px;
}

.field__validate__error {
  font-size: 12px;
  font-weight: 400;
  font-family: mMisa Font;
  color: rgba(255, 0, 0, 0.673);
}
</style>
