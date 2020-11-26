<template>
  <div>
    <h2>Ma playlist</h2>
    <v-list>
      <v-list-item v-for="(song, index) in this.songs" :key="index">
        <v-list-item-avatar>
          <v-img :src="song.img"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ song.title }}</v-list-item-title>
          <v-list-item-subtitle
            ><router-link
              :to="{ name: 'author', params: { idauthor: index } }"
              >{{ song.author }}</router-link
            ></v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-btn class="ma-2" x-small outlined fab dark color="error">
              <v-icon @click="addFavoris(index)" dark> mdi-heart-plus </v-icon>
            </v-btn>
            <v-btn class="ma-2" x-small outlined fab dark color="blue">
              <v-icon @click="songWaiting(index)" dark>
                mdi-format-list-bulleted-square
              </v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined fab x-small color="teal">
              <v-icon @click="selectSong(index)">mdi-play</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import fire from "../../fire";

export default {
  data: function () {
    return {};
  },
  props: {
    songs: Array,
  },
  methods: {
    selectSong(index) {
      this.$emit("songIndex", index);
    },
    songWaiting(index) {
      this.$emit("songWaiting", index);
    },
    addFavoris(idFavoris) {
      const favori = {
        favoris_id: idFavoris,
      };
      fire.database().ref("favoris").push(favori);
      // this.mounted();
      // this.updData();
    },
    updData() {
      console.log("update !");
      // task.done = !task.done;
      // Select specific list, and find the specific item to mutate with its index
      fire
        .database()
        .ref("messages")
        .child("-MN3H0r_sApLuNSGB9zR")
        // Update the “done” property to match local property
        .update({ username: "bienene !!!!" });
    },
  },
};
</script>

