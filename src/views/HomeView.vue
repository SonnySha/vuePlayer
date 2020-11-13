<template>
  <v-col class="d-flex justify-center" xl="12">
    <div class="home">
      <Player></Player>
    </div>
  </v-col>
</template>

<script>
// @ is an alias to /src
import Player from "@/components/Player/Player";

export default {
  name: "Home",
  components: {
    Player,
  },
};
</script>

<style scoped>
.home {
  min-width: 340px;
}
</style>
