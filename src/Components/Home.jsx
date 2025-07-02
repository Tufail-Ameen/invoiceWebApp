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

const Home = () => {
  const [product, setProduct] = useRecoilState(productAtom); // main arary
  const [id, setId] = useRecoilState(idsend); // default []
  const [Invoice1, setNewInvoice1] = useRecoilState(formdisplay); // default false
  const [edit, setEdit] = useRecoilState(editatom); // default false
  const [filterdata, setFilterdata] = useState([]); // default []

  const handelFilter = (status) => {
    console.log(typeof status);
    const pendingData = product.filter((item) => item.btnCP === status);
    if (status == null || status == undefined) {
      setFilterdata(product);
    }
    setFilterdata(pendingData);
  };

  useEffect(() => {
    setFilterdata(product);
  }, [product]);

  useEffect(() => {
    let storeData = JSON.parse(localStorage.getItem("invoiceData")) || [];
    setProduct(storeData);
  }, []);

  const openinvoice = () => {
    setNewInvoice1(true);
  };

  const handeliconclick = (index) => {
    localStorage.setItem("Index", index);
    setEdit(true);
  };

  return (
    <>
      {/* Container */}
      <div className="container-fluid h-auto pageposition">
        {/* Row */}
        <div className="row pt-1 pt-md-5 d-flex justify-content-center">
          <div className="col-md-8 col-lg-8 p-0">
            {/* Row */}
            <div className="row mt-3 m-2 m-sm-2 m-md-auto m-lg-auto">
              <div className="col-6 col-sm-4 col-md-3 col-lg-3 py-2 p-0">
                <h3 className="invoice-text">Invoices</h3>
                <p className="count-invoices-tect p-0 m-0">
                  There are {product.length} total Invoices
                </p>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-3">
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

              {/* Space column - Hidden on small screens, 3rd position on medium+ */}
              <div className="d-none d-md-block col-md-3 col-lg-3">{/* Space */}</div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-3 p-0">
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
            {/* Desktop Table View - Hidden on small screens */}
            <div className="d-none d-md-block">
              {filterdata.map((elem, index) => {
                return (
                  <div
                    onClick={() => {
                      handeliconclick(index);
                    }}
                    key={index}
                    className="row mt-3 py-3 ps-3 py-2 rounded datalist"
                  >
                    <div className="col-sm-6 col-md-1 col-lg-1 position-table table-text-size">
                      <span className="hash-clr">#</span>
                      {elem.id}
                    </div>
                    <div className="col-sm-6 col-md-3 col-lg-3 position-table table-text-size textcklr">
                      {elem.date}
                    </div>
                    <div className="col-sm-12 col-md-3 col-lg-3  table-text-size textcklr">
                      {elem.name}
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-2 price">
                      {elem.currency}&nbsp;
                      {(elem.total ?? 0).toFixed(0)}
                    </div>
                    <div className="col-sm-12 col-md-2 col-lg-2 position-table-btn p-0">
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
                    <div className="col-sm-12 col-md-1 col-lg-1 p-0 m-0 position-table goicon-position">
                      <span className="down-icon goicon">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Card View - Hidden on large screens */}
            <div className="d-block d-md-none m-2">
              {filterdata.map((elem, index) => (
                <div
                  key={index}
                  className="card mb-3 cursor"
                  style={{
                    backgroundColor: '#1e2139',
                    border: '1px solid #373b53',
                    borderRadius: '12px'
                  }}
                  onClick={() => {
                    handeliconclick(index);
                  }}
                >
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="hash-clr" style={{ fontSize: '16px', fontWeight: '600' }}>#{elem.id}</span>
                        </div>
                        <div className="text-end">
                          {elem.btnCP == 1 ? (
                            <button type="button" className="btn draftbtn px-3 py-1" style={{ fontSize: '12px' }}>
                              <span className="me-1">
                                <FontAwesomeIcon icon={faCircle} size="2xs" />
                              </span>
                              <label>Draft</label>
                            </button>
                          ) : elem.btnCP == 2 ? (
                            <button type="button" className="btn pendingbtn px-3 py-1" style={{ fontSize: '12px' }}>
                              <span className="me-1">
                                <FontAwesomeIcon icon={faCircle} size="2xs" />
                              </span>
                              <label className="pending">Pending</label>
                            </button>
                          ) : (
                            <button type="button" className="btn paidbtn px-3 py-1" style={{ fontSize: '12px' }}>
                              <span className="me-1">
                                <FontAwesomeIcon icon={faCircle} size="2xs" />
                              </span>
                              <label>Paid</label>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="col-12 mb-2">
                        <strong style={{ color: '#7c5dfa' }}>Client:</strong>
                        <span className="ms-2" style={{ color: '#ffffff' }}>{elem.name}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <strong style={{ color: '#7c5dfa' }}>Date:</strong>
                        <span className="ms-2" style={{ color: '#ffffff' }}>{elem.date}</span>
                      </div>
                      <div className="col-6 mb-2">
                        <strong style={{ color: '#7c5dfa' }}>Amount:</strong>
                        <span className="ms-2" style={{ color: '#ffffff', fontWeight: '600' }}>
                          {elem.currency} {(elem.total ?? 0).toFixed(0)}
                        </span>
                      </div>
                      <div className="col-12 text-end">
                        <span className="down-icon goicon">
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {Invoice1 && <Invoice />}
    </>
  );
};

export default Home;
