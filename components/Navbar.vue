<template>
  <div class="navbar">
    <!-- navbar -->
    <md-toolbar elevation="1" class="fixed-toolbar">
      <md-button class="md-icon-button" @click="showLeftSidepanel = true">
        <md-icon>menu</md-icon>
      </md-button>

      <nuxt-link to="/" class="md-primary md-title">GlobalNews</nuxt-link>

      <div class="md-toolbar-section-end">
        <template v-if="isAuthenticated">
          <md-button>
            <md-avatar><img :src="user.avatar" :alt="user.email" /></md-avatar>
            {{ user.email }}
          </md-button>

          <md-button>Logout</md-button>
        </template>

        <template v-else>
          <md-button @click="login">Login</md-button>
          <md-button @click="register">Register</md-button>
        </template>

        <md-button class="md-accent" @click="open">Categories</md-button>
      </div>
    </md-toolbar>

    <!-- Personal News Feed (Left Drawer) -->
    <md-drawer md-fixed :md-active.sync="showLeftSidepanel">
      <md-toolbar md-elevation="1">
        <span class="md-title">Personal Feed</span>
      </md-toolbar>

      <md-progress-bar v-if="loading" md-mode="indeterminate"></md-progress-bar>

      <md-field>
        <label for="country">Country</label>
        <md-select
          id="country"
          v-model="country"
          :value="stateCountry"
          name="country"
          @input="changeCountry"
        >
          <md-option value="us">United States</md-option>
          <md-option value="ca">Canada</md-option>
          <md-option value="de">Germany</md-option>
          <md-option value="ru">Russia</md-option>
          <md-option value="ng">Nigeria</md-option>
        </md-select>
      </md-field>
    </md-drawer>

    <!-- news category (right drawer) -->
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
      country: '',
      showSidepanel: false,
      showLeftSidepanel: false,
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
    stateCountry() {
      return this.$store.getters['news/country'];
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    user() {
      return this.$store.getters['auth/user'];
    },
  },
  watch: {
    async country() {
      await this.$store.dispatch(
        'news/loadHeadline',
        `/api/top-headlines?country=${this.stateCountry}&category=${this.stateCategory}`
      );
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
        `/api/top-headlines?country=${this.stateCountry}&category=${this.stateCategory}`
      );
    },
    changeCountry(country) {
      this.$store.commit('news/set_country', country);
    },
  },
};
</script>

<style scoped>
.fixed-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  max-width: 100% !important;
}
</style>
