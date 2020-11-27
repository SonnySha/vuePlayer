<template>
  <div class="mt-6">
    <div v-if="this.songs.length > 0">
      <h3>{{ this.songs[$route.params.idauthor]["author"] }}</h3>
      <p class="bio">
        Biographie: {{ this.songs[$route.params.idauthor]["bio"] }}
      </p>
    </div>
    <p v-else>Chargement...</p>
  </div>
</template>

<script>
export default {
  created() {
    fetch("https://sonnyplayer-e1ac9.firebaseio.com/playlist.json")
      .then((response) => response.json())
      .then((json) => (this.songsObj = json));
  },
  data: function () {
    return {
      songs: [],
      songsObj: [],
    };
  },
  watch: {
    songsObj() {
      let arraySongs = [];

      for (const song of Object.keys(this.songsObj)) {
        arraySongs.push(this.songsObj[song]);
      }
      this.songs = arraySongs;
    },
  },
};
</script>

<style scoped>
</style>
