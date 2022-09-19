import React, { useState } from 'react'
import AddNewBussiness from '../components/addnewbussiness'
import BussinessesList from '../components/bussinesseslist'

function AddScreen() {
const [bussinesses, setBussinesses] = useState([])

const [selectedEditBussiness, setSelectedEditBussiness] = useState(null)

  return (
    <div>

<AddNewBussiness bussinesses={bussinesses} setBussinesses={setBussinesses} selectedEditBussiness={selectedEditBussiness} />

<BussinessesList bussinesses={bussinesses} setBussinesses={setBussinesses} showDeleteButton={true} showEditButton={true} setSelectedEditBussiness={setSelectedEditBussiness}  />

    </div>
  )
}

export default AddScreen