
import React from 'react'
import { GiPalmTree } from 'react-icons/gi';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function HomepageCard({UpdateMainPrivilegeCard, userID,cardAvailable}) {
  return (
    <div class="homepagecard">
<GiPalmTree style={{color: 'white', fontSize: '50px', marginTop: '10px'}} />
        <div style={{color: 'white', fontSize: '25px', marginTop: '-5px'}}>LOGO</div>
        <h3 style={{color: 'white',marginTop: '33px'}}>Digital Discount Card</h3>
        <div style={{color: 'white',marginTop: '0px',marginBottom:'30px', fontSize:'15px', lineHeight:'23px'}}>Get a percentage off anything you buy from out partners and improve your shopping experience</div>
        <Divider style={{background:'white', width:'70%', margin:'auto'}} ></Divider>
        <h2 style={{color: 'white',fontWeight: '900'}}>DON'T MISS OUT</h2>
        <Button variant="contained" style={{width:'70%', color:'black', background:'white', borderRadius:'10px'}} onClick={()=>{UpdateMainPrivilegeCard(userID, true)}}  >Buy Now</Button>
        <div style={{color: 'white',fontSize: '17px', opacity:'0.8', marginTop:'13px'}}>Each card is valid for 1 Month</div>

    </div>
  )
}

export default HomepageCard