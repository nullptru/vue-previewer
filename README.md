# vue-previewer
👀 A vue component for previewing images

### Live Demo
[>> Live Demo](https://geasscn.com/static/vue-previewer/index.html)
### Features
+ no other dependencies
+ support zoom-in, zoom-out, rotate, fullscreen operations
+ support image events such as select, close
+ support customer options
+ support key operation
+ support footer slot

### Install
```
// with yarn
yarn add vue-image-previewer
// with npm
npm install vue-image-previewer
```

### Usage
```
import VuePreviewer from 'vue-image-previewer'

// defalut install
Vue.use(VuePreviewer);

// install with global options
Vue.use(VuePreviewer, {
  defaultWidth: '100px',
  defaultHeight: '75px',
  thumbnailStyle: {
    backgroundSize: 'cover'
  },
  keyMap: {
    zoomin: '+',
    zoomout: '-',
    rotate: 'r',
    prev: 'ArrowLeft',
    next: 'ArrowRight'
  }
})
```

### Example
```
new Vue({
  el: '#app',
  components: { VuePreviewer },
  data() {
    return {
      imgs: [
        'http://pic.lvmama.com/uploads/pc/place2/2016-09-14/9aab9bb7-2593-4ca6-8c5a-31355443aebc.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQQM7xWSl3uRGecETNjaLl8_2wmAvlGpwyzX_Xs3RyZoTsM_j',
        "http://crawl.nosdn.127.net/d426f0175b974f7cce092a8f16d0ee09.jpg",
        "http://seopic.699pic.com/photo/50093/5337.jpg_wh1200.jpg"
      ]
    }
  },
  template: '<vue-previewer :images="imgs" :options="{}"/>'
})
```

### Props
|Property|Type|Description| Default |
|---|---|---|---|
|images|Array[String/ImageOptions]| Images for previewing|**required** |
|options| PreviewerOptions | Extra options for configing component | {} |
|mode| "image", "link" | show image as link or image | "image"|
|showFooter| Boolean | Footer slot | true |

#### ImageOptions
```
{
	src: 'xxx.jpg', // origin image source
  thumbnailSrc: 'xxxThumbnail.jpg', // thumbnail source
	width: '100px', // thumbnail width
	height: '75px', // thumbnail height
	name: 'Image Test' // Image name which shows in footer
}
```
#### PreviewerOptions
```
// default options
{
	defaultWidth: '100px', // thumbnail width, '100px' or '20%'
	defaultHeight: '75px', // thumbnailStyle height, '100px' or '20%'
	thumbnailStyle: { backgroundSize: 'cover' },
  keyMap: {
    zoomin: '+',
    zoomout: '-',
    rotate: 'r',
    prev: 'ArrowLeft',
    next: 'ArrowRight'
  }
}
```

### Events
|Event| Description|Parameters|
|---|---|---|
|close| Trigger when component is closed|
|select| Trigger when select a image from list| Selected image(ImageOptions)|

### slot
| Name | Parameters |
|---|---|
| footer | Current ImageOptions|


#### 🤗 Please feel free to contribute a PR or make an issue

### License
VuePreviewer is [MIT Licensed](https://github.com/nullptru/vue-previewer/blob/master/LICENSE).

Copyright (c) 2019 Geass

