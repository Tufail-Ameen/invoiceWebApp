import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function User() {
  let [formData, setFormData] = useState([]); //for show data
  let [editingIndex, setEditingIndex] = useState(-1); //for edit
  let [ButtonUpdate, setButtonUpdate] = useState(""); //for button text update
  let [editid, setEditId] = useState(""); //for update API

  // Get API
  //   useEffect(() => {
  //     axios.get("http://localhost:3000/users").then((response) => {
  //       setFormData(response.data);
  //     });
  //   }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneno: "",
    cnic: "",
    email: "",
    gender: "Male",
    address: "",
    sallary: "",
    pasword: "",
    cPasword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Only alphabetic characters are allowed"
      )
      .min(3, "First Name must be at least 3 characters")
      .max(50, "First Name must be at most 50 characters")
      .required("First Name is required"),

    lastName: Yup.string()
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Only alphabetic characters are allowed"
      )
      .min(3, "Last Name must be at least 3 characters")
      .max(50, "Last Name must be at most 50 characters")
      .required("Last Name is required"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),

    phoneno: Yup.string()
      .required("Phone No is required")
      .test(
        "phone-number",
        "Phone number must be 11 digits and contain only numeric digits",
        (value) => {
          if (!value) return false;
          // Check if the value consists of 11 numeric digits
          return /^\d{11}$/.test(value) && !/\D/.test(value);
        }
      ),

    address: Yup.string().required("Address is Required"),
    pasword: Yup.string().required("Password is required"),
    sallary: Yup.string().required("Sallary is required"),
    cPasword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("pasword"), null], "Passwords must match"),

    cnic: Yup.string()
      .required("CNIC is required")
      .matches(
        /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/,
        "Invalid CNIC format. Please enter a valid CNIC (e.g., 12345-6789012-3)"
      ),
  });

  const onSubmit = (values, { resetForm }) => {
    if (editingIndex !== -1) {
      const data = [...formData];
      data[editingIndex] = values;
      setFormData(data);
      setEditingIndex(-1);
      toast.success("Updated Successfully");
      setButtonUpdate("");
    } else {
      setFormData([...formData, values]);
      toast.success("Added Successfully");
    }
    resetForm();
  };

  const handeldeletebtn = (index) => {
    // alert(index);

    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete Functionality only three lines
        const originalArray = [...formData];
        originalArray.splice(index, 1);
        setFormData(originalArray);
        toast.success("Deleted Successfully");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error("Cancel Successfully");
      }
    });
  };

  const handeleditbtn = (index) => {
    setEditingIndex(index);
    setButtonUpdate("Update");
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="py-3"
          style={{
            backgroundColor: "#141424",
            width: "45%",
            height: "100%",
            marginLeft: "3%",
            paddingLeft: "5%",
            zIndex: "1",
          }}
        ></div>
        <Formik
          initialValues={
            editingIndex !== -1 ? formData[editingIndex] : initialValues
          }
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              {/* Form Start here */}
              {/* container */}
              <div className="container-fluid">
                {/* Row 1 */}
                <div className="row mt-3 pt-3">
                  <div className="col-3"></div>
                  <div className="col-6 p-3">
                    {/* Register Heading */}
                    <div className="row">
                      <div className="col-md-12 add-new-client mt-2 mb-3 input-clr">
                        Register to Create Invoice
                      </div>
                    </div>

                    <div className="row">
                      {/* First Name */}
                      <div className="col-6">
                        <div>
                          <label
                            htmlFor="first-name"
                            className="form-label input-clr"
                          >
                            First Name:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="first-name"
                            name="firstName"
                          />
                        </div>

                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="col-6">
                        <div>
                          <label
                            htmlFor="last-name"
                            className="form-label input-clr"
                          >
                            Last Name:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="last-name"
                            name="lastName"
                          />
                        </div>

                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>

                    <div className="row">
                      {/* Phone no */}
                      <div className="col-6">
                        <div className="">
                          <label
                            htmlFor="phone-no"
                            className="form-label input-clr"
                          >
                            Phone No:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="phone-no"
                            name="phoneno"
                          />
                        </div>

                        <ErrorMessage
                          name="phoneno"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>

                      {/* CNIC: */}
                      <div className="col-6">
                        <div className="">
                          <label
                            htmlFor="cnic"
                            className="form-label input-clr"
                          >
                            CNIC:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="cnic"
                            name="cnic"
                          />
                        </div>

                        <ErrorMessage
                          name="cnic"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>

                    <div className="row">
                      {/* Email */}
                      <div className="col-6">
                        <div className="">
                          <label
                            htmlFor="email"
                            className="form-label input-clr"
                          >
                            Email:
                          </label>
                          <Field
                            type="email"
                            className="form-control input-settings"
                            id="email"
                            name="email"
                          />
                        </div>

                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>

                      {/* Gender */}
                      <div className="col-6">
                        <label className="input-clr">Gender:</label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender"
                            value="Male"
                            checked={values.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label setfont"
                            htmlFor="gender"
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="flexRadioDefault2"
                            value="Female"
                            checked={values.gender === "Female"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label setfont"
                            htmlFor="flexRadioDefault2"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* Address */}
                      <div className="col-6">
                        <div className="mb-3">
                          <label
                            htmlFor="address"
                            className="form-label input-clr"
                          >
                            Address:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="address"
                            name="address"
                          ></Field>

                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>

                      {/* Salary */}
                      <div className="col-6">
                        <div className="mb-3">
                          <label
                            htmlFor="salary"
                            className="form-label input-clr"
                          >
                            Salary:
                          </label>
                          <Field
                            type="number"
                            className="form-control input-settings"
                            id="salary"
                            name="sallary"
                          ></Field>

                          <ErrorMessage
                            name="sallary"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {/* Pasword */}
                      <div className="col-6">
                        <div className="mb-3">
                          <label
                            htmlFor="pasword"
                            className="form-label input-clr"
                          >
                            Password:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="pasword"
                            name="pasword"
                          ></Field>

                          <ErrorMessage
                            name="pasword"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>

                      {/* Confirm Pasword */}
                      <div className="col-6">
                        <div className="mb-3">
                          <label
                            htmlFor="c-pasword"
                            className="form-label input-clr"
                          >
                            Confirm Password:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="c-pasword"
                            name="cPasword"
                          ></Field>

                          <ErrorMessage
                            name="cPasword"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        {/* <Link to="/">Already have an account</Link> */}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="btn input-clr1 save-changes py-2"
                        >
                          {ButtonUpdate || "Register"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row justify-content-center">
                  <div className="col-11">
                    {/* Show data in table */}
                    <table id="table" className="table table-striped m-3 p-3 ">
                      <thead>
                        <tr>
                          <th scope="col" className="head-settings">
                            #
                          </th>
                          <th scope="col" className="head-settings">
                            Name
                          </th>
                          <th scope="col" className="head-settings">
                            Phone No
                          </th>
                          <th scope="col" className="head-settings">
                            CNIC
                          </th>
                          <th scope="col" className="head-settings">
                            Email
                          </th>
                          <th scope="col" className="head-settings">
                            Gender
                          </th>
                          <th scope="col" className="head-settings">
                            Address
                          </th>
                          <th scope="col" className="head-settings">
                            Sallary
                          </th>
                          <th scope="col" className="head-settings">
                            Password
                          </th>
                          <th scope="col" className="head-settings">
                            Options
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {formData.map((elem, index) => (
                          <tr key={index}>
                            <td className="body-settings">{index + 1}</td>
                            <td className="body-settings">
                              {elem.firstName} {elem.lastName}
                            </td>
                            <td className="body-settings"> {elem.phoneno}</td>
                            <td className="body-settings"> {elem.cnic}</td>
                            <td className="body-settings"> {elem.email}</td>
                            <td className="body-settings"> {elem.gender}</td>
                            <td className="body-settings"> {elem.address}</td>
                            <td className="body-settings"> {elem.sallary}</td>
                            <td className="body-settings"> {elem.pasword}</td>
                            <td className="body-settings">
                              <button
                                onClick={() => handeldeletebtn(index)}
                                type="button"
                                className="btn btn-danger mx-2"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handeleditbtn(index)}
                                type="button"
                                className="btn btn-warning"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="colored"
        />
      </div>
    </>
  );
}
