export const demoUserInitialState = JSON.parse(window.localStorage.getItem('demoUser')) || {demoUser: false}

export const DEMO_USER_ACTION_TYPES = {
  SET_DEMO_USER : 'SET_DEMO_USER',
  CLEAR_DEMO_USER : 'CLEAR_DEMO_USER'
}

export const updateDemoUserLocalStorage = (state) => {
  window.localStorage.setItem('demoUser', JSON.stringify(state))
}

const UPDATE_DEMO_USER_BY_ACTION = {
  [DEMO_USER_ACTION_TYPES.SET_DEMO_USER]: (state, action) => {
    const {username} = action.payload
    const newState = {
      ...state,
      isDemoUser: username === 'demo-tester'
    } 
    updateDemoUserLocalStorage(newState)
    return newState
  },
  [DEMO_USER_ACTION_TYPES.CLEAR_DEMO_USER]: () => {
    updateDemoUserLocalStorage([])
    return []
  }
}

export const demoUserReducer = (state, action) => {
  const {type: actionType} = action
  const updateState = UPDATE_DEMO_USER_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}