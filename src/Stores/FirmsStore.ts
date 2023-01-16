import type { Firm } from "@/Models/Firms"
import { ref } from 'vue'
const firms = ref<Firm[]>()
const currentFirm = ref<Firm>()
//const urlApi = 'https://pkapi-production.up.railway.app/api/'
//const urlApi = 'https://localhost:7086/api/'
const urlApi = 'https://pkapi.onrender.com/api/'
const apiKey = ref('')

export default function useFirms() {
  const loadFirms = async () => {
    const response = await fetch(urlApi + 'firms');
    const data = await response.json();

    if (data) {
      const promises = data.map((firm: { id: string }) => getFirm(firm.id))
      return await Promise.all(promises)
    }

    return [];
  }
  
  const load = async () => {
    firms.value = await loadFirms()
  }

  const getFirm = async (id: string) => {
    const response = await fetch(urlApi + 'firms/' + id)
    const data = await response.json();

    if (data) {
      return data
    }
  }

  const postFirm = async (newFirm: Firm) => {
    apiKey.value = newFirm.key
    const form = new FormData()
    form.append('Name', newFirm.name)
    form.append('Image', newFirm.image)
    form.append('EnglishDescription', newFirm.englishDescription)
    form.append('EstonianDescription', newFirm.estonianDescription)

    const headers = new Headers()
    headers.set('KEY', newFirm.key)

    const response = await fetch(urlApi + 'firms', {
      method: 'POST',
      headers,
      body: form
    })
    
    const data = await response.json();

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = data;
        await load()
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const updateFirm = async (firm: Firm, id: string) => {
    apiKey.value = firm.key
    const form = new FormData()
    form.append('Name', firm.name)
    form.append('Image', firm.image)
    form.append('EnglishDescription', firm.englishDescription)
    form.append('EstonianDescription', firm.estonianDescription)

    const headers = new Headers()
    headers.set('KEY', firm.key)

    const response = await fetch(urlApi + 'firms/' + id, {
      method: 'PUT',
      headers,
      body: form
    })
    
    const data = await response.json()

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = data
        await load()
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const deleteFirm = async (id: string, key: string) => {
    apiKey.value = key
    const headers = new Headers()
    headers.set('KEY', key)

    const response = await fetch(urlApi + 'firms/' + id, { method: 'DELETE', headers })
    const data = await response.json()

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = undefined
        firms.value = data
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  return { urlApi, apiKey, firms, currentFirm, load, postFirm, updateFirm, deleteFirm }
}
