export const state = () => ({
  headline: [],
});

export const getters = {
  headlines: (state) => state.headline,
};

export const actions = {
  async loadHeadline({ commit }, apiUrl) {
    const { data } = await this.$axios.get(apiUrl);
    if (data) {
      commit('set_headline', data.articles);
    }
    return data;
  },
};

export const mutations = {
  set_headline(state, data) {
    state.headline = data;
  },
};
