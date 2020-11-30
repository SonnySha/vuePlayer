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
    //On imagine que il y a une connexion à une autre API qui nous donne plus d'info sur l'artiste, avec des id etc...
    fetch("https://sonnyplayer-e1ac9.firebaseio.com/playlist.json")
      .then((response) => response.json())
      .then((json) => (this.songs = json));
  },
  data: function () {
    return {
      songs: [],
    };
  },
};
</script>

<style scoped>
</style>
