import React from 'react'
import { Outlet } from "react-router-dom";
import { Home } from '../../pages/home/Home';


export const Root:React.FC = () => {
  return (
    <>
    <Home />
    <Outlet />
    </>
  )
}
