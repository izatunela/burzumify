<template>
  <div id="image-grayscale-group" class="w-52">
    <legend class="font-fell">Grayscale</legend>
    <label
        class="pr-2 font-fell cursor-pointer"
        for="image-color-original"
    >Original</label
    >
    <input
        @input="$emit('update:grayscale','original')"
        :value="grayscale"
        style="width: 10px; height: 10px"
        class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
        type="radio"
        name="image-color"
        id="image-color-original"
        :checked="grayscale==='original'"
    />
    <label class="px-2 font-fell cursor-pointer" for="image-color-dark"
    >Dark</label
    >
    <input
        @input="$emit('update:grayscale','dark')"
        :value="grayscale"
        style="width: 10px; height: 10px"
        class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
        type="radio"
        name="image-color"
        id="image-color-dark"
        :checked="grayscale==='dark'"
    />
  </div>
</template>

<script>
export default {
  name: "ImageGrayscale",
  props:{
    grayscale: String
  }
}
</script>