import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useRecoilState } from "recoil";
import { printclientdata } from "../State/Atom";
import axios from "axios";

export default function Client() {
  let [formData, setFormData] = useRecoilState(printclientdata); //map client data (Recoil use here)
  let [ButtonUpdate, setButtonUpdate] = useState(""); //for button text update
  let [editingIndex, setEditingIndex] = useState(-1); //for edit

  const initialValues = {
    name: "",
    email: "",
    address: "",
    city: "",
    code: "",
    country: "",
  };

  const countryOptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Åland Islands", label: "Åland Islands" },
    // ... (Add all the countries with value and label properties)
  ];

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Only alphabetic characters are allowed"
      )
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Name is required"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),

    city: Yup.string().required("City is required"),

    country: Yup.string().required("Select at least one option"),

    code: Yup.string()
      .required("Post Code is required")
      .matches(/^\d{5}$/, "Invalid postcode. It should be 5 digits."),

    address: Yup.string().required("Address is Required"),
  });

  // get method
  useEffect(() => {
    let storeData = JSON.parse(localStorage.getItem("clientData")) || [];
    setFormData(storeData)
  }, []);

  // On Submit Function
  const onSubmit = (values, { resetForm }) => {
    if (editingIndex !== -1) {
      let storedData = JSON.parse(localStorage.getItem("clientData")) || [];
      storedData[editingIndex] = values;
      localStorage.setItem("clientData", JSON.stringify(storedData));
      setFormData(storedData);
      setEditingIndex(-1);
      setButtonUpdate("");
      toast.success("Updated Successfully");
    } else {
      toast.success("Added Successfully");
      // get method
      let storeData = JSON.parse(localStorage.getItem("clientData")) || [];
      // set method
      let clientData = [...storeData, values];
      setFormData(clientData);
      localStorage.setItem("clientData", JSON.stringify(clientData));
    }
    resetForm();
  };

  const handeleditbtn = (index) => {
    setEditingIndex(index);
    setButtonUpdate("Update");
  };

  const handeldeletebtn = (index) => {
    // console.log(index);
    Swal.fire({
      title: "Do you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let storedData = JSON.parse(localStorage.getItem("clientData")) || [];
        storedData.splice(index, 1);
        localStorage.setItem("clientData", JSON.stringify(storedData));
        setFormData(storedData);
        toast.success("Deleted Successfully");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.error("Cancel Successfully");
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
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
              <div className="container-fluid">
                {/* Row 1 */}
                <div className="row mt-3 pt-5 justify-content-center">
                  <div className=" col-12 col-sm-12 col-md-8 p-3 rounded">
                    {/* Add New Client Heading */}
                    <div className="row">
                      <div className="col-12 add-new-client mt-2 mb-3 input-clr">
                        Add New Client
                      </div>
                    </div>

                    {/* Client Name / Email */}
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="form-label input-clr"
                          >
                            Client Name:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="name"
                            name="name"
                          />
                        </div>

                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>

                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="">
                          <label
                            htmlFor="Email"
                            className="form-label input-clr"
                          >
                            Client Email:
                          </label>
                          <Field
                            type="email"
                            className="form-control input-settings"
                            id="Email"
                            name="email"
                          />
                        </div>

                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>

                    {/* Street Address / City */}
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="">
                          <label
                            htmlFor="Address"
                            className="form-label input-clr"
                          >
                            Street Address:
                          </label>
                          <Field
                            type="text"
                            className="form-control input-settings"
                            id="Address"
                            name="address"
                          />
                        </div>

                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>

                      <div className="col-12 col-sm-12 col-md-6">
                        <label htmlFor="City" className="form-label input-clr">
                          City:
                        </label>
                        <Field
                          type="text"
                          id="City"
                          className="form-control input-settings"
                          aria-label="Default select example"
                          name="city"
                        ></Field>

                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>

                    {/* Post Code / Country */}
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label input-clr"
                          >
                            Post Code:
                          </label>
                          <Field
                            type="number"
                            className="form-control input-settings"
                            id="exampleFormControlTextarea1"
                            name="code"
                          ></Field>

                          <ErrorMessage
                            name="code"
                            component="div"
                            className="text-danger fw-bold"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-6">
                        <label
                          htmlFor="Country"
                          className="form-label input-clr"
                        >
                          Select Country:
                        </label>

                        <Field
                          list="browsers"
                          id="Country"
                          className="form-select input-settings"
                          name="country"
                        />

                        <datalist id="browsers" className="datalist">
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">
                            Antigua and Barbuda
                          </option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">
                            Bosnia and Herzegovina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">
                            British Indian Ocean Territory
                          </option>
                          <option value="Brunei Darussalam">
                            Brunei Darussalam
                          </option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos (Keeling) Islands">
                            Cocos (Keeling) Islands
                          </option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">
                            Congo, The Democratic Republic of The
                          </option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D'ivoire">Cote D'ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Territories">
                            French Southern Territories
                          </option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guernsey">Guernsey</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-bissau">Guinea-bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard Island and Mcdonald Islands">
                            Heard Island and Mcdonald Islands
                          </option>
                          <option value="Holy See (Vatican City State)">
                            Holy See (Vatican City State)
                          </option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">
                            Iran, Islamic Republic of
                          </option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jersey">Jersey</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea, Democratic People's Republic of">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="Korea, Republic of">
                            Korea, Republic of
                          </option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao People's Democratic Republic">
                            Lao People's Democratic Republic
                          </option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">
                            Libyan Arab Jamahiriya
                          </option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">
                            Macedonia, The Former Yugoslav Republic of
                          </option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">
                            Micronesia, Federated States of
                          </option>
                          <option value="Moldova, Republic of">
                            Moldova, Republic of
                          </option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">
                            Netherlands Antilles
                          </option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">
                            Northern Mariana Islands
                          </option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russian Federation">
                            Russian Federation
                          </option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">
                            Saint Kitts and Nevis
                          </option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">
                            Saint Pierre and Miquelon
                          </option>
                          <option value="Saint Vincent and The Grenadines">
                            Saint Vincent and The Grenadines
                          </option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">
                            Sao Tome and Principe
                          </option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">
                            Solomon Islands
                          </option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia and The South Sandwich Islands">
                            South Georgia and The South Sandwich Islands
                          </option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">
                            Svalbard and Jan Mayen
                          </option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">
                            Syrian Arab Republic
                          </option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">
                            Tanzania, United Republic of
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">
                            Trinidad and Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">
                            Turks and Caicos Islands
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">
                            United States Minor Outlying Islands
                          </option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">
                            Virgin Islands, British
                          </option>
                          <option value="Virgin Islands, U.S.">
                            Virgin Islands, U.S.
                          </option>
                          <option value="Wallis and Futuna">
                            Wallis and Futuna
                          </option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </datalist>

                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-danger fw-bold"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6">
                        <button
                          type="submit"
                          className="btn input-clr1 save-changes py-2 mt-3 mt-md-0 btn-responsive-width"
                          style={{
                            minHeight: '48px'
                          }}
                        >
                          {ButtonUpdate || "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-12 col-md-11 m-0 p-0">
                    {/* Desktop Table View - Hidden on small screens */}
                    <div className="d-none d-md-block">
                      <table id="table" className="table table-striped p-3">
                        <thead>
                          <tr className="head-settings">
                            <th scope="col" className="head-settings">
                              #
                            </th>
                            <th scope="col" className="head-settings">
                              Name
                            </th>
                            <th scope="col" className="head-settings">
                              Email
                            </th>
                            <th scope="col" className="head-settings">
                              Address
                            </th>
                            <th scope="col" className="head-settings">
                              City
                            </th>
                            <th scope="col" className="head-settings">
                              Post Code
                            </th>
                            <th scope="col" className="head-settings">
                              Country
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
                              <td className="body-settings">{elem.name}</td>
                              <td className="body-settings">{elem.email}</td>
                              <td className="body-settings">{elem.address}</td>
                              <td className="body-settings">{elem.city}</td>
                              <td className="body-settings">{elem.code}</td>
                              <td className="body-settings">{elem.country}</td>
                              <td className="body-settings">
                                <button
                                  onClick={() => handeleditbtn(index)}
                                  type="button"
                                  className="btn btn-warning mx-2"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handeldeletebtn(index)}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View - Hidden on large screens */}
                    <div className="d-block d-md-none">
                      {formData.map((item, index) => (
                        <div key={index} className="card mb-3" style={{
                          backgroundColor: '#1e2139',
                          border: '1px solid #373b53',
                          borderRadius: '12px'
                        }}>
                          <div className="card-body p-3">
                            <div className="row">
                              <div className="col-12 mb-2">
                                <strong style={{ color: '#7c5dfa' }}>Name:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.name}</span>
                              </div>
                              <div className="col-12 mb-2">
                                <strong style={{ color: '#7c5dfa' }}>Email:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.email}</span>
                              </div>
                              <div className="col-12 mb-2">
                                <strong style={{ color: '#7c5dfa' }}>Address:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.address}</span>
                              </div>
                              <div className="col-6 mb-2">
                                <strong style={{ color: '#7c5dfa' }}>City:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.city}</span>
                              </div>
                              <div className="col-6 mb-2">
                                <strong style={{ color: '#7c5dfa' }}>Code:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.code}</span>
                              </div>
                              <div className="col-12 mb-3">
                                <strong style={{ color: '#7c5dfa' }}>Country:</strong>
                                <span className="ms-2" style={{ color: '#ffffff' }}>{item.country}</span>
                              </div>
                              <div className="col-12">
                                <div className="d-flex gap-2">
                                  <button
                                    type="button"
                                    className="btn edit flex-fill"
                                    onClick={() => handeleditbtn(index)}
                                    style={{
                                      minHeight: '44px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn delete flex-fill"
                                    onClick={() => handeldeletebtn(index)}
                                    style={{
                                      minHeight: '44px',
                                      fontSize: '14px',
                                      fontWeight: '500'
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
        />
      </div>
    </>
  );
}
