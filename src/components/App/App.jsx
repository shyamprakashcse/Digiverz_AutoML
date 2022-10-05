import React from 'react'
import Home from "../Home/Home"
import Register from "../Register/Register"
import Login from "../Login/Login"
import { Route,Routes } from 'react-router-dom'
import "./App.css"
import Uploader from '../EDA_Uploader/Uploader'
import ReportHistory from '../ReportHistory/ReportHistory'
import SalesForecast from '../SalesForecast/SalesForecast'
import SalesModelReport from '../SalesModelReport/SalesModelReport'
import SalesModelBuilder from '../SalesModelBuilder/SalesModelBuilder'
import SalesForcastBrain from '../SalesForcastBrain/SalesForcastBrain'
import SFReportHistory from '../SFReportHistory/SFReportHistory'
import Retailer from '../Retailer/Retailer'
import RetailSegmentation from '../Retail_Segmentation/RetailSegmentation'
import RetailRegression from '../Retail_Regression/RetailRegression'
import RetailRegressionHistory from '../RetailRegressionHistory/RetailRegressionHistory' 
import Dashboard from '../Dashboard/Dashboard'
import MLAlgoAnalyser from '../MLAlgoAnalyser/MLAlgoAnalyser'
function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/edaupload' element={<Uploader/>}></Route>
      <Route path='/history' element={<ReportHistory/>}></Route>
      <Route path='/salesforecast' element={<SalesForecast/>}></Route>
      <Route path='/salesmodelreport' element={<SalesModelReport/>}></Route> 
      <Route path='/smbuilder' element={<SalesModelBuilder/>}></Route> 
      <Route path='/forecaster' element={<SalesForcastBrain/>}></Route>
      <Route path='/sfhistory' element={<SFReportHistory/>}></Route> 
      <Route path='/retailer' element={<Retailer/>}></Route>
      <Route path='/rmsegment' element={<RetailSegmentation/>}></Route> 
      <Route path='/rmregression' element={<RetailRegression/>}></Route> 
      <Route path='/rmreghistory' element={<RetailRegressionHistory/>}></Route>  
      <Route path='/mlalgoanalyser' element={<MLAlgoAnalyser/>}></Route>  
      
      <Route path='/dashboard' element={<Dashboard/>}></Route> 
      
      
    </Routes>
    
    </div>
  )
}

export default App