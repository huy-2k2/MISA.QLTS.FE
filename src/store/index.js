import actions from "./actions";
import state from "./state";
import mutations from "./mutations";

import { createStore } from "vuex";

const store = createStore({state, mutations, actions})

export default store