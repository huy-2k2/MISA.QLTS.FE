export default function initExtension() {

     /**
     * @description: định  nghĩa phương thức format cho string
     * @return: giá trị string sau khi được format
     * @author: NQ Huy 04/05/2023
     */
    String.prototype.format = function() {
        let _this = this;
        for (let arg in arguments) {
          _this = _this.replace("{" + arg + "}", arguments[arg])
        }
        return _this
    }
}