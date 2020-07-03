import Axios from 'axios';
import {URL} from '../config/path';
export function receiveddata(data){

    return Axios.post(`${URL}storeddata`,data);  //jo bhi data  form se aaya usko humne storeddata m store kr diya aur iss receiveddata
                                                // waale func ko import kr diya login.js m. 
}

export function changepass(data){

    return Axios.post(`${URL}changepassword`,data);  //jo bhi data  form se aaya usko humne changepassword m store kr diya aur iss changepass
                                                // waale func ko import kr diya ChangePass.js m. 
}

//Category API's
export function addCategory(data){

    return Axios.post(`${URL}categorydata`,data);  //jo bhi data  form se aaya usko humne changepassword m store kr diya aur iss changepass
                                                // waale func ko import kr diya ChangePass.js m. 
}

export function editCategoryWithImage(data){

    return Axios.post(`${URL}editcategorydatawithimage`,data);   
}

export function editCategoryWithoutImage(data){

    return Axios.post(`${URL}editcategorydatawithoutimage`,data);  
}

export function getCategory(){                     //yeh getCategory ka koi parameter nhi hoga

    return Axios.get(`${URL}getcategorydata`);
}

//Editcat waali api h yeh
export function getCategoryById(cid){                     //yeh getCategoryById toh hoga hi aur jo cid hamare url se aai thhi usko bhi yahan use kiya h

    return Axios.get(`${URL}getcategorydata/${cid}`);
}

export function deleteCategory(cid,image){                     

    return Axios.get(`${URL}deletecategorydata/${cid}/${image}`);
}

//Products API's

export function addproducts(data){
    return Axios.post(`${URL}productdata`,data);
}

export function getproducts(){
    return Axios.get(`${URL}getproductsdata`);
}

export function delproducts(pid){
    return Axios.get(`${URL}delproductsdata/${pid}`);
}

export function getproductsbyid(pid){               //for displaying the data on the form
    return Axios.get(`${URL}getproductsdata/${pid}`);
}


export function editproductswithimage(data){
    return Axios.post(`${URL}editproductsdatawithimage`,data);
}

export function editproductswithoutimage(data){
    return Axios.post(`${URL}editproductsdatawithoutimage`,data);
}