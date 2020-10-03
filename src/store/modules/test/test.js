// import UserDetailsRepository from '../../../repositories/UserDetailsRepository';

const state = {
    loginStateType: null,
};

const mutations = {
    // SET_LOGIN_STATE_TYPE(state, data) {
    //     state.loginStateType = data;
    // }
}

const getters = {
    // getLoginStateType: state => state.loginStateType,
}

const actions = {
    // registerUserPreAuth({ commit }, payload) {
    //     let login = payload.login;
    //
    //     return this.$apiConnection.getRegisterUserPreAuth(login).then(response => {
    //         commit('SET_PRE_REGISTER_RESPONSE', response);
    //         return response;
    //     }).catch(err => {
    //         console.error(err);
    //         throw err;
    //     })
    // },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
