<template>
  <div>
    <h2 v-if="this.displaySongsWaiting.length > 0">File d'attente</h2>
    <v-list>
      <v-list-item
        v-for="(songWaitingId, index) in this.displaySongsWaiting"
        :key="index"
      >
        <song
            :index-song="null"
          :srcSong="rtnSongs[songWaitingId].img"
          :titleSong="rtnSongs[songWaitingId].title"
          :authorSong="rtnSongs[songWaitingId].author"
        ></song>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Song from "./song";
export default {
  computed: {
    ...mapGetters(["displaySongsWaiting", "rtnSongs"]),
  },
  components: {
    Song,
  },
};
</script>