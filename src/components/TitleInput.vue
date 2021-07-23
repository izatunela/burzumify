<template>
  <div id="title-group" class="w-52">
    <label class="block font-fell" for="title">Title</label>
    <input
      id="title"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      type="text"
      class="font-fell p-2 btn-dark"
      placeholder="Enter title"
    />
  </div>
</template>

<script>
export default {
  name: "TitleInput",
  props: {
    title: String
  },
  emits: {
    "update:title": null
  }
};
</script>
