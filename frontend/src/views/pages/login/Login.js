import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../store/auth/authThunks'
import FormContainer from '../../../components/FormContainer'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)
  const user = useSelector((state) => state.auth.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(email, password))
      // Navigate to dashboard after successful login
      navigate('/dashboard')
    } catch (error) {
      // Handle login failure
      console.error('Login failed:', error)
    }
  }


  // if (isLoading) {
  //   return
  // }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-body-secondary">Sign In to your account</p>
                      {error && <Message variant="danger">{error}</Message>}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton onClick={handleSubmit} color="primary" className="px-4">
                            Login
                          </CButton>
                        </CCol>
                        {/* <CCol xs={6} style={{ textAlign: 'end' }}>
                          <CButton className="px-0" style={{ textAlign: 'end' }} color="link">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  )
}

export default Login
