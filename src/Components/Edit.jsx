import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  editatom,
  editclicked,
  filterdatatom,
  filterdate,
  formdisplay,
  gobackatom,
  idsend,
  productAtom,
} from "../State/Atom";
import Invoice from "./Invoice";
import axios from "axios";

export default function Edit() {
  const [goback, setGoback] = useRecoilState(gobackatom);
  const [edit, setEdit] = useRecoilState(editatom);
  const [product, setProduct] = useRecoilState(productAtom);
  const [Invoice1, setNewInvoice1] = useRecoilState(formdisplay);
  const [id, setId] = useRecoilState(idsend);
  const [RowPrint, setRowPrint] = useState([]);
  const [filterdata, setFilterdata] = useRecoilState(filterdatatom);
  const [editclick, setEditClick] = useRecoilState(editclicked);

  const handelgoback = () => {
    setGoback(true);
    setEdit(false);
  };

  const handeldeletebtn = () => {
    let storedIndex = localStorage.getItem("Index");
    let indexToDelete = parseInt(storedIndex, 10);
    const filteredProduct = product.filter(
      (elem, idx) => idx !== indexToDelete
    );
    setProduct(filteredProduct);
    setEdit(false);

    axios.delete(`http://localhost:3000/POS/${filterdata[0].id}`);
  };

  const updatehandler = () => {
    setEditClick(true);
    setNewInvoice1(true);
  };

  useEffect(() => {
    let index = localStorage.getItem("Index");
    // Convert index to integer
    index = parseInt(index);
    // Filter product array based on the index
    const filteredProduct = product.filter((elem, idx) => idx === index);

    setFilterdata(filteredProduct);
    ItemsPrint(filteredProduct);
  }, [product]);

  let ItemsPrint = (filteredProduct) => {
    let element = [];

    for (
      let index = 0;
      index < filteredProduct[0].numberOfItemsAdded;
      index++
    ) {
      let data = {
        item: filteredProduct[0][`item${index}`],
        quantity: filteredProduct[0][`quantity${index}`],
        price: filteredProduct[0][`price${index}`],
        tax: filteredProduct[0][`tax${index}`],
      };

      const total = data.quantity * data.price;
      const taxPercentage = data.tax / 100;
      const finalTotal = total + total * taxPercentage;

      data.finalTotal = finalTotal;

      element.push(data);
    }
    setRowPrint(element);
    // console.log(RowPrint);
  };

  const statuspaid = (statusvalue) => {
    // const filtr = [...filterdata];
    const filtr = JSON.parse(JSON.stringify(filterdata));
    filtr[0].btnCP = 3;
    console.log(filtr);

    axios
      .patch(`http://localhost:3000/POS/${filterdata[0].id}`, filtr[0])
      .then((res) => {
        console.log("patch", res.data);
        let index = localStorage.getItem("Index");
        const filtr = JSON.parse(JSON.stringify(product));
        filtr[index].btnCP = 3;
        setProduct(filtr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid pageposition invoice-setting">
        {/* Row */}
        <div className="row pt-5 justify-content-center">
          <div className="col-md-7">
            {/* New Row Go Back */}
            <div className="row">
              <div className="col-md-12 p-0">
                <span style={{ cursor: "pointer" }} onClick={handelgoback}>
                  <span className="me-3">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faAngleLeft}
                      size="2xs"
                    />
                  </span>
                  <label style={{ cursor: "pointer" }} className="goback">
                    Go back
                  </label>
                </span>
              </div>
            </div>

            {/* New Row Status / Paid / Edit / Delete / Mark as Read*/}
            <div
              className="row mt-4 px-3 py-4 rounded"
              style={{ backgroundColor: "#1f213a" }}
            >
              <div className="col-md-1 manage-row">
                <label
                  htmlFor="status"
                  className=""
                  style={{ fontSize: "13px" }}
                >
                  Status
                </label>
              </div>

              <div className="col-md-2 manage-row mx-0 px-0">
                {filterdata.length != 0 && filterdata[0].btnCP == 1 ? (
                  <button type="button" className="btn draftbtn">
                    <span className="me-1">
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </span>
                    <label>Draft</label>
                  </button>
                ) : filterdata.length != 0 && filterdata[0].btnCP == 2 ? (
                  <button type="button" className="btn pendingbtn">
                    <span className="me-1">
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </span>
                    <label>Pending</label>
                  </button>
                ) : filterdata.length != 0 && filterdata[0].btnCP == 3 ? (
                  <button type="button" className="btn paidbtn">
                    <span className="me-1">
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </span>
                    <label>Paid</label>
                  </button>
                ) : (
                  <button type="button" className="btn paidbtn">
                    <span className="me-1">
                      <FontAwesomeIcon icon={faCircle} size="2xs" />
                    </span>
                    <label>kuch b ni</label>
                  </button>
                )}
              </div>

              <div className="col-md-2"> </div>

              <div className="col-md-7">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "4px",
                  }}
                >
                  <button
                    type="button"
                    className="btn input-clr1 edit py-2 px-3"
                    onClick={updatehandler}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn input-clr1 delete py-2 px-3"
                    onClick={handeldeletebtn}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="btn input-clr1 mark-paid py-2 px-3"
                    onClick={() => statuspaid(3)}
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>

            {/* Lower Box */}
            <div
              className="row ps-3 mt-4 pt-4 rounded"
              style={{ backgroundColor: "#1f213a" }}
            >
              {/* New Row */}
              <div className="row">
                <div className="col-md-3 pt-3">
                  <p className="edit-id">
                    {/* {filterdata[0].id} */}
                    {filterdata.length != 0 && filterdata[0].id}
                  </p>
                  <p className="edit-discription">
                    {filterdata.length != 0 && filterdata[0].description}
                  </p>
                </div>
                <div className="col-md-6 "></div>
                <div className="col-md-3 ps-5">
                  {/* Street address , city, postal code, country */}
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].address1},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].city1},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].code1},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].country1}
                  </p>
                </div>
              </div>

              {/* New Row invoice date to payment due*/}
              <div className="row mt-4">
                <div className="col-md-3">
                  <span className=" d-block edit-discription">
                    Invoice Date
                  </span>
                  <span className="d-block date-bill-email">
                    {filterdata.length != 0 && filterdata[0].date}
                  </span>

                  <span className="d-block edit-discription mt-4">
                    Payment Due
                  </span>
                  <span className="d-block date-bill-email">
                    {filterdata.length != 0 && filterdata[0].datedue}
                  </span>
                </div>

                <div className="col-md-3">
                  <span className="d-block edit-discription">Bill To</span>
                  <span className="d=block date-bill-email">
                    {filterdata.length != 0 && filterdata[0].name}
                  </span>
                  <p className="p-0 m-0 mt-2 line-height">
                    {filterdata.length != 0 && filterdata[0].address2},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].city2},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].code2},
                  </p>
                  <p className="p-0 m-0 line-height">
                    {filterdata.length != 0 && filterdata[0].country2}
                  </p>
                </div>

                <div className="col-md-6">
                  <span className="d-block edit-discription">Sent to</span>
                  <span className="d-block date-bill-email">
                    {filterdata.length != 0 && filterdata[0].email}
                  </span>
                </div>
              </div>

              {/* New Row Table */}
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="table-responsive table-setting my-3">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th scope="col">Item Name</th>
                          <th scope="col">Qty.</th>
                          <th scope="col">Price</th>
                          <th scope="col">Tax(%)</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>

                      {RowPrint.map((elem, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{elem.item}</td>
                              <td>{elem.quantity}</td>
                              <td>
                                {filterdata.length != 0 &&
                                  filterdata[0].currency}
                                {elem.price}
                              </td>
                              <td>{elem.tax + "%"}</td>
                              <td>
                                {filterdata.length != 0 &&
                                  filterdata[0].currency}
                                {elem.finalTotal}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}

                      <tr className="total">
                        <th className="py-4 px-2" colSpan={4} scope="col">
                          Amount Due
                        </th>
                        <th scope="col" className="total-price">
                          {filterdata.length != 0 && filterdata[0].currency}
                          {RowPrint.reduce(
                            (total, elem) => total + elem.finalTotal,
                            0
                          )}
                        </th>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {Invoice1 && <Invoice />}
    </>
  );
}
