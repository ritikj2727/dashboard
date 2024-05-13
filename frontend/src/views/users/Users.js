import { CTable } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Typography } from '@mui/material'
import { fetchUsers } from '../../store/users/usersSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { deleteUser } from '../../store/auth/authThunks'

export default function Users() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector((state) => state.users.users)
  const status = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  // console.log(users, deleteSuccess)

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id)).then(() => {
        // Reload user list after successful deletion
        dispatch(fetchUsers())
      })
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col flex="auto">
          <Typography variant="h4">Users</Typography>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Button
            className="my-3"
            onClick={() => navigate('/users/createuser')}
            // onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create User
          </Button>
        </Col>
      </Row>

      {status === 'loading' ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.role === 'admin' ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {/* <LinkContainer > */}
                  {/* <Button variant="light" style={{ backgroundColor: 'green' }} className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button> */}
                  {/* </LinkContainer> */}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
