// Динамический BASE_URL для dev/production
export const BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : ''

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const getItemTodos = async (email, title, text) => {
  const res = await fetch(`${BASE_URL}/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, title, text
    })
  })
  return checkResponse(res)
}

export const deleteItem = async (todo_id, user_id) => {
  const res = await fetch(`${BASE_URL}/delete`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todo_id, user_id
    })
  })
  return checkResponse(res)
}

export const updateItem = async (item) => {
  const res = await fetch(`${BASE_URL}/update`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item
    })
  })
  return checkResponse(res)
}

export const register = async (name, email, pass) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, email, pass
    })
  })
  return checkResponse(res)
}

export const authorize = async (email, pass, token) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, pass, token
    })
  })
  return checkResponse(res)
}

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  return checkResponse(res)
}