
const { REACT_APP_API_URI } = process.env

export function getList () {
  return fetch(`${REACT_APP_API_URI}/user`)
    .then(data => data.json())
}
