import React from 'react'
import NevBar from '../Components/Nevbar'
import Home from '../Components/Home'
import { clientopenAtom, editatom, gobackatom, gohome, gostock, useropenAtom } from '../State/Atom';
import Edit from '../Components/Edit';
import Client from '../Components/Client';
import User from '../Components/User';
import Stock from '../Stock';
import { useRecoilState } from 'recoil';
import slidebarimg from '../Images/slidebar-img.jpeg';
// import slidebarimg from '../Images/slidebar-img.jpeg';

export default function DashboardLayout() {

    const [edit, setEdit] = useRecoilState(editatom);
    const [goback, setGoback] = useRecoilState(gobackatom);
    const [clientcomponent, setSlientcomponent] = useRecoilState(clientopenAtom)
    const [usercomponent, setUsercomponent] = useRecoilState(useropenAtom);
    const [homapage, setHomapage] = useRecoilState(gohome);
    const [stock, setStock] = useRecoilState(gostock);

    return (
        <>
            {/* Mobile Navbar - Hidden on large screens */}
            <div className="d-block d-md-none" style={{
                backgroundColor: '#373b53',
                padding: '15px 20px',
                borderBottom: '2px solid #494E6E',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img
                            src={slidebarimg}
                            alt="Logo"
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '10px',
                                marginRight: '15px',
                                objectFit: 'cover',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                setHomapage(true);
                                setSlientcomponent(false);
                                setEdit(false);
                            }}
                        />
                        <span style={{
                            color: '#ffffff',
                            fontSize: '20px',
                            fontWeight: '700',
                            letterSpacing: '0.5px'
                        }}>
                            Invoice App
                        </span>
                    </div>
                    <div className="d-flex gap-2">
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#7c5dfa',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '10px 16px',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}
                            onClick={() => {
                                setSlientcomponent(true);
                                setHomapage(false);
                                setEdit(false);
                            }}
                        >
                            Add Client
                        </button>
                    </div>
                </div>
            </div>

            <div className='container-fluid' style={{ minHeight: '100vh', height: '100vh' }}>
                <div className='row' style={{ border: '2px solid #ff8f00', minHeight: '100vh', height: '100vh', display: 'flex' }}>
                    {/* Sidebar - Hidden on small screens */}
                    <div className='col-1 p-0 dashboard-navbar-container d-none d-md-flex' style={{ border: '2px solid red', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '100%', overflow: 'hidden' }}>
                            <NevBar />
                        </div>
                    </div>
                    <div className='col-12 col-md-11 p-0' style={{ border: '2px solid blue', height: '100%', overflowY: 'auto', position: 'relative' }}>
                        {edit ? <Edit /> : clientcomponent ? <Client /> : usercomponent ? <User /> : homapage ? <Home /> : stock ? <Stock /> : <Home />}
                    </div>
                </div>
            </div>
        </>
    )
}