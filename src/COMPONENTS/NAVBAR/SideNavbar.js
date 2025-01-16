import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../NAVBAR/SideNavbar.css';

function SideNavBar() {
    return (
        <div className="bg-light outside-container" >
            {/* Sidebar Header */}
            <div className="p-3 text-black inside-container" >
                <div className="title ml-3">
                    <h2 className="h4">ADMIN</h2>
                    <p>LMS ADMIN</p>
                    <ul className="list-unstyled">
                        <li className="active">
                            <a href="#">
                                <i className="fa fa-tachometer"></i> Dashboard
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <i className="fa-solid fa-user"></i> Profile
                            </a>
                        </li>


                        <li>
                            <a href="#">
                                <i className="fa-regular fa-user"></i> Super-User
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-globe"></i> Website
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-sliders"></i> Slider
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-brands fa-rocketchat"></i> About Us
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-blog"></i> BLOG
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-screwdriver-wrench"></i> Latest Update
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-arrow-trend-up"></i> Jobs And opportunity
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-address-book"></i> Contact List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-file-lines"></i> Pages
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-calendar"></i> Upcoming Events
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-user"></i> Subject Expert
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-building-columns"></i> University List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-building"></i> College List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-users"></i> Student List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-rectangle-list"></i> District Coordinator List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-lock"></i> Password Reset
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-rectangle-list"></i> Course List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-book"></i> Syllabus
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-book"></i> Subjects List
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-book"></i> Learning material
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-cogs"></i> Templates
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-file-alt"></i> Model Sample Paper
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-book-reader"></i> Model Lesson Plan
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-bell"></i> Notification
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-bookmark"></i> UGC Guidelines
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-comments"></i> Feedback
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-flag"></i> Issue Reported
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-credit-card"></i> Payment Details
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-chart-line"></i> Reports
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-users"></i> User Communication
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideNavBar;
