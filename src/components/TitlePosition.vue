<template>
  <div id="" class="w-52">
    <div class="block font-fell">Title position</div>
    <label class="block font-fell" for="x-title-position">X-Axis</label>
    <input
        @input="$emit('update:xPos',$event.target.value)"
        :value="xPos"
        class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
        type="range"
        name="x-title-position"
        id="x-title-position"
        min="0"
        :max=imgWidth
    />
    <label class="block font-fell" for="y-title-position">Y-Axis</label>
    <input
        @input="$emit('update:yPos',$event.target.value)"
        :value="yPos"
        class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
        type="range"
        name="y-title-position"
        id="y-title-position"
        min="0"
        :max=imgHeight
    />
  </div>
</template>

<script>
export default {
  name: "TitlePosition",
  props:{
    xPos: String,
    yPos: String,
    imgWidth: Number,
    imgHeight: Number
  },
  emits:{
    'update:xPos':null,
    'update:yPos':null
  }
}
</script>