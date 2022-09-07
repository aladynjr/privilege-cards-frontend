import React from 'react'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';


function BussinessCard({bussiness, setSelectedBussiness,setBussinessDetailsModal}) {
  return (
    <div>
                                    <div className="outer-div">
                                <div className="inner-div">
                                    <div className="front">

                                        <img className="front__bkg-photo" style={{ cursor: 'pointer' }} src={bussiness?.bussiness_cover_image_url || bussiness?.bussiness_cover_image_urls[bussiness?.bussiness_cover_image_urls?.length-1]} />

                                        <img className="front__face-photo" style={{ cursor: 'pointer' }} src={bussiness?.bussiness_profile_image_url } />

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