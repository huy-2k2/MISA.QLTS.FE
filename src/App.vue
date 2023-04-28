<template>
  <MainPage></MainPage>
</template>

<script>
import MainPage from './pages/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
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
