import VuePreviewer from './components/VuePreviewer.vue';
import './iconfont.js';

function install(Vue) {
  if(install.installed) {
    return;
  }
  install.installed = true;
  Vue.component(VuePreviewer.name, VuePreviewer);
}

VuePreviewer.install = install;

export default VuePreviewer;