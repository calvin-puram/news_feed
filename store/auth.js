import md5 from 'md5';
import db from '~plugins/firestore';

export const state = () => ({
  loading: false,
  token: '',
  user: {},
});

export const getters = {
  loading: (state) => state.loading,
  isAuthenticated: (state) => state.token !== '',
  user: (state) => state.user,
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

        const avatar = `http://gravatar.com/avatar/${md5(
          data.email
        )}?d=identicon`;
        const user = { email: data.email, avatar };
        await db.collection('users').doc(userdata.email).set(user);
        commit('set_user', user);
      }
      return data;
    } catch (e) {
      commit('auth_loading', false);
      console.log(e.response.data.error.message);
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

  set_user(state, user) {
    state.user = user;
  },
};
