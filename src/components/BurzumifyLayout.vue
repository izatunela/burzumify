<template>
  <div class="relative flex flex-col items-center justify-center bg-white">
    <input
      type="file"
      class="hidden text-center mx-auto"
      @change="onImgSelected"
      ref="imgInput"
    />
    <button
      @click="$refs.imgInput.click()"
      class="block mt-8 btn-dark font-fell"
    >
      <span v-show="!show">Choose image</span>
      <span v-show="show">Choose new image</span>
    </button>
    <div
      v-show="show"
      id="options"
      class="py-4 flex flex-wrap justify-center flex-col sm:flex-row"
    >
      <div
        class="options-row sm:w-full self-center flex flex-col sm:flex-row justify-evenly"
      >
        <title-input
          v-model:title="canvasObj.title"
          @input="refreshCanvas"
        ></title-input>
        <font-family
          v-model:fontfamily="canvasObj.fontFamily"
          @change="refreshCanvas"
        ></font-family>
      </div>
      <div
        class="options-row sm:w-full flex flex-col sm:flex-row justify-evenly"
      >
        <title-size
          v-model:titleSize="canvasObj.fontSize"
          @input="refreshCanvas"
        ></title-size>
        <title-color
          v-model:titleColor="canvasObj.textColor"
          @input="refreshCanvas"
        ></title-color>
      </div>
      <div
        class="options-row sm:w-full flex flex-col sm:flex-row justify-evenly"
      >
        <image-grayscale
          v-model:grayscale="canvasObj.imageColoring"
          @input="refreshCanvas"
        ></image-grayscale>

        <image-darkness
          v-model:darkness="canvasObj.imageDarkness"
          @input="refreshCanvas"
        ></image-darkness>
      </div>
      <div
        class="options-row sm:w-full flex flex-col sm:flex-row justify-evenly"
      >
        <title-position
          v-model:xPos="canvasObj.xAxisPosition"
          v-model:yPos="canvasObj.yAxisPosition"
          v-model:imgWidth="canvasObj.imageWidth"
          v-model:imgHeight="canvasObj.imageHeight"
          @update:xPos="refreshCanvas"
          @update:yPos="refreshCanvas"
        ></title-position>
      </div>
    </div>
    <div v-show="show" id="preview-image">
      <div id="canvas-wrap" class="mx-auto p-0.5"></div>
      <button
        class="block mx-auto btn-dark font-fell btn-burzumify-hover"
        @click="burzumify"
      >
        &#9651; Burzumify &#9661;
      </button>
    </div>
  </div>
</template>

<script>
import TitleInput from "./TitleInput.vue";
import FontFamily from "@/components/FontFamily";
import TitleSize from "@/components/TitleSize";
import TitleColor from "@/components/TitleColor";
import ImageGrayscale from "@/components/ImageGrayscale";
import ImageDarkness from "@/components/ImageDarkness";
import TitlePosition from "@/components/TitlePosition";

export default {
  name: "ImagePreview",
  data() {
    return {
      selectedFont: "gregorian",
      show: false,
      imgName: "iloveyou",
      canvasObj: {
        canvas: null,
        ctx: null,
        image: null,
        imageColoring: "original",
        imageDarkness: "100",
        title: "B U R Z U M",
        fontFamily: "gregorian",
        fontSize: "42",
        textColor: "dark",
        imageWidth: null,
        imageHeight: null,
        xAxisPosition: "20",
        yAxisPosition: "20"
      }
    };
  },
  components: {
    TitleInput,
    FontFamily,
    TitleSize,
    TitleColor,
    ImageGrayscale,
    ImageDarkness,
    TitlePosition
  },
  methods: {
    onImgSelected(e) {
      this.show = true;
      this.initCanvas();
      this.canvasObj.image = URL.createObjectURL(e.target.files[0]);
      this.toCanvas(this.canvasObj);
    },
    initCanvas() {
      this.initCanvas = function foo() {};
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      this.canvasObj.canvas = canvas;
      this.canvasObj.ctx = ctx;
      canvas.style.width = "100%";
      const canvasWrap = document.getElementById("canvas-wrap");
      canvasWrap.append(canvas);
    },
    refreshCanvas(){
      this.toCanvas(this.canvasObj)
    },
    setImageSize(canvasObj) {
      canvasObj.canvas.width = canvasObj.imageWidth;
      canvasObj.canvas.height = canvasObj.imageHeight;
    },
    setFont(canvasObj) {
      canvasObj.ctx.font = canvasObj.fontSize + "px " + canvasObj.fontFamily;
    },
    setTextColor(canvasObj) {
      canvasObj.ctx.fillStyle = canvasObj.textColor;
    },
    setImageDarkness(canvasObj) {
      canvasObj.ctx.filter = `brightness(${canvasObj.imageDarkness}%)`;
    },
    setTitle(canvasObj) {
      document.fonts.ready.then(function() {
        canvasObj.ctx.fillText(
          canvasObj.title,
          canvasObj.xAxisPosition,
          canvasObj.yAxisPosition
        );
      });
    },
    setGrayscale(canvasObj) {
      const imageData = canvasObj.ctx.getImageData(
        0,
        0,
        canvasObj.canvas.width,
        canvasObj.canvas.height
      );
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      canvasObj.ctx.putImageData(imageData, 0, 0);
    },
    addImageProcess(src) {
      return new Promise(resolve => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img);
          URL.revokeObjectURL(this.src);
        };
      });
    },
    toCanvas(canvasObj) {
      let img = new Image();
      img.crossOrigin = "anonymous";

      this.addImageProcess(canvasObj.image).then(img => {
        this.canvasObj.imageWidth = img.width;
        this.canvasObj.imageHeight = img.height;
        this.setImageSize(canvasObj);
        canvasObj.ctx.textBaseline = "top"; //TODO vidi da li ovo moze negde da se skloni
        this.setFont(canvasObj);
        this.setTextColor(canvasObj);
        this.setImageDarkness(canvasObj);
        this.setTitle(canvasObj);
        canvasObj.ctx.drawImage(img, 0, 0);
        if (canvasObj.imageColoring === "dark") {
          this.setGrayscale(canvasObj);
        }
      });
    },
    burzumify() {
      let finalImg = new Image();
      finalImg.crossOrigin = "anonymous";
      finalImg.src = this.canvasObj.canvas.toDataURL();
      let a = document.createElement("a");
      a.href = this.canvasObj.canvas.toDataURL();
      a.download = this.imgName;
      a.click();
    }
  }
};
</script>
