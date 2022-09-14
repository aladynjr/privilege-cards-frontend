import React, { useState } from 'react'
import AddNewBussiness from '../components/addnewbussiness'
import BussinessesList from '../components/bussinesseslist'

function DashboardScreen() {
const [bussinesses, setBussinesses] = useState([])
  return (
    <div>

<AddNewBussiness bussinesses={bussinesses} setBussinesses={setBussinesses} />

<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} />

    </div>
  )
}

export default DashboardScreen