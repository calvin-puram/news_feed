<template>
  <md-toolbar elevation="1" class="fixed-toolbar">
    <md-button class="md-icon-button">
      <md-icon>menu</md-icon>
    </md-button>

    <nuxt-link to="/" class="md-primary md-title">GlobalNews</nuxt-link>

    <div class="md-toolbar-section-end">
      <md-button @click="login">Login</md-button>
      <md-button @click="register">Register</md-button>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/login');
    },
    register() {
      this.$router.push('/register');
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
