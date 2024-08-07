import React from 'react'
import { Link } from 'react-router-dom'
import './FMSHome.css'
import Dashboardbox from './components/Dashboardbox.jsx'
import Table from './components/table.jsx'
import NavBarFMS from './components/NavBarFMS.jsx'

function FMSHome ()  {
  return (
    <>
      <NavBarFMS/>
      <Dashboardbox/>
      <Table/>
      
    </>
    
  )
}

export default FMSHome
