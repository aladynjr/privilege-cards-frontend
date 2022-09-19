import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

function BussinessesList({bussinesses, setBussinesses}) {

    const getBussinesses = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_HOST+"/api/bussiness");
            const jsonData = await response.json();

            setBussinesses(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getBussinesses();
    }, []);

    const DeleteBussiness = async id => {
        try {
            const deleteBussiness = await fetch(process.env.REACT_APP_HOST+`/api/bussiness/${id}`, {
                method: "DELETE"
            });

            setBussinesses(bussinesses.filter(bussiness => bussiness.bussiness_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            {bussinesses && bussinesses.map((bussiness, i) => {
                return (
                    <div key={i}>
                        <p>{bussiness?.bussiness_name}</p>
                        <Button variant="contained" color="error" onClick={()=>{DeleteBussiness(bussiness?.bussiness_id)}} >X</Button>
                    </div>
                )
            })}
        </div>
    )
}

export default BussinessesList