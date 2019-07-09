import VuePreviewer from './components/VuePreviewer.vue';
import './iconfont.js';

function install(Vue, options) {
  if(install.installed) {
    return;
  }
  Vue.prototype.$global_vue_image_previewer_options = options;
  install.installed = true;
  Vue.component(VuePreviewer.name, VuePreviewer);
}

VuePreviewer.install = install;

export default VuePreviewer;