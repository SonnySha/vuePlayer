<template>
  <div class="d-flex align-center">
    <v-btn
        outlined
        fab
        x-small
        color="red"
        class="mr-2"
        @click="delFavoris()"
        v-if="indexSong"
    >
      <v-icon >mdi-heart-remove</v-icon>
    </v-btn>
    <v-list-item-avatar class="mr-4">
      <v-img :src="srcSong"></v-img>
    </v-list-item-avatar>
    <v-list-item-content class="pb-0">
      <v-list-item-title>{{ titleSong }}</v-list-item-title>
      <v-list-item-subtitle>
        <p>{{ authorSong }}</p>
      </v-list-item-subtitle>
    </v-list-item-content>
  </div>
</template>

<script>
import fire from "@/fire";

export default {
  props: {
    indexSong: String,
    srcSong: String,
    titleSong: String,
    authorSong: String,
  },
  methods: {
    delFavoris() {
      console.log(this.indexSong)
      fire.database().ref("favoris").child(this.indexSong).remove();

    },
  },
};
</script>