import React, { useState } from 'react'
import AddNewBussiness from '../components/addnewbussiness'
import BussinessesList from '../components/bussinesseslist'

import { Divider } from '@mui/material'

function AddScreen() {
const [bussinesses, setBussinesses] = useState([])

const [selectedEditBussiness, setSelectedEditBussiness] = useState(null)

  return (
    <div>

<AddNewBussiness bussinesses={bussinesses} setBussinesses={setBussinesses} selectedEditBussiness={selectedEditBussiness} />


<Divider textAlign='center' style={{width:'70%',margin:'auto', marginBlock:'30px'}} > <b >Waiting for Approval</b></Divider> 

<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses}  setSelectedEditBussiness={setSelectedEditBussiness} showApproved={false}  />

<Divider textAlign='center' style={{width:'70%', margin:'auto',marginBlock:'30px'}} > <b >Approved Bussinesses</b></Divider> 
<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses}  setSelectedEditBussiness={setSelectedEditBussiness} showApproved={true}  />

    </div>
  )
}

export default AddScreen