import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { format } from "date-fns";
import {
  editclicked,
  filterdatatom,
  formdisplay,
  idsend,
  printclientdata,
  productAtom,
} from "../State/Atom";
import { parse } from "date-fns";
import { useEffect } from "react";

export default function Invoice() {
  const [data1, setData1] = useState([{id:0}]);
  const [product, setProduct] = useRecoilState(productAtom);
  const [Invoice1, setNewInvoice1] = useRecoilState(formdisplay);
  const [id, setId] = useRecoilState(idsend);
  const [filterdata, setFilterdata] = useRecoilState(filterdatatom);
  const [togglebtn, setTogglebtn] = useState(false);
  // const [RowPrint, setRowPrint] = useRecoilState(rowdata);
  const [editclick, setEditClick] = useRecoilState(editclicked);
  const [formData, setFormData] = useRecoilState(printclientdata); //map client data
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the formik context
  const formik = useFormikContext();

  // Assuming values is a state variable
  // const [values, setValues] = useState({});

  // let filter = [filterdata[0]];

  // Generate Random Id
  const generateRandomId = () => {
    const randomLetters = () => {
      return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    };

    const randomNumbers = () => {
      return Math.floor(1000 + Math.random() * 9000); // 1000-9999
    };

    return randomLetters() + randomLetters() + randomNumbers();
  };
  // Store Generate Id
  const randomId = generateRandomId();

  useEffect(() => {
    setCurrentDate(new Date());
    // localStorage.getItem("invoiceData");
  }, []);

  const clearrow = (index) => {
    const newData = [...data1];
    newData.splice(index, 1);
    setData1(newData);
  };

  const addnew = () => {
    setData1([...data1, { id: data1.length }]);
  };

  // Initial Values:
  const initialValues = {
    address1: "Ravi Road",
    city1: "Lahore",
    code1: "54000",
    country1: "Pakistan",
    name: "",
    email: "",
    address2: "",
    city2: "",
    code2: "",
    country2: "",
    date: format(currentDate, "yyyy-MM-dd"),
    datedue: format(currentDate, "yyyy-MM-dd"),
    // datedue: "",
    // payment: "",
    description:
      "Tufail Traders offers a wide range of premium cosmetic products to enhance your beauty and style.",
    currency: "Rs",
    // item: "",
    // quantity: "",
    // tax: "",
    // price: "",
    total: "",
  };

  // Validations:
  const validationSchema = Yup.object({
    address1: Yup.string()
      .required("Street address is required")
      .min(5, "Street address is too short")
      .max(100, "Street address is too long")
      .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters in street address"),

    city1: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z\s]+$/, "City must contain only letters and spaces"),

    code1: Yup.string()
      .matches(/^\d{5}$/, "Invalid postcode. It should be 5 digits.")
      .required("Postcode is required"),

    code2: Yup.string()
      .matches(/^\d{5}$/, "Invalid postcode. It should be 5 digits.")
      .required("Postcode is required"),

    city2: Yup.string()
      .required("City is required")
      .matches(/^[a-zA-Z\s]+$/, "City must contain only letters and spaces"),

    country1: Yup.string().required("Country is required"),

    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    address2: Yup.string()
      .required("Street address is required")
      .min(5, "Street address is too short")
      .max(100, "Street address is too long")
      .matches(/^[a-zA-Z0-9\s,'-]*$/, "Invalid characters in street address"),

    country2: Yup.string().required("Country is required"),

    // datedue: Yup.date()
    //   .required("Due date is required")
    //   .nullable()
    //   .min(new Date(), "Due date must be in the future"),

    // date: Yup.date()
    //   .min(new Date(), "Date cannot be in the past")
    //   .required("Date is required"),

    // datedue: Yup.date()
    //   .min(Yup.ref("date"), "Due date must be after invoice date")
    //   .required("Due date is required"),

    // description: Yup.string(),
    // .required("Description is required")
    // .min(5, "Description must be at least 5 characters")
    // .max(100, "Description must not exceed 100 characters"),

    // item: Yup.string().required("Item Name is required"),

    // quantity: Yup.number()
    //   .typeError("Quantity must be a number")
    //   .positive("Quantity must be a positive number")
    //   .integer("Quantity must be an integer")
    //   .min(1, "Quantity must be at least 1")
    //   .required("Quantity is required"),

    // price: Yup.number()
    //   .required("Item Price is required")
    //   .min(0, "Item Price must be greater than or equal to 0"),
  });

  const overall = (values, action) => {
    try {
      // Trigger validation
      validationSchema.validateSync(values, { abortEarly: false });

      // No validation errors, proceed with submitting
      values.btnCP = action;
      onsubmit(values);
    } catch (errors) {
      // Handle validation errors (you can display errors or perform any other action)
      console.error("Validation errors:", errors);

      // Log more details about the errors
      errors.inner.forEach((error) => {
        console.error(`Path: ${error.path}, Message: ${error.message}`);
      });
    }
  };

  const onsubmit = (values) => {
    // Total Functionality
    let G_total = 0;

    data1.map((elem, index) => {
      const total = values[`quantity${index}`] * values[`price${index}`];
      const taxPercentage = values[`tax${index}`] / 100;
      const finalTotal = total + total * taxPercentage;
      G_total = G_total + finalTotal;
    });

    // Grand Total (with all the indexes) Send with the values of formik to the other components
    values.total = G_total;

    // Random id Send with the values of formik to the other components
    values.id = randomId;
    values.numberOfItemsAdded = data1.length;

    // console.log(values);
    let storedIndex = localStorage.getItem("Index");
    let addupdate = parseInt(storedIndex, 10);

    if (editclick) {
      // get method
      let storedData = JSON.parse(localStorage.getItem("invoiceData")) || [];
      storedData[storedIndex] = values;
      // set method
      localStorage.setItem("invoiceData", JSON.stringify(storedData));
      setProduct(storedData);
      setEditClick(false);
    } else {
      console.log(values);
      // get method
      let storeData = JSON.parse(localStorage.getItem("invoiceData")) || [];
      // set method
      let InvoiceData = [...storeData, values];
      setProduct(InvoiceData);
      localStorage.setItem("invoiceData", JSON.stringify(InvoiceData));
    }

    setNewInvoice1(false);
    setId([...id, randomId]);
  };

  const handelcancel = () => {
    setNewInvoice1(false);
  };

  const handleClientChange = (name, setValues, allValues) => {
    // alert("onchange done");
    // console.log(name);

    // Filter data on the baseic of name
    const filterNSetInputsData = formData.filter(
      (elem, idx) => elem.name === name
    );
    console.log("filter", filterNSetInputsData);

    if (filterNSetInputsData.length > 0) {
      allValues.name = filterNSetInputsData[0].name;
      allValues.email = filterNSetInputsData[0].email;
      allValues.country2 = filterNSetInputsData[0].country;
      allValues.code2 = filterNSetInputsData[0].code;
      allValues.city2 = filterNSetInputsData[0].city;
      allValues.address2 = filterNSetInputsData[0].address;

      // console.log("addinputdata", addInputValues);
      setValues(allValues);
    } else if (!name) {
      allValues.name = "";
      allValues.email = "";
      allValues.country2 = "";
      allValues.code2 = "";
      allValues.city2 = "";
      allValues.address2 = "";

      setValues(allValues);
    } else {
      console.error("No matching data found for name: ", name);
    }
  };

  return (
    <Formik
      initialValues={filterdata.length != 0 ? filterdata[0] : initialValues}
      validationSchema={validationSchema}
      onSubmit={onsubmit}
      enableReinitialize
      validate={(values) => {
        try {
          validationSchema.validateSync(values, { abortEarly: false });
          return {};
        } catch (errors) {
          return errors.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
        }
      }}
    >
      {({ values, handleChange, setValues }) => (
        <Form>
          <div className="invoice-setting p-0">
            <div
              className="py-3"
              style={{
                backgroundColor: "#1E2139",
                width: "45%",
                height: "100%",
                marginLeft: "3%",
                paddingLeft: "5%",
                zIndex: "1",
              }}
            >
              {/* Edit ID */}
              {/* <div className="row mx-2">
                <div className="col-md-12 edit-text">
                  <span style={{ color: "#7e829b" }}>#</span>
                  {filterdata.length != 0 ? filterdata[0].id : randomId}
                </div>
              </div> */}

              {/* Bill From */}
              <div className="row mt-3 mx-2">
                <div className="col-md-12 bill-form">Bill From</div>
                {/* {formData} */}
              </div>

              {/* Street Address */}
              <div className="row mx-2">
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      htmlFor="address1"
                      className="input-clr mb-1"
                      onClick={() => {
                        // console.log(filterdata);
                      }}
                    >
                      Street Address
                    </label>
                    <Field
                      type="text"
                      name="address1"
                      className="form-control input-settings"
                      id="address1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="address1"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>

              {/* City, Postal Code, Country */}
              <div className="row mx-2 mt-1">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="city1" className="input-clr mb-1">
                      City
                    </label>
                    <Field
                      name="city1"
                      type="text"
                      className="form-control input-settings"
                      id="city1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="city1"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="code1" className="input-clr mb-1">
                      Post Code
                    </label>
                    <Field
                      type="number"
                      name="code1"
                      className="form-control input-settings"
                      id="code1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="code1"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="country1" className="input-clr mb-1">
                      Country
                    </label>
                    <Field
                      type="text"
                      name="country1"
                      className="form-control input-settings"
                      id="country1"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="country1"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="row mt-4 mx-2">
                <div className="col-md-12 bill-form">Bill To</div>
              </div>

              {/* Client's Name */}
              <div className="row mx-2 mt-1">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="name" className="input-clr mb-1">
                      Client's Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control input-settings"
                      id="name"
                      aria-describedby="emailHelp"
                      placeholder=""
                      list="clientNames"
                      onChange={(e) => {
                        handleChange(e);
                        handleClientChange(e.target.value, setValues, values);
                      }}
                    />

                    <datalist id="clientNames">
                      {/* {formData.map((elem) => (
                        <option key={elem.id} value={elem.name} />
                      ))} */}
                    </datalist>

                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* Client's Email */}
              <div className="row mx-2 mt-1">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="email" className="input-clr mb-1">
                      Client's Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control input-settings placeholdercolor"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="e.g. email@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* Street Address */}
              <div className="row mx-2 mt-1">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="address2" className="input-clr mb-1">
                      Street Address
                    </label>
                    <Field
                      type="text"
                      name="address2"
                      className="form-control input-settings"
                      id="address2"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="address2"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* City, Postal Code, Country Again */}
              <div className="row mx-2 mt-1">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="city2" className="input-clr mb-1">
                      City
                    </label>
                    <Field
                      type="text"
                      name="city2"
                      className="form-control input-settings"
                      id="city2"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="city2"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="code2" className="input-clr mb-1">
                      Post Code
                    </label>
                    <Field
                      type="number"
                      name="code2"
                      className="form-control input-settings"
                      id="code2"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="code2"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="country2" className="input-clr mb-1">
                      Country
                    </label>
                    <Field
                      type="text"
                      name="country2"
                      className="form-control input-settings"
                      id="country2"
                      aria-describedby="emailHelp"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="country2"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* Invoice date , Due date */}
              <div className="row mx-2 mt-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date" className="input-clr mb-1">
                      Invoice date
                    </label>
                    <Field
                      type="date"
                      name="date"
                      className="form-control input-settings"
                      id="date"
                      value={values.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="duedate" className="input-clr mb-1">
                    Due Date
                  </label>
                  <Field
                    type="date"
                    name="datedue"
                    className="form-control input-settings"
                    id="duedate"
                    // value={values.date}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="datedue"
                    component="div"
                    className="text-danger "
                  />
                </div>
              </div>

              {/* Description */}
              <div className="row mx-2 mt-1">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description" className="input-clr mb-1">
                      Description
                    </label>
                    <Field
                      type="text"
                      name="description"
                      className="form-control input-settings placeholdercolor"
                      id="description"
                      aria-describedby="emailHelp"
                      placeholder="e.g. Graphic Design Service"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger "
                    />
                  </div>
                </div>
              </div>

              {/* Currency */}
              <div className="row mx-2 mt-1">
                <div className="col-md-6">
                  <label htmlFor="currency" className="input-clr mb-1">
                    Currency
                  </label>
                  <Field
                    id="currency"
                    as="select"
                    name="currency"
                    className="form-select input-settings downarrow"
                    aria-label="Default select example"
                  >
                    <option value="₹">Rs</option>
                    <option value="₹">₹</option>
                    <option value="₣">₣</option>
                    <option value="¥">¥</option>
                    <option value="£">£</option>
                    <option value="$">$</option>
                  </Field>
                  <ErrorMessage
                    name="currency"
                    component="div"
                    className="text-danger "
                  />
                </div>
              </div>

              {/* Item List Heading */}
              <div className="row mx-2 mt-3">
                <div className="col-md-12 item-list"> Item List </div>
              </div>

              {/* Item List Headings */}
              <div className="row mx-2 my-2">
                <div className="col-md-3 input-clr1">Item Name</div>
                <div className="col-md-2 input-clr1">Qty.</div>
                <div className="col-md-2 input-clr1">Price</div>
                <div className="col-md-1 input-clr1">Tax(%)</div>
                <div className="col-md-4 input-clr1 text-center">Total</div>
              </div>

              {/* Map */}
              {data1.map((elem, index) => {
                const quantity = values[`quantity${elem.id}`] || 0;
                const price = values[`price${elem.id}`] || 0;
                const Tax = values[`tax${elem.id}`] || 0;

                const total = quantity * price;
                const taxPercentage = Tax / 100;
                const finalTotal = total + total * taxPercentage; //final total of 1 index

                return (
                  <div className="row mx-2 my-3">
                    <div className="col-md-3">
                      <div className="form-group">
                        <Field
                          type="text"
                          name={`item${elem.id}`}
                          className="form-control input-settings placeholdercolor"
                          id="item"
                          aria-describedby="emailHelp"
                          placeholder="item name"
                        />
                        <ErrorMessage
                          name={`item${elem.id}`}
                          component="div"
                          className="text-danger "
                        />
                      </div>
                    </div>

                    <div className="col-md-2 ">
                      <div className="form-group">
                        <Field
                          type="number"
                          name={`quantity${elem.id}`}
                          className="form-control input-settings placeholdercolor"
                          id="quantity"
                          aria-describedby="emailHelp"
                          placeholder="qty"
                        />
                        <ErrorMessage
                          name={`quantity${elem.id}`}
                          component="div"
                          className="text-danger "
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-md-2">
                      <div className="form-group">
                        <Field
                          type="number"
                          name={`price${elem.id}`}
                          className="form-control input-settings placeholdercolor"
                          id="price"
                          aria-describedby="emailHelp"
                          placeholder="price"
                        />
                        <ErrorMessage
                          name={`price${elem.id}`}
                          component="div"
                          className="text-danger "
                        />
                      </div>
                    </div>

                    {/* Tax */}
                    <div className="col-md-2">
                      <div className="form-group">
                        <Field
                          type="number"
                          name={`tax${elem.id}`}
                          className="form-control input-settings placeholdercolor"
                          id="tax"
                          placeholder="tax"
                        />
                        <ErrorMessage
                          name={`tax${elem.id}`}
                          component="div"
                          className="text-danger "
                        />
                      </div>
                    </div>

                    {/* Total */}
                    <div
                      className="col-md-2"
                      name="total"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                    {(finalTotal ?? 0).toFixed(0)}
                    </div>

                    <div
                      className="col-md-1 trash p-0"
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      {/* delete icon */}
                      <span
                        className="cursor basket"
                        onClick={() => clearrow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Add New Item button */}
              <div className="row mx-2">
                <button
                  type="button"
                  className="btn input-clr1 add-btn py-2"
                  onClick={addnew}
                >
                  + Add New Item
                </button>
              </div>

              {/* Cancel & Save & New Invoice */}
              <div className="row mt-3 m-0 p-0">
                <div className="col-md-3"></div>
                <div
                  className="col-md-9"
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <button
                    type="button"
                    onClick={handelcancel}
                    className="btn input-clr1 cancel py-2 px-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn input-clr1 save py-2"
                    onClick={() => overall(values, 1)}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => overall(values, 2)}
                    type="submit"
                    className="btn input-clr1 save-changes py-2"
                  >
                    Create Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
