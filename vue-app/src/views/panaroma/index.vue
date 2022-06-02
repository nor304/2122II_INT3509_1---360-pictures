<template>
  <div class="container">
    <div class="left-side">
      <div class="image-display">
        <img
          :src="currentImage.pathLong"
        >
        <div
          class="point-container"
          v-if="pointList?.length > 0"
        >
          <div
            class="point"
            v-for="(pointImage, pointIndexImage) in pointList"
            :key="pointIndexImage"
          >
            {{ point.id }}
          </div>
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
        Thêm điểm
      </button>

      <div class="add-point">
        <input
          class="point-id"
          v-model="currentPointValue.id"
        >
        <input
          class="point-x"
          v-model="currentPointValue.x"
        >
        <input
          class="point-y"
          v-model="currentPointValue.y"
        >
      </div>

      <div
        class="point-list"
        v-if="pointList?.length > 0"
      >
        <div
          class="point-cursor"
          v-for="(point, pointIndex) in pointList"
          :key="pointIndex"  
        >
          {{ point.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: [],
      selectedImage: 0,
      defaultValuePoint: {
        id: 'Đây là id test',
        x: 0,
        y: 0
      },
      selectedPoint: 0
    }
  },

  computed: {
    currentPointValue () {
      const me = this
      if (me.images[me.selectedImage].points.length > 0) {
        return me.images[me.selectedImage].points[me.selectedPoint]
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
      me.images[me.selectedImage].points.push(me.defaultValuePoint)
    }
  },
}
</script>

<style lang="css">
.container .left-side .image-display img {
  width: 600px;
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
.selected {
  border: 1px solid black;
}
.left-side {
  width: calc(100% - 420px);
  overflow: auto;
}
.right-side {
  width: 400px;
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
.point-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}
.point-list .point-cursor {
  height: 20px;
  padding: 8px;
  border: 1px solid;
  border-radius: 10px;
  background-color: #f1f2f5;
}
</style>