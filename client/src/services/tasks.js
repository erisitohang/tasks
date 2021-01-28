
const { REACT_APP_API_URI } = process.env

export function getList (search) {
  return fetch(`${REACT_APP_API_URI}/task?search=${search}`)
    .then(data => data.json())
}

export function update (data) {
  return fetch(`${REACT_APP_API_URI}/task`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
}

export function add (data) {
  return fetch(`${REACT_APP_API_URI}/task`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => data.json())
}
