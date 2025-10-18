import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import { CCardHeader, CToast, CToastBody, CToastClose, CToastHeader, CToaster } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useRef, useState } from 'react'
import Toasts from '../../../components/AppToasts'
import { useEffect } from 'react'
import { authService } from '../../../service/authService'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const toasts = Toasts({ title: 'Thông báo', body: 'Tên đăng nhập hoặc mật khẩu không đúng' })
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [submitted, setSubmitted] = useState(false);
  const data = useSelector((state) => state.logins.data)

  const handSummit = async () => {
    const response = await authService.loginWithUserCredentials(email, password)
    dispatch(listLogin(response.data))
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={email} onChange={(e) => setemail(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handSummit}>
                          Login
                        </CButton>
                        <CToaster ref={toaster} push={toast} placement="top-end" />
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p>data: {JSON.stringify(data)}</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
