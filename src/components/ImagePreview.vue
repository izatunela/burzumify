<template>
  <div class="relative  bg-white">
    <input 
      type="file" 
      class="hidden text-center mx-auto"
      @change ="onImgSelected"
      ref="imgInput">
    <button 
      @click="$refs.imgInput.click()" 
      class="block mx-auto btn-dark font-fell">
      Choose image
    </button>
    <div v-show="show" class="preview">
      <div id="options" class="mx-auto w-52 lg:w-3/4 lg:justify-center flex flex-col flex-wrap sm:flex-row">
        <div id="title-group" class="lg:mx-1">
          <label class="block font-fell" for="title">Title</label>
          <input
            id="title" 
            v-model="canvasObj.title"
            @input="inputTitle"
            type="text"
            class="font-fell p-2 btn-dark"
            placeholder="Enter title">
        </div>
        <div id="font-family-group" class="lg:mx-1">
          <label class="block font-fell" for="font-family">Font</label>
          <select id="font-family" class="btn-dark font-fell bg-white" @change="onFontSelected" v-model="selectedFont">
            <option value="gregorian" class="text-4xl font-gregorian">Gregorian</option>
            <option value="duerergotisch" class="text-4xl font-duerergotisch">Duerer Gotisch</option>
            <option value="ruritania" class="text-2xl font-ruritania">Ruritania</option>
          </select>
        </div>
        <div id="font-size-group" class="w-52 lg:mx-1">
          <label class="block font-fell" for="font-size">Font size</label>
          <input @input="onFontSizeChange" class="cursor-pointer btn-dark p-0 border appearance-none my-0" type="range" name="font-size" id="font-size" min="50" max="300">
          <p class="text-center font-fell text-2xl -mt-2">{{canvasObj.fontSize}}<small>px</small> </p>
        </div>
        <div id="font-color-group" class="w-52 lg:mx-1">
          <fieldset>
            <legend class="font-fell">Font color</legend>
            <label class="pr-2 font-fell cursor-pointer" for="font-color-dark">Dark</label>
            <input @input="onFontColorChange" v-model="canvasObj.textColor" value="dark" style="width:10px;height:10px;" class="cursor-pointer  border-black border appearance-none checked:bg-black focus:outline-none" type="radio" name="font-color" id="font-color-dark">
            <label class="px-2 font-fell cursor-pointer" for="font-color-white">White</label>
            <input @input="onFontColorChange" v-model="canvasObj.textColor" value="white" style="width:10px;height:10px;" class="cursor-pointer  border-black border appearance-none checked:bg-black focus:outline-none" type="radio" name="font-color" id="font-color-white">
          </fieldset>
        </div>
      </div>
      <div id="canvas-wrap" class="mx-auto p-0.5"></div>
      <button
        class="block mx-auto btn-dark font-fell"
        @click="burzumify">
        &#9651;
        Burzumify
        &#9661;
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:'ImagePreview',
  data() {
    return {
      selectedFont:'gregorian',
      show : false,
      imgName: 'iloveyou',
      canvasObj:{
        canvas:null,
        ctx:null,
        image: null,
        title: 'B U R Z U M',
        fontFamily:'Gregorian',
        fontSize:50,
        textColor:'dark',
        width:null,
        height:null,
      }
    }
  },
  methods: {
    onImgSelected(e) {
      this.show = true
      this.initCanvas()
      this.canvasObj.image = URL.createObjectURL(e.target.files[0])
      this.toCanvas(this.canvasObj)
    },
    initCanvas(){
      this.initCanvas       = function foo(){}
      const canvas          = document.createElement('canvas')
      const ctx             = canvas.getContext('2d')
      this.canvasObj.canvas = canvas
      this.canvasObj.ctx    = ctx
      canvas.style.width = '100%'
      const canvasWrap      = document.getElementById('canvas-wrap')
      canvasWrap.append(canvas)
    },
    inputTitle(){
      this.toCanvas(this.canvasObj)
    },
    onFontSelected(e){
      this.canvasObj.fontFamily = e.target.selectedOptions[0].text
      this.toCanvas(this.canvasObj)
    },
    onFontSizeChange(e){
      this.canvasObj.fontSize = e.target.value
      this.toCanvas(this.canvasObj)
    },
    onFontColorChange(e){
      this.canvasObj.textColor = e.target.value
      this.toCanvas(this.canvasObj)
    },
    toCanvas(canvasObj){
      var img = new Image()
      img.crossOrigin = 'anonymous'

      function addImageProcess(src){
        return new Promise((resolve) => {
          let img = new Image()
          img.src = src
          img.onload = () => resolve(img)
        })
      }
      addImageProcess(canvasObj.image)
      .then(img => {
        canvasObj.canvas.width = img.width
        canvasObj.canvas.height = img.height
          canvasObj.ctx.font = canvasObj.fontSize+'px '+canvasObj.fontFamily
          canvasObj.ctx.fillStyle = canvasObj.textColor
          canvasObj.ctx.textBaseline = 'top'
          canvasObj.ctx.drawImage(img,0,0)
        document.fonts.ready.then(function(){
          canvasObj.ctx.fillText(canvasObj.title,20,20)
        })
        const imageData = canvasObj.ctx.getImageData(0, 0, canvasObj.canvas.width, canvasObj.canvas.height)
        const data = imageData.data
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i]     = avg
            data[i + 1] = avg
            data[i + 2] = avg
        }
        canvasObj.ctx.putImageData(imageData, 0, 0)
      })
    },
    burzumify(){
      var finalImg = new Image()
      finalImg.crossOrigin = 'anonymous'
      finalImg.src = this.canvasObj.canvas.toDataURL()
      var a = document.createElement('a')
      a.href = this.canvasObj.canvas.toDataURL()
      a.download = this.imgName
      a.click()
    },
  }
}
</script>