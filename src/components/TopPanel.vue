<template>
  <div class="relative  dark:bg-red-400 bg-blue-300">
    <div class="absolute z-30 logo p-0.5">
      <h1 class="inline-block text-5xl font-gregorian text-black">
        {{ title }}
      </h1>
      <span class="font-fell font-bold font-mono text-4xl">IFY</span>
    </div>
    <img src="../assets/img/burzum.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "TopPanel",
  props: {
    title: String
  }
};
</script>
