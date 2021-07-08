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
      Choose image
    </button>
    <div
      v-show="show"
      id="options"
      class="py-4 flex flex-wrap justify-center flex-col sm:flex-row"
    >
      <div
        class="options-row sm:w-full self-center flex flex-col sm:flex-row justify-evenly"
      >
        <div id="title-group" class="w-52">
          <label class="block font-fell" for="title">Title</label>
          <input
            id="title"
            v-model="canvasObj.title"
            @input="inputTitle"
            type="text"
            class="font-fell p-2 btn-dark"
            placeholder="Enter title"
          />
        </div>
        <div id="font-family-group" class="w-52">
          <label class="block font-fell" for="font-family">Font</label>
          <select
            id="font-family"
            class="btn-dark font-fell bg-white"
            @change="onFontSelected"
            v-model="selectedFont"
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
      </div>
      <div
        class="options-row sm:w-full flex flex-col sm:flex-row justify-evenly"
      >
        <div id="font-size-group" class="w-52">
          <label class="block font-fell" for="font-size">Font size</label>
          <input
            @input="onFontSizeChange"
            class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
            type="range"
            name="font-size"
            id="font-size"
            min="10"
            max="300"
          />
          <p class="text-center font-fell text-2xl -mt-2">
            {{ canvasObj.fontSize }}<small>px</small>
          </p>
        </div>
        <div id="font-color-group" class="w-52">
          <fieldset>
            <legend class="font-fell">Font color</legend>
            <label class="pr-2 font-fell cursor-pointer" for="font-color-dark"
              >Dark</label
            >
            <input
              @input="onFontColorChange"
              v-model="canvasObj.textColor"
              value="dark"
              style="width: 10px; height: 10px"
              class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
              type="radio"
              name="font-color"
              id="font-color-dark"
            />
            <label class="px-2 font-fell cursor-pointer" for="font-color-white"
              >White</label
            >
            <input
              @input="onFontColorChange"
              v-model="canvasObj.textColor"
              value="white"
              style="width: 10px; height: 10px"
              class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
              type="radio"
              name="font-color"
              id="font-color-white"
            />
          </fieldset>
        </div>
      </div>
      <div
        class="options-row sm:w-full flex flex-col sm:flex-row justify-evenly"
      >
        <div id="image-grayscale-group" class="w-52">
          <legend class="font-fell">Grayscale</legend>
          <label
            class="pr-2 font-fell cursor-pointer"
            for="image-color-original"
            >Original</label
          >
          <input
            @input="onImageColoringChange"
            v-model="canvasObj.imageColoring"
            value="original"
            style="width: 10px; height: 10px"
            class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
            type="radio"
            name="image-color"
            id="image-color-original"
          />
          <label class="px-2 font-fell cursor-pointer" for="image-color-dark"
            >Dark</label
          >
          <input
            @input="onImageColoringChange"
            v-model="canvasObj.imageColoring"
            value="image-dark"
            style="width: 10px; height: 10px"
            class="cursor-pointer border-black border appearance-none checked:bg-black focus:outline-none"
            type="radio"
            name="image-color"
            id="image-color-dark"
          />
        </div>
        <div id="image-darkness-group" class="w-52">
          <label class="block font-fell" for="image-darkness">Darkness</label>
          <input
            @input="onImageDarknessChange"
            v-model="canvasObj.imageDarkness"
            class="cursor-pointer w-52 p-0 border-0 appearance-none my-0 focus:outline-none"
            type="range"
            name="image-darkness"
            id="image-darkness"
            min="0"
            max="100"
          />
          <p class="text-center font-fell text-2xl -mt-2">
            {{ Math.abs(canvasObj.imageDarkness - 100) }}<small>%</small>
          </p>
        </div>
      </div>
    </div>
    <div v-show="show" id="preview-image">
      <div id="canvas-wrap" class="mx-auto p-0.5"></div>
      <button class="block mx-auto btn-dark font-fell" @click="burzumify">
        &#9651; Burzumify &#9661;
      </button>
    </div>
  </div>
</template>

<script>
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
        imageDarkness: 100,
        title: "B U R Z U M",
        fontFamily: "Gregorian",
        fontSize: 42,
        textColor: "dark",
        width: null,
        height: null,
      },
    };
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
    inputTitle() {
      this.toCanvas(this.canvasObj);
    },
    onFontSelected(e) {
      this.canvasObj.fontFamily = e.target.selectedOptions[0].text;
      this.toCanvas(this.canvasObj);
    },
    onFontSizeChange(e) {
      this.canvasObj.fontSize = e.target.value;
      this.toCanvas(this.canvasObj);
    },
    onFontColorChange(e) {
      this.canvasObj.textColor = e.target.value;
      this.toCanvas(this.canvasObj);
    },
    onImageColoringChange(e) {
      this.canvasObj.imageColoring = e.target.value;
      this.toCanvas(this.canvasObj);
    },
    onImageDarknessChange(e){
      this.canvasObj.imageDarkness = e.target.value;
      this.toCanvas(this.canvasObj);
    },
    addImageProcess(src) {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = src;
        img.onload = () => {
          resolve(img);
          URL.revokeObjectURL(this.src)
        }
      });
    },
    toCanvas(canvasObj) {
      var img = new Image();
      img.crossOrigin = "anonymous";

      this.addImageProcess(canvasObj.image).then((img) => {
        canvasObj.canvas.width = img.width;
        canvasObj.canvas.height = img.height;
        canvasObj.ctx.font = canvasObj.fontSize + "px " + canvasObj.fontFamily;
        canvasObj.ctx.fillStyle = canvasObj.textColor;
        canvasObj.ctx.textBaseline = "top";
        canvasObj.ctx.filter = `brightness(${canvasObj.imageDarkness}%)`;
        canvasObj.ctx.drawImage(img, 0, 0);
        document.fonts.ready.then(function () {
          canvasObj.ctx.fillText(canvasObj.title, 20, 20);
        });
        if (canvasObj.imageColoring === "image-dark") {
          const imageData = canvasObj.ctx.getImageData(
            0,
            0,
            canvasObj.canvas.width,
            canvasObj.canvas.height
          );
          const data = imageData.data;
          for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }
          canvasObj.ctx.putImageData(imageData, 0, 0);
        }
      });
    },
    burzumify() {
      var finalImg = new Image();
      finalImg.crossOrigin = "anonymous";
      finalImg.src = this.canvasObj.canvas.toDataURL();
      var a = document.createElement("a");
      a.href = this.canvasObj.canvas.toDataURL();
      a.download = this.imgName;
      a.click();
    },
  },
};
</script>