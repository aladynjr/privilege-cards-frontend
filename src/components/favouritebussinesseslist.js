import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Modal from './modal';



import BussinessDetailsModal from './bussinessdetailsmodal';

import Divider from '@mui/material/Divider';
import BussinessCard from './bussinesscard';

function FavouriteBussinessesList({ favouriteBussinesses, setFavouriteBussinesses, userID, userName, cardAvailable, loggedInButtons = false }) {





    //add this bussiness id + this user id to junction table (add favourite bussiness)
const [favButtonLoading, setFavButtonLoading] = useState(false)
    const AddFavouriteBussiness = async (app_user_id, bussiness) => {
        setFavButtonLoading(true)

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
            setFavButtonLoading(false)
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
            setFavButtonLoading(false)
        }
    };

    
    const DeleteFavouriteBussiness = async (app_user_id,bussiness_id) => {
        setFavButtonLoading(true)
        try {
            const deleteBussiness = await fetch(`http://localhost:4000/api/app_user_bussiness/${app_user_id}/${bussiness_id}`, {
                method: "DELETE"
            });

            setFavouriteBussinesses(favouriteBussinesses.filter(bussiness => bussiness.bussiness_id !== bussiness_id));
        } catch (err) {
            console.error(err.message);

        }
        setFavButtonLoading(false)
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

    useEffect(() => {
        setSelectedBussiness(favouriteBussinesses[0])
    }, [favouriteBussinesses])

    const [bussinessDetailsModal, setBussinessDetailsModal] = useState(false)

    console.log(selectedBussiness?.bussiness_cover_image_urls)


    return (
        <div>
            <h1 style={{ opacity: '0.9' }} >FAVOURITE BUSSINESSES</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {favouriteBussinesses && favouriteBussinesses.map((bussiness, i) => {


                    return (
                        <div key={i}>

                            <BussinessCard bussiness={bussiness} setSelectedBussiness={setSelectedBussiness} setBussinessDetailsModal={setBussinessDetailsModal} />


                        </div>
                    )
                })}
            </div>



            <div style={{ zIndex: '2001', position: 'absolute' }}>
                {showCard && <Modal
                    fullscreen={true}
                    onClick={() => { setShowCard(false) }}
                    titletext=""
                    titlecolor='whitesmoke'
                    bodytext={
                        <div className="bussinesscard">
                            <p>Name : {userName}</p>
                            <p>Bussiness : {selectedBussiness?.bussiness_name}</p>
                            <p>discount : {selectedBussiness?.bussiness_discount}%</p>
                            <p>date : {new Date().toLocaleString() + ""}</p>
                            <p>bussiness code : {String(selectedBussiness?.bussiness_id).padStart(4, '0')} </p>
                            <p>unique ref code : {Math.floor(1000 + Math.random() * 9000)} </p>
                            <img width={'70px'} style={{ cursor: 'pointer' }} src={'https://avatars.dicebear.com/api/identicon/' + String(selectedBussiness?.bussiness_id).padStart(4, '0') + '.svg?mood[]=happy'} />
                            <span class="holo"></span>

                        </div>

                    }


                />}
            </div>



            {bussinessDetailsModal && <BussinessDetailsModal 
            selectedBussiness={selectedBussiness} 
            setBussinessDetailsModal={setBussinessDetailsModal} 
            cardAvailable={cardAvailable} 
            setShowCard={setShowCard}
            favouriteBussinesses={favouriteBussinesses}
            AddFavouriteBussiness={AddFavouriteBussiness}
            DeleteFavouriteBussiness={DeleteFavouriteBussiness}
            favButtonLoading={favButtonLoading}
            userID={userID}
            /> }

        </div>
    )
}

export default FavouriteBussinessesList