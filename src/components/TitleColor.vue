<template>
  <div id="font-color-group" class="w-52">
    <fieldset>
      <legend class="font-fell">Title color</legend>
      <label class="pr-2 font-fell cursor-pointer" for="font-color-dark"
        >Dark</label
      >
      <input
        @input="$emit('update:titleColor', 'dark')"
        :value="titleColor"
        style="width: 10px; height: 10px"
        class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
        type="radio"
        name="font-color"
        id="font-color-dark"
        :checked="titleColor === 'dark'"
      />
      <label class="px-2 font-fell cursor-pointer" for="font-color-white"
        >White</label
      >
      <input
        @input="$emit('update:titleColor', 'white')"
        :value="titleColor"
        style="width: 10px; height: 10px"
        class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
        type="radio"
        name="font-color"
        id="font-color-white"
        :checked="titleColor === 'white'"
      />
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "TitleColor",
  props: {
    titleColor: String
  },
  emits: {
    "update:titleColor": null
  }
};
</script>
