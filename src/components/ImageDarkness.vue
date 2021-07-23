<template>
  <div id="image-darkness-group" class="w-52">
    <label class="block font-fell" for="image-darkness">Darkness</label>
    <input
        @input="$emit('update:darkness',$event.target.value)"
        :value="darkness"
        class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
        type="range"
        name="image-darkness"
        id="image-darkness"
        min="0"
        max="100"
    />
    <p class="text-center font-fell text-2xl -mt-2">
      {{ Math.abs(darkness - 100) }}<small>%</small>
    </p>
  </div>
</template>

<script>
export default {
  name: "ImageDarkness",
  props:{
    darkness: String
  },
  emits:{
    'update:darkness':null
  }
}
</script>