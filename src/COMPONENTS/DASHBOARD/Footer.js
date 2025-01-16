import react from "react";
import "../DASHBOARD/Footer.css";

function Footer() {
    return (
        <>
        <footer className="fixed-bottom">
            <div className="footer-container bg-info">
                <div className="container-fluid ">               
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-md-6 text-lg-left text-center position-relative">
                                    <a target="_blank" href="www.cdac.in">
                                        <img className="cdac_logo"  src="\cdac_logo.png"></img>
                                    </a>
                                </div>
                                <div className="col-md-6 text-lg-right text-center ">
                                    <p className="mt-1 copyright">
                                        © Copyright All rights reserved 2024 |
                                        <span>AIIMS Rajkot</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </footer>
        
            
        </>
    )
}

export default Footer;