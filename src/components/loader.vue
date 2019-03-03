<template>
  <v-app>
    <v-layout justify-center>
      <v-flex ma-auto>
        <div class="custom-loader">i</div>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
  color: red !important;
  background-color: rgb(100, 100, 224) !important;
  width: 70px !important;
  margin: 0 auto !important;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
