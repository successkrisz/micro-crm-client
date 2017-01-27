import { LOGIN } from 'routes/login/modules/actionTypes'
import {
  login,
  logout,
  setError,
  default as loginReducer
} from 'routes/Login/modules/login'

describe('(Redux Module) Login', () => {
  it('Should export a constant LOGIN.', () => {
    expect(LOGIN).to.equal('LOGIN')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(loginReducer).to.be.a('function')
    })

    it('Should initialize with az empty state (token/error: null, email/password: \'\').', () => {
      let state = loginReducer(undefined, {})

      expect(state.token).to.equal(null)
      expect(state.error).to.equal(null)
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = loginReducer(undefined, {})

      state = loginReducer(state, { type: '@@@@@@@' })
      expect(state.token).to.equal(null)
      expect(state.error).to.equal(null)

      state = loginReducer(state, setError('Error'))
      expect(state.token).to.equal(null)
      expect(state.error).to.equal('Error')

      state = loginReducer(state, { type: '@@@@@@@' })
      expect(state.token).to.equal(null)
      expect(state.error).to.equal('Error')
    })
  })

  describe('(Action Creator) logout', () => {
    let _globalState
    let _dispatchSpy

    beforeEach(() => {
      _globalState = {
        login : loginReducer(undefined, { type: LOGIN, payload: 'token' })
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          login : loginReducer(_globalState.login, action)
        }
      })
    })

    it('Should be exported as a function.', () => {
      expect(logout).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(logout()).to.be.a('function')
    })

    it('Should call dispatch  exactly once.', () => {
      logout()(_dispatchSpy)
      _dispatchSpy.should.have.been.calledOnce
    })

    it('Should remove token from state.', () => {
      logout()(_dispatchSpy)
      expect(_globalState.login.token).to.equal(null)
    })
  })

  describe('(Action Creator) login', () => {
    it('Should be exported as a function.', () => {
      expect(login).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(login()).to.be.a('function')
    })
  })
})
