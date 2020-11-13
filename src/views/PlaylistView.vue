<template>
  <div>
    <Playlist @songIndex="playSongByIndex" :songs="songs"></Playlist>
  </div>
</template>

<script>
import Playlist from "@/components/Player/Playlist";
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
  components: {
    Playlist,
  },
};
</script>