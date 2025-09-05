// 封装本地存储数据数据与读取数据

// 存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 读取数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 删除本地存储
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
