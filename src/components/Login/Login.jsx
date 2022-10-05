import React, { useState } from 'react'
import {CirclesWithBar} from  'react-loader-spinner'
import {useNavigate} from "react-router-dom"

import styles from "./Login.module.css"
import reg_bg from "./login.png"
import axios from "axios"
import { useRef} from 'react'
import { useFormik } from 'formik';
import * as yup from "yup"
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';

function Login() {
  
   let [Loader,setLoader] = useState(false)
    
   const toast = useRef(null)
   const msgs1 = useRef(null);  
   const navigate = useNavigate() 

   

   React.useEffect(()=>{
    console.log(localStorage.removeItem("token"));
   
   },[])
   

  

   
   
 

  const RegFormik = useFormik({
    initialValues:{
      "Username":"", 
      "Password":""
    }, 
    validationSchema:yup.object({
      Username:yup.string().required("UserName is Required").min(1,"Min Length Should be 1").max(30,"Max Length exceed").trim().matches(/^\S/,"Please Enter Valid Format"), 
      Password:yup.string().required("Password is Required").max(20,"Max length exceeded should be less than 20").trim().matches(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{8,16}$/,"password should contain atleast one uppercase,one digit,one special characters")
    }), 

    onSubmit : (RegFormData)=>{ 
     
      console.log(RegFormData)
      //setLoader(true)
     
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      // axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true'
      

     
     
        axios.post("http://localhost:5000/login",RegFormData).then((response) => {
        console.log(response.data)
        // setCode(response.data.code); 
        //setLoader(false)
        if(response.data.code === '404'){
          toast.current.show({severity: 'error', summary: 'Login Failed', detail: 'Username already exists'});
          msgs1.current.show({severity: 'error', summary: 'Login Failed',detail: 'Failed to register'});  
          setTimeout(2000,()=>{
            navigate("/register")

          })
          
          
        }
        else if (response.data.code === '200'){
           toast.current.show({severity: 'success', summary: 'Succesful Login', detail: 'you are authenticated'});
           msgs1.current.show({severity: 'success', summary: 'Login successful'}); 
           localStorage.setItem("token",response.data.token)
           setLoader(false); 
           navigate("/dashboard")
          
         
        }
        else{
          toast.current.show({severity: 'error', summary: 'Network ERR', detail: 'Server Error'});
          msgs1.current.show({severity: 'error', summary: 'Login Process Failed',detail: 'Failed to process the request'});  
        }
       

        
       
         
        
         
        }); 


      

       
      // toast.current.show({severity: 'success', summary: 'Profile Detail', detail: 'Login Data Successful'});

      // msgs1.current.show({severity: 'success', summary: 'Login Data Submitted', 
      //     detail: 'Login Data Successful'}); 

         

    }
  })

  

  return ( 
   
    <div> 

    

    { Loader === true ?
      <div className={`${styles.loader}`}> 
      <div className={`${styles.loadingbar}`}>
     
       <CirclesWithBar height="100" width="100" color="cyan" wrapperStyle={{}} wrapperClass="" visible={true} outerCircleColor=""/>
      </div>
     </div> :
    
    <div className={`${styles.regdiv}`}> 

   
    <div className={`${styles.navdiv} nav navbar-dark`}>
    <h2 className={`card card-header p-3 m-2 text-center ${styles.tit} bg-light`}>DIGITECH.AI</h2>
    <a href="/"><button type="submit" className="btn btn-dark" >Home</button></a>
    <a href="/register"><button type="submit" className="btn btn-dark" >Register</button></a>
    <a href="/login"><button type="submit" className="btn btn-light" >Login</button></a>

    </div>

    <div className={`${styles.regformdiv} container`}> 
     
    <Toast ref={toast}></Toast>
    <Messages ref={msgs1} /> 
   

     <div className= {`${styles.leftside}`}>
      <img src={reg_bg} alt="hello"/>
     </div>

      <div>
       
         <form onSubmit={RegFormik.handleSubmit} className= {`${styles.formdiv}`}>
           <h2 className= {`${styles.formtitle} text-center card-header`}>Explore Us. Login Here </h2>  

           <div className="form-group">
                <label htmlFor="exampleInputEmail1">User Name</label> 

           <input type="text" className="form-control" id="username" name="Username" autoComplete='off' style={{
             border : RegFormik.errors.Username ? '2px solid red' : '1px solid blue'
           }}
            aria-describedby="emailHelp" onChange={RegFormik.handleChange} value={RegFormik.values.Username} placeholder="Enter your username"/> 
            {
              RegFormik.errors.Username? <h4 id="emailHelp" className="form-text  text-danger card-footer">{RegFormik.errors.Username}</h4>:null 
            }
          
         </div>  



         <div className="form-group">
         <label htmlFor="exampleInputPassword1">Password</label>
         <input type="password" className="form-control" id="password" name="Password" autoComplete='off' style={{
           border : RegFormik.errors.Password ? '2px solid red' : '1px solid blue'
         }}
         onChange={RegFormik.handleChange} value={RegFormik.values.Password} placeholder="Enter your last name"/> 
         {
          RegFormik.errors.Password? <h5 id="emailHelp" className="form-text  text-danger card-footer">{RegFormik.errors.Password}</h5>:null 
         }
       </div>
           

       <button type="submit" className="btn btn-primary">Submit</button>



         </form>
      
         </div> 



    </div>

    <div className={`${styles.footer} nav navbar-dark ${styles.foot}`}>
    
    <h2 className={`card card-footer text-black text-center bg-light`}>KAAR TECHNOLOGIES <h6>copyright@2022</h6></h2>
</div>

   
        

</div> }

  </div>      
        
) 
        
}

export default Login