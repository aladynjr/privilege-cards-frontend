import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';

function BussinessesList({ bussinesses, setBussinesses, favouriteBussinesses, setFavouriteBussinesses, userID, userName, cardAvailable, loggedInButtons = false }) {


    const getBussinesses = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/bussiness");
            const jsonData = await response.json();

            setBussinesses(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getBussinesses();
    }, []);


    //add this bussiness id + this user id to junction table (add favourite bussiness)

    const AddFavouriteBussiness = async (app_user_id, bussiness) => {
        const bussiness_id = bussiness?.bussiness_id;
        try {
            const body = {
                app_user_id,
                bussiness_id,

            };
            const response = await fetch("http://localhost:4000/api/app_user_bussiness", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setFavouriteBussinesses([bussiness, ...favouriteBussinesses]);
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    const [showCard, setShowCard] = useState(false);
    const [selectedBussiness, setSelectedBussiness] = useState({});

    const AddPrivilegeCard = async (bussiness_id, privilege_card_discount) => {
        const app_user_id = userID;
        try {
            const body = {
                privilege_card_discount,
                app_user_id,
                bussiness_id,
            };
            const response = await fetch("http://localhost:4000/api/privilege_card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <div>
            <p>All Bussinesses</p>
            <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
            {bussinesses && bussinesses.map((bussiness, i) => {
                return (
                    <div key={i}>
                        <div className="outer-div">
                            <div className="inner-div">
                                <div className="front">

                                    <img className="front__bkg-photo" style={{ cursor: 'pointer' }} src={bussiness?.bussiness_cover_image_url} />

                                    <img className="front__face-photo" style={{ cursor: 'pointer' }} src={bussiness?.bussiness_profile_image_url} />

                                    <div className="front__text">
                                        <h3 className="front__text-header">{bussiness?.bussiness_name}</h3>
                                        {/* <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>{bussiness?.bussiness_area}</p> */}

                                        <Button variant="contained" style={{background: 'dodgerblue', width:'70%'}} onClick={() => { AddFavouriteBussiness(userID, bussiness) }} >VIEW</Button>

                                        {/* <span className="front__text-hover">
                                            {loggedInButtons && <div>
                                                <Button variant="contained" color="error" onClick={() => { AddFavouriteBussiness(userID, bussiness) }} >Favourite</Button>
                                                <Button disabled={!cardAvailable} variant="contained" color="success" onClick={() => { AddPrivilegeCard(bussiness?.bussiness_id, bussiness?.bussiness_discount); setSelectedBussiness(bussiness); setShowCard(true); }} >Show Card</Button>
                                            </div>}

                                        </span> */}
                                    </div>
                                </div>


                            </div>
                        </div>



                    </div>
                )
            })}
            </div>





            {showCard && <div className="bussinesscard">
                <p>Name : {userName}</p>
                <p>Bussiness : {selectedBussiness?.bussiness_name}</p>
                <p>discount : {selectedBussiness?.bussiness_discount}%</p>
                <p>date : {new Date().toLocaleString() + ""}</p>
                <p>bussiness code : {String(selectedBussiness?.bussiness_id).padStart(4, '0')} </p>
                <p>unique ref code : {Math.floor(1000 + Math.random() * 9000)} </p>
                <img width={'70px'} style={{ cursor: 'pointer' }} src={'https://avatars.dicebear.com/api/identicon/' + String(selectedBussiness?.bussiness_id).padStart(4, '0') + '.svg?mood[]=happy'} />

            </div>}

        </div>
    )
}

export default BussinessesList