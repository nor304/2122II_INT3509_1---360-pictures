<template>
  <div class="container">
    <div class="left-side">
      <div class="image-display" id="image-display">
        <img
          :src="currentImage.pathLong"
        >
        <div
          class="point-cursor"
          v-for="(point, pointIndex) in pointList"
          :key="pointIndex"
          :style="getPointStyle(point)"
          :title="point.type === Enum.Info ? point.text : ''"
          @click="onClickPointOnImage(pointIndex)"
          @mouseover="changeIsHoverPointImage(true)"
          @mouseleave="changeIsHoverPointImage(false)"
        >
          <div class="circle"></div>
          {{ point.id }}
          <img
            v-if="point.image && isHoverPointImage"
            :src="point.image"
            :width="200"
          >
          </div>
      </div>
      <div class="image-list">
        <div
          class="image-container"
          :class="{'selected': selectedImage === imageIndex}"
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
          @click="onChangeImageFocus(imageIndex)"
        >
          {{ image.pathShort.slice(2,image.pathShort.length) }}
        </div>
      </div>
    </div>
    <div class="right-side">
      <button @click="onAddPoint">
        Thêm
      </button>

      <div
        class="type-option"
        v-show="isAdding"
      >
        <div class="title">Loại điểm</div>

        <input 
          type="radio" id="scene" :value="Enum.Scene" v-model="selectedType"
        >
        <label for="scene">Scene</label>

        <input
          type="radio" id="info" :value="Enum.Info" v-model="selectedType"
        >
        <label for="info">Info</label> 
      </div>

      <div
        class="add-point"
        v-show="(isEditing || isAdding) && 
          selectedType === Enum.Scene"
      >
        <div>ID ảnh</div>
        <input
          class="point-id"
          v-model="currentPointValue.id"
        >
        <div>Tọa độ x</div>
        <input
          class="point-x"
          v-model="currentPointValue.x"
        >
        <div>Tọa độ y</div>
        <input
          class="point-y"
          v-model="currentPointValue.y"
        >
      </div>

      <div
        class="add-point"
        v-show="(isEditing || isAdding) &&
          selectedType === Enum.Info"
      >
        <div>Text trên điểm</div>
        <input
          class="point-y"
          v-model="currentPointValue.text"
        >
        <div>URL (optional)</div>
        <input
          class="point-y"
          v-model="currentPointValue.url"
        >
        <div>Tọa độ x</div>
        <input
          class="point-x"
          v-model="currentPointValue.x"
        >
        <div>Tọa độ y</div>
        <input
          class="point-y"
          v-model="currentPointValue.y"
        >
        <div>Link ảnh</div>
        <input
          class="point-image"
          v-model="currentPointValue.image"
        >
        <div>Hoặc tải ảnh ở đây</div>
        <input
          type="file"
          class="point-image"
          @change="onUploadImage"
        >
        <div>Kích thước ảnh (chiều rộng)</div>
        <input
          class="point-image"
          v-model="currentPointValue.width"
        >
      </div>

      <div
        style="display: flex; gap: 8px; padding-top: 12px"
        v-show="isAdding && selectedType !== null"
      >
        <button
          class="save-btn"
          @click="onSavePoint"
        >
          Lưu
        </button>
        <button @click="onClickCancel">
          Hủy
        </button>
      </div>

      <div class="point-list-title">
        Danh sách điểm
      </div>
      <div
        class="point-list"
        v-if="pointList.length > 0"
      >
        <div
          class="point-cursor"
          :class="{'selected': pointIndex === selectedPoint}"
          v-for="(point, pointIndex) in pointList"
          :key="pointIndex"
          @click="onChangeCurrentPointIndex(pointIndex)"
        >
          {{ point.id }}
        </div>
      </div>

      <button
        @click="onFinish"
        style="width: 300px; background-color: #9d62f0"  
      >
        Hoàn thành - Xuất file JSON
      </button>
    </div>
  </div>
</template>

