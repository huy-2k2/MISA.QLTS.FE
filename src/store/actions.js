import axios from "axios"
import emitter from '../common/emitter';
import apiErrorMessages from "@/resource/apiErrorMessages";

function getData(commit, url, field, language) {
    commit('setLoading', {isLoading: true, field})
    axios.get(url)
    .then(({data}) => {
        commit('setData', {data, field})
        commit('setLoading', {isLoading: false, field})
    })
    .catch(error => {
        const message = apiErrorMessages[error.response.status][language]
        emitter.emit('setDialogMessage', message)
    })
}

const actions = {
    getDepartments({commit, state}) {
        getData(commit, 'https://jsonplaceholder.typicode.com/users', 'departments', state.language)
    },

    getAssetTypes({commit, state}) {
        getData(commit, 'https://jsonplaceholder.typicode.com/users', 'assetTypes', state.language)

    },

    getAssets({commit, state}) {
        getData(commit, 'https://jsonplaceholder.typicode.com/users', 'assets', state.language)
    },

    setLanguage({commit}, language) {
        commit('setLanguage', language)
    }

}

export default actions