// import { useEffect,useState } from "react";
// // import IndexFooter from "../INDEXFOOTER/IndexFooter";
// import axios from "axios";

// const Home = () => {

//     const [quickLinksArray,setQuickLinksArray] = useState([]);
//     const url = "http://10.226.25.102:8080/";

//     useEffect(() => {
//         axios
//             .get(url + "api/menus")
//             .then((response) => {
//                 const data = response.data;
//                 if (response && Array.isArray(data)) {
//                     const quickLinks = data.filter(item => item.isQuickLink === true);
//                     console.log("Quick links: ", quickLinks);
//                     setQuickLinksArray(quickLinks);
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error Fetching Data: ", error);
//             })
//     }, []);


//     return (
//         <>
//             <div className="row pt-3">
//                 <div className="col-md-3">
//                     <div className="card border-0">
//                         <div className="card-body">
//                             <h3>Statistics</h3>
//                             <p>Total Registrations: 2000</p>
//                             <p>Total Revisit Website: 1200</p>
//                             <p>Total OPD: 800</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 text-center">
//                     {/* <img
//                     src="/images/slideimage1.jpg"
//                     alt="Slideshow"
//                     className="img-fluid rounded shadow" /> */}

//                     <div className="card border-0">
//                         <div className="card-body">


//                             <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
//                                 <div className="carousel-inner">
//                                     <div className="carousel-item active">
//                                         <img src="images/slideimage1.jpg" class="d-block w-100" alt="..." />
//                                     </div>
//                                     <div className="carousel-item">
//                                         <img src="images/slideimage1.jpg" class="d-block w-100" alt="..." />
//                                     </div>
//                                     <div className="carousel-item">
//                                         <img src="images/slideimage1.jpg" class="d-block w-100" alt="..." />
//                                     </div>
//                                 </div>
//                                 <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//                                     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                                     <span class="visually-hidden">Previous</span>
//                                 </button>
//                                 <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//                                     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                                     <span class="visually-hidden">Next</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-3">
//                     <div className="card border-0">
//                         <div className="card-body">
//                             <h3>Notices</h3>
//                             <div className="list-group">

//                                 <p>No notices available.</p>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//             <div className="row pt-4">
//                 <div className="col-md-3 col-sm-6 mb-4">
//                     <div className="card ">
//                         <div className="overflow-hidden" style={{ height: "200px" }}>
//                             <img
//                                 src="/images/jagat.jpg"
//                                 className="card-img-top img-fluid w-100"
//                                 alt="Jagat Prakash Nadda"
//                                 style={{ height: "200px", objectFit: "contain" }}
//                             />
//                         </div>

//                         <div className="card-body d-flex flex-column">
//                             <h5 className="card-title text-center">
//                                 <strong>Shri Jagat Prakash Nadda</strong>
//                             </h5>
//                             <p className="card-text text-center mt-auto" style={{ fontSize: "12px" }}>
//                                 Hon'ble Union Minister<br />
//                                 Ministry of Health and Family Welfare<br />
//                                 Government of India
//                             </p>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="col-md-3 col-sm-6 mb-4">
//                     <div className="card ">
//                         <div className="overflow-hidden" style={{ height: "200px" }}>
//                             <img
//                                 src="/images/jadav.jpg"
//                                 className="card-img-top img-fluid w-100"
//                                 alt="Jadav Prataprao Ganpatrao"
//                                 style={{ height: "200px", objectFit: "contain" }}
//                             />
//                         </div>

//                         <div className="card-body d-flex flex-column">
//                             <h5 className="card-title text-center">
//                                 <strong>Shri Jadhav Prataprao Ganpatrao</strong>
//                             </h5>
//                             <p className="card-text text-center mt-auto" style={{ fontSize: "12px" }}>
//                                 Hon'ble Minister of State<br />
//                                 Ministry of Health and Family Welfare<br />
//                                 Government of India
//                             </p>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="col-md-3 col-sm-6 mb-4">
//                     <div className="card ">
//                         <div className="overflow-hidden" style={{ height: "200px" }}>
//                             <img src="/images/cds.jpg" 
//                             className="card-img-top img-fluid h-100 w-100" 
//                             alt="Dr. CDS Katoch"
//                             style ={{height: "200px",objectFit: "contain"}} />
//                         </div>
//                         <div className="card-body d-flex flex-column">
//                             <h5 className="card-title text-center">
//                                 <strong>Dr. CDS Katoch</strong>
//                             </h5>
//                             <p className="card-text text-center mt-auto" style={{ fontSize: "12px" }}>
//                                 Executive Director, AIIMS Rajkot
//                             </p>
//                         </div>
//                     </div>
//                 </div>


