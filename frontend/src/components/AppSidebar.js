import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import logo1 from 'src/assets/brand/logo1.png'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import { _nav, _adminNav } from '../_nav'
import { Typography } from '@mui/material'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.app.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.app.sidebarShow)

  const user = useSelector((state) => state.auth.user)
  const isAdmin = user && user.role === 'admin'

  // Conditionally include user routes if the user is an admin
  const navigation = isAdmin ? [..._nav, ..._adminNav] : _nav
  // const currentLocation = useLocation().pathname

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({
          type: 'set',
          payload: {
            sidebarShow: visible,
          },
        })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand
          to="/"
          style={{
            display: 'flex !important',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            flex: 1,
          }}
        >
          {!unfoldable && sidebarShow ? (
            <div>
              <div>
                <img src={logo1} height={100} width={120} />
              </div>
            </div>
          ) : (
            <div>
              <div>
                <img src={logo1} height={50} width={50} />
              </div>
            </div>
          )}
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() =>
            dispatch({
              type: 'set',
              payload: {
                sidebarShow: false,
              },
            })
          }
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({
              type: 'set',
              payload: {
                sidebarUnfoldable: !unfoldable,
              },
            })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
