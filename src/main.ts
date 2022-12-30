import { createApp } from 'vue'
import { setApiUrl } from '@/Stores/Api';
import App from './App.vue'

const app = createApp(App)
const getRuntimeConf = async () => {
    const runtimeConf = await fetch('/config/runtime-config.json');
    return await runtimeConf.json();
};
getRuntimeConf().then((json) => {
    setApiUrl(json.API_URL)
    app.mount('#app')
});
