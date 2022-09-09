import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Modal from './modal';



import BussinessDetailsModal from './bussinessdetailsmodal';

import Divider from '@mui/material/Divider';
import BussinessCard from './bussinesscard';
import { AiFillCloseCircle } from 'react-icons/ai';

import WaveBG from '../assets/imgs/wavebg.svg';

function BussinessesList({ bussinesses = [{}, {}, {}], setBussinesses, favouriteBussinesses, setFavouriteBussinesses, userID, userName, cardAvailable, loggedInButtons = false, setJoinModal }) {


    const getBussinesses = async () => {
        try {
            const response = await fetch("https://privilege-cards-backend.fly.dev/api/bussiness");
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
    const [favButtonLoading, setFavButtonLoading] = useState(false)
    const AddFavouriteBussiness = async (app_user_id, bussiness) => {
        setFavButtonLoading(true)

        const bussiness_id = bussiness?.bussiness_id;
        try {
            const body = {
                app_user_id,
                bussiness_id,

            };
            const response = await fetch("https://privilege-cards-backend.fly.dev/api/app_user_bussiness", {
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


    const DeleteFavouriteBussiness = async (app_user_id, bussiness_id) => {
        setFavButtonLoading(true)
        try {
            const deleteBussiness = await fetch(`https://privilege-cards-backend.fly.dev/api/app_user_bussiness/${app_user_id}/${bussiness_id}`, {
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



    useEffect(() => {
        setSelectedBussiness(bussinesses[2])
    }, [bussinesses])

    const [bussinessDetailsModal, setBussinessDetailsModal] = useState(false)

    console.log(selectedBussiness?.bussiness_cover_image_urls)
    function GetCurrentDateAndTime() {
        var date = new Date();
        var hours = new Date().getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var day = new Date().getDate();
        var month = date.getMonth() + 1;
        var year = new Date().getFullYear();
        return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;

    }

    return (
        <div>



            <h1 style={{ opacity: '0.9' }} >AVAILABLE OFFERS</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {(bussinesses?.length > 0) && bussinesses.map((bussiness, i) => {


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
                        <div>
                            <AiFillCloseCircle className='animate__animated animate__fadeIn' style={{ fontSize: '50px', position: 'fixed', top: '70px', right: '70px', cursor: 'pointer', opacity: '0.7' }} onClick={() => setShowCard(false)} />

                            <link rel="stylesheet"
                                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />


                            <div className="bussinessprivilegecard   " style={{ margin: '0 auto' }}>
                                <div class="ticket">
                                    <div class="left">
                                        <div class="image">
                                            <h1 style={{ fontSize: '100px', color: 'black' }} >{selectedBussiness?.bussiness_discount}%</h1>
                                            {/* <p class="admit-one">
                                                <span> DISCOUNT </span>
                                                <span> DISCOUNT </span>
                                                <span> DISCOUNT </span>
                                            </p> */}

                                        </div>
                                        <div class="ticket-info">
                                            <p class="date">
                                                <span>{new Date().toLocaleString('default', { weekday: 'long' })}</span>
                                                <span class="june-29">{new Date().toLocaleString('default', { month: 'long' })} {new Date().getDate()}TH </span>
                                                <span>{new Date().getFullYear()}</span>
                                            </p>
                                            <div class="show-name">
                                                <h4 style={{ margin: '0', color: 'black' }} >{userName}</h4>
                                                <h4 style={{ margin: '0' }}>{selectedBussiness?.bussiness_name}</h4>
                                            </div>
                                            {/* <div class="time">
                                                <p>{new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")} </p>

</div> */}
                                            <p class="location">
                                                <span>{selectedBussiness?.bussiness_locationdetails}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        {/* <p class="admit-one">
                                            <span> DISCOUNT </span>
                                            <span> DISCOUNT </span>
                                            <span> DISCOUNT </span>

                                        </p> */}
                                        <div class="right-info-container">
                                            <div class="show-name">
                                                <div className="holo"></div>

                                                <img width={'70px'} style={{ cursor: 'pointer', borderRadius: '20px', marginTop: '21px' }} src={selectedBussiness?.bussiness_profile_image_url} />
                                            </div>
                                            <div class="time">
                                                <p style={{ margin: '0' }} >{new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")} </p>

                                            </div>
                                            <div class="barcode">
                                                <img width={'40px'} style={{ cursor: 'pointer', marginTop: '33px' }} src={'https://avatars.dicebear.com/api/identicon/' + String(selectedBussiness?.bussiness_id).padStart(4, '0') + '.svg?mood[]=happy'} />
                                            </div>
                                            <p class="ticket-number">
                                                {Math.floor(1000 + Math.random() * 9000)}{String(selectedBussiness?.bussiness_id).padStart(4, '0')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                setJoinModal={setJoinModal}
                showCard={showCard}
            />}

        </div>
    )
}

export default BussinessesList