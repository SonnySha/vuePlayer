<template>
  <div class="mainHome d-flex justify-center align-center">
    <Player></Player>
  </div>
</template>
    
<script>
import Player from "./Player/Player";
export default {
  components: {
    Player,
  },
};
</script>

<style scoped>
.mainHome {
  height: 100%;
  background-color: #f2d0a4;
}
</style>