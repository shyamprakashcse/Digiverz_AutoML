import React, { useState,useRef} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';
import 'primeicons/primeicons.css';
import styles from './Dashboard.module.css' 



function Dashboard() { 

    const navigate = useNavigate()
    const toast = useRef(null)
    const msgs1 = useRef(null);  
    const token = localStorage.getItem("token") 
    let [username,setUsername] = useState("")   
    let copyright = new Date().getFullYear()  
  
    React.useEffect(() => { 


        const  tokenAuth = ()=>{

        axios.defaults.baseURL = 'http://localhost:5000';
        axios.defaults.headers.post['Content-Type'] ='multipart/form-data'
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`} 
        axios.post("http://localhost:5000/Authorization",{}).then((response) => {
          console.log(response.data); 
          setUsername(response.data["username"])
          console.log(username)
          if(response.data["Code"] === "404"){ 
           
            toast.current.show({severity: 'error', summary: 'Authentication Error', detail: 'UnAuthorized User'});
            msgs1.current.show({severity: 'error', summary: 'Authentication Error',detail: 'UnAuthorized User'});  
            
            setInterval(()=>{
              navigate("/login");
            },100); 
  
         
          }
         
        }).catch((err)=>{
          console.log(err); 
          toast.current.show({severity: 'error', summary: 'Error while Authentication', detail: 'Error while Authentication Process'});
          msgs1.current.show({severity: 'error', summary: 'Error while Authentication',detail: 'Error while Authentication'});  
          
          navigate("/login")
         
        })
      };
      
      tokenAuth();
      },[token,navigate,username]);   
  


  // Login 

    function NavigateLogin(){
      navigate("/login")
    }
  // EDA (Exploratory Data Analysis)

    function NavigateEDA(){
      navigate("/edaupload")
    }

    function NavigateEDAHistory(){
      navigate("/history")
    }

  // Retail Regressions 
    function NavigateRetailer(){
      navigate("/retailer")
    }

    function NavigateRetailRegression(){
      navigate("/rmregression")
    }
    

    function NavigateRegressionHistory(){
      navigate("/rmreghistory")
    }

  // Retail Segmentations 

  function NavigateSegmentation(){
    navigate("/rmsegment")
  } 

  // Sales Forecasting Time Series Model . 

  function NavigateSalesForecast(){
    navigate("/salesforecast")
  }

  function NavigateSalesModelBuilder(){
    navigate("/smbuilder")
  }

  function NavigateSalesModelReport(){
    navigate("/salesmodelreport")
  }

  function NavigateForecaster(){
    navigate("/forecaster")
  } 

  function NavigateForecastHistory(){
    navigate("/sfhistory")
  }

  function NavigateAutoML(){
    navigate("/mlalgoanalyser")
  }

  return (
    <div className={`${styles.dash} card-header`}> 
          <Toast ref={toast}></Toast>
          <Messages ref={msgs1} /> 

       <div className={`${styles.dashdiv}`}>
          <h2 className={`${styles.dashhead} card-header  `}>Digiverz.IO</h2> 
          <h3 className={`card-header text-center `}>{"Hi "+username}</h3>
          <button className='btn btn-warning' onClick={NavigateLogin}>Logout</button>
       </div> 

       <div className={`${styles.autoeda} ${styles.sales} card-header`}>

         <h3 className={`${styles.autoedatit} card-header btn `} onClick={NavigateEDA}>Auto EDA(Exploratory Data Analysis) Tools.</h3>  
         <h5 className={`card-header text-center ${styles.edacapt} ${styles.salescap}`}>Upload your file and get the Interactive Live EDA Features.</h5>

         <div className={`${styles.autoedalist}   card-header`}>
            <h3 className={`${styles.autoedabtn} card-header btn btn-warning`} onClick={NavigateEDA}> EDA Uploader</h3>  
            <h3 className={`${styles.autoedabtn} card-header btn btn-warning`} onClick={NavigateEDAHistory}> EDA Past Report History</h3>  
         </div>

    
       </div> 

       <div className={`${styles.autoeda} ${styles.sales} card-header`}>
         <h3 className={`${styles.autoedatit}  card-header btn `} onClick={NavigateSegmentation}> Segmentation and Clustering Machine Learning Tools</h3>  
         <h5 className={`card-header text-center ${styles.edacapt} ${styles.salescap}`}>Segment your customer  pattern in Retailing Sectors.</h5>
         <div className={`${styles.autoedalist} } card-header`}>
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>WCSS Elbow Graph Analysis.</h3>  
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>K Means Model Tuning and Clustering</h3>  
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>Knee Locator Graph Analysis</h3>   
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>K-Distance Graph Analysis</h3>   
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>DBSCAN Hyper Parameter Efficiency Analyser</h3>   
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>DBSCAN Model Tuning and Clustering.</h3>   
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSegmentation}>Gaussian Mixture Model Tuning Clustering</h3>  
            <a href='https://app.powerbi.com/links/NdglqpyXHP?ctid=87a25c2a-2cb4-4c40-9cbc-5268c0ed1eeb&pbi_source=linkShare' className={`${styles.autoedabtn}  card-header btn btn-warning`}>Power BI Dashboard</a>   
            
             
         </div>
       </div>  


        <div className={`${styles.autoeda} ${styles.sales} card-header`}>
            <h3 className={`${styles.autoedatit}  card-header btn `}  onClick={NavigateRetailer}> Regression Machine Learning Tools</h3>  
            <h5 className={`card-header text-center ${styles.edacapt} ${styles.salescap}`}>Predict your sales cost in Retailing Sectors.</h5>
            <div className={`${styles.autoedalist} } card-header`}>
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRetailRegression}>Linear Regression.</h3>  
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRetailRegression}>Lasso Regression</h3>  
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRetailRegression}>Ridge Regression</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRetailRegression}>XGBooster Regression</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRetailRegression}>Random Forest Regressor</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateRegressionHistory}>Regression Saved Reports</h3>   
                <a href='https://app.powerbi.com/links/oVBvHArKcl?ctid=87a25c2a-2cb4-4c40-9cbc-5268c0ed1eeb&pbi_source=linkShare' className={`${styles.autoedabtn}  card-header btn btn-warning`}>Power BI Regression Reports</a>
               
              
              
            </div>
        </div> 


        <div className={`${styles.autoeda} ${styles.sales} card-header`}>
            <h3 className={`${styles.autoedatit}   card-header btn `} onClick={NavigateSalesForecast}>Time Series Forecasting Tools</h3>  
            <h5 className={`card-header text-center ${styles.edacapt} ${styles.salescap}`}>Predict your sales using Trend Analysis.</h5>
            <div className={`${styles.autoedalist} } card-header`}>
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Sales Forecasting Zoomer</h3>  
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Resampling the trend</h3>  
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Moving Average</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Cummulative Moving Average</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Exponential Weighted Moving Average</h3>
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesForecast}>Time Series Algorithm Analyser</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelBuilder}>ARIMA Prediction</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelBuilder}>SARIMA Prediction</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelBuilder}>AR Prediction</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelReport}>Seasonality Test Report</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelReport}>Augmented Dickey Fuller Test Report</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelReport}>Partial Auto Correlation.</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateSalesModelReport}>Auto Correlation</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateForecaster}>Sales Forecaster</h3>   
                <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateForecastHistory}>Forecasting History Report</h3>   
                   
                <a href='https://app.powerbi.com/links/X9qb9yCTzg?ctid=87a25c2a-2cb4-4c40-9cbc-5268c0ed1eeb&pbi_source=linkShare&bookmarkGuid=899c7749-970c-461a-b299-cf359337c806' className={`${styles.autoedabtn}  card-header btn btn-warning`}>Power BI Dashboard Report</a>
          
            
               
          
            </div>
        </div> 

        <div className={`${styles.autoeda} ${styles.sales} card-header`}>
        <h3 className={`${styles.autoedatit}   card-header btn `} onClick={NavigateAutoML}>Auto Machine Learning Algorithm Analyser </h3>  
        
        <h5 className={`card-header text-center ${styles.edacapt} ${styles.salescap}`}>Upload your dataset and get the comparision charts</h5>
        <div className={`${styles.autoedalist} } card-header`}>
            
             {/*<h1 className={`${styles.warning} card-header `} id="warning">Under Construction . Product will be released soon.</h1>*/}
            <h3 className={`${styles.autoedabtn}  card-header btn btn-warning`} onClick={NavigateAutoML}>AutoML Regression</h3>  
           
             
           
      
        </div>
    </div> 

        <div>
            <h3 className={`${styles.copyright} text-center card-footer`}>Digiverz KAAR Techologies Pvt Limited CopyRight @ {" " +copyright}</h3>
       </div>


    </div>
  )
}

export default Dashboard