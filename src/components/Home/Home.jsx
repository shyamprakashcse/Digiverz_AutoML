import React from 'react'
import styles from "./Home.module.css"
import emp_bg from "./emp_bg.jpg"
import eda_bg from "./eda.png"
import eda2_bg from "./eda2.png"
import sales_bg from "./sales.png"
import salesfor from "./sales1.png"
function Home() { 


  return ( 
  <div>
    <div className={`${styles.navdiv} nav navbar-dark`}>
    <h2 className={`card card-header p-3 m-2 text-center ${styles.tit} bg-light`}>DIGITECH.AI</h2>
    <a href="/"><button type="submit" className="btn btn-light" >Home</button></a>
    <a href="/register"><button type="submit" className="btn btn-dark" >Register</button></a>
    <a href="/login"><button type="submit" className="btn btn-dark" >Login</button></a>

</div>

<div className={`${styles.brand}`}>
<div className={`${styles.left}`}> 
  <img src={emp_bg} alt="img" />


</div>

<div className={`${styles.right} content card-header}`} >
    <h2 className="text-center card-footer ">Automate your Industry with our advanced predictions and Analytics features</h2>
    <h5 className="text-center card-footer bg-dark">Explore the Features of your Data with Digitech.AI</h5>
</div>

</div>

<h2 className={`text-center ${styles.feathead} `}>Explore Our Features</h2>
<div className={`${styles.features}`}>
<div  className={`${styles.carder} card `}> 

    <img src={eda_bg} alt="img" className={`${styles.cardimg} card-img-top`} />

    <div className="card-body">
     <p className={`${styles.cardtxt} card-text text-xl-center`}>Auto EDA(Exploratory Data Analysis)</p>
    </div>
</div> 

 
<div  className={`${styles.carder} card `}> 

    <img src={eda2_bg} alt="img" className={`${styles.cardimg} card-img-top`} />

    <div className="card-body">
     <p className={`${styles.cardtxt} card-text text-xl-center`}> Data Modelling in Machine Learning  </p>
    </div>
</div> 

<div  className={`${styles.carder} card `}> 

    <img src={salesfor} alt="img" className={`${styles.cardimg} card-img-top`} />

    <div className="card-body">
     <p className={`${styles.cardtxt} card-text text-xl-center`}>Sales Forcasting Using Trend Analyser</p>
    </div>
</div> 

<div  className={`${styles.carder} card `}> 

    <img src={sales_bg} alt="img" className={`${styles.cardimg} card-img-top`} />

    <div className="card-body">
     <p class={`${styles.cardtxt} card-text text-xl-center`}>Machine Learning Algorithm Analyser</p>
    </div>
</div> 


</div>


<div className={`${styles.footer} nav navbar-dark ${styles.foot}`}>
    
    <h2 className={`card card-footer text-black text-center bg-light`}>KAAR TECHNOLOGIES <h6>copyright@2022</h6></h2>
</div>
</div>

  )
}

export default Home