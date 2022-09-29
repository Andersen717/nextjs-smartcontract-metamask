import jwt from 'jsonwebtoken';
import Header from './header';
import Body from './body';
import * as React from 'react';
import { decode } from 'jwt-simple';
export default function Home() {
  const [logined, setLogined] = React.useState(false);
  const [name, setName] = React.useState('Guest');

  React.useEffect(async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== "0x2a") {//kovan ID;
      //alert('this site is require Kovan chain : please set Kovan');
    }
    confirmLogined();
  }, [logined])
  const confirmLogined = () => {
    try {
      const decoded = jwt.decode(localStorage.getItem('token'), { complete: true });
      const { exp, mail } = decoded.payload;
      if (decoded || exp > (new Date().getTime() + 1) / 1000) {
        setLogined(true);
        setName(mail);
      } else {
        setLogined(false)
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div style={{ margin: '0px!important' }}>
      <Header loginedF={setLogined} loginedV={logined} />
      <Body loginedV={logined} name={name} />
    </div>
  )
}
