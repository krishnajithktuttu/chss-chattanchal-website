import { useNavigate } from "react-router-dom";
import styles from "../styles/admin/Admin.module.css";
import NavBar from "../components/NavBar";
import React from "react";
import admission from "/imgs/adminImages/admission.png";
import attendence from "/imgs/adminImages/attendence.png";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; <span>Admin</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission");
              }}
            >
              <span>
                <img src={admission} width="150px" height="150px" />
              </span>
              <h1>Admission</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/attendence");
              }}
            >
              <span>
                <img src={attendence} width="120px" height="120px" />
              </span>
              <h1>Attendence</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers");
              }}
            >
              <span>
                <img src={attendence} width="120px" height="120px" />
              </span>
              <h1>Teacher</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
