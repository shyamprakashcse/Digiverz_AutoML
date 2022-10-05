import React, { useState,useRef} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';
import { Dropdown } from 'primereact/dropdown'; 
import {CirclesWithBar} from  'react-loader-spinner'
import styles from "./MLAlgoAnalyser.module.css"


function MLAlgoAnalyser() { 

    const [file,setFile] = useState(null)
    let [Loader,setLoader] = useState(false); 
    let [AnalyseLoader,SetAnalyseLoader] = useState(false)
   
    const navigate = useNavigate()
    const toast = useRef(null)
    const msgs1 = useRef(null);  
    const token = localStorage.getItem("token") 
    let [username,setUsername] = useState("") 
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        
      },
    };

    // force update 
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    // Basic EDA
    
    let [EDA,SetEDA] = useState(null) 
    let [ColNames,SetColNames] = useState([])
    let [ShowEDA,SetShowEDA] = useState(false)  

    // DropDown 

    let dtypes = ["No Change","Int","Float","String"]
    let [dtypeRule,SetdtypeRule] = useState([])

    let nullval = ["Drop","Mean","Median","Mode"]
    let [NullRules,SetNullRules] = useState([]) 

    let scalar = ["No Scaling","MinMax","Standard","Robust"] 
    let [ScaleDrop,SetScaleDrop] = useState("") 

    let [TargetDrop,SetTargetDrop] = useState("") 
    let [Models,SetModels] = useState("")
    let models = ["Regression","Classification"] 

    // Auto ML Efficiency 

    let [AutoMLAlgo,SetAutoMLAlgo] = useState({}) 
    let [ShowAlgoChart,SetShowAlgoChart] = useState(false)
    
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
        if(response.data.Code === "404"){
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

    // Navigate to home 

    function NavigateHome(){
      navigate("/dashboard")
    }
  

  
    function handleChange(event) { 
      var files = event.target.files
      if (files.length === 0 || files[0] === undefined || files[0] == null) 
      {
        toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a file'});
          msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});    
          window.location.reload();
      } 
      
        let fileobj = event.target.files[0] 
        if(fileobj.type === "text/csv"){
            setFile(fileobj)
        }
        else{
            toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a csv file'});
            msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});    
            window.location.reload();
        }
      }
      
      function handleSubmit(event) {
        event.preventDefault(); 
        document.getElementById("filer").value=""
       
        if (file === null) 
      {
        toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'please upload a file'});
          msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'File is not uploaded'});  
         
         
      } 
      else{
         toast.current.show({severity: 'success', summary: 'Uploading Success', detail: 'you have uploaded a file'});
          msgs1.current.show({severity: 'info', summary: 'Uploading Success',detail: 'File has uploaded'});  
          setLoader(true)
      }
        const url = 'http://localhost:5000/mlalgofilescanner';
        let token = localStorage.getItem("token");
        
        const formData = new FormData();
        formData.append('dataset', file);
        formData.append('fileName', file.name);
        formData.append('perform',"basiceda")
        
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            
          },
        };
        
      axios.defaults.baseURL = 'http://localhost:5000';
      axios.defaults.headers.post['Content-Type'] ='multipart/form-data'
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

        axios.post(url, formData, config).then((response) => {
          console.log(response.data)
          let colnames = response.data["colnames"]
          let coltypes = response.data["coldtypes"]
          let nullcnt = response.data["nullcount"]
          let firstnrows = response.data["firstnrows"]
          

          console.log(colnames)
          console.log(coltypes)
          console.log(nullcnt)
          console.log(firstnrows) 
          SetColNames(colnames) 
          let tempdtrule=[]
          let tempnullrule = []
          for(let i = 0;i<colnames.length;i++){
              tempdtrule.push("None")
              tempnullrule.push("Drop")
          }
          

          let TableData = [] 
         

          for (let index = 0; index < response.data["colnames"].length; index++) {
                let temp = [] 
                temp.push(colnames[index])
                temp.push(coltypes[index])
                temp.push(nullcnt[index])
                
                TableData.push(temp) 
                SetEDA(TableData)
                SetdtypeRule(tempdtrule)
                SetNullRules(tempnullrule)
                
              } 

            

            setLoader(false); 
          
         
          
        }).then(()=>{
            SetShowEDA(true)
        }).catch((err)=>{
          console.log(err); 
          toast.current.show({severity: 'error', summary: 'Uploading Failed', detail: 'Error while uploading'});
          msgs1.current.show({severity: 'error', summary: 'Uploading Failed',detail: 'Error while getting data'});  
          setLoader(false);
          SetShowEDA(false) 
          
         
        }); 
       
        
      } 
      
     // Handling Datatype Changer
      function HandleDtypDrop(value,colnam){
        
        let index = ColNames.indexOf(colnam);
        console.log(value,colnam)
        dtypeRule[index] = value 
        SetdtypeRule(dtypeRule)
        console.log(dtypeRule)
        
        forceUpdate()
        

      }

    // Handling Null value Remover 

    function HandleNullDrop(value,colnam){
      let index = ColNames.indexOf(colnam) 
      console.log(value,colnam)
      NullRules[index] = value 
      SetNullRules(NullRules)
      console.log(dtypeRule)
        
      forceUpdate()
        
      
    }

    // Analyse 

    function Analyse(){
      console.log(NullRules)
      console.log(dtypeRule)
      console.log(ScaleDrop)
      console.log(TargetDrop)
      console.log(Models) 

      if(ScaleDrop === "" || TargetDrop === "" || Models === ""){
        toast.current.show({severity: 'error', summary: 'Empty Value Found', detail: 'Analysis Failed'});
        msgs1.current.show({severity: 'error', summary: 'Null value found',detail: 'Analysis Failed'});  
        return ;
      }

      let AnalysisFormData = new FormData() 
      
      AnalysisFormData.append("scale",ScaleDrop)
      AnalysisFormData.append("target",TargetDrop)
      AnalysisFormData.append("modeltype",Models)   
      AnalysisFormData.append("dataset",file)
      
      AnalysisFormData.append("edaprocess",JSON.stringify({"dtrules":dtypeRule,"nullrules":NullRules,"colnames":ColNames}))
      SetAnalyseLoader(true)

      axios.post("http://localhost:5000/automl",AnalysisFormData,config).then((resp)=>{ 
        console.log(resp.data) 
        if(resp.data["Code"]==="404"){
          toast.current.show({severity: 'error', summary: 'Something went wrong', detail: 'Analysis Failed'});
          msgs1.current.show({severity: 'error', summary: 'Something went wrong',detail: 'Analysis Failed'});  
        }
        else{
          SetAutoMLAlgo(resp.data["Chart"])  
          SetShowAlgoChart(true)
        }
        SetAnalyseLoader(false)

      }).catch((err)=>{
        console.log(err); 
        toast.current.show({severity: 'error', summary: 'Something went wrong', detail: 'Analysis Failed'});
        msgs1.current.show({severity: 'error', summary: 'Something went wrong',detail: 'Analysis Failed'});  
        SetAnalyseLoader(false)
      })




    }

  return ( 

    <div className="mlalgo"> 

        <Toast ref={toast}></Toast>
        <Messages ref={msgs1} /> 
        <CirclesWithBar height="100" width="100" color="cyan" wrapperStyle={{}} wrapperClass="" visible={Loader} outerCircleColor=""/>
       { ShowEDA === false ? <div className={`card-header ${styles.uploaddiv}`}>
            <h3 className={`card-header text-center ${styles.uploaddivtit}`}>Machine Learning Algorithm Analyser</h3>
            <form onSubmit={handleSubmit} className={`${styles.uploadform} card-header`}>
              <h4 className={`card-footer text-center ${styles.formcarder}`}>Upload Your Dataset below to compare the algorithm efficiency</h4>
              <input type="file" onChange={handleChange} name="dataset" id='filer' className={`form-control mb-3 `}/>
              <button type="submit" className='btn btn-dark'>Upload</button>
              <button className='btn btn-warning m-2' onClick={NavigateHome}>Back to Home</button>
            
            </form>  
        </div>    :  null 

       }

        {
            ShowEDA === true ? 

            <div className={`card-header`}>
            <h3 className={`card-header text-center  font ${styles.headings}`}>Auto ML EDA REPORT SUMMARY</h3>
            <div className={`${styles.tab} card-header`}>
              <h3 className={`text-center card-header m-1 ${styles.tabtit}`}>Auto ML Summary Table</h3>
            <table className={`table table-bordered table-striped  table-hover table-responsive`}>
             <thead className={`bg-primary text-white text-black  text-capitalize border-solid text-md-center border-dark`}>
               <tr>
               <th className={``}>Column No</th> 
               <th className={``}>Column Name</th>
                <th className={``}>Column DataType</th> 
                <th className={``}>Column Null Values</th>
                <th className={``}>Data Type Changer</th> 
                <th className={``}>Null Remover</th>
               </tr>
             </thead> 
    
             <tbody className={`border-solid border-dark`}>
               {
                 EDA.map((item,ind)=>{
                   return(
                    <tr className={`bg-light card-header`} key={ind}>
                      <td className={`${styles.tabrow} `}>{ind+1}</td>
                      <td className={`${styles.tabrow}`}>{item[0]}</td>
                      <td className={`${styles.tabrow}`}>{item[1]}</td>
                      <td className={`${styles.tabrow}`}>{item[2]}</td> 
                      
                      <td><Dropdown  options={dtypes} value={dtypeRule[ind]} onChange={(e)=>{HandleDtypDrop(e.value,item[0])}}  className={`${styles.retailzoomdrop} bg-light text-black`} placeholder="Select a Datatype"/></td> 
                      <td><Dropdown  options={nullval} value={NullRules[ind]} onChange={(e)=>{HandleNullDrop(e.value,item[0])}}  className={`${styles.retailzoomdrop} bg-light text-black`} placeholder="Select a Null Replacer"/></td> 

                    </tr>
                   )
                 })
                    
               }
                
               
             </tbody>
            </table> 
            </div>  

             <div className={`card-header ${styles.preprocessdiv}`}>  
                 <CirclesWithBar height="100" width="100" color="cyan" wrapperStyle={{}} wrapperClass="" visible={AnalyseLoader} outerCircleColor=""/>
                 <h3 className={`card-header text-center ${styles.processcapt}`}> Choose the preprocessing steps</h3>
                 <Dropdown  options={scalar} value={ScaleDrop} onChange={(e)=>{SetScaleDrop(e.value)}}  className={`${styles.retailzoomdrop} bg-light text-black m-3`} placeholder="Select a Scaling Method"/> 
                 <Dropdown  options={ColNames} value={TargetDrop} onChange={(e)=>{SetTargetDrop(e.value)}}  className={`${styles.retailzoomdrop} bg-light text-black m-3`} placeholder="Select a Target Variable"/>
                 <Dropdown  options={models} value={Models} onChange={(e)=>{SetModels(e.value)}}  className={`${styles.retailzoomdrop} bg-light text-black m-3`} placeholder="Select a Algorithm Mode"/> 
                 <button className={`btn btn-dark ${styles.preprocessdivbtn}`} onClick={Analyse}>Analyse</button> 

             </div>
           
            </div> : null 
        } 
        
        { 
          ShowAlgoChart === true ? 

          <div className={`card-header ${styles.algochart}`}>
            <h3 className={`card-footer text-center ${styles.charttit}`}>Algorithm Analysis Below</h3>  
            <h4 className={`card-header ${styles.chartdesc}`}>{"Auto Analysis Type:"+ Models}</h4>
            <div className={`${styles.charttab}`}>
            <table className={`table table-bordered table-striped  table-hover table-responsive`}>

             <thead className={`text-capitalize border-solid text-md-center `}>
               <tr>
                  <th className={``}>Serial No</th> 
                  <th className={``}>Algorithm</th>
                  <th className={``}>Efficiency</th>
               </tr>
             </thead>  

              <tbody> 
                {
                  AutoMLAlgo.map((item,ind)=>{
                    return (
                      <tr>
                        <td>{ind+1+"."}</td> 
                        <td>{item[0]}</td>
                        <td>{item[1]+" %"}</td>
                      </tr>
                    )
                  })
                }
              </tbody> 

             </table>
             </div>
            
          </div> : null 
        }

    </div>
  )
}

export default MLAlgoAnalyser