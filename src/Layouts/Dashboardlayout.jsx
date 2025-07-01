import React from 'react'
import NevBar from '../Components/Nevbar'
import Home from '../Components/Home'
import { clientopenAtom, editatom, gobackatom, gohome, gostock, useropenAtom } from '../State/Atom';
import Edit from '../Components/Edit';
import Client from '../Components/Client';
import User from '../Components/User';
import Stock from '../Stock';
import { RecoilRoot, useRecoilState } from 'recoil';


export default function DashboardLayout() {

    const [edit, setEdit] = useRecoilState(editatom);
    const [goback, setGoback] = useRecoilState(gobackatom);
    const [clientcomponent, setSlientcomponent] = useRecoilState(clientopenAtom)
    const [usercomponent, setUsercomponent] = useRecoilState(useropenAtom);
    const [homapage, setHomapage] = useRecoilState(gohome);
    const [stock, setStock] = useRecoilState(gostock);

    return (
        <>
            <div className='container-fluid' style={{ minHeight: '100vh', height: '100vh' }}>
                <div className='row' style={{ border: '2px solid #ff8f00', minHeight: '100vh', height: '100vh', display: 'flex' }}>
                    <div className='col-1 p-0 dashboard-navbar-container' style={{ border: '2px solid red', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <NevBar />
                        </div>
                    </div>
                    <div className='col-11 p-0' style={{ border: '2px solid blue', height: '100%', overflowY: 'auto', position: 'relative' }}>
                        {edit ? <Edit /> : clientcomponent ? <Client /> : usercomponent ? <User /> : homapage ? <Home /> : stock ? <Stock /> : <Home />}
                    </div>
                </div>
            </div>
        </>
    )
}