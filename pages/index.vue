<template>
  <div>
    <ul v-for="headline in headlines" :key="headline.id">
      <li>{{ headline }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get('/api/top-headlines?country=us');
      return {
        headlines: data.articles,
      };
    } catch (e) {
      error({ statusCode: 400, message: 'Invalid Credential' });
    }
  },
};
</script>
