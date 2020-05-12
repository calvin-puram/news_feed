import md5 from 'md5';
import db from '@/plugins/firestore';

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
      const { data } = await this.$axios.post(userdata.Api_Url, {
        email: userdata.email,
        password: userdata.password,
        returnSecureToken: userdata.returnSecureToken,
      });
      let user;
      if (data && data.idToken) {
        if (userdata.action === 'register') {
          const avatar = `http://gravatar.com/avatar/${md5(
            data.email
          )}?d=identicon`;
          user = { email: data.email, avatar };
          await db.collection('users').doc(userdata.email).set(user);
        } else {
          const loginRef = await db.collection('users').doc(userdata.email);
          const loggedInUser = await loginRef.get();
          user = loggedInUser.data();
        }
        commit('auth_loading', false);
        commit('set_token', data.idToken);
        commit('set_user', user);

        await saveToLocalStorage(data, user);
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
