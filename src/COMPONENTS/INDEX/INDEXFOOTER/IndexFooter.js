import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../INDEXFOOTER/IndexFooter.css';
const IndexFooter = () => {
    return (
      
        <footer className="footer w-100 bottom-0 bg-info text-white py-4 fs-6 text-center">
          <div className="row">
            {/* Start Footer First Region */}
            <div className="col-md-4">
              <div className="region region-footer-first">
                <div id="block-contact-2" className="block block-block-content">
                  <h2>Contacts</h2>
                  <div>
                    <p className="elementor-heading-title elementor-size-default">
                      All India Institute Of Medical Sciences (AIIMS),<br />
                      Khanderi, Para Pipaliya, Rajkot, Gujarat, INDIA, 360006
                    </p>
                    <p className="elementor-heading-title elementor-size-default">
                      Deputy Director (Administration) :
                    </p>
                    <p className="elementor-heading-title elementor-size-default">
                      dda.aiimsrajkot@gmail.com
                    </p>
                    <p className="elementor-heading-title elementor-size-default">
                      Patient Help Line : +918140140573
                    </p>
                    <p className="elementor-heading-title elementor-size-default">
                      +918128640573
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Footer First Region */}
    
            {/* Start Footer Second Region */}
            <div className="col-md-4">
              <div className="region region-footer-second">
                <div id="block-statistics-2" className="block block-block-content">
                  <h2>Statistics</h2>
                  <div id="visitor-counter" style={{ marginTop: "20px" }}>
                    <p style={{ textDecoration: "bold", color: "#fff" }}>Visitor's Count</p>
                    <p>
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
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Footer Second Region */}
    
            {/* Start Footer Third Region */}
            <div className="col-md-4">
              <div className="region region-footer-third">
                <div id="block-usefullinks-2" className="block block-block-content">
                  <h2>Useful Links</h2>
                  <div>
                    {/* {usefulLinks.length > 0 ? (
                      usefulLinks.map((link, index) => (
                        <div key={index} className="row">
                          <div className="col-sm-6">
                            <a href={link.ul_link} target="_blank" rel="noopener noreferrer">
                              {link.ul_text}
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No useful links available.</p>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
            {/* End Footer Third Region */}
          </div>
    
          {/* Footer Copyright */}
          <div>
            <p>&copy; 2024 AIIMS Rajkot. All rights reserved.</p>
          </div>
        </footer>
      );
}

export default IndexFooter;