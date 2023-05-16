import styles from "../../../styles/admin/admission/editStudents/editStudent.module.css"
import React, { Fragment, useRef, useState } from "react";
import img2 from "/imgs/image_2.svg";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "../../../components/admin/newAdmission/SuccessPopup";
import NotFilledPopup from "../../../components/admin/newAdmission/NotFilledPopup";
import Field from "../../../components/admin/newAdmission/Field";
import SelectField from "../../../components/admin/newAdmission/SelectField";
import NavBar from "../../../components/NavBar"
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// ---------------- default function ----------------

function editStudents() {

    // ---------------- States ----------------

    const dataTemplete = {
        admissionDate: "",
        applicationNo: "",
        name: "",
        aadhaarNo: "",
        phone: "", // This should be an integer
        gender: "male",
        nameOfParent: "",
        occupationOfParent: "",
        relationshipWithGuardian: "",
        addressOfGuardian: "",
        religion: "",
        caste: "",
        category: "",
        linguisticMinority: "",
        obc: true, // this should be boolean value
        dob: "",
        class: 11, // This should be an integer
        course: "PCMB",
        secondLanguage: "Malayalam",
        status: "permanent",
        qualifyingExamDetails: {
            nameOfBoard: "",
            registerNo: "", // This should be an integer
            passingTime: "",
        },
        tcDetailsOnAdmission: {
            number: "",
            date: "",
            school: "",
        },
    }

    const [data, setData] = useState(dataTemplete);
    const [popup, setPopup] = useState(false);
    const [notFilledError, setNotFilledError] = useState(false);
    const [filePhoto, setFilePhoto] = useState("");
    const [param] = useSearchParams();
    const id = param.getAll("id");


    function getData() {
        Axios.get(`admin/get-student?studentId=${id}`)
            .then((response) => {
                delete response.data._id
                setData(response.data)})
            .catch((err) => { if (err == true) { console.error(err) } else { console.log("server connection error") } })
    }

    useEffect(
        getData, []
    )

    // ---------------- Handle Change Function for input feild
    function handleChange(event) {
        if (event && event.target) {
            const name = event.target.name;
            const value = event.target.value;

            if (
                name == "nameOfBoard" ||
                name == "registerNo" ||
                name == "passingTime"
            ) {
                setData({
                    ...data,
                    qualifyingExamDetails: {
                        ...data.qualifyingExamDetails,
                        [name]: value,
                    },
                });
            } else if (name == "number" || name == "date" || name == "school") {
                setData({
                    ...data,
                    tcDetailsOnAdmission: {
                        ...data.tcDetailsOnAdmission,
                        [name]: value,
                    },
                });
            } else {
                setData({
                    ...data,
                    [name]: value,
                });
            }
        }
    }

    // ---------------- onchange fn for photo upload ----------------

    function onChangePhoto(e) {
        setGlobal(true);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFilePhoto(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    // ---------------- handle fn for final submit ----------------

    function handleSubmit(event) {
        event.preventDefault();

        var hasNullOrUndefinedValue = false;

        // type casting the variable specified
        data.tcDetailsOnAdmission.number = Number(data.tcDetailsOnAdmission.number);
        data.phone = Number(data.phone);
        data.obc = Boolean(data.obc);
        data.class = Number(data.class);
        data.qualifyingExamDetails.registerNo = Number(
            data.qualifyingExamDetails.registerNo
        );

        for (var prop in data) {
            if (data[prop] === "") {
                setNotFilledError(true);
                console.log(prop + " field is not filled");
                hasNullOrUndefinedValue = true;
                break;
            }
        }

            if (hasNullOrUndefinedValue) {
                console.log("no");
                console.log(data);
            } else {
                console.log("yes");
                console.log(data);
                Axios.put(`admin/edit-student?studentId=${id}`, data)
                    .then((response) => {
                        const formData = new FormData();
                        formData.append("file", filePhoto)

                        console.log("paniyaayi")

                        // Axios.post(
                        //     `admin/upload-student-photo?studentId=${id}`,
                        //     formData
                        // ).catch((err) => {
                        //     alert(err.response?.data);
                        // });

                        setPopup(!popup);
                        setData(dataTemplete);
                    })
                    .catch((err) => {
                        
                         if (err.response == undefined){
                            console.log("server connection err OR err in .then")
                         } else{
                            console.log(err.response.data)
                         }
                    });
            }
    }

    return (
        <div className={`${styles.globalParent}`}>
            <NavBar />

            {/* ---------------- top infos ----------------   */}

            <div className={`${styles.subContainer}`}>
                <img className={`${styles.img2}`} src={img2} />
                <label className={`${styles.titleLabel}`}>Edit student</label>
                <hr className={`${styles.stopLine}`} />
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.pathBox}`}>
                <label className={`${styles.pathLabel}`}>Home</label>
                <label className={`${styles.pathLabel}`}>-</label>
                <label className={`${styles.pathLabel}`}>Admissions</label>
                <label className={`${styles.pathLabel}`}>-</label>
                <label className={`${styles.pathLabel}`}>Edit students</label>
            </div>

            <img className={styles.photoContainer} src={filePhoto} ></img>

            <Field
                text="Upload photo"
                type="file"
                change={onChangePhoto}
                extention="image/*"
                inputStyle={styles.uploadPhoto}
                containerClass={styles.subContainerNew}
                styling={{ marginRight: "64vw" }}
            />

            {/* ---------------- Container 1 ----------------  */}

            <div className={`${styles.container}`}>
                <Field
                    text="Application number"
                    type="number"
                    change={handleChange}
                    value={data.applicationNo}
                    name="applicationNo"
                    containerClass={`${styles.subContainer} ${styles.applicationNo}`}
                />
                <Field
                    text="Application Date"
                    type="date"
                    change={handleChange}
                    value={data.admissionDate}
                    name="admissionDate"
                    containerClass={`${styles.subContainer} ${styles.applicationNo}`}
                />
            </div>
            <hr className={`${styles.separationLine}`} />

            {/* ---------------- Container 2 ----------------  */}

            <div className={`${styles.containerNew} `}>
                <Field
                    text="Name of the student"
                    change={handleChange}
                    value={data.name}
                    name="name"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Aadhaar no."
                    type="number"
                    change={handleChange}
                    value={data.aadhaarNo}
                    name="aadhaarNo"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Phone no."
                    type="number"
                    change={handleChange}
                    value={data.phone}
                    name="phone"
                    containerClass={styles.subContainerNew}
                />
                <SelectField
                    text="Gender"
                    change={handleChange}
                    value={data.gender}
                    name="gender"
                    option={[
                        ["Male", "male"],
                        ["Female", "female"],
                        ["Others", "others"],
                    ]}
                    containerClass={styles.subContainerNew}
                />
            </div>
            <hr className={`${styles.separationLine}`} />

            {/* ---------------- Container 3 ----------------  */}

            <div className={`${styles.containerNew} `}>
                <Field
                    text="Name of the parent / guardian"
                    change={handleChange}
                    value={data.nameOfParent}
                    name="nameOfParent"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Occupation of the parent / guardian"
                    change={handleChange}
                    value={data.occupationOfParent}
                    name="occupationOfParent"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Relationship of the student to guardian"
                    change={handleChange}
                    value={data.relationshipWithGuardian}
                    name="relationshipWithGuardian"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Address of guardian"
                    change={handleChange}
                    value={data.addressOfGuardian}
                    name="addressOfGuardian"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Religion"
                    change={handleChange}
                    value={data.religion}
                    name="religion"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Caste"
                    change={handleChange}
                    value={data.caste}
                    name="caste"
                    containerClass={styles.subContainerNew}
                />
                <SelectField
                    text=" Does the student belong to OBC"
                    change={handleChange}
                    value={data.obc}
                    name="obc"
                    option={[
                        ["yes", true],
                        ["no", false],
                    ]}
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Category"
                    change={handleChange}
                    value={data.category}
                    name="category"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="If the student belong to linguistic minority specify the language"
                    change={handleChange}
                    value={data.linguisticMinority}
                    name="linguisticMinority"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="DOB"
                    type="date"
                    change={handleChange}
                    value={data.dob}
                    name="dob"
                    containerClass={styles.subContainerNew}
                />
            </div>

            {/* ---------------- Container 4 ----------------  */}

            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <Field
                    text="Class in which admitted"
                    type="number"
                    min={8}
                    max={12}
                    change={handleChange}
                    value={data.class}
                    name="class"
                    containerClass={styles.subContainerNew}
                />
                <SelectField
                    text="Course in which admitted"
                    course
                    change={handleChange}
                    value={data.course}
                    name="course"
                    option={[
                        ["PCMB - Physics, Chemistry, Maths, Biology", "PCMB"],
                        ["PCMC - Physics, Chemistry, Maths, Computer Science", "PCMC"],
                        [
                            "COMMERCE - Bussiness, Computer applications, Economics, Accountancy",
                            "COMMERCE",
                        ],
                    ]}
                    containerClass={styles.subContainerNew}
                />
                <SelectField
                    text="Second Language"
                    change={handleChange}
                    value={data.secondLanguage}
                    name="secondLanguage"
                    option={[
                        ["Malayalam", "Malayalam"],
                        ["Arabic", "Arabic"],
                        ["Hindi", "Hindi"]
                    ]}
                    containerClass={styles.subContainerNew}
                />
                <SelectField
                    text="Status"
                    change={handleChange}
                    value={data.status}
                    name="status"
                    option={[
                        ["permanent", "permanent"],
                        ["temporary", "temporary"],
                    ]}
                    containerClass={styles.subContainerNew}
                />
            </div>

            {/* ---------------- Container 5 ----------------  */}

            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <label className={`${styles.subHeadingLabel}`}>
                    Details of qualifying examination
                </label>
                <Field
                    text="Name of Board"
                    change={handleChange}
                    value={data.qualifyingExamDetails.nameOfBoard}
                    name="nameOfBoard"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Register No."
                    type="number"
                    change={handleChange}
                    value={data.qualifyingExamDetails.registerNo}
                    name="registerNo"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Month and year of passing"
                    change={handleChange}
                    value={data.qualifyingExamDetails.passingTime}
                    name="passingTime"
                    containerClass={styles.subContainerNew}
                />
            </div>
            {/* ---------------- Container 6 ----------------  */}
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.containerNew}`}>
                <label className={`${styles.subHeadingLabel}`}>
                    Details of Transfer certificate produced on admission
                </label>
                <Field
                    text="Number"
                    type="number"
                    change={handleChange}
                    value={data.tcDetailsOnAdmission.number}
                    name="number"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Date"
                    type="date"
                    change={handleChange}
                    value={data.tcDetailsOnAdmission.date}
                    name="date"
                    containerClass={styles.subContainerNew}
                />
                <Field
                    text="Issued school / institution"
                    change={handleChange}
                    value={data.tcDetailsOnAdmission.school}
                    name="school"
                    containerClass={styles.subContainerNew}
                />



                <button onClick={handleSubmit} className={`${styles.submitButton}`}>
                    Submit
                </button>
            </div>

            {/* ---------------- Popups ----------------  */}

            <SuccessPopup open={popup} show={setPopup} showVar={popup} />
            <NotFilledPopup
                open={notFilledError}
                show={setNotFilledError}
                showVar={notFilledError}
            />
        </div>
    );
}

export default editStudents;
