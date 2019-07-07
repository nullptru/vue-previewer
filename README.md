# vue-previewer
👀A vue component for previewing images

### Features
+ no other dependencies
+ support zoom-in, zoom-out, rotate, fullscreen operations
+ support image events such as select, close
+ support customer options

### Install
```
// with yarn
yarn add vue-previewer
// with npm
npm install vue-previewer
```

### Usage
```
import VuePreviewer from 'vue-previewer'

// defalut install
Vue.use(VuePreviewer)
```

### Example
```
new Vue({
  el: '#app',
  components: { VuePreviewer: window.VuePreviewer },
  data() {
    return {
      imgs: ['https://tpc.googlesyndication.com/simgad/14581137248481744208?sqp=4sqPyQQrQikqJwhfEAEdAAC0QiABKAEwCTgDQPCTCUgAUAFYAWBfcAJ4AcUBLbKdPg&rs=AOga4qkLa5B3YYxjYNuWwQb3i4zax37NNA','https://pic4.zhimg.com/v2-3859d1924b5a39444b56f3d8ceda9057_1200x500.jpg', "https://www.google.com/logos/doodles/2019/2019-womens-world-cup-day-25-4819909247238144-s.png"]
    }
  },
  template: '<vue-previewer :images="imgs" :options="{}"/>'
})
```

### Props
|Property|Type|Description| Default |
|---|---|---|---|
|images|Array[String/ImageOptions]| Images for previewing|**required** |
|mode| "image", "link" | show image as link or image | "image"|
|options| PreviewerOptions | Extra options for configing component | {} |

#### ImageOptions
```
{
	src: 'xxx.jpg',
	width: '100px'
	height: '75px',
	name: 'Image Test' // Image name which shows in footer
}
```
#### PreviewerOptions
```
{
	defaultWidth: '100px', // thumbnail width
	defaultHeight: '75px', // thumbnailStyle height
	thumbnailStyle: { backgroundSize: 'cover' }
}
```

### Events
|Event| Description|Parameters|
|---|---|---|
|close| Trigger when component is closed|
|select| Trigger when select a image from list| Selected image(ImageOptions)|

### License
VuePreviewer is [MIT Licensed](https://github.com/SevenOutman/vue-aplayer/blob/master/LICENSE).

Copyright (c) 2019 Geass

