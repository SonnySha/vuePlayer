<template>
  <v-app class="themeSonny">
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.themeSonny {
  background-color: #20bf55 !important;
  background-image: linear-gradient(315deg, #20bf55 0%, #01baef 74%) !important;
}
</style>
