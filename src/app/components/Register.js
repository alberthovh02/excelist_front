import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default function Register(){
  return(
    <><Header/><div style={{marginBottom: 100, display: "flex", justifyContent: "center"}}><iframe src="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdeUlcWwLVjDouBRR-MwGby_sUOAQMsfGrl-cdi5rmsXlvQ5w/formResponse?embedded=true" width="640" height="800" frameBorder="0" marginHeight="0" marginWidth="0">Загрузка…</iframe></div><Footer mode="simple"/></>
  )
}
