import React, { useState } from 'react'
import AddNewBussiness from '../components/addnewbussiness'
import BussinessesList from '../components/bussinesseslist'
import UpdateBussiness from '../components/updatebussiness'

import { Divider } from '@mui/material'

function ApproveScreen() {
const [bussinesses, setBussinesses] = useState([])

const [selectedEditBussiness, setSelectedEditBussiness] = useState(null)

  return (
    <div>



<UpdateBussiness bussinesses={bussinesses} setBussinesses={setBussinesses} selectedEditBussiness={selectedEditBussiness} />
<Divider textAlign='center' style={{width:'70%',margin:'auto', marginBlock:'30px'}} > <b >Waiting for Approval</b></Divider> 

<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} showDeleteButton={true} showEditButton={true} setSelectedEditBussiness={setSelectedEditBussiness} showApproved={false}  />

<Divider textAlign='center' style={{width:'70%', margin:'auto',marginBlock:'30px'}} > <b >Approved Bussinesses</b></Divider> 
<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} showDeleteButton={true} showEditButton={true} setSelectedEditBussiness={setSelectedEditBussiness} showApproved={true}  />


    </div>
  )
}

export default ApproveScreen