<script>
const Enum = {
  Scene: 0,
  Info: 1
}
export default {
  data () {
    return {
      Enum: Enum,
      images: [],
      selectedImage: 0,
      defaultValuePoint: {
        id: '',
        x: 0,
        y: 0,
        url: null,
        text: '',
        image: null,
        width: null,
        type: null
      },
      selectedPoint: null,
      selectedType: null,
      isEditing: false,
      isAdding: false,
      isHoverPointImage: false
    }
  },

  computed: {
    currentPointValue () {
      const me = this
      if (me.pointList.length > 0 && me.selectedPoint !== null && me.isEditing) {
        return me.pointList[me.selectedPoint]
      } else {
        return me.defaultValuePoint
      }
    },

    /**
     * @description Hình ảnh đang được focus vào
     */
    currentImage () {
      const me = this
      if (me.images?.length > 0) {
        return me.images[me.selectedImage]
      } else {
        return null
      }
    },

    pointList () {
      const me = this
      return me.currentImage?.points
    }
  },

  mounted () {
    const me = this
    me.importAll(require.context('./assets/', true, /\.jpg$/));
  },

  methods: {
    importAll (r) {
      r.keys().forEach((key) => {
        this.images.push({
          pathLong: r(key),
          pathShort: key,
          id: key.slice(2, key.length),
          points: []
        })
      })
    },

    onChangeImageFocus (index) {
      const me = this
      me.selectedImage = index
    },

    onAddPoint () {
      const me = this
      me.isAdding = true
      me.selectedPoint = null
      me.isEditing = false
    },

    onEditPoint () {
      const me = this
      me.isEditing = true
    },

    onSavePoint () {
      const me = this
      if (me.isAdding) {
        // Clone object để không tham chiếu đến data gốc
        let point = {...me.defaultValuePoint}
        // Gán type để mapping dữ liệu khi xuất ra file JSON
        point.type = me.selectedType
        // Đẩy điểm được thêm vào trong list
        me.images[me.selectedImage].points.push(point)
        me.isAdding = false
        me.defaultValuePoint = {
          id: '',
          x: 0,
          y: 0,
          url: null,
          text: null,
          type: null
        }
      }
    },

    onClickCancel () {
      const me = this
      me.isAdding = false
      me.defaultValuePoint = {
        id: '',
        x: 0,
        y: 0,
        url: null,
        text: null,
        type: null
      }
    },

    onChangeCurrentPointIndex (index) {
      const me = this
      // Nếu đang ở mode Thêm thì không cho focus vào button
      if (!me.isAdding) {
        me.selectedPoint = index
        me.isEditing = true
        me.selectedType = me.currentPointValue.type
      }
    },

    onFinish () {
      const me = this
      let jsonObject = {
        default: {
          firstScene: me.images[0].id
        },
        scenes: {}
      }
      me.images.forEach(image => {
        const panoObject = {
          panorama: image.pathShort,
          hotSpots: []
        }
        image.points.forEach(point => {
          const pointClone = {
            pitch: point.y,
            yaw: point.x
          }
          switch (point.type) {
            case Enum.Scene:
              pointClone.type = 'scene'
              pointClone.sceneId = point.id
              break
            case Enum.Info:
              pointClone.type = 'info'
              pointClone.text = point.text
              pointClone.URL = point.url
              if (point.image) {
                pointClone.image = point.image
                pointClone.width = parseInt(point.width) || 200
              }
              
              break
          }
          panoObject.hotSpots.push(pointClone)
        })
        jsonObject.scenes[image.id] = panoObject
      })
      console.log(jsonObject)
      me.saveFile(jsonObject)
      return jsonObject
    },

    saveFile: function(jsonObject) {
      const data = JSON.stringify(jsonObject)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },

    getPointStyle (point) {
      const me = this
      const img = document.getElementById("image-display")
      const pointX = me.getPointXValue(point, img.offsetWidth)
      const pointY = me.getPointYValue(point, img.offsetHeight)
      return `top: calc(50% + ${pointY}px);
              left: calc(50% + ${pointX}px);`
    },

    onClickPointOnImage (index) {
      const me = this
      me.isAdding = false
      me.isEditing = true
      me.selectedPoint = index
      me.selectedType = me.currentPointValue.type
    },

    getPointXValue (point, imgWidth) {
      point.x = point.x % 360
      if (point.x > 180) {
        return -((imgWidth/360)*point.x)
      } else {
        return (imgWidth/360)*point.x
      }
    },

    getPointYValue (point, imgHeight) {
      point.y = point.y % 360
      if (point.y > 180) {
        return -((imgHeight/360)*point.y)
      } else {
        return (imgHeight/360)*point.y
      }
    },

    onUploadImage (event) {
      console.log(event.target.files)
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        console.log(reader.result);
        this.defaultValuePoint.image = reader.result
      };
      return null
    },

    changeIsHoverPointImage (value) {
      const me = this
      me.isHoverPointImage = value
    }
  },

  watch: {
    selectedType () {
      const me = this
      me.defaultValuePoint = {
        id: '',
        x: 0,
        y: 0,
        url: null,
        text: null,
        type: null
      }
    }
  }
}
</script>

<style lang="css">
.container .left-side .image-display img {
  width: 100%;
}
.image-display .point-cursor img {
  width: 200px !important;
}
.container {
  display: flex;
  gap: 20px;
  height: 100%;
}
.image-container {
  display: flex;
  flex-direction: column;
  padding: 12px;
}
.image-display {
  position: relative;
}
.image-display .point-cursor {
  position: absolute;
  display: flex;
  flex-direction: column;
  color: red;
  cursor: pointer;
}
.image-display .point-cursor .circle {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: red;
}
.selected {
  border-radius: 10px;
  background-color: #be6ded;
}
.left-side {
  width: calc(100% - 420px);
  overflow: auto;
}
.right-side {
  width: 400px;
  display: flex;
  flex-direction: column;
}
.right-side .type-option .title {
  margin: 8px 0;
  font-size: 18px;
}
.right-side .type-option label {
  margin-right: 40px;
}
.right-side button {
  height: 32px;
    width: 110px;
  border-radius: 10px;
}
.right-side .save-btn {
  background-color: #8142f5;
  color: white;
}
.add-point {
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 12px;
  margin-top: 12px;
}
.point-container {
  position: relative;
}
.point {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: red;
  position: absolute;
}
.point-list-title{
  font-size: 26px;
  margin: 12px 0;
}
.point-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.point-list .point-cursor {
  height: 20px;
  padding: 8px;
  border: 1px solid;
  border-radius: 10px;
  background-color: #f1f2f5;
}
.point-list .selected {
  background-color: #be6ded !important;
}
</style>