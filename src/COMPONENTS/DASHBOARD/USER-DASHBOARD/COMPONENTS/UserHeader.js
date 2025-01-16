// Header.js
import React from "react";
import './UserHeader.css';
import logo from '../IMAGES/aiims_rajkot_logo_0_0_0.png';  

const UserHeader = () => {
  return (
    <header className="header">
      <img src={logo} alt="Hospital Logo" className="logo" />
      <div>
      <h4 className="title">અખિલ ભારતીય આયુર્વિજ્ઞાન સંસ્થા, રાજકોટ, ગુજરાત</h4>
       <h4 className="title">अखिल भारतीय आयुर्विज्ञान संस्थान, राजकोट, गुजरात</h4>
       <h4 className="title">ALL INDIA INSTITUTE OF MEDICAL SCIENCES, RAJKOT, GUJARAT</h4>
      <p className="title1">
        (A Central Autonomous Institute of National Importance under 
        Pradhan Mantri Swasthya Suraksha Yojna (PMSSY), 
        Ministry of Health, Government of India)
      </p>
      </div>
    </header>
  );
};

export default UserHeader;
