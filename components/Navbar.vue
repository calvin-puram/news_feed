<template>
  <div class="md-layout-item">
    <md-toolbar elevation="1" class="fixed-toolbar">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <nuxt-link to="/" class="md-primary md-title">GlobalNews</nuxt-link>

      <div class="md-toolbar-section-end">
        <md-button @click="login">Login</md-button>
        <md-button @click="register">Register</md-button>
        <md-button class="md-accent" @click="open">Categories</md-button>
      </div>
    </md-toolbar>
    <!-- news category -->
    <md-drawer class="md-right" md-fixed :md-active.sync="showSidepanel">
      <md-toolbar :md-elevation="1">
        <span class="md-title">News Categories</span>
      </md-toolbar>

      <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

      <md-list>
        <md-subheader class="md-primary">Categories</md-subheader>
        <md-list-item
          v-for="(category, i) in newsCategories"
          :key="i"
          @click="loadCategory(category.path)"
        >
          <md-icon
            :class="category.path === stateCategory ? 'md-primary' : ''"
            >{{ category.icon }}</md-icon
          >
          <span class="md-list-item-text">{{ category.name }}</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidepanel: false,
      newsCategories: [
        { name: 'Top Headlines', path: '', icon: 'today' },
        { name: 'Technology', path: 'technology', icon: 'keyboard' },
        { name: 'Business', path: 'business', icon: 'business_center' },
        { name: 'Entertainment', path: 'entertainment', icon: 'weekend' },
        { name: 'Health', path: 'health', icon: 'fastfood' },
        { name: 'Science', path: 'science', icon: 'fingerprint' },
        { name: 'Sports', path: 'sports', icon: 'golf_course' },
      ],
    };
  },
  computed: {
    stateCategory() {
      return this.$store.getters['news/category'];
    },
    loading() {
      return this.$store.getters['news/loading'];
    },
  },
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
    },
    open() {
      this.showSidepanel = !this.showSidepanel;
    },
    async loadCategory(category) {
      this.$store.commit('news/set_category', category);
      await this.$store.dispatch(
        'news/loadHeadline',
        `/api/top-headlines?country=us&category=${this.stateCategory}`
      );
    },
  },
};
</script>

<style scoped>
.fixed-toolbar {
  position: fixed;
  top: 0;
  z-index: 5;
}
</style>
