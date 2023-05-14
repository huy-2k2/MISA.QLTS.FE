const mutations = {
    setData(state, {data, field}) {
        state[field].data = data
    },
    setLoading(state, {isLoading, field}) {
        state[field].isLoading = isLoading
    },
    setLanguage(state, language) {
        state.language = language
    }    
}

export default mutations