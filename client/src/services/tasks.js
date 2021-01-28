
const { REACT_APP_API_URI } = process.env

export function getList () {
  return fetch(`${REACT_APP_API_URI}/task`)
    .then(data => data.json())
}

export function update (data) {
  console.log(data)
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
