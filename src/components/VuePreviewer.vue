<template lang="pug">
  section.vue-preview(@keydown="onKey")
    //- img list
    section.list(@click="onImageClick")
      span.list__container(
        v-for="(img, index) in imageList"
        :key="index"
      )
        template(v-if="mode === image")
          img(
            :src="img.src"
            :width="img.width"
            :height="img.height"
            :data-index="index"
            :style="thumbnailStyle"
          )
        template(v-else)
          span.link(name="img" :data-index="index") {{ img.name }}
    //- preview
    .pre-container(v-if="~currentIndex && isShowPre")
      header.pre__header
        div {{ currentIndex+1 }}/{{ imageList.length }}
        section
          icon.icon(v-if="!inIframe" type="zoom" @click="toggleFullscreen")
          icon.icon(type="zoomin" @click="zoomin")
          icon.icon(type="zoomout" @click="zoomout")
          icon.icon(type="rotate" @click="rotate")
          icon.icon(type="close" @click="close")
      .pre__content(@click.prevent.stop="close")
        icon.prev(v-if="currentIndex" type="prev" @click.prevent.stop="prevClick")
        icon.next(v-if="currentIndex < imageList.length-1" type="next" @click.prevent.stop="nextClick")

        span(
          ref="selectImg"
          :style="{cursor: cursorStyle, transform: `scale(${scaleRate}) rotate(${rotateRate}deg)`}"
          @click.prevent.stop="imageClick"
        )
          img.select-img(:src="imageList[currentIndex].src")
      //- footer
      .pre__footer
        slot
          .footer {{ imageList[currentIndex].name }}
</template>

<script>
import Icon from './Icon.vue'

const defaultOptions = {
  defaultWidth: '100px',
  defaultHeight: '75px',
  thumbnailStyle: {
    backgroundSize: 'cover'
  }
}
export default {
  name: 'VuePreviewer',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'image'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  components: { Icon },
  data() {
    return {
      inIframe: window.self !== window.top,
      currentIndex: -1,
      imageList: [],

      isShowPre: false,
      thumbnailStyle: this.options.thumbnailStyle || defaultOptions.thumbnailStyle,
      // operation
      scaleRate: 1,
      rotateRate: 0,
      cursorStyle: 'zoom-in'
    }
  },
  watch: {
    images: {
      immediate: true,
      handler(imgs) {
        this.imageList = this.normalizeImage(imgs, {
          sWidth: this.options.defaultWidth || defaultOptions.defaultWidth,
          sHeight: this.options.defaultHeight || defaultOptions.defaultHeight
        })
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKey)
  },
  destroyed() {
    document.removeEventListener('keydown', this.onKey)
  },
  methods: {
    onKey(key) {
      switch (key.code) {
        case 'ArrowLeft':
          this.prevClick()
          break
        case 'ArrowRight':
          this.nextClick()
          break
      }
    },
    normalizeImage(imgs, { sWidth, sHeight }) {
      return imgs.map((img, idx) => {
        // only src source
        if (typeof img === 'string') {
          return {
            width: sWidth,
            height: sHeight,
            src: img,
            name: `Image ${idx + 1}`
          }
        } else {
          return {
            width: img.width || sWidth,
            height: img.height || sHeight,
            src: img.src,
            name: img.name
          }
        }
      })
    },
    onImageClick({ target }) {
      if (target.nodeName === 'IMG' || target.getAttribute('name') === 'img') {
        this.currentIndex = +target.dataset['index']
        this.isShowPre = true
        this.$nextTick(() => this.$refs['selectImg'].focus())
      }
    },
    zoomin() {
      this.scaleRate += 0.5
    },
    zoomout() {
      this.scaleRate -= 0.25
      this.scaleRate = Math.max(this.scaleRate, 0.25)
    },
    rotate() {
      this.rotateRate += 90
    },
    toggleFullscreen() {
      const isFullscreen =
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullscreenElement ||
        document.webkitFullscreenElement ||
        false
      if (isFullscreen) {
        this.exitFullscreen()
      } else {
        this.enterFullscreen()
      }
    },
    exitFullscreen() {
      const el = document.documentElement
      const rfs = el.cancelFullscreen || el.webkitExitFullscreen || el.mozCancelFullscreen || el.exitFullscreen
      if (rfs) {
        rfs.call(el)
      } else {
        console.error("Your browser seems doesn't support fullscreen")
      }
    },
    enterFullscreen() {
      const el = document.documentElement
      const rfs =
        el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullscreen || el.msRequestFullscreen
      if (rfs) {
        rfs.call(el)
      } else {
        console.error("Your browser seems doesn't support fullscreen")
      }
    },
    imageClick() {
      if (this.cursorStyle === 'zoom-in') {
        this.cursorStyle = 'zoom-out'
        this.scaleRate += 0.5
      } else {
        this.cursorStyle = 'zoom-in'
        this.scaleRate -= 0.5
      }
    },
    prevClick() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1
        this.resetRate()
      }
    },
    nextClick() {
      if (this.currentIndex < this.imageList.length - 1) {
        this.currentIndex += 1
        this.resetRate()
      }
    },
    close() {
      this.currentIndex = -1
      this.isShowPre = false
      this.resetRate()
    },
    resetRate() {
      this.scaleRate = 1
      this.rotateRate = 0
    }
  }
}
</script>

<style scoped>
.link {
  margin-right: 8px;
  cursor: pointer;
  color: #20a0ff;
}
.pre-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  background-color: #0e0e0e;
}
.pre__header {
  z-index: 1010;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 16px);
  padding: 8px;
  max-height: 10%;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
}
.icon {
  font-size: 16px;
  cursor: pointer;
  margin-right: 8px;
  padding: 4px;
}
.icon:hover {
  color: darken(white, 10);
}
.pre__footer {
  z-index: 1010;
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  max-height: 10%;
  background-color: rgba(0, 0, 0, 0.3);
}
.pre__content {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: auto;
}
* {
  transition: all 0.3s ease;
}
.select-img {
  transition: rotate 0s ease;
}
.pre__content::-webkit-scrollbar {
  display: none;
}
.prev,
.next {
  cursor: pointer;
  z-index: 1010;
  position: fixed;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  padding: 16px;
  border-radius: 50%;
}
.prev:hover,
.next:hover {
  color: darken(white, 10);
  background-color: rgba(255, 255, 255, 0.5);
}
.prev {
  left: 16px;
}
.next {
  right: 16px;
}
.list__container {
  cursor: pointer;
  margin: 8px 4px;
}
.footer {
  width: inherit;
  text-align: center;
  color: white;
  padding: 8px;
}
</style>

