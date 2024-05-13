import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
// import { getUserDetails, updateUser } from '../actions/userActions'
// import { USER_UPDATE_RESET } from '../constants/userConstant'
// import Colors from '../components/Colors'
import { Typography } from '@mui/material'
import { createUser } from '../../store/auth/authThunks'
import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const UserEditScreen = () => {
  const params = useParams()
  const Navigate = useNavigate()
  //   const userId = params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.createUserLoading)
  const error = useSelector((state) => state.auth.createUserError)

  //   useEffect(() => {
  //     if (successUpdate) {
  //       dispatch({ type: USER_UPDATE_RESET })
  //       Navigate('/admin/userlist')
  //     } else {
  //       if (!user.name || user._id !== userId) {
  //         dispatch(getUserDetails(userId))
  //       } else {
  //         setName(user.name)
  //         setEmail(user.email)
  //         setIsAdmin(user.isAdmin)
  //       }
  //     }
  //   }, [dispatch, userId, user, Navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    const role = isAdmin ? 'admin' : 'user'
    dispatch(createUser({ name, email, password, role }))
    //    console.log('ere', error)
    setName('')
    setPassword('')
    setEmail('')
    // Navigate('/users')
  }

  return (
    <>
      <FormContainer>
        <Typography variant="h4" style={{ marginBottom: '1.5em' }}>
          Create User
        </Typography>
        {loading && <Loader />}
        {error && <Message variant="danger">{error.message}</Message>}
        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : ( */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" style={{ marginBottom: '1em' }}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" style={{ marginBottom: '1em' }}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" style={{ marginBottom: '1em' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter user password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isadmin" style={{ marginBottom: '1em' }}>
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
