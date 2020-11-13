<template>
  <div class="mt-6">
    <p>Artiste:</p>
    <h3>{{ this.songs[$route.params.idauthor]["author"] }}</h3>
    <p>Biographie: Lorem ipsum doqdqzdqdzqlor</p>
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
