import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import { usePermissionStore } from "@/stores/permission";
import useMessageBox from '@/core/plugins/messageBox';
import ShortKey from 'vue3-shortkey';

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import "@/assets/iconfont/iconfont.js";
import SvgIcon from "@/components/svg-icon/SvgIcon.vue";

import i18n from "@/core/plugins/i18n";

const app = createApp(App);
// let id = 1273914206755787008n;
const store = createPinia()
app.use(store);
//#endregion

ApiService.init(app);


const permissionStore = usePermissionStore();
window.pinia = store;//添加该行，其中store是pinia实例
//#region 处理刷新后，路由丢失
const addRouter = () => {
    permissionStore.refreshRouter()
}
addRouter()


/**
 * 默认主题
 */
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');


app.use(i18n);
app.use(router);
app.use(ShortKey);
app.config.globalProperties.$messageBox = useMessageBox();
app.component('SvgIcon', SvgIcon);
app.mount("#app");
