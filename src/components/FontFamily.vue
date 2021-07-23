<template>
  <div id="font-family-group" class="w-52">
    <label class="block font-fell" for="font-family">Font</label>
    <select
      id="font-family"
      class="btn-dark font-fell bg-white"
      :value="fontfamily"
      @change="$emit('update:fontfamily', $event.target.value)"
    >
      <option value="duerergotisch" class="text-4xl font-duerergotisch">
        Duerer Gotisch
      </option>
      <option value="gregorian" class="text-4xl font-gregorian">
        Gregorian
      </option>
      <option value="old-london" class="text-4xl font-old-london">
        Old London
      </option>
      <option value="papyrus" class="text-2xl font-papyrus">
        Papyrus
      </option>
      <option value="ruritania" class="text-2xl font-ruritania">
        Ruritania
      </option>
      <option value="times-new-roman" class="text-2xl font-times-new-roman">
        Times New Roman
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FontFamily.vue",
  props: {
    fontfamily: String
  },
  emits: {
    "update:fontfamily": null
  }
};
</script>
