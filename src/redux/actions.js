export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_AGE = 'SET_USER_AGE'
export const INCREASE_AGE = 'INCREASE_AGE'
export const GET_NAMES = 'GET_NAMES'

const API_URL = 'https://mocki.io/v1/8d8d0088-b8c9-4039-ad85-f01069810e9e'

export const getNames = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await result.json()
      if (json) {
        dispatch({
          type: GET_NAMES,
          payload: json
        })
      } else {
        console.log('fail to fetch')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name
  })
}

export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age
  })
}

export const increaseAge = age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: age
  })
}
