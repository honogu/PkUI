import { ref } from 'vue'

const apiUrl = ref<string>()
export function setApiUrl(url: string) {
    apiUrl.value = url;
    return { apiUrl }
}

export function getApiUrl() {
    return { apiUrl }
}
