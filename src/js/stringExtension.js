export default function initExtension() {
     /**
     * author: Nguyen Quoc Huy
     * created at: 30/04/2023
     * description: định  nghĩa phương thức format cho string
     */
    String.prototype.format = function() {
        let _this = this;
        for (let arg in arguments) {
          _this = _this.replace("{" + arg + "}", arguments[arg])
        }
        return _this
    }
}