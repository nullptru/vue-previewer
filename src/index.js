import VuePreview from './components/VuePreview.vue';
import './iconfont.js';

function install(Vue) {
  if(install.installed) {
    return;
  }
  install.installed = true;
  Vue.component(VuePreview.name, VuePreview);
}

VuePreview.install = install;

export default VuePreview;