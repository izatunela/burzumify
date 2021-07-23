<template>
  <div class="flex justify-items-center">
    <div class="w-0 fixed h-screen sm:w-1/4 xl:w-1/3 pr-4">
      <img
        class="w-full h-full object-cover "
        src="../src/assets/img/burzum3.jpg"
        alt=""
      />
    </div>
    <div class="w-full sm:w-1/2 xl:w-1/3 mx-auto relative z-30 bg-white">
      <top-panel class="" :title="title"></top-panel>
      <burzumify-layout></burzumify-layout>
      <div class="opacity-50 bg-white w-full text-center py-6">
        <p class="font-fell ">Conjured by Marko</p>
      </div>
    </div>
    <div class="w-0 fixed h-screen right-0 sm:w-1/4 xl:w-1/3 pl-4">
      <img
        class="w-full h-full object-cover transform -rotate-180"
        src="../src/assets/img/burzum3.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import TopPanel from "./components/TopPanel.vue";
import BurzumifyLayout from "./components/BurzumifyLayout.vue";

export default {
  name: "Master",
  data() {
    return {
      title: "BURZUM"
    };
  },
  components: {
    TopPanel,
    BurzumifyLayout
  },
  methods: {}
};
</script>