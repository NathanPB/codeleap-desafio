import Axios, {AxiosResponse} from 'axios'

const api = Axios.create({
  baseURL: process.env.REACT_APP_POSTS_API_HOST + '/careers/'
})


export interface CareerEdit {
  title: string
  content: string
}

export interface CareerIn extends CareerEdit {
  username: string
}

export interface Career extends CareerIn {
  id: string
  created_datetime: string
}

export interface CareersPaginator {
  count: number
  next: string | null
  previous: string | null
  results: Career[]
}

export async function getCareers({ limit, offset }: { limit: number, offset: number }) {
  return api.get<never, AxiosResponse<CareersPaginator>>(`/?limit=${limit}&offset=${offset}`)
}

export async function getCareer(id: string) {
  return api.get<never, AxiosResponse<Career>>(`/${id}`)
}

export async function createCareer(data: CareerIn) {
  return api.post<CareerIn, AxiosResponse<Career>>(`/`, data)
}

export async function editCareer(id: string, data: CareerEdit) {
  return api.patch<CareerEdit, AxiosResponse<Career>>(`/${id}/`, data)
}

export async function deleteCareer(id: string) {
  return api.delete<never, AxiosResponse<undefined>>(`/${id}`)
}
