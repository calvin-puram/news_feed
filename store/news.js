import db from '@/plugins/firestore';
export const state = () => ({
  headline: [],
  feed: [],
  categories: '',
  countries: 'ng',
  loading: false,
});

export const getters = {
  headlines: (state) => state.headline,
  category: (state) => state.categories,
  loading: (state) => state.loading,
  country: (state) => state.countries,
  feed: (state) => state.feed,
};

export const actions = {
  async loadHeadline({ commit }, apiUrl) {
    commit('set_loading', true);
    const { data } = await this.$axios.get(apiUrl);
    if (data) {
      commit('set_headline', data.articles);
      commit('set_loading', false);
    }
    return data;
  },

  async set_addFeed({ rootState }, headline) {
    const feedRef = db
      .collection(`users/${rootState.auth.user.email}/feed`)
      .doc(headline.title);
    await feedRef.set(headline);
  },

  async getFeed({ commit, rootState }) {
    if (rootState.auth.user.email) {
      const feedRef = db.collection(`users/${rootState.auth.user.email}/feed`);
      await feedRef.onSnapshot((querySnapshot) => {
        const headline = [];
        querySnapshot.forEach((doc) => {
          headline.push(doc.data());
          commit('set_feed', headline);
        });
      });
    }
  },
};

export const mutations = {
  set_headline(state, data) {
    state.headline = data;
  },
  set_category(state, category) {
    state.categories = category;
  },
  set_loading(state, loading) {
    state.loading = loading;
  },
  set_country(state, country) {
    state.countries = country;
  },
  set_feed(state, feed) {
    state.feed = feed;
  },
  clear_feed(state) {
    state.feed = [];
  },
};
