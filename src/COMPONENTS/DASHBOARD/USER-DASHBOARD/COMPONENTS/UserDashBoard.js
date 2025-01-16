import React, { useState, useEffect } from "react";
import './UserDashBoard.css';
import { FaUserMd, FaUsers, FaGraduationCap, FaProcedures, FaHandHoldingHeart, FaIndustry } from 'react-icons/fa';

// Importing images
import image1 from '../IMAGES/slideimage1.jpg';
import image2 from '../IMAGES/slideimage2.jpg';
import image3 from '../IMAGES/slideimage3.png';
import image4 from '../IMAGES/slideimage4.png';
import image5 from '../IMAGES/slideimage5.jpg';
import image6 from '../IMAGES/slideimage6.jpg';
import image7 from '../IMAGES/slideimage7.jpeg';
import image8 from '../IMAGES/slideimage8.jpg';
import image9 from '../IMAGES/slideimage9.png';

// New images for sample section
import jadavImage from '../IMAGES/jadav.jpg';
import jagatImage from '../IMAGES/jagat.jpg';
import cdsImage from '../IMAGES/cds.jpg';
import anupriyaImage from '../IMAGES/Anupriya.jpg';

import UserHeader from "./UserHeader";
import UserNavBar from "./UserNavBar";
import UserFooter from "./UserFooter";

function UserDashBoard() {
  const [currentImage, setCurrentImage] = useState(0);
  const [notices, setNotices] = useState([]);
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9];

  // Image slideshow logic
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  // Fetch notices from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/notices')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setNotices(data))
      .catch((error) => console.error("Error fetching notices:", error.message));
  }, []);

  return (
    <div className="App">
      <UserHeader />
      <UserNavBar />

      {/* Main Content */}
      <main className="main-content">
        {/* Row 1: Statistics, Image Slideshow, and Notices */}
        <section className="row">
          <article className="stat-block">
            <h3>Statistics</h3>
            <p>Total Registrations: 2000</p>
            <p>Total Revisit Website: 1200</p>
            <p>Total OPD: 800</p>
          </article>
          <article className="image-gallery">
            <img
              src={images[currentImage]}
              alt={`Slideshow image ${currentImage + 1}`}
              className="slideshow-image"
            />
          </article>
          <article className="notices">
            <h3 className="NT">Notices</h3>
            <div className="notice-list">
              {notices.length > 0 ? (
                notices.map((notice, index) => (
                  <div key={`notice-${index}`} className="notice-item">
                    <a href={notice.link} className="notice-link">{notice.text}</a>
                  </div>
                ))
              ) : (
                <p>No notices available.</p>
              )}
            </div>
          </article>
        </section>

        {/* Row 2: Sample Images with Text */}
        <section className="row mt-4 sample-cards">
          {[{
            img: jagatImage,
            title: "Shri Jagat Prakash Nadda",
            text: `Hon'ble Union Minister
                  Ministry of Health and Family Welfare
                  Government of India`
          }, {
            img: jadavImage,
            title: "Shri Jadhav Prataprao Ganpatrao",
            text: `Hon'ble Minister of State
                  Ministry of Health and Family Welfare
                  Government of India`
          }, {
            img: cdsImage,
            title: "Dr. CDS Katoch",
            text: `Executive Director, AIIMS Rajkot`
          }, {
            img: anupriyaImage,
            title: "Smt. Anupriya Patel",
            text: `Hon'ble Minister of State
                  Ministry of Health and Family Welfare
                  Government of India`
          }].map(({ img, title, text }, index) => (
            <div key={`card-${index}`} className="sample-card">
              <img src={img} alt={title} className="sample-card-image" />
              <div className="sample-card-body">
                <p className="h5 card-title"><strong>{title}</strong></p>
                <p className="card-text" style={{ fontSize: '12px' }}>{text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Row 3: Quick Links */}
        <section className="quick-links">
          <h3>Quick Links</h3>
          <div className="links">
            {[
              { name: 'Doctors', icon: <FaUserMd /> },
              { name: 'Employees', icon: <FaUsers /> },
              { name: 'Students', icon: <FaGraduationCap /> },
              { name: 'Patients', icon: <FaProcedures /> },
              { name: 'Visitors', icon: <FaHandHoldingHeart /> },
              { name: 'Vendors', icon: <FaIndustry /> }
            ].map((link, index) => (
              <div key={`link-${index}`} className="link-item">
                <div className="link-icon">{link.icon}</div>
                <a href={`#${link.name.toLowerCase()}`}>{link.name}</a>
              </div>
            ))}
          </div>
        </section>

        {/* Row 4: Welcome Message */}
        <section className="row3">
          <p className="welcome-message">Welcome to AIIMS, Rajkot, Gujarat</p>
          <p className="welcome-content">
            All India Institute of Medical Sciences, Rajkot in Gujarat is one amongst the several new AIIMS, 
            being established under the Pradhan Mantri Swasthya Suraksha Yojna (PMSSY) of the Ministry of Health 
            and Family Welfare, Government of India...
          </p>
        </section>
      </main>

      {/* Footer */}
      <UserFooter />
    </div>
  );
}

export default UserDashBoard;
