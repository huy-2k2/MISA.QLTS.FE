<template>
    <div class="dialog">
        <div class="dialog__head">
            <div class="dialog__icon">
                <div class="icon-warning"></div>
            </div>
            <div class="dialog__title" v-html="text"></div>
        </div>
        <div ref="dialogButtons" class="dialog__control">
            <MisaButton :shadow="true" @clickButton="$emit('click2')" v-if="quantity >= 2" :isOutline="true"
                :text="button2"></MisaButton>
            <MisaButton :shadow="true" @clickButton="$emit('click3')" v-if="quantity >= 3" :isSub="true" :text="button3">
            </MisaButton>
            <MisaButton :shadow="true" @clickButton="$emit('click1')" :text="button1"></MisaButton>
        </div>
    </div>
</template>

<script>
import MisaButton from './MisaButton.vue'
export default {
    components: { MisaButton },
    data() {
        return {
            // event xử lý sự kiện keydown
            handleKeyDown: null
        }
    },
    props: {
        // text hiển thị cho dialog
        text: {
            type: String,
            default: ''
        },

        // số lượng button
        quantity: [String, Number],

        // text hiển thị cho button1
        button1: {
            type: String,
            default: ''
        },
        // text hiển thị cho button2
        button2: {
            type: String,
            default: ''
        },
        // text hiển thị cho button3
        button3: {
            type: String,
            default: ''
        },
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 07/05/2023
    * description: Xử lý taborder, ban đầu focus vào button đầu tiên, khi tab đến button cuối cùng thì focus lại vào button ban đầu
    */
    mounted() {
        const buttons = [...this.$refs.dialogButtons.querySelectorAll('button')]
        buttons[buttons.length - 1].focus()
        this.handleKeyDown = (event) => {
            if (event.key == 'Tab') {
                let index = buttons.findIndex(button => button == this.$refs.dialogButtons.querySelector('button:focus'))
                index = (index + 1) % buttons.length
                buttons[index].focus()
                event.preventDefault();
            }
        }
        window.addEventListener('keydown', this.handleKeyDown)
    },

    /**
    * author: Nguyen Quoc Huy
    * created at: 07/05/2023
    * description: hủy bỏ lắng nghe sự kiện
    */
    unmounted() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

}
</script>

<style scoped>
.dialog {
    background-color: #fff;
    border-radius: var(--radius-border);
    padding: 20px;
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.155);
    max-width: 600px;
    min-width: 400px;
}

.dialog__head {
    display: flex;
    align-items: center;
    column-gap: 24px;
}

.dialog__title {
    font-family: mMisa Font;
    font-weight: 400;
    font-size: 13px;
    line-height: 1.6;
    flex-grow: 1;
    overflow-wrap: normal;
    overflow-wrap: break-word;
    overflow-wrap: anywhere;
}

.dialog__title * {
    color: red;
}

.dialog__control {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    margin-top: 20px;
}
</style>