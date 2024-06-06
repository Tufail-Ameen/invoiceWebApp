import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faCircle,
  faCirclePlus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Invoice from "./Invoice";
import { useRecoilState } from "recoil";
import {
  clientopenAtom,
  editatom,
  filterdatatom,
  formdisplay,
  gohome,
  idsend,
  productAtom,
} from "../State/Atom";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const [id, setId] = useRecoilState(idsend);
  const [Invoice1, setNewInvoice1] = useRecoilState(formdisplay);
  const [edit, setEdit] = useRecoilState(editatom);
  const [product, setProduct] = useRecoilState(productAtom);
  const [filterdata2, setFilterdata2] = useRecoilState(filterdatatom);
  const [filterdata, setFilterdata] = useState([]);

  const handelFilter = (status) => {
    const pendingData = product.filter((item) => item.btnCP === status);
    setFilterdata(pendingData);
  };

  useEffect(() => {
    setFilterdata(product);
  }, [product]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/POS")
      .then((res) => {
        // console.log(res.data);
        setFilterdata(res.data);
        setFilterdata2(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const openinvoice = () => {
    // console.log("empty nai huwa = ", filterdata2);
    setFilterdata2([]);
    setNewInvoice1(true);

    // setSlientcomponent(false);
    // setHomapage(false);
  };

  const handeliconclick = (index) => {
    localStorage.setItem("Index", index);

    setEdit(true);

    // setId([...id, randomId]);
    // setProduct([...product, productObj]);
    // console.log(product);
  };

  return (
    <>
      {/* Container */}
      <div className="container-fluid pageposition">
        {/* Row */}
        <div className="row pt-5 justify-content-center">
          <div className="col-md-7">
            {/* Row */}
            <div className="row mt-3">
              <div className="col-md-3 py-2 p-0">
                <h3 className="invoice-text">Invoices</h3>
                <p className="count-invoices-tect p-0 m-0">
                  There are {product.length} total Invoices
                </p>
              </div>
              <div className="col-md-3">{/* Space */}</div>
              <div className="col-md-3">
                <Dropdown className="py-3 text-end">
                  <Dropdown.Toggle
                    className="btn text-white filter p-0"
                    id="dropdown-basic"
                    style={{ border: "none", background: "none" }}
                  >
                    <span className="mx-2">Filter by status</span>
                    <span className="down-icon">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="menuclr px-0 py-2 mt-3">
                    <Dropdown.Item href="#" className="menuitem p-0 m-0">
                      <div
                        className="row p-0 m-0 ms-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="col-2 py-2">
                          <input
                            type="radio"
                            id="flexRadioDefault1"
                            className="input-size"
                            name="flexRadioDefault"
                            onClick={() => handelFilter(1)}
                          />
                        </div>
                        <div className="col-10 px-1 py-2">
                          <label className="cursor" htmlFor="flexRadioDefault1">
                            Draft
                          </label>
                        </div>
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item href="#" className="menuitem p-0 m-0">
                      <div
                        className="row p-0 m-0 ms-2 cursor"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="col-2 pb-2">
                          <input
                            type="radio"
                            id="flexRadioDefault2"
                            className="input-size"
                            name="flexRadioDefault"
                            onClick={() => handelFilter(2)}
                          />
                        </div>
                        <div className="col-10 px-1 pb-2">
                          <label className="cursor" htmlFor="flexRadioDefault2">
                            Pending
                          </label>
                        </div>
                      </div>
                    </Dropdown.Item>

                    <Dropdown.Item href="#" className="menuitem p-0 m-0">
                      <div
                        className="row p-0 m-0 ms-2 cursor"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="col-2 pb-2">
                          <input
                            type="radio"
                            id="flexRadioDefault3"
                            className="input-size"
                            name="flexRadioDefault"
                            onClick={() => handelFilter(3)}
                          />
                        </div>
                        <div className="col-10 px-1 pb-2">
                          <label className="cursor" htmlFor="flexRadioDefault3">
                            Paid
                          </label>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="col-md-3 p-0">
                <div className="new-invoice-parent">
                  <button
                    type="button"
                    className="new-invoice-btn my-3"
                    onClick={openinvoice}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ color: "#ffffff", fontSize: "30px" }}
                    />
                    <span className="mx-2 my-2">New Invoice</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 1 */}
            {filterdata.map((elem, index) => {
              return (
                <div
                  onClick={() => {
                    handeliconclick(index);
                  }}
                  style={{ cursor: "pointer" }}
                  key={index}
                  className="row datalist mt-3 py-3 ps-3 py-2 rounded"
                >
                  <div className="col-md-1 position-table table-text-size">
                    <span className="hash-clr">#</span>
                    {elem.id}
                  </div>
                  <div className="col-md-3 position-table table-text-size textcklr">
                    {elem.date}
                  </div>
                  <div className="col-md-3 position-table table-text-size textcklr">
                    {elem.name}
                  </div>
                  <div className="col-md-2 position-table text-end price">
                    {elem.currency}
                    {elem.total.toFixed(2)}
                  </div>
                  <div className="col-md-2 position-table-btn p-0">
                    {elem.btnCP == 1 ? (
                      <button type="button" className="btn draftbtn px-4">
                        <span className="me-1">
                          <FontAwesomeIcon icon={faCircle} size="2xs" />
                        </span>
                        <label>Draft</label>
                      </button>
                    ) : elem.btnCP == 2 ? (
                      <button type="button" className="btn pendingbtn px-4">
                        <span className="me-1">
                          <FontAwesomeIcon icon={faCircle} size="2xs" />
                        </span>
                        <label className="pending"> Pending</label>
                      </button>
                    ) : (
                      <button type="button" className="btn paidbtn px-4">
                        <span className="me-1">
                          <FontAwesomeIcon icon={faCircle} size="2xs" />
                        </span>
                        <label>Paid</label>
                      </button>
                    )}
                  </div>
                  <div className="col-md-1 p-0 m-0 position-table goicon-position">
                    <span className="down-icon goicon">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {Invoice1 && <Invoice />}
    </>
  );
};

export default Home;
