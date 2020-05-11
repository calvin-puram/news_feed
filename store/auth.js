export const state = () => ({
  loading: false,
  token: '',
});

export const getters = {
  loading: (state) => state.loading,
  isAuthenticated: (state) => state.token !== '',
};

export const actions = {
  async register_user({ commit }, userdata) {
    try {
      commit('auth_loading', true);
      const { data } = await this.$axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FB_AUTH_KEY}`,
        userdata
      );
      if (data) {
        commit('auth_loading', false);
        commit('set_token', data.idToken);
      }
      return data;
    } catch (e) {
      commit('auth_loading', false);
      console.log(e.response.data.error.msg);
    }
  },
};

export const mutations = {
  auth_loading(state, loading) {
    state.loading = loading;
  },

  set_token(state, token) {
    state.token = token;
  },
};
