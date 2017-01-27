import axios from 'axios'
import { browserHistory } from 'react-router'
import {
  LOGIN,
  LOGOUT,
  SET_LOGIN_ERROR,
  API_URL
} from './actionTypes'

// ------------------------------------
// Actions
// ------------------------------------

export const login = (credentials) => {
  return (dispatch) => {
    axios.post(API_URL, credentials)
    .then(response => {
      if (response.data.error) {
        dispatch(setError(response.data.error))
        return
      }
      dispatch(saveToken(response.data.token))
      dispatch(setError(null))
      browserHistory.push('/')
    })
    .catch(error => {
      dispatch(setError(error))
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(removeToken())
    browserHistory.push('/login')
  }
}

export function saveToken (token) {
  return {
    type: LOGIN,
    token
  }
}

export function removeToken () {
  return {
    type: LOGOUT
  }
}

export function setError (error) {
  return {
    type: SET_LOGIN_ERROR,
    error
  }
}

const LOGIN_ACTION_HANDLERS = {
  [LOGIN]: (state, action) => {
    return ({ ...state, token: action.token })
  },
  [LOGOUT]: (state) => {
    return ({ ...state, token: null })
  },
  [SET_LOGIN_ERROR]: (state, action) => {
    return ({ ...state, error: action.error })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = { token: null, error: null }

export default function loginReducer (state = initialState, action) {
  const handler = LOGIN_ACTION_HANDLERS[action.type]

  return (handler) ? handler(state, action) : state
}
