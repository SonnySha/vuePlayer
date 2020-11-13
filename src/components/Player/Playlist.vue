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
          <v-btn class="ma-2" outlined fab x-small color="teal">
            <v-icon @click="selectSong(index)">mdi-play</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
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
  },
};
</script>

