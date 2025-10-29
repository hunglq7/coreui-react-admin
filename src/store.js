import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import chucvuReducer from './views/danhmuc/chucvu/chucvuSlice'
// import chucvuReducer from './views/danhmuc/chucvu/chucvuSlice'
import phongbanReducer from './views/danhmuc/phongban/phongbanSlice'
import loginReducer from './views/pages/login/loginSlice'
import donvitinhReducer from './views/danhmuc/donvitinh/donvitinhSlice'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export const store = configureStore({
  reducer: {
    changeState: changeState,
    chucvus: chucvuReducer,
    phongbans: phongbanReducer,
    logins: loginReducer,
    donvitinhs: donvitinhReducer
  },
})
// const middleware = [thunk];
// // check nếu không phải production thì push logger vào để log ra những action
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger());
// }
// const enhancers = [reducers, applyMiddleware(...middleware)];
// const store = createStore(changeState, compose(enhancers))
export default store
