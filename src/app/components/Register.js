import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default function Register(){
  return(
    <><Header/><div style={{marginBottom: 100, display: "flex", justifyContent: "center"}}><iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfjD6N0MiOfwGSckt-7OpPXnv4nuOmyWAf_AUMAaNYtziStVA/viewform?embedded=true" width="640" height="800" frameBorder="0" marginHeight="0" marginWidth="0">Загрузка…</iframe></div><Footer mode="simple"/></>
  )
}