//                 <div className="col-md-3 col-sm-6 mb-4">
//                     <div className="card ">
//                         <div className="overflow-hidden justify-content-center" style={{ height: "200px" }}>
//                             <img src="/images/Anupriya.jpg" 
//                             className="card-img-top img-fluid h-100 w-100" 
//                             alt="Smt. Anupriya Patel"
//                             style ={{height: "200px",objectFit: "contain"}} />
//                         </div>
//                         <div className="card-body d-flex flex-column">
//                             <h5 className="card-title text-center">
//                                 <strong>Smt. Anupriya Patel</strong>
//                             </h5>
//                             <p className="card-text text-center mt-auto" style={{ fontSize: "12px" }}>
//                                 Hon'ble Minister of State<br />
//                                 Ministry of Health and Family Welfare<br />
//                                 Government of India
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="col-md-12">
//                 <div className="card border-0">
//                     <div className="card-body">
//                         <h3>Quick Links</h3>
//                         <div className="list-group">
//                             {quickLinksArray.length > 0 ? (
//                                 <div className="d-flex flex-wrap justify-content-start">
//                                     {quickLinksArray.map((link, index) => (
                                        
//                                         <a
//                                             key={index}
//                                             href={`#${link.menu_name ? link.menu_name.toLowerCase() : ''}`}
//                                             className="btn btn-outline-primary m-2 text-dark"
//                                         >
//                                             {link.menu_name}
//                                         </a>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <p>No quick links available.</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-md-12 col-sm-12">
//                     <div className="card border-0">
//                         <div className="card-body">
//                             <h3 className="text-center">Welcome to AIIMS, Rajkot, Gujarat</h3>
//                             <p className="text-justify pt-3">
//                                 All India Institute of Medical Sciences, Rajkot in Gujarat is one amongst
//                                 the several new AIIMS, being established under the Pradhan Mantri Swasthya
//                                 Suraksha Yojna (PMSSY) of the Ministry of Health and Family Welfare,
//                                 Government of India. AIIMS, Rajkot has objectives to reduce the “gaps” in
//                                 affordable tertiary health care and to generate ‘wellness’ amongst the
//                                 general population. AIIMS, Rajkot is under the phase six of the Pradhan
//                                 Mantri Swasthya Suraksha Yojna (PMSSY). AIIMS Rajkot shall be a 750 bedded
//                                 hospital with multiple speciality as well as superspeciality departments.
//                                 The Project cost of construction is about Rs. 1195 Crores, which includes
//                                 an allocation of Rs. 185 Crores towards state-of-the art medical equipment.
//                                 The Government of Gujarat has allotted about 201 Acres of Land for the
//                                 project and shall take care of access roads, water facilities and provision
//                                 of electricity connection.
//                             </p>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             <div className="row bgcolor">
//                 <div className="col-md-4 col-sm-4">
//                     <div className="card border-0">
//                         <div className="card-body bgcolor  text-white">
//                             <div className="region region-footer-first">
//                                 <div id="block-contact-2" className="block block-block-content ">
//                                     <h2>Contacts</h2>
//                                     <div>
//                                         <p className="elementor-heading-title elementor-size-default">
//                                             All India Institute Of Medical Sciences (AIIMS),<br />
//                                             Khanderi, Para Pipaliya, Rajkot, Gujarat, INDIA, 360006
//                                         </p>
//                                         <p className="elementor-heading-title elementor-size-default">
//                                             Deputy Director (Administration) :
//                                         </p>
//                                         <p className="elementor-heading-title elementor-size-default">
//                                             dda.aiimsrajkot@gmail.com
//                                         </p>
//                                         <p className="elementor-heading-title elementor-size-default">
//                                             Patient Help Line : +918140140573
//                                         </p>
//                                         <p className="elementor-heading-title elementor-size-default">
//                                             +918128640573
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <div className="col-md-4 col-sm-4">
//                     <div className="card border-0">
//                         <div className="card-body bgcolor text-white">
//                             <div className="region region-footer-second">
//                                 <div id="block-statistics-2" className="block block-block-content">
//                                     <h2>Statistics</h2>
//                                     <div id="visitor-counter" style={{ marginTop: "20px" }}>
//                                         <p style={{ textDecoration: "bold", color: "#fff" }}>Visitor's Count</p>
//                                         <p>
//                                             <script
//                                                 type="text/javascript"
//                                                 src="https://www.freevisitorcounters.com/auth.php?id=26144b344ab930dd596c18a09ee31fcf6a42b6cf"
//                                             ></script>
//                                             <script
//                                                 type="text/javascript"
//                                                 src="https://www.freevisitorcounters.com/en/home/counter/1231935/t/3"
//                                             ></script>
//                                             <a
//                                                 href="https://www.freevisitorcounters.com/en/home/stats/id/1231935"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                             >
//                                                 <img
//                                                     src="https://www.freevisitorcounters.com/en/counter/render/1231935/t/3"
//                                                     border="0"
//                                                     className="counterimg"
//                                                     alt="Visitor Counter"
//                                                 />
//                                             </a>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//                 <div className="col-md-4 col-sm-4">
//                     <div className="card border-0">
//                         <div className="card-body bgcolor  text-white">
//                             <div className="region region-footer-third">
//                                 <div id="block-usefullinks-2" className="block block-block-content">
//                                     <h2>Useful Links</h2>
//                                     <div>
//                                         {/* {usefulLinks.length > 0 ? (
//                       usefulLinks.map((link, index) => (
//                         <div key={index} className="row">
//                           <div className="col-sm-6">
//                             <a href={link.ul_link} target="_blank" rel="noopener noreferrer">
//                               {link.ul_text}
//                             </a>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No useful links available.</p>
//                     )} */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>


