// Используем относительные пути для production
const API_BASE = ''

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const getItemTodos = async (email, title, text) => {
  const res = await fetch(`${API_BASE}/api/new`, {
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
  const res = await fetch(`${API_BASE}/api/delete`, {
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
  const res = await fetch(`${API_BASE}/api/update`, {
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
  const res = await fetch(`${API_BASE}/api/register`, {
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
  const res = await fetch(`${API_BASE}/api/login`, {
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
  const res = await fetch(`${API_BASE}/api/check-token`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  return checkResponse(res)
}