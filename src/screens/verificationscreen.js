import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { BsFillPlayFill } from 'react-icons/bs'
import LoadingButton from '@mui/lab/LoadingButton';
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiFillCloseSquare } from 'react-icons/ai'
import Divider from '@mui/material/Divider';

function VerificationScreen() {

    const [bussinesses, setBussinesses] = useState(null);
    const [bussinessesLabel, setBussinessesLabel] = useState([]);
    const getBussinesses = async () => {
        try {
            const response = await fetch("https://privilege-cards-backend.fly.dev/api/bussiness");
            const jsonData = await response.json();

            setBussinesses(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // useEffect(() => {
    //     getBussinesses();
    // }, []);

    useEffect(() => {

        bussinesses?.map((bussiness) => {
            setBussinessesLabel(bussinessesLabel => [...bussinessesLabel, { label: bussiness.bussiness_name, id: bussiness.bussiness_id }])

        })

    }, [bussinesses?.length])



    const [selectedBussiness, setSelectedBussiness] = useState('')
    const [cards, setCards] = useState([])
    console.log(cards)
    const GetBussinessPrivilegeCards = async (id) => {
        setCards([])

        try {
            const response = await fetch(`https://privilege-cards-backend.fly.dev/api/privilege_card/bussiness/${id}`);
            const jsonData = await response.json();

            setCards(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const [cardID, setCardID] = useState('');
    const [card, setCard] = useState(null)
    const [checking, setChecking] = useState(false)

    const GetCard = async (id) => {
        setChecking(true);
        setCard(null)

        try {
            const response = await fetch(`https://privilege-cards-backend.fly.dev/api/privilege_card/${id}`);
            const jsonData = await response.json();

            setCard(jsonData);
            setChecking(false)

        } catch (err) {
            console.error(err.message);
            setChecking(false)

        }


    
    };
    console.log(card)

    var regExp = /[a-zA-Z]/g;

    const [result, setResult] = useState('')
    useEffect(()=>{
        if(!cardID || checking) return;
        if(card && (new Date().toLocaleString('default', { weekday: 'long' })==new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleString('default', { weekday: 'long' }))){
            setResult('valid');
        }
        if(card && !(new Date().toLocaleString('default', { weekday: 'long' })==new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleString('default', { weekday: 'long' }))){
            setResult('warning')
        }
        if(!card){
            setResult('invalid');
        }
    },[checking])

    return (
        <div>
            <h1>Verify Card</h1>
            <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', margin: '0 auto', width: 'fit-content'}} ><div><BsFillCheckCircleFill style={{color:'limegreen'}} /> : Card Exists and is New </div> <div><BsFillCheckCircleFill style={{color:'yellow'}} /> : Card Made On Different Day </div> <div> <AiFillCloseSquare style={{color:'red'}} /> : Card Does Not Exist  </div>  </div>
            <div className='searchcard'>
                <TextField variant="outlined" label="Card ID Number (Numbers Only*)" value={cardID} onChange={(e) => {if(/^[0-9\b]+$/.test(e.target.value) || (e.target.value =='')){setCardID(e.target.value)}}} />
                <LoadingButton style={{ marginTop: '30px' }} variant="contained" onClick={() => { if (parseInt(cardID, 10)) { GetCard(parseInt(cardID, 10)) } }} loading={checking} loadingPosition="end" endIcon={<BsFillPlayFill />} >Check Card</LoadingButton>

                {result=='valid' && <BsFillCheckCircleFill style={{ fontSize: '80px', color: 'limegreen', marginTop: '28px' }} className='animate__animated animate__heartBeat' />}
                {(result=='warning' ) && <BsFillCheckCircleFill style={{ fontSize: '80px', color: 'yellow', marginTop: '28px' }} className='animate__animated animate__heartBeat' />}

                
                {(result=='invalid' ) && <AiFillCloseSquare style={{ fontSize: '80px', color: 'red', marginTop: '28px' }} className='animate__animated animate__wobble' />}

            </div>

            {(result && card) && <div className="searchcard ticketlook animate__animated animate__fadeInDown" style={{height:'fit-content'}}>
                <img width={'40px'} style={{ cursor: 'pointer', marginTop: '33px' }} src={'https://avatars.dicebear.com/api/identicon/' + String(card?.privilege_card_id).padStart(4, '0') + '.svg?mood[]=happy'} />
                <b style={{ fontSize: '25px', opacity: '0.9' }} >{String(card?.privilege_card_id).padStart(4, '0')}</b>
                <Divider style={{ width: '70%',  marginBlock: '10px' }} />
                <p>Name :<b style={{ color: '#d83565' }} > {card?.app_user_name}</b></p>
                <p>Time : <b style={{ color: '#d83565' }} >{new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</b></p>
                <p>Date :  <b style={{ color: '#d83565' }} >{new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleString('default', { weekday: 'long' })} -  {new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).getDate()}th  {new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleString('default', { month: 'long' })} -  {new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).getFullYear()}</b></p>
                <p>Discount :<b style={{ color: '#d83565' }} > {card?.privilege_card_discount}%</b></p>
                <Divider style={{ width: '70%',  marginBlock: '10px' }} />
                <p>Venue :<b style={{ color: '#d83565' }} > {card?.bussiness_name}</b></p>


            </div>}

            {/* <div className='searchcard'>


                {bussinessesLabel?.length > 0 && <div style={{ display: 'flex', margin: '0 auto', flexDirection: 'column', alignItems: 'center' }} >

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={bussinessesLabel}
                        value={selectedBussiness}
                        onChange={(event, newValue) => {
                            setSelectedBussiness(newValue);
                        }}
                        sx={{ width: 280 }}
                        renderInput={(params) => <TextField {...params} label="Name Of Venue" />}
                    />

                    <Button style={{ marginTop: '30px' }} variant="contained" onClick={() => { GetBussinessPrivilegeCards(selectedBussiness?.id) }} >Get Customers Cards</Button>
                </div>}
                <div>
                    {cards?.map((card, i) => {
                        return (
                            <div key={i}>
                                <h1>Card</h1>
                                <p>{card?.app_user_name}</p>
                                <p>{card?.privilege_card_discount}</p>
                                <p>{new Date(card?.privilege_card_creation_time?.replace(' ', 'T')).toLocaleString()}</p>


                            </div>

                        )
                    })}
                </div>
            </div> */}
        </div>
    )
}

export default VerificationScreen