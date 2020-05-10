export const state = () => ({
  headline: [],
  categories: '',
  countries: 'ng',
  loading: false,
});

export const getters = {
  headlines: (state) => state.headline,
  category: (state) => state.categories,
  loading: (state) => state.loading,
  country: (state) => state.countries,
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
};
