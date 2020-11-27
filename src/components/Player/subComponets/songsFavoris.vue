<template>
<div>
  <!-- Modal FAVORIS -->
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" dark v-bind="attrs" v-on="on">
          <v-icon dark> mdi-heart </v-icon>
          {{ countFavoris }} Favoris
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"> Vos favoris </v-card-title>
        <v-card-text v-if="countFavoris > 0">
          <v-list>
            <v-list-item
                v-for="(songId, index) in rtnFavoris"
                :key="index"
            >
              <song
                  :index-song="songId.id"
                  :srcSong="rtnSongs[songId.favoris_id].img"
                  :titleSong="rtnSongs[songId.favoris_id].title"
                  :authorSong="rtnSongs[songId.favoris_id].author"
              ></song>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text v-else>
          <p>Aucun favoris</p>
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

</div>
</template>

<script>
import {mapGetters} from "vuex";
import fire from "@/fire";
import Song from "./song"

export default {
  name: "songsFavoris",
  created() {
    const refFavoris = fire.database().ref("/favoris");
    // **** Temps reel sur bdd favoris
    //Recupére les objet brute
    // ref.on(
    //   "value",
    //   (snapshot) => {
    //     this.favoris = snapshot.val();
    //     console.log(snapshot.val());
    //   },
    //   (errorObject) => {
    //     console.log("error: " + errorObject.code);
    //   }
    // );

    refFavoris.on("value", (snapshot) => {
      let data = snapshot.val();
      let lstFavoris = [];

      //Transforme notre objet en tableau
      try {
        Object.keys(data).forEach((key) => {
          lstFavoris.push({
            id: key,
            favoris_id: data[key].favoris_id,
          });
        });
      } catch {
        console.log("Aucun favoris");
      }

      // this.favoris = lstFavoris;
      this.$store.dispatch("initFavoris", lstFavoris);
    });
  },
  data: function (){
    return {
      dialog: false,
    }
  },
  components: {
    Song,
  },
  computed: {
      ...mapGetters(["displaySongsWaiting", "rtnSongs","rtnFavoris", "countFavoris"]),
  },
}
</script>

<style scoped>

</style>