import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default function Register(){
  return(
    <><Header/><div style={{marginBottom: 100, display: "flex", justifyContent: "center"}}>
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeNFP3JBVzQGsNV_Bjd0wRq4LT7PETc23dsmpGMNNk6He5hjA/viewform?embedded=true"
            width="700" height="520" frameBorder="0" marginHeight="0" marginWidth="0">Загрузка…
        </iframe>
      </div><Footer mode="simple"/></>
  )
}
