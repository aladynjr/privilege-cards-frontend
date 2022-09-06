import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from './modal';
import { MdCardMembership } from 'react-icons/md';
import { MdPhoneInTalk } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { HiGift } from 'react-icons/hi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { ImClock2 } from 'react-icons/im';
import { RiCustomerService2Fill } from 'react-icons/ri';
import ImageGallery from 'react-image-gallery';




import Chip from '@mui/material/Chip';

import Divider from '@mui/material/Divider';

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

    useEffect(() => {
        setSelectedBussiness(bussinesses[0])
    }, [bussinesses])

    const [bussinessDetailsModal, setBussinessDetailsModal] = useState(false)

    console.log(selectedBussiness?.bussiness_cover_image_urls)

    var coverImages = selectedBussiness?.bussiness_cover_image_urls?.map((image) => {
        return {
            original: image,
            // thumbnail: image,
        }

    })
    return (
        <div>
            <h1 style={{ opacity: '0.9' }} >AVAILABLE OFFERS</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
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
                                            <p className="front__text-para"><i className="front-icons"></i>{bussiness?.bussiness_discount}% OFF</p>

                                            <Button variant="contained" style={{ background: 'dodgerblue', width: '70%', fontSize: '15px', fontWeight: '100', fontFamily: 'Crimson Pro', marginTop: '10px' }} onClick={() => { setSelectedBussiness(bussiness); setBussinessDetailsModal(true) }} >VIEW</Button>

                                            <div>
                                                <Chip className="bussinesscardtag" label={bussiness?.bussiness_cuisine} />

                                            </div>
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



<div style={{zIndex:'2001', position:'absolute'}}>
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



            {bussinessDetailsModal && <Modal
                fullscreen={true}
                onClick={() => { setBussinessDetailsModal(false) }}
                titletext=""
                titlecolor='whitesmoke'
                bodytext={
                    <div style={{ width: 'min-content' }}>
                        <div className="front__bkg-photo" style={{ width: '100vw', objectFit: 'cover', height: 'fit-content' }} >   <ImageGallery items={coverImages || []} showThumbnails={false} autoPlay={true} showFullscreenButton={false} /></div>

                        {/* <img className="front__bkg-photo" style={{width: '100vw', objectFit: 'cover', height: '700px' }} src={selectedBussiness?.bussiness_cover_image_url} /> */}

                        <img className="front__face-photo" style={{ cursor: 'pointer', top: '-34px', width: '100px', height: '100px' }} src={selectedBussiness?.bussiness_profile_image_url} />
                        <div className="front__text">
                            <h3 className="front__text-header">{selectedBussiness?.bussiness_name}</h3>
                            <Button
                                disabled={!cardAvailable}
                                endIcon={<MdCardMembership />}
                                style={{ fontFamily: 'Crimson Pro', padding: '10px 50px', fontSize: '17px', background: 'limegreen' }}
                                variant="contained" color="success"
                                onClick={() => {/* AddPrivilegeCard(selectedBussiness?.bussiness_id, selectedBussiness?.bussiness_discount);*/ setShowCard(true); }} >Show Card</Button>

                        </div>
                        <div style={{ width: '50%', minWidth: '280px', margin: 'auto' }}>
                            <Divider><h3><AiFillStar style={{ marginBottom: '-5px', opacity: '0.8' }} /> About </h3></Divider>
                            <p className='bussinessdetailstext' >{selectedBussiness?.bussiness_description}</p>

                            <Divider>  <h3 className="front__text-para" style={{ fontSize: '25px', fontWeight: '700px' }} ><HiGift style={{ marginBottom: '-5px', opacity: '0.8' }} /> {selectedBussiness?.bussiness_discount}% OFF</h3></Divider>
                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_discountdetails}</p>
                            {loggedInButtons && <div>
                                {/* <Button variant="contained" color="error" onClick={() => { AddFavouriteBussiness(userID, selectedBussiness) }} >Favourite</Button> */}
                            </div>}


                            <Divider><h3 className="front__text-header"> <FaMapMarkedAlt style={{ marginBottom: '-5px', opacity: '0.8' }} /> Location</h3> </Divider>

                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_locationdetails}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  <a href={selectedBussiness?.bussiness_directions_url} target={'_blank'} style={{ padding: '0px 10px', fontWeight: '900' }}  >DIRECTIONS  </a> <img width={'25px'} src={'https://cdn-icons-png.flaticon.com/512/355/355980.png'} /></div>
                            <Divider> <h3 className="front__text-header"> <ImClock2 style={{ marginBottom: '-5px', opacity: '0.8' }} /> Trading Hours</h3></Divider>
                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_tradinghours}</p>

                            <Divider> <h3 className="front__text-header"><RiCustomerService2Fill style={{ marginBottom: '-5px', marginRight: '7px', opacity: '0.8' }} />Contact</h3></Divider>
                            <a className='bussinessdetailstext' href={"tel:" + selectedBussiness?.bussiness_phonenumber}> <p><MdPhoneInTalk style={{ marginBottom: '-5px' }} />{selectedBussiness?.bussiness_phonenumber} </p></a>

                        </div>
                        <div style={{ marginBottom: '200px' }} ></div>
                    </div>}


            />}

        </div>
    )
}

export default BussinessesList