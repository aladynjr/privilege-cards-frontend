import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

function FavouriteBussinessesList({favouriteBussinesses, setFavouriteBussinesses, userID }) {
    

    //get favorite bussinesses id for this user from junction table


    const getFavouriteBussinesses = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/app_user_bussiness/${id}`);
            const jsonData = await response.json();
            setFavouriteBussinesses(jsonData);


        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (!userID) return;
       getFavouriteBussinesses(userID);
    }, [userID]);

    console.log(favouriteBussinesses)

    
    //delete bussiness-user relation from users/bussinesses table

    const DeleteFavouriteBussiness = async (app_user_id,bussiness_id) => {
        try {
            const deleteBussiness = await fetch(`http://localhost:4000/api/app_user_bussiness/${app_user_id}/${bussiness_id}`, {
                method: "DELETE"
            });

            setFavouriteBussinesses(favouriteBussinesses.filter(bussiness => bussiness.bussiness_id !== bussiness_id));
        } catch (err) {
            console.error(err.message);
        }
    };

    
    return (
        <div>

            <p>Favourite Bussinesses</p>
            {favouriteBussinesses && favouriteBussinesses.map((bussiness, i) => {
                return (
                    <div key={i}>
                        <p>{bussiness?.bussiness_name}</p>
                        <Button variant="contained" color="error" onClick={() => { DeleteFavouriteBussiness(userID, bussiness?.bussiness_id) }} >UNFAV</Button>

                    </div>
                )
            })}
        </div>
    )
}

export default FavouriteBussinessesList