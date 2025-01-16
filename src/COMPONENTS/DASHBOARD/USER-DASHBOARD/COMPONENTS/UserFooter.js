import React from "react";
import './UserFooter.css';

const UserFooter = () => {
  return (
    <footer className="footer">
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
              <h2>Useful Link</h2>
              <div>
                <div className="row">
                  <div className="col-sm-6"><a href="http://pmssy-mohfw.nic.in/">PMSSY</a></div>
                  <div className="col-sm-6"><a href="https://aiims.edu/">AIIMS New Delhi</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="https://www.aiimsbhopal.edu.in/">AIIMS Bhopal</a></div>
                  <div className="col-sm-6"><a href="https://aiimsbhubaneswar.nic.in/">AIIMS Bhubaneswar</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="https://www.aiimsjodhpur.edu.in/">AIIMS Jodhpur</a></div>
                  <div className="col-sm-6"><a href="http://aiimspatna.edu.in/">AIIMS Patna</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="http://aiimskalyani.edu.in/">AIIMS Kalyani</a></div>
                  <div className="col-sm-6"><a href="https://www.aiimsdeoghar.edu.in/">AIIMS Deoghar</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="http://aiimsbathinda.edu.in/">AIIMS Bathinda</a></div>
                  <div className="col-sm-6"><a href="https://www.aiimsraipur.edu.in/">AIIMS Raipur</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="https://aiimsrishikesh.edu.in/">AIIMS Rishikesh</a></div>
                  <div className="col-sm-6"><a href="https://aiimsrbl.edu.in/">AIIMS Raebareli</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><a href="https://www.aiimsmangalagiri.edu.in/">AIIMS Mangalagiri</a></div>
                  <div className="col-sm-6"><a href="https://aiimsnagpur.edu.in/">AIIMS Nagpur</a></div>
                </div>
                <div className="row">
                  <div className="col-sm-6"><p><a href="https://aiimsgorakhpur.edu.in/">AIIMS Gorakhpur</a></p></div>
                  <div className="col-sm-6"><p><a href="https://aiimsbibinagar.edu.in/">AIIMS Bibinagar</a></p></div>
                </div>
                <p><a href="https://aiimsrajkot.edu.in/#">AIIMS Bilaspur</a></p>
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
};

export default UserFooter;
