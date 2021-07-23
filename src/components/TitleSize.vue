<template>
  <div id="title-size-group" class="w-52">
    <label class="block font-fell" for="title-size">Title size</label>
    <input
      @input="$emit('update:titleSize', $event.target.value)"
      :value="titleSize"
      class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
      type="range"
      name="title-size"
      id="title-size"
      min="10"
      max="300"
    />
    <p class="text-center font-fell text-2xl -mt-2">
      {{ titleSize }}<small>px</small>
    </p>
  </div>
</template>

<script>
export default {
  name: "TitleSize",
  props: {
    titleSize: String
  },
  emits: {
    "update:titleSize": null
  }
};
</script>
