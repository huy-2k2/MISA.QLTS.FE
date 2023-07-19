<template>
    <div class="wrapper">
        <div class="error" v-if="isShowError">{{ error.text }}</div>
        <div class="login">
            <div class="img">
                <img src="../assets/image/login_local.png" alt="">
            </div>
            <form @submit.prevent="handleSubmitLogin" class="form">
                <div class="form__logo">
                    <img src="../assets/image/misa_logo.svg" alt="">
                </div>
                <h3 v-html="resource.formTitle.login" class="form__title">

                </h3>
                <div class="form__fields">
                    <input @focus="error.email = false" v-model="email" type="text" :class="{ isError: error.email }"
                        class="form__input" :placeholder="resource.fieldName.username">
                    <div class="form__password">
                        <input @focus="error.password = false" v-model="password" :class="{ isError: error.password }"
                            :type="typePassword" :placeholder="resource.fieldName.password" class="form__input">
                        <div class="form__password__toggle">
                            <div @click="typePassword = 'text'" v-if="typePassword == 'password'" class="icon-eye"></div>
                            <div @click="typePassword = 'password'" v-else class="icon-eye-close"></div>
                        </div>
                    </div>
                    <button class="form__button" type="submit">{{ resource.buttons.login }}</button>
                </div>
                <div class="form__forget">{{ resource.buttons.forgotPassword }}</div>
            </form>
        </div>
        <MisaPopup :isShow="isLoading" :isHasClose="false">
            <MisaLoading></MisaLoading>
        </MisaPopup>
    </div>
</template>

<script>
import MisaPopup from '@/components/MisaPopup.vue';
import MisaLoading from '@/components/MisaLoading.vue';
import { getIsLoginedApi, getTokenApi } from '@/js/api';

export default {
    data() {
        return {
            // email người dùng nhập
            email: "",
            // password người dùng nhập
            password: "",
            // kiểm soát type của input password
            typePassword: "password",
            // lỗi validate
            error: {
                text: "",
                email: false,
                password: false
            },
            // điều kiển hiện thị thông báo lỗi
            isShowError: false,
            // timeout hiển thị thông báo lỗi
            timoutShowError: null,
            // kiểm soát trạng thái loading khi submit
            isLoading: false
        };
    },

    /**
     * @description: Tkiểm tra nếu người dùng có token hợp lệ thì chuyển hướng đến trang chủ
     * @author: NQ Huy(20/06/2023)
     */
    async beforeMount() {
        this.isLoading = true
        try {
            // nếu đã có token hợp lệ thì cho đến trang chủ
            await getIsLoginedApi()
            this.$router.push('/asset')
        } catch {
            this.isLoading = false
        }
    },
    methods: {
        /**
        * @description:  xử lý sự kiện khi người dùng ấn nút đăng nhập
        * @author: NQ Huy(20/06/2023)
        */
        async handleSubmitLogin() {
            // kiểm tra nếu chưa nhập email và password
            if (this.email == "" || this.password == "") {
                this.error.text = this.resource.toastMessage.credentialRequired;
                this.error.email = this.email == "";
                this.error.password = this.password == "";
                this.isShowError = true;
                clearTimeout(this.timoutShowError);
                this.timoutShowError = setTimeout(() => this.isShowError = false, 3000);
                return;
            }
            // gửi thông tin đăng nhập lên server
            this.isLoading = true
            try {
                const { data } = await getTokenApi(this.email, this.password)
                localStorage.setItem("bearer_token", data);
                this.$router.push({ path: "/asset" });
            }
            // nếu có lỗi thì hiển thị lỗi
            catch (error) {
                this.isLoading = false
                const errorCode = error?.response?.data?.errorCode;
                // kiểm tra mã lỗi là token không hợp lệ
                if (errorCode == this.$enum.errorCode.credentialNotValid) {
                    // thống báo lỗi cho người dùng
                    this.error.text = this.resource.toastMessage.credentialInvalid;
                    this.isShowError = true;
                    clearTimeout(this.timoutShowError);
                    this.timoutShowError = setTimeout(() => this.isShowError = false, 3000);
                }
            }
        },
    },
    components: { MisaPopup, MisaLoading }
}
</script>

<style scoped>
.error {
    min-width: 250px;
    background-color: #f65335;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 6px 20px;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    position: fixed;
}

.form__forget {
    color: #1a73e8;
    font-size: 15px;
    font-weight: 400;
    font-family: mMisa Font;
    cursor: pointer;
}

.form__button {
    height: 44px;
    border: none;
    border-radius: var(--radius-border);
    color: #fff;
    background-color: #1a73e8;
    font-size: 16px;
    cursor: pointer;
}

.form__password {
    position: relative;
}

.form__password__toggle {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
}

.form__input {
    border: 1px solid #dadce0;
    border-radius: var(--radius-border);
    padding: 0 20px;
    width: 100%;
    height: 44px;
}

.form__input.isError {
    border-color: rgb(227, 42, 42);
}

.form__input:focus {
    outline: none;
    border-color: #1aa4c8;
}

.form__input::placeholder {
    color: rgba(128, 128, 128, 0.648);
    font-size: 14px;
}

.form__fields {
    width: 305px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}

.form__title {
    color: #4f4f4f;
    font-size: 15px;
    font-weight: 400;
}

.wrapper {
    background-image: url('../assets/image/bg_login.png');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.img {
    flex-shrink: 0;
}

.img img {
    display: block;
}

.login {
    width: 770px;
    border-radius: var(--radius-border);
    overflow: hidden;
    display: flex;
}

.form {
    background-color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
}
</style>