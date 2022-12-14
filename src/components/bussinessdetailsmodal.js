import React, { useState } from 'react'
import Modal from './modal';
import { MdCardMembership } from 'react-icons/md';
import Divider from '@mui/material/Divider';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { MdPhoneInTalk } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { HiGift } from 'react-icons/hi';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { ImClock2 } from 'react-icons/im';
import { RiCustomerService2Fill } from 'react-icons/ri';
import ImageGallery from 'react-image-gallery';

import { MdFavorite } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import Snackbar from '@mui/material/Snackbar';
import Skeleton from '@mui/material/Skeleton';
import { AiFillCloseCircle } from 'react-icons/ai';

import { RiInstagramFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { IoPlanet } from 'react-icons/io5'
import { FaFacebookSquare } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
function BussinessDetailsModal({ selectedBussiness, setBussinessDetailsModal, cardAvailable, setShowCard, favouriteBussinesses, AddFavouriteBussiness, userID, DeleteFavouriteBussiness, favButtonLoading, setJoinModal,showCard,setCardID }) {
    var coverImages = selectedBussiness?.bussiness_cover_image_urls?.map((image) => {
        return {
            original:process.env.REACT_APP_HOST + "/api/image/" + image,
            // thumbnail: image,
        }

    })
    const AddPrivilegeCard = async (bussiness_id, privilege_card_discount) => {
        setCardLoading(true)
        const app_user_id = userID;
        try {
            const body = {
                privilege_card_discount,
                app_user_id,
                bussiness_id,
                
            };
            const response = await fetch(process.env.REACT_APP_HOST+"/api/privilege_card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();

            setCardID(jsonData[0]?.privilege_card_id);
console.log(jsonData)
setShowCard(true);
            // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
        setCardLoading(false)
    }

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const [bgLoaded, setBgLoaded] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false)

const [cardLoading, setCardLoading] = useState(false);

    return (
        <div>
            <AiFillCloseCircle className='animate__animated animate__fadeIn' style={{ display: showCard ? 'none' : 'block',fontSize: '30px', position: 'fixed', top: '70px', right: '22px', cursor: 'pointer', zIndex: '10001', color:'darkgrey'}} onClick={() => setBussinessDetailsModal(false)} />

            <Modal
                fullscreen={true}
                onClick={() => { setBussinessDetailsModal(false) }}
                titletext=""
                titlecolor='whitesmoke'
                bodytext={
                    <div style={{ width: 'min-content' }}>

                        <div className="front__bkg-photo animate__animated animate__fadeIn" style={{ width: '100vw', objectFit: 'cover', height: 'fit-content', minHeight: '200px', display: bgLoaded ? 'block' : 'none' }} >   <ImageGallery onImageLoad={() => { setBgLoaded(true) }} items={coverImages || []} showThumbnails={false} autoPlay={true} showFullscreenButton={false} /></div>
                        {!bgLoaded && <Skeleton variant="rounded" style={{ margin: 'auto', width: '100vw', objectFit: 'cover', height: '50vh', minHeight: '200px' }} />}
                        {/* <img className="front__bkg-photo" style={{width: '100vw', objectFit: 'cover', height: '700px' }} src={selectedBussiness?.bussiness_cover_image_url} /> */}

                        <img className="front__face-photo" style={{ cursor: 'pointer', top: '-34px', width: '100px', height: '100px', display: profileLoaded ? 'block' : 'none' }} src={process.env.REACT_APP_HOST + "/api/image/" +selectedBussiness?.bussiness_profile_image_url} onLoad={() => setProfileLoaded(true)} />
                        {!profileLoaded && <Skeleton variant="circular" width={90} height={90} className="front__face-photo" />}

                        <div className="front__text">
                            <h3 className="front__text-header">{selectedBussiness?.bussiness_name}</h3>
                            <LoadingButton
                            loading={cardLoading} loadingPosition="end"
                                // disabled={!cardAvailable}
                                endIcon={<MdCardMembership />}
                                style={{ fontFamily: 'Crimson Pro', padding: '10px 50px', fontSize: '17px', background: 'limegreen' }}
                                variant="contained" color="success"
                                onClick={() => { if (!userID) { setBussinessDetailsModal(false); setJoinModal(true) } else if (!cardAvailable) { setOpenSnackBar(true) } else if (userID && cardAvailable) {AddPrivilegeCard(selectedBussiness?.bussiness_id, selectedBussiness?.bussiness_discount);  } }} >
                                Show Card & Get Discount</LoadingButton>


                        </div>

                        <Snackbar
                            open={openSnackBar}
                            autoHideDuration={6000}
                            onClose={() => setOpenSnackBar(false)}
                            message="You don't have a privilege card yet"
                        //  action={action}
                        />

                        {userID && <LoadingButton
                            size="small"
                            onClick={() => { if (favouriteBussinesses?.find(aObj => selectedBussiness?.bussiness_id === aObj?.bussiness_id)) { DeleteFavouriteBussiness(userID, selectedBussiness?.bussiness_id); setBussinessDetailsModal(false) } else { AddFavouriteBussiness(userID, selectedBussiness); } }}
                            endIcon={favouriteBussinesses?.find(aObj => selectedBussiness?.bussiness_id === aObj?.bussiness_id) ? <MdCheck /> : <MdFavorite />}
                            loading={favButtonLoading}
                            loadingPosition="end"
                            variant="contained"
                            style={{ fontSize: '10px', fontFamily: 'Crimson Pro', marginTop: '-50px' }}
                        >
                            Favourite
                        </LoadingButton>}                       <div style={{ width: '50%', minWidth: '280px', margin: 'auto' }}>
                            <Divider><h3><AiFillStar style={{ marginBottom: '-5px', opacity: '0.8' }} /> About </h3></Divider>
                            <p className='bussinessdetailstext' >{selectedBussiness?.bussiness_description}</p>

                            <Divider>  <h3 className="front__text-para" style={{ fontSize: '25px', fontWeight: '700px' }} ><HiGift style={{ marginBottom: '-5px', opacity: '0.8' }} /> {selectedBussiness?.bussiness_discount}% OFF</h3></Divider>
                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_discountdetails}</p>



                            <Divider><h3 className="front__text-header"> <FaMapMarkedAlt style={{ marginBottom: '-5px', opacity: '0.8' }} /> Location</h3> </Divider>

                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_locationdetails}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  <a href={selectedBussiness?.bussiness_directions_url} target={'_blank'} style={{ padding: '0px 10px', fontWeight: '900' }}  >DIRECTIONS  </a> <img width={'25px'} src={'https://cdn-icons-png.flaticon.com/512/355/355980.png'} /></div>
                            <Divider> <h3 className="front__text-header"> <ImClock2 style={{ marginBottom: '-5px', opacity: '0.8' }} /> Trading Hours</h3></Divider>
                            <p className='bussinessdetailstext'>{selectedBussiness?.bussiness_tradinghours}</p>

                            <Divider> <h3 className="front__text-header"><RiCustomerService2Fill style={{ marginBottom: '-5px', marginRight: '7px', opacity: '0.8' }} />Contact</h3></Divider>
                            {selectedBussiness?.bussiness_phonenumber &&<a className='bussinessdetailstext' href={"tel:" + selectedBussiness?.bussiness_phonenumber}> <p><MdPhoneInTalk style={{ marginBottom: '-5px' }} />{selectedBussiness?.bussiness_phonenumber} </p></a>}
                            {selectedBussiness?.bussiness_email && <a className='bussinessdetailstext' href={selectedBussiness?.bussiness_email} >  <p>  <MdEmail />  Email </p></a>}
                            {selectedBussiness?.bussiness_instagram && <a className='bussinessdetailstext' href={selectedBussiness?.bussiness_instagram} >  <p> <RiInstagramFill />  Instagram Page </p></a>}
                            {selectedBussiness?.bussiness_facebook && <a className='bussinessdetailstext' href={selectedBussiness?.bussiness_facebook} >  <p> <FaFacebookSquare />  Facebook Page </p> </a>}
                            {selectedBussiness?.bussiness_website && <a className='bussinessdetailstext' href={selectedBussiness?.bussiness_website} >   <p> <IoPlanet />  Website </p> </a>}

                        </div>
                        <div style={{ marginBottom: '200px' }} ></div>
                    </div>}


            />
        </div>
    )
}

export default BussinessDetailsModal