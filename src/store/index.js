import fa from './fixedAsset'
import ls from './license'
import { createStore } from "vuex";

const store = createStore(
    {
        modules: {
          fa,
          ls
        }
    }
)

export default store