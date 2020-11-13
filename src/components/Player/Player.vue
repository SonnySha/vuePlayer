<template>
  <div class="bkgPlayer rounded-xl">
    <v-card id="player" elevation="4" class="mx-auto rounded-xl">
      <v-img
        height="342"
        class="rounded-xl"
        :src="this.imgSong"
        alt="qzqzd"
      ></v-img>

      <v-card-actions class="playerControls rounded-lg justify-center">
        <v-row class="flex-column">
          <p class="text-center">{{ this.title }}</p>
          <p class="text-center">{{ this.author }}</p>
        </v-row>
        <v-row class="justify-center">
          <v-btn @click="previousSong" color="" class="ma-2 white--text" fab>
            <v-icon dark> mdi-skip-previous </v-icon>
          </v-btn>

          <v-btn @click="playSong" color="" class="ma-2 white--text" fab>
            <v-icon dark> mdi-{{ this.isPlayed ? "pause" : "play" }} </v-icon>
          </v-btn>
          <v-btn @click="nextSong" class="ma-2 white--text" fab>
            <v-icon class="iconPlayer" dark> mdi-skip-next </v-icon>
          </v-btn>

          <audio id="audio" ref="player">
            <source id="playerSource" ref="playerSource" src="" />
            Your browser does not support the audio format.
          </audio>
        </v-row>
      </v-card-actions>
    </v-card>
    <div class="playerDisplay">
      <v-btn @click="openPlaylist">Playlist</v-btn>
      <router-view></router-view>
    </div>
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
      title: "",
      author: "",
      imgSong: "http://localhost/apisongs/img/spotify.jpg",
      isPlayed: false,
      indexSongPlayed: -1,
      songs: [],
    };
  },

  methods: {
    playSong() {
      let player = this.$refs["player"];

      if (this.isPlayed) {
        player.pause();
        this.isPlayed = false;
      } else {
        //Si le player est à -1 donc aucun son selectionné au tout début
        if (this.indexSongPlayed == -1) {
          this.indexSongPlayed = 1;
        } else {
          player.play();
        }
        this.isPlayed = true;
      }
    },
    nextSong() {
      if (this.indexSongPlayed + 1 >= this.songs.length) {
        this.indexSongPlayed = 0;
      } else {
        this.indexSongPlayed++;
      }
    },
    previousSong() {
      if (this.indexSongPlayed - 1 < 0) {
        this.indexSongPlayed = this.songs.length - 1;
      } else {
        this.indexSongPlayed--;
      }
    },
    playSongByIndex(indexNewSong) {
      this.indexSongPlayed = indexNewSong;
    },
    openPlaylist() {
      this.$router.push({
        name: "playlist",
        params: {},
      });
    },
  },
  watch: {
    indexSongPlayed(newIndex) {
      let player = this.$refs["player"];
      let playerSource = this.$refs["playerSource"];
      this.title = this.songs[newIndex]["title"];
      this.author = this.songs[newIndex]["author"];
      this.imgSong = this.songs[newIndex]["img"];
      playerSource.src = this.songs[newIndex]["urlSong"];
      player.load();
      player.play();
      this.isPlayed = true;
    },
  },
};
</script>

<style scoped>
.bkgPlayer {
  background-color: white;
  width: 100%;
}

.playerControls {
  background-color: white;
  position: absolute;
  bottom: 0;
  width: 80%;
  margin-left: 35px;
  margin-bottom: -12%;
  display: block;

  box-shadow: 0px 0px 12px 0px rgba(94, 83, 83, 0.56);
  -moz-box-shadow: 0px 0px 12px 0px rgba(119, 119, 119, 0.56);
  -webkit-box-shadow: 0px 0px 12px 0px rgba(119, 119, 119, 0.56);
}

.playerControls button {
  background-color: #d3b88c !important;
}

.playerControls p {
  margin: 0;
}

.playerDisplay {
  margin-top: 15%;
  padding: 5%;
}
</style>
