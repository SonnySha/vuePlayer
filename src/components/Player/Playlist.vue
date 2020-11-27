<template>
  <div>
    <h2>Ma playlist</h2>

    <v-row>
      <v-col>
        <v-select
          v-model="inputOverflow"
          :items="['title', 'author']"
          label="Option de recherche"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="inputSearch"
          label="Recherche"
          class="pa-0 mt-0"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-list>
      <v-list-item v-for="(song, index) in filterPlaylist" :key="index">
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
    return {
      inputSearch: "",
      inputOverflow: "",
    };
  },
  props: {
    songs: Array,
  },
  methods: {
    selectSong(index) {
      this.$emit("songIndex", index);
    },
    songWaiting(index) {
      this.$store.dispatch("addSongWaiting", index);
    },
    addFavoris(idFavoris) {
      const favori = {
        favoris_id: idFavoris,
      };

      if (this.$store.getters.existFavoris(idFavoris)) {
        console.log("Favoris deja enregistré");
      } else {
        fire.database().ref("favoris").push(favori);
      }

      // this.mounted();
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
  computed: {
    filterPlaylist() {
      if (this.inputOverflow == "") {
        return this.songs;
      }

      if (this.inputSearch.length < 3) {
        return this.songs;
      } else {
        return this.songs.filter((elt) =>
          elt[this.inputOverflow].includes(this.inputSearch)
        );
      }
    },
  },
};
</script>

