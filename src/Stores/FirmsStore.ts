import type { Firm } from "@/Models/Firms"
import { ref } from 'vue'
const firms = ref<string[]>()
const firm = ref<Firm>()
const urlApi = 'https://pkapi-production.up.railway.app/api/'

export default function useFirms() {
  const loadFirms = async () => {
    const response = await fetch(urlApi + 'firms');
    const data = await response.json();

    if (data) {
      return data
    }

    return [];
  }
  
  const load = async () => {
    firms.value = await loadFirms()
  }

  const getFirm = async (name: string) => {
    const response = await fetch(urlApi + 'firms/' + name)
    const data = await response.json();

    if (data) {
      firm.value = data
    }
  }

  const postFirm = async (firm: Firm) => {
    const form = new FormData()
    form.append('Name', firm.name)
    form.append('Image', firm.image)
    form.append('EnglishDescription', firm.englishDescription)
    form.append('EstonianDescription', firm.estonianDescription)

    const response = await fetch(urlApi + 'firms', {
      method: 'POST',
      body: form
    })
    
    const data = await response.json();

    if (data) {
      if (response.status == 200)
      {
        firms.value = data
        await load()
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const updateFirm = async (firm: Firm, name: string) => {
    const form = new FormData()
    form.append('Name', firm.name)
    form.append('Image', firm.image)
    form.append('EnglishDescription', firm.englishDescription)
    form.append('EstonianDescription', firm.estonianDescription)

    const response = await fetch(urlApi + 'firms/' + name, {
      method: 'PUT',
      body: form
    })
    
    const data = await response.json()

    if (data) {
      if (response.status == 200)
      {
        firms.value = data
        await getFirm(firm.name == '' ? name : firm.name)
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const deleteFirm = async (name: string) => {
    const response = await fetch(urlApi + 'firms/' + name, { method: 'DELETE' })
    const data = await response.json()

    if (data) {
      firm.value = data
      await load()
    }
  }

  return { urlApi, firm, firms, load, postFirm, getFirm, updateFirm, deleteFirm }
}
