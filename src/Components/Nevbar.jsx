import React from "react";
import logout from "../Images/Logout.jpg";
import slidebarimg from "../Images/slidebar-img.jpeg";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import {
  clientopenAtom,
  editatom,
  formdisplay,
  gohome,
  gostock,
  useropenAtom,
} from "../State/Atom";

const NevBar = () => {
  const [clientcomponent, setSlientcomponent] = useRecoilState(clientopenAtom);
  // const [usercomponent, setUsercomponent] = useRecoilState(useropenAtom);
  const [homapage, setHomapage] = useRecoilState(gohome);
  const [Invoice1, setNewInvoice1] = useRecoilState(formdisplay);
  // const [stock, setStock] = useRecoilState(gostock);
  const [edit, setEdit] = useRecoilState(editatom);

  const addclient = () => {
    setSlientcomponent(true);
    // setUsercomponent(false);
    setHomapage(false);
    setEdit(false);
  };

  // const adduser = () => {
  //   // alert("Add User")
  //   setUsercomponent(true);
  //   setSlientcomponent(false);
  //   setHomapage(false);
  // };

  // const addstock = () => {
  //   // alert("Add Stock");
  //   setStock(true);
  //   setUsercomponent(false);
  //   setSlientcomponent(false);
  //   setHomapage(false);
  // };

  const homepage = () => {
    // alert("Go to Home Page");
    setHomapage(true);
    // setUsercomponent(false);
    setSlientcomponent(false);
    setNewInvoice1(false);
    setEdit(false);
  };

  return (
    <>
      <nav>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="col-sm-12 col-md-12 col-lg-12 p-0 mbl">
              {/* Side Bar */}
              <div className="sidebarbg">
                <div className="w-100">
                  <img 
                    className="img-fluid sidebarimg cursor w-100" 
                    onClick={homepage} 
                    src={slidebarimg} 
                    alt=""
                    style={{ 
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                {/* Add Client btn */}
                <div
                  type="button"
                  className="add-client py-2 m-1"
                  style={{ border: "2px solid #7c5dfa" }}
                  onClick={addclient}
                >
                  <div className="">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ color: "#ffffff", fontSize: "30px" }}
                    />
                  </div>
                  <div className="">Add Client</div>
                </div>

                {/* Add User btn */}
                {/* <div
                type="button"
                className="add-client py-2 m-1"
                style={{ border: "2px solid #7c5dfa" }}
                onClick={adduser}
              >
                <div className="">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ color: "#ffffff", fontSize: "30px" }}
                  />
                </div>
                <div className="">Add User</div>
              </div> */}

                {/* Add Stock btn */}
                {/* <div
                type="button"
                className="add-client py-2 m-1"
                style={{ border: "2px solid #7c5dfa" }}
                onClick={addstock}
              >
                <div className="">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ color: "#ffffff", fontSize: "30px" }}
                  />
                </div>
                <div className="">Add Stock</div>
              </div> */}

                <div className="dropdown">
                  <div
                    className="d-flex align-items-center justify-content-center text-decoration-none profileMobile"
                    style={{ height: "67vh" }}
                  >
                    <div
                      className="profile w-100"
                      style={{ borderTop: "2px solid #494E6E" }}
                    >
                      <p className="img-fluid text-center pt-3">
                        <img
                          src={logout}
                          alt="mdo"
                          className="rounded-circle profile-picture"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NevBar;
