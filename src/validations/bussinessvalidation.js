import * as yup from 'yup';


export const bussinessSchema = yup.object().shape({
    bussiness_name: yup.string().required('Bussiness Name is required*'),
    bussiness_city: yup.string().required('City is required*'),
    bussiness_area: yup.string().required('Area is required*'),
    bussiness_discount: yup.string().required('Discount Amount is required*'),
    bussiness_cuisine: yup.string().required('Cuisine is required*'),
    bussiness_description: yup.string().required('Bussiness Description is required*'),
    bussiness_discountdetails: yup.string().required('Discount Details are required*'),
    bussiness_phonenumber: yup.string().required('Phone Number is required*'),
    bussiness_locationdetails: yup.string().required('Location Details are required*'),
    bussiness_tradinghours: yup.string().required('Trading Hours are required*'),
  //  bussiness_cover_image_urls: yup.array().required('Cover Images Are required*').min(1,'Cover Images Are required*'),
   // bussiness_profile_image_url: yup.string().nullable().required('Profile Image is required*'),
    bussiness_directions_url: yup.string()
});





