<template>
  <div class="md-layout md-alignment-center" style="margin: 4em 0;">
    <!-- nav -->
    <Navbar />

    <div class="md-layout-item md-size-95">
      <md-content
        class="md-layout md-gutter"
        style="background: #007998; padding: 1em;"
      >
        <ul
          v-for="headline in headlines"
          :key="headline.id"
          class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <NewsCard :headline="headline" />
        </ul>
      </md-content>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import NewsCard from '@/components/NewCard';

export default {
  components: {
    Navbar,
    NewsCard,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch(
        'news/loadHeadline',
        `/api/top-headlines?country=${store.state.news.countries}&category=${store.state.news.categories}`
      );
    } catch (e) {
      error({ statusCode: 400, message: 'something Unexpected happens' });
    }
  },
  data() {
    return {
      showSidepanel: false,
    };
  },
  computed: {
    headlines() {
      return this.$store.getters['news/headlines'];
    },
  },
};
</script>

<style>
body {
  overflow: auto;
}
</style>
