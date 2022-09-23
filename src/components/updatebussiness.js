import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import { RiInstagramFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { ref, uploadBytes, getDownloadURL, listAll, list, } from "firebase/storage";
import { IoPlanet } from 'react-icons/io5'
import { storage } from "../firebase-config";
import { FaFacebookSquare } from 'react-icons/fa'
import { SiAddthis } from 'react-icons/si'
import { GrMapLocation } from 'react-icons/gr'
import { RiFlag2Fill } from 'react-icons/ri'
import { IoLocationSharp } from 'react-icons/io5'
import { MdOutlineFoodBank } from 'react-icons/md'
import { TbShoppingCartDiscount } from 'react-icons/tb'
import { BiDetail } from 'react-icons/bi'
import { AiFillPhone } from 'react-icons/ai'
import { BsFillMoonFill } from 'react-icons/bs'
import { SiGooglestreetview } from 'react-icons/si'
import { FaCity } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import { bussinessSchema } from '../validations/bussinessvalidation';
import { AiFillEdit } from 'react-icons/ai'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function UpdateBussiness({ bussinesses, setBussinesses, selectedEditBussiness }) {


  const [bussiness_name, setBussinessName] = useState('');
  const [bussiness_city, setBussinessCity] = useState('');
  const [bussiness_area, setBussinessArea] = useState('');
  const [bussiness_discount, setBussinessDiscount] = useState(0);
  const [bussiness_cuisine, setBussinessCuisine] = useState('');
  const [bussiness_description, setBussinessDescription] = useState('');
  const [bussiness_discountdetails, setBussinessDiscountDetails] = useState('');
  const [bussiness_phonenumber, setBussinessPhoneNumber] = useState('');
  const [bussiness_locationdetails, setBussinessLocationDetails] = useState('');
  const [bussiness_tradinghours, setBussinessTradingHours] = useState('');
  const [bussiness_directions_url, setBussinessDirectionsUrl] = useState('');
  const [bussiness_instagram, setBussinessInstagram] = useState('');
  const [bussiness_website, setBussinessWebsite] = useState('');
  const [bussiness_facebook, setBussinessFacebook] = useState('');
  const [bussiness_email, setBussinessEmail] = useState('');
  const [bussiness_approved, setBussinessApproved] = useState(false);
  const [bussiness_cover_image_urls, setCoverImageUrls] = useState([]);
  const [bussiness_profile_image_url, setProfileImageUrl] = useState(null);

  //show selected bussiness data in in form fields
  const [numberOfInitialCoverImages, setNumberOfInitialCoverImages] = useState(0);
  useEffect(() => {
    if (!selectedEditBussiness) return;

    setBussinessName(selectedEditBussiness.bussiness_name)
    setBussinessCity(selectedEditBussiness.bussiness_city)
    setBussinessArea(selectedEditBussiness.bussiness_area)
    setBussinessDiscount(selectedEditBussiness.bussiness_discount)
    setBussinessCuisine(selectedEditBussiness.bussiness_cuisine)
    setBussinessDescription(selectedEditBussiness.bussiness_description)
    setBussinessDiscountDetails(selectedEditBussiness.bussiness_discountdetails)
    setBussinessPhoneNumber(selectedEditBussiness.bussiness_phonenumber)
    setBussinessLocationDetails(selectedEditBussiness.bussiness_locationdetails)
    setBussinessTradingHours(selectedEditBussiness.bussiness_tradinghours)
    setBussinessDirectionsUrl(selectedEditBussiness.bussiness_directions_url)
    setBussinessInstagram(selectedEditBussiness.bussiness_instagram)
    setBussinessWebsite(selectedEditBussiness.bussiness_website)
    setBussinessFacebook(selectedEditBussiness.bussiness_facebook)
    setBussinessEmail(selectedEditBussiness.bussiness_email)

    //setSubmittedCoverImagesForShow(selectedEditBussiness.bussiness_cover_image_urls)
    setProfileImageUrl(selectedEditBussiness.bussiness_profile_image_url)
    setCoverImageUrls(selectedEditBussiness.bussiness_cover_image_urls || [])
    setBussinessApproved(selectedEditBussiness.bussiness_approved)
    setNumberOfInitialCoverImages(selectedEditBussiness.bussiness_cover_image_urls?.length || 0)
  }, [selectedEditBussiness])



  const [uploadLoading, setUploadLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const ValidateData = async () => {
    setValidationError(null);
    let data = {
      bussiness_name,
      bussiness_city,
      bussiness_area,
      bussiness_discount,
      bussiness_cuisine,
      bussiness_description,
      bussiness_discountdetails,
      bussiness_phonenumber,
      bussiness_locationdetails,
      bussiness_tradinghours,
     // bussiness_cover_image_urls:  bussiness_cover_image_urls ,
     // bussiness_profile_image_url: submittedProfileImageForUpload || bussiness_profile_image_url,
      bussiness_directions_url,
    }

    //Validate before allowing user to submit (upload and update)
    bussinessSchema.validate(data).then((valid) => {
      console.log('valid');
      setValidationError(null);
      setUploadLoading(true);
      //if validation passes, upload images 
      UploadProfilePhoto();
      UploadCoverPhotos();

    }).catch((err) => {
      console.log('err', err.errors[0])
      setValidationError(err.errors[0])

    })
    return (!validationError?.length);
  }


  //Submit  cover photos files 
  const [submittedCoverImagesForShow, setSubmittedCoverImagesForShow] = useState([]);
  const [submittedCoverImagesForUpload, setSubmittedCoverImagesForUpload] = useState([]);

  const onSelectCoverImagesFiles = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    setSubmittedCoverImagesForUpload(selectedFilesArray)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSubmittedCoverImagesForShow((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };


  //Upload Profile Photo
  const [submittedProfileImageForUpload, setSubmittedProfileImageForUpload] = useState(null);
  const UploadProfilePhoto = () => {
    if (submittedProfileImageForUpload == null) { setProfileUploadFinished(true); return; }

    const imageRef = ref(storage, `images/bussiness_profile_photo/${submittedProfileImageForUpload.name + bussiness_name}`);
    uploadBytes(imageRef, submittedProfileImageForUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileImageUrl(url);
        setProfileUploadFinished(true);
      });
    });
  };



  //Upload Cover Photos
  const UploadCoverPhotos = () => {
    if (submittedCoverImagesForUpload?.length < 1) { UpdateSameBussiness(); return };

    setUploadLoading(true)
    submittedCoverImagesForUpload.map((image) => {
      const imageRef = ref(storage, `images/bussiness_cover_photo/${image.name + bussiness_name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setCoverImageUrls(bussiness_cover_image_urls => [...bussiness_cover_image_urls, url]);
        });
      });
    })


  };

  function deleteSubmittedCoverPhoto(image, submittedCoverImagesForShow) {
    setSubmittedCoverImagesForShow(submittedCoverImagesForShow.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }
  console.log({ submittedCoverImagesForUpload })

  const [snackBarMessage, setSnackBarMessage] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  //check if upload finished so we update bussiness 

  const [coverUploadFinished, setCoverUploadFinished] = useState(false);
  const [profileUploadFinished, setProfileUploadFinished] = useState(false);

  //profile photos directly from upload function


  //cover photos
  useEffect(() => {
    if ((numberOfInitialCoverImages + submittedCoverImagesForUpload?.length) == bussiness_cover_image_urls?.length) {
      setCoverUploadFinished(true);
    }
    if ((numberOfInitialCoverImages + submittedCoverImagesForUpload?.length) !== bussiness_cover_image_urls?.length) {
      setCoverUploadFinished(false);
    }
  },[bussiness_cover_image_urls,submittedCoverImagesForUpload])


  console.log({ profileUploadFinished })
  console.log({ coverUploadFinished })
  console.log({ numberOfInitialCoverImages })

  //update bussiness
  useEffect(() => {
    if (coverUploadFinished && profileUploadFinished) {
      UpdateSameBussiness();
    }
  }, [coverUploadFinished, profileUploadFinished])


  const UpdateSameBussiness = async () => {
    if (!bussiness_cover_image_urls || !bussiness_profile_image_url) {console.log('upading bussinesss canceled !!'); return};
console.log('START updating bussinesss !!');
    try {
      const body = {
        bussiness_name,
        bussiness_city,
        bussiness_area,
        bussiness_discount,
        bussiness_cuisine,
        bussiness_description,
        bussiness_discountdetails,
        bussiness_phonenumber,
        bussiness_locationdetails,
        bussiness_tradinghours,
        bussiness_cover_image_urls,
        bussiness_profile_image_url,
        bussiness_directions_url,
        bussiness_instagram,
        bussiness_website,
        bussiness_facebook,
        bussiness_email,
        bussiness_approved

      };
      const response = await fetch(process.env.REACT_APP_HOST + "/api/bussiness/" + selectedEditBussiness?.bussiness_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const jsonData = await response.json();
      //setBussinesses([...jsonData, ...bussinesses  ]);
      console.log('success !!')
      setUploadLoading(false)
      setSnackBarMessage('Bussiness Updated  Successfully')
      setSnackBarOpen(true)
     setTimeout(()=>{window.location.reload();}, 100)  
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      setUploadLoading(false)
      setSnackBarMessage('Error While Updating Bussiness')
      setSnackBarOpen(true)
    }

  };

  const handleApprovalSwitch = (event) => {
    setBussinessApproved(event.target.checked);
  };

  console.log({ bussiness_cover_image_urls })


//delete an uploaded cover photo
const deleteUploadedCoverPhoto = (image) => {
  setCoverImageUrls(bussiness_cover_image_urls => bussiness_cover_image_urls.filter((e) => e !== image));
  //UpdateBussinessField(bussiness_cover_image_urls, 'bussiness_cover_image_urls', selectedEditBussiness?.bussiness_id)

}

console.log({bussiness_cover_image_urls})

  //update bussiness 
  const UpdateBussinessField = async (value, column, id) => {

    try {
      const body = {
       value,
       column

      };
      const response = await fetch(process.env.REACT_APP_HOST + "/api/bussiness/one/" +  id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const jsonData = await response.json();
      setSnackBarMessage('Success')
      setSnackBarOpen(true)
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
      setSnackBarMessage('Something Went Wrong')
      setSnackBarOpen(true)
    }

  };
  return (
    <div>

      <h1>Approve and Update Bussinesses</h1>

      <div className="AddBussinessContainer">
        <div className="AddBussinessInputs">

          <FormControlLabel control={<Switch checked={bussiness_approved}
            onChange={handleApprovalSwitch}
            inputProps={{ 'aria-label': 'controlled' }} />} label="Approve Bussiness (Publish)" />


          <TextField error={validationError?.includes('Bussiness Name')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Bussiness Name" InputProps={{ startAdornment: (<InputAdornment position="start"> <RiFlag2Fill /> </InputAdornment>), }} value={bussiness_name} onChange={(e) => setBussinessName(e.target.value)} />
          <TextField error={validationError?.includes('Bussiness Description')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Bussiness Description : Talk About Your Bussiness " multiline rows={4} value={bussiness_description} onChange={(e) => setBussinessDescription(e.target.value)} />
          <TextField error={validationError?.includes('Discount Amount')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Discount Number (e.g. 25 ) " InputProps={{ startAdornment: (<InputAdornment position="start" ><TbShoppingCartDiscount /> </InputAdornment>), endAdornment: <InputAdornment position="end">%</InputAdornment> }} style={{ maxWidth: '200px' }} value={bussiness_discount} onChange={(e) => setBussinessDiscount(e.target.value)} />
          <TextField error={validationError?.includes('Discount Details')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Discount Details : What Do you Exactly Offer ?" multiline rows={4} value={bussiness_discountdetails} onChange={(e) => setBussinessDiscountDetails(e.target.value)} />
          <TextField error={validationError?.includes('City')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="City (e.i. Larnaca City)" InputProps={{ startAdornment: (<InputAdornment position="start"> <FaCity /> </InputAdornment>), }} value={bussiness_city} onChange={(e) => setBussinessCity(e.target.value)} />
          <TextField error={validationError?.includes('Area')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Area (e.i City Center)" InputProps={{ startAdornment: (<InputAdornment position="start"> <IoLocationSharp /> </InputAdornment>), }} value={bussiness_area} onChange={(e) => setBussinessArea(e.target.value)} />
          <TextField error={validationError?.includes('Location Details')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Location Details : Full Adresse" multiline rows={4} value={bussiness_locationdetails} onChange={(e) => setBussinessLocationDetails(e.target.value)} />
          <TextField error={validationError?.includes('Cuisine')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Cuisine/Category (e.i Asian, Steak)" InputProps={{ startAdornment: (<InputAdornment position="start"> <MdOutlineFoodBank /> </InputAdornment>), }} value={bussiness_cuisine} onChange={(e) => setBussinessCuisine(e.target.value)} />
          <TextField error={validationError?.includes('Trading Hours')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Trading Hours Details (e.i Open: Daily 11:00 am - 5:00 pm)" value={bussiness_tradinghours} InputProps={{ startAdornment: (<InputAdornment position="start"> <BsFillMoonFill /> </InputAdornment>), }} onChange={(e) => setBussinessTradingHours(e.target.value)} />
          <TextField className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Google Maps Directions URL" value={bussiness_directions_url} InputProps={{ startAdornment: (<InputAdornment position="start"> <SiGooglestreetview /> </InputAdornment>), }} onChange={(e) => setBussinessDirectionsUrl(e.target.value)} />

          <TextField error={validationError?.includes('Phone Number')} required className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Phone Number" InputProps={{ startAdornment: (<InputAdornment position="start"> <AiFillPhone /> </InputAdornment>), }} value={bussiness_phonenumber} onChange={(e) => setBussinessPhoneNumber(e.target.value)} />
          <TextField className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Email" InputProps={{ startAdornment: (<InputAdornment position="start"> <MdEmail /> </InputAdornment>), }} value={bussiness_email} onChange={(e) => setBussinessEmail(e.target.value)} />
          <TextField className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Instagram Page" InputProps={{ startAdornment: (<InputAdornment position="start"> <RiInstagramFill /> </InputAdornment>), }} value={bussiness_instagram} onChange={(e) => setBussinessInstagram(e.target.value)} />
          <TextField className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Facebook Page" InputProps={{ startAdornment: (<InputAdornment position="start"> <FaFacebookSquare /> </InputAdornment>), }} value={bussiness_facebook} onChange={(e) => setBussinessFacebook(e.target.value)} />
          <TextField className='addBussinessInputItem' id="outlined-basic" variant="outlined" label="Website Link" InputProps={{ startAdornment: (<InputAdornment position="start"> <IoPlanet /> </InputAdornment>), }} value={bussiness_website} onChange={(e) => setBussinessWebsite(e.target.value)} />

          <Divider style={{ backgorund: 'grey', marginBlock: '20px', width: '70%' }} />



          <div className="uploadPhotos">
            <label>
              + Add Multiple <b> Cover </b> Images *
              <br />
              <span>up to 10 images</span>
              <input
                type="file"
                name="images"
                multiple
                onChange={(event) => { onSelectCoverImagesFiles(event) }}
                accept="image/png , image/jpeg, image/webp"
              />
            </label>
            <br />
          </div>
          <i>submitted cover images </i>
          {(submittedCoverImagesForShow?.length > 0) && <div style={{ display: 'flex', backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', margin: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {submittedCoverImagesForShow.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img style={{ borderRadius: '20px' }} src={image} height="120" alt="upload" />
                    <button style={{ marginTop: '-7px' }} onClick={() => deleteSubmittedCoverPhoto(image, submittedCoverImagesForShow)}>
                      X
                    </button>
                  </div>
                );
              })}</div>
          </div>}
          <div>{!(submittedCoverImagesForShow?.length > 0) && <h3 style={{ opacity: '0.5' }} >NONE</h3>}</div>

          <i>uploaded cover images </i>
          {(bussiness_cover_image_urls?.length > 0) && <div style={{ display: 'flex', backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', margin: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {bussiness_cover_image_urls.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img style={{ borderRadius: '20px' }} src={image} height="120" alt="upload" />
                    <button style={{ marginTop: '-7px' }} onClick={() => { deleteUploadedCoverPhoto(image) }}>
                      X
                    </button>
                  </div>
                );
              })}</div>
          </div>}
          <div>{!(bussiness_cover_image_urls?.length > 0) && <h3 style={{ opacity: '0.5' }} >NONE</h3>}</div>



          <Divider style={{ backgorund: 'grey', marginBlock: '20px', width: '70%' }} />

          <div className="uploadPhotos">
            <label>
              {!submittedProfileImageForUpload && <div>  + Add One <b> Profile </b> Image *</div>}
              {submittedProfileImageForUpload && <div>  Change <b> Profile </b> Image *</div>}
              <br />
              <span>only 1 image</span>
              <input
                type="file"
                name="images"

                onChange={(event) => {
                  setSubmittedProfileImageForUpload(event.target.files[0]);
                }}

                accept="image/png , image/jpeg, image/webp"
              />
            </label>
            <br />
          </div>
          <i>submitted profile image  </i>
          {(submittedProfileImageForUpload) && <div style={{ display: 'flex', backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', margin: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>


            <div className="image">
              <img style={{ borderRadius: '100%' }} src={URL.createObjectURL(submittedProfileImageForUpload)} height="120" width='120' alt="upload" />
              {/* <button onClick={() => deleteSubmittedCoverPhoto(image, submittedCoverImagesForShow)}>
                  X
                </button> */}
            </div>


          </div>}
          <div>{!submittedProfileImageForUpload && <h3 style={{ opacity: '0.5' }} >NONE</h3>}</div>


          <i>uploaded profile image </i>
          {(bussiness_profile_image_url) && <div style={{ display: 'flex', backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '10px', margin: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>


            <div className="image">
              <img style={{ borderRadius: '100%' }} src={bussiness_profile_image_url} height="120" width='120' alt="upload" />
              {/* <button onClick={() => deleteSubmittedCoverPhoto(image, submittedCoverImagesForShow)}>
                  X
                </button> */}
            </div>


          </div>}
          {/* <Divider style={{ backgorund: 'grey', marginBlock: '20px', width: '70%' }} /> */}
          <div>{!bussiness_profile_image_url && <h3 style={{ opacity: '0.5' }} >NONE</h3>}</div>

          {validationError && <div className="validationErrors">

            <div className="validationError">
              {validationError}
            </div>
          </div>}
        </div>


        <LoadingButton
          size='large'
          onClick={() => { ValidateData() }}
          endIcon={<AiFillEdit />}
          loading={uploadLoading}
          loadingPosition="end"
          variant="contained"
          color="warning"
          disabled={!selectedEditBussiness}
          style={{ fontSize: '20px', fontFamily: 'Crimson Pro', marginBottom: '100px', marginInline: '10px' }}
        >
          Update Bussiness
        </LoadingButton>


      </div>


      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() => { setSnackBarOpen(false) }}
        message={snackBarMessage}

      />

    </div>
  )
}

export default UpdateBussiness