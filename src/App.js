import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap';
import './App.css';
import Home from './Components/Home';
import NevBar from './Components/Nevbar';
import { RecoilRoot, useRecoilState } from 'recoil';
import Edit from './Components/Edit';
import { clientopenAtom, editatom, gobackatom, gohome, gostock, useropenAtom } from './State/Atom';
import Client from './Components/Client';
import User from './Components/User';
import Stock from './Stock';
// import Invoice from './Components/Invoice';


export default function App() {

  const [edit, setEdit] = useRecoilState(editatom);
  const [goback, setGoback] = useRecoilState(gobackatom);
  const [clientcomponent, setSlientcomponent] = useRecoilState(clientopenAtom)
  const [usercomponent, setUsercomponent] = useRecoilState(useropenAtom);
  const [homapage, setHomapage] = useRecoilState(gohome);
  const [stock, setStock] = useRecoilState(gostock);

  return (
    <>
      <div className='container-fluid p-0'>
        <div className='d-flex justify-content-start w-100'>
          <div className=' position-relative' style={{ width: "7%", }}>
            <div className='position-fixed' style={{ width: "8%", zIndex: "100" }}>

              <NevBar />

            </div>
          </div>

          <div className=' p-0 m-0' style={{ width: "93%" }}>

            {edit ? <Edit /> : clientcomponent ? <Client /> : usercomponent ? <User /> : homapage ? <Home /> : stock ? <Stock /> : <Home />}

          </div>

        </div>
      </div>

    </>
  )
}
