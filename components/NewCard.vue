<template>
  <md-card style="margin-top: 1em;" md-with-hover>
    <md-ripple>
      <md-card-media v-if="headline.urlToImage" md-ratio="16:9">
        <img :src="headline.urlToImage" :alt="headline.title" />
      </md-card-media>
      <md-card-media v-if="!headline.urlToImage" md-ratio="16:9">
        <img src="~assets/img/cover.jpg" :alt="headline.title" />
      </md-card-media>

      <md-card-header>
        <div class="md-title">
          <a :href="headline.url" target="_blank"
            >{{ headline.title.substring(0, 30) }}...</a
          >
        </div>

        <div>
          {{ headline.source.name }}
          <md-icon class="small-icon">book</md-icon>
        </div>

        <div v-if="headline.author" class="md-subhead">
          {{ headline.author.substring(0, 20) }}...
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
        {{ headline.description.substring(0, 50) }}
      </md-card-content>

      <md-card-actions>
        <md-button><md-icon>bookmark</md-icon></md-button>
        <md-button><md-icon>message</md-icon></md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
export default {
  props: {
    headline: {
      type: Object,
      required: true,
    },
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