//         </>

//     )
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../HOME/Home.css';

const Home = ({ isHindi }) => {
    const url = "http://10.226.25.102:8080/";
    const [quickLinksArray, setQuickLinksArray] = useState([]);

    // EXTRACTING THE QUICK LINKS
    useEffect(() => {
        axios
            .get(url + "api/menus")
            .then((response) => {
                const data = response.data;
                if (response && Array.isArray(data)) {
                    const quickLinks = data.filter(item => item.isQuickLink === true);
                    console.log("Quick links: ", quickLinks);
                    setQuickLinksArray(quickLinks);
                }
            })
            .catch((error) => {
                console.error("Error Fetching Data: ", error);
            })
    }, []);

    const handleLinkClick = (link, event) => {
        event.preventDefault(); // Prevent page reload
        if (!link.menu_name) {
            console.error("Link is missing ");
            return;
        }
    };

    return (
        <>
            <div className="row pt-3">
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3>Statistics</h3>
                            <p>Total Registrations: 2000</p>
                            <p>Total Revisit Website: 1200</p>
                            <p>Total OPD: 800</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-center">
                    <div className="card border-0">
                        <div className="card-body">
                            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="images/slideimage1.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage2.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage3.png" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage4.png" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage5.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage6.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage7.jpeg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage8.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="images/slideimage9.png" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3>Notices</h3>
                            <div className="list-group">
                                <p>No notices available.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="sample-cards">
                <div className="sample-card">
                    <img src="/images/jagat.jpg" alt="Jagat Prakash Nadda" />
                    <div className="sample-card-body">
                        <h5 className="card-title">
                            <strong>Shri Jagat Prakash Nadda</strong>
                        </h5>
                        <p className="card-text" style={{ fontSize: "12px" }}>
                            Hon'ble Union Minister<br />
                            Ministry of Health and Family Welfare<br />
                            Government of India
                        </p>
                    </div>
                </div>

                <div className="sample-card">
                    <img src="/images/jadav.jpg" alt="Jadav Prataprao Ganpatrao" />
                    <div className="sample-card-body">
                        <h5 className="card-title">
                            <strong>Shri Jadhav Prataprao Ganpatrao</strong>
                        </h5>
                        <p className="card-text" style={{ fontSize: "12px" }}>
                            Hon'ble Minister of State<br />
                            Ministry of Health and Family Welfare<br />
                            Government of India
                        </p>
                    </div>
                </div>

                <div className="sample-card">
                    <img src="/images/cds.jpg" alt="Dr. CDS Katoch" />
                    <div className="sample-card-body">
                        <h5 className="card-title">
                            <strong>Dr. CDS Katoch</strong>
                        </h5>
                        <p className="card-text" style={{ fontSize: "12px" }}>
                            Executive Director, AIIMS Rajkot
                        </p>
                    </div>
                </div>

                <div className="sample-card">
                    <img src="/images/Anupriya.jpg" alt="Smt. Anupriya Patel" />
                    <div className="sample-card-body">
                        <h5 className="card-title">
                            <strong>Smt. Anupriya Patel</strong>
                        </h5>
                        <p className="card-text" style={{ fontSize: "12px" }}>
                            Hon'ble Minister of State<br />
                            Ministry of Health and Family Welfare<br />
                            Government of India
                        </p>
                    </div>
                </div>
            </div>

            <div className="row pt-3">
                <div className="col-md-12">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3>Quick Links</h3>
                            <div className="list-group">
                                {quickLinksArray.length > 0 ? (
                                    <div className="d-flex flex-wrap justify-content-start">
                                        {quickLinksArray.map((link, index) => (
                                            <a
                                                key={index}
                                                href={`#${link.menu_name ? link.menu_name.toLowerCase().replace(/\s+/g, '-') : ''}`}
                                                className="btn btn-outline-primary m-2 text-dark"
                                                onClick={(e) => handleLinkClick(link, e)} // Pass 'link' instead of 'menu'
                                            >
                                                {isHindi && link.hindiMenuName ? link.hindiMenuName : link.menu_name}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No quick links available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Sections */}
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="card border-0">
                        <div className="card-body">
                            <h3 className="text-center">Welcome to AIIMS, Rajkot, Gujarat</h3>
                            <p className="text-justify pt-3">
                                All India Institute of Medical Sciences, Rajkot in Gujarat is one amongst
                                the several new AIIMS, being established under the Pradhan Mantri Swasthya
                                Suraksha Yojna (PMSSY) of the Ministry of Health and Family Welfare,
                                Government of India. AIIMS, Rajkot has objectives to reduce the “gaps” in
                                affordable tertiary health care and to generate ‘wellness’ amongst the
                                general population. AIIMS, Rajkot is under the phase six of the Pradhan
                                Mantri Swasthya Suraksha Yojna (PMSSY). AIIMS Rajkot shall be a 750 bedded
                                hospital with multiple speciality as well as superspeciality departments.
                                The Project cost of construction is about Rs. 1195 Crores, which includes
                                an allocation of Rs. 185 Crores towards state-of-the art medical equipment.
                                The Government of Gujarat has allotted about 201 Acres of Land for the
                                project and shall take care of access roads, water facilities and provision
                                of electricity connection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="row bgcolor">
                <div className="col-md-4 col-sm-4">
                    <div className="card border-0">
                        <div className="card-body bgcolor text-white">
                            <h2>Contacts</h2>
                            <p>All India Institute Of Medical Sciences (AIIMS), Khanderi, Para Pipaliya, Rajkot, Gujarat, INDIA, 360006</p>
                            <p>Deputy Director (Administration): dda.aiimsrajkot@gmail.com</p>
                            <p>Patient Help Line: +918140140573</p>
                            <p>+918128640573</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="card border-0">
                        <div className="card-body bgcolor text-white">
                            <h2>Statistics</h2>
                            <div id="visitor-counter">
                                <p style={{ textDecoration: "bold", color: "#fff" }}>Visitor's Count</p>
                                <script
                                    type="text/javascript"
                                    src="https://www.freevisitorcounters.com/auth.php?id=26144b344ab930dd596c18a09ee31fcf6a42b6cf"
                                ></script>
                                <script
                                    type="text/javascript"
                                    src="https://www.freevisitorcounters.com/en/home/counter/1231935/t/3"
                                ></script>
                                <a
                                    href="https://www.freevisitorcounters.com/en/home/stats/id/1231935"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://www.freevisitorcounters.com/en/counter/render/1231935/t/3"
                                        border="0"
                                        className="counterimg"
                                        alt="Visitor Counter"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4">
                    <div className="card border-0">
                        <div className="card-body bgcolor text-white">
                            <h2>Useful Links</h2>
                            {/* Useful links content */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
