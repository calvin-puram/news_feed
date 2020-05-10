<template>
  <div class="md-layout md-alignment-center">
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
          <md-card style="margin-top: 1em;" md-with-hover>
            <md-ripple>
              <md-card-media md-ratio="16:9">
                <img :src="headline.urlToImage" :alt="headline.title" />
              </md-card-media>

              <md-card-header>
                <div class="md-title">
                  <a :href="headline.url" target="_blank"
                    >{{ headline.title.substring(0, 50) }}...</a
                  >
                </div>

                <div>
                  {{ headline.source.name }}
                  <md-icon class="small-icon">book</md-icon>
                </div>

                <div v-if="headline.author" class="md-subhead">
                  {{ headline.author }}
                  <md-icon class="small-icon">face</md-icon>
                </div>
                <div v-if="!headline.author" class="md-subhead">
                  Anonymous
                  <md-icon class="small-icon">face</md-icon>
                </div>

                <div class="md-subhead">
                  {{ headline.publishedAt }}
                  <md-icon class="small-icon">alarm</md-icon>
                </div>
              </md-card-header>

              <md-card-content v-if="headline.description !== null">
                {{ headline.description.substring(0, 80) }}...
              </md-card-content>

              <md-card-actions>
                <md-button><md-icon>bookmark</md-icon></md-button>
                <md-button><md-icon>message</md-icon></md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </ul>
      </md-content>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get('/api/top-headlines?country=us');
      console.log(data.articles);
      return {
        headlines: data.articles,
      };
    } catch (e) {
      error({ statusCode: 400, message: 'something Unexpected happens' });
    }
  },
};
</script>

<style scoped>
.small-icon {
  font-size: 18px !important;
}
a {
  text-decoration: none !important;
}

.md-title {
  font-size: 20px !important;
}

.md-card {
  height: 500px !important;
}
</style>
