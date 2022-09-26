import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';


function BussinessCard({ bussiness, setSelectedBussiness, setBussinessDetailsModal }) {

    const [bgLoaded, setBgLoaded] = useState(false)
    const [profileLoaded, setProfileLoaded] = useState(false)
    return (
        <div style={{marginInline:'20px'}}>
            <div className="outer-div">
                <div className="inner-div">
                    <div className="front">

                        <img className="front__bkg-photo animate__animated animate__fadeIn" style={{ cursor: 'pointer', display: bgLoaded ? 'block' : 'none' }}  src={process.env.REACT_APP_HOST+ '/api/image/' + bussiness?.bussiness_cover_image_urls[bussiness?.bussiness_cover_image_urls?.length - 1]} onLoad={()=>setBgLoaded(true)} />
                        {(!bgLoaded) && <Skeleton variant="rectangular" width={400} height={250} />}
                        <img className="front__face-photo animate__animated animate__fadeIn" style={{ cursor: 'pointer', display: profileLoaded ? 'block' : 'none' }} src={process.env.REACT_APP_HOST+ '/api/image/' + bussiness?.bussiness_profile_image_url} onLoad={()=>setProfileLoaded(true)} />
                        {!profileLoaded &&  <Skeleton variant="circular" width={90} height={90} className="front__face-photo" />}
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
}

export default BussinessCard