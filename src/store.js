import { createStore, createLogger } from 'vuex'

const store = createStore({
    plugins: [createLogger()],
    state() {
        return {
            user: {
                fullName: '',
                veryfied: false,
            },
            snackbar: {
                type: false,
                message: 'alert',
                color: 'success',
                colorBtn: '#fff',
            }
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setSnackbar(state, payload) {
            state.snackbar.type = payload.type
            state.snackbar.message = payload.message
            state.snackbar.color = payload.color
        }
    },
    actions: {
        setUser(context, payload) {
            context.commit('setUser', payload)
        },
        setSnackbar(context, payload) {
            context.commit('setSnackbar', payload)
        }
    },
})

export default store