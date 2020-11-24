<template>
  <div class="mt-6">
    <h3>{{ this.songs[$route.params.idauthor]["author"] }}</h3>
    <p class="bio">
      Biographie: {{ this.songs[$route.params.idauthor]["bio"] }}
    </p>
  </div>
</template>

<script>
export default {
  created() {
    fetch("http://localhost:3000/playlist")
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
.bio {
  /* max-width: 300px; */
}
</style>
