<template>
  <div class="bkgPlayer rounded-xl">
    <v-row>
      <v-col class="pt-0 mainController">
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
              <v-btn
                @click="previousSong"
                color=""
                class="ma-2 white--text"
                fab
              >
                <v-icon dark> mdi-skip-previous </v-icon>
              </v-btn>

              <v-btn @click="playSong" color="" class="ma-2 white--text" fab>
                <v-icon dark>
                  mdi-{{ this.isPlayed ? "pause" : "play" }}
                </v-icon>
              </v-btn>
              <v-btn @click="nextSong" class="ma-2 white--text" fab>
                <v-icon class="iconPlayer" dark> mdi-skip-next </v-icon>
              </v-btn>

              <knob-control
                :min="0"
                :max="100"
                :size="80"
                v-model="volume"
              ></knob-control>
              <audio id="audio" ref="player" volume="0.2" preload="auto">
                <source id="playerSource" ref="playerSource" src="" />
                Your browser does not support the audio format.
              </audio>
            </v-row>
          </v-card-actions>
        </v-card>
        <div class="playerDisplay">
          <!-- Prochainement pour la modal FAVORIS -->
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="mounted()"
                  color="red"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon @click="addFavoris(index)" dark> mdi-heart </v-icon>
                  Favoris
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"> Vos favoris </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item
                      v-for="(favori, index) in this.favoris"
                      :key="index"
                    >
                      <v-btn
                        class="ma-2"
                        x-small
                        outlined
                        fab
                        dark
                        color="error"
                      >
                        <v-icon @click="delFavoris(favori.id)" dark>
                          mdi-delete-forever-outline
                        </v-icon>
                      </v-btn>
                      <v-list-item-avatar>
                        <v-img :src="songs[favori.favoris_id].img"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          songs[favori.favoris_id].title
                        }}</v-list-item-title>
                        <p>{{ favori.id }}</p>
                        <v-list-item-subtitle>{{
                          songs[favori.favoris_id].author
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Fermer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <h2 v-if="this.songsWaiting.length > 0">File d'attente</h2>
          <ul>
            <li v-for="(song, index) in this.songsWaiting" :key="index">
              {{ song.title }}
            </li>
          </ul>
          <!-- <input
            v-model="search"
            type="search"
            placeholder="rechercher une musique"
          /> -->
          <Playlist
            @songWaiting="addSongWaiting"
            @songIndex="playSongByIndex"
            :songs="songs"
          ></Playlist>
          <router-view></router-view>
        </div>
      </v-col>
      <!-- <v-col>
        <h2>Votre file d'attente</h2>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import Playlist from "./Playlist";
import knobControl from "vue-knob-control";
import fire from "../../fire";

export default {
  created() {
    fetch("https://sonnyplayer-e1ac9.firebaseio.com/playlist.json")
      .then((response) => response.json())
      .then((json) => (this.songsObj = json));
  },
  data: function () {
    return {
      title: "",
      author: "",
      imgSong: "https://memorykeeper.fr/apisongs/img/spotify.jpg",
      isPlayed: false,
      indexSongPlayed: -1,
      songs: [],
      songsObj: [],
      songsWaiting: [],
      favoris: [],
      dialog: false,
      volume: 20,
      search: "",
    };
  },
  components: {
    Playlist,
    knobControl,
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
    addSongWaiting(indexSongAdd) {
      this.songsWaiting.push(this.songs[indexSongAdd]);
    },
    delFavoris(idFavori) {
      fire.database().ref("favoris").child(idFavori).remove();

      this.mounted();
    },
    mounted() {
      const itemsRef = fire.database().ref("favoris");
      itemsRef.on("value", (snapshot) => {
        let data = snapshot.val();
        let lstFavoris = [];
        Object.keys(data).forEach((key) => {
          lstFavoris.push({
            id: key,
            favoris_id: data[key].favoris_id,
          });
        });
        this.favoris = lstFavoris;
      });
    },
    arrayByObj() {
      return "erere";
    },
  },
  watch: {
    indexSongPlayed(newIndex) {
      let player = this.$refs["player"];
      let playerSource = this.$refs["playerSource"];

      // Si il y a une musique mis en attente on la jouera
      if (this.songsWaiting.length > 0) {
        this.title = this.songsWaiting[0]["title"];
        this.author = this.songsWaiting[0]["author"];
        this.imgSong = this.songsWaiting[0]["img"];
        playerSource.src = this.songsWaiting[0]["urlSong"];
        this.songsWaiting.shift();
      } else {
        this.title = this.songs[newIndex]["title"];
        this.author = this.songs[newIndex]["author"];
        this.imgSong = this.songs[newIndex]["img"];
        playerSource.src = this.songs[newIndex]["urlSong"];
      }

      player.load();
      player.play();
      this.isPlayed = true;
    },
    volume(newValue) {
      let player = this.$refs["player"];
      player.volume = newValue / 100;
      // console.log(newValue / 100);
    },
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
.mainController {
  min-width: 325px;
}

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
  max-width: 480px;
  margin-top: 15%;
  padding: 5%;
}

.v-dialog {
  max-width: 400px;
}
</style>
