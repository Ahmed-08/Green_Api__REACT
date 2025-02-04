import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/loginheader/Header';


export const Login:React.FC = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}
