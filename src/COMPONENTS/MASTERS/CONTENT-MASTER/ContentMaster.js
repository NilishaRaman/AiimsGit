import NavBar from "../../NAVBAR/NavBar";
import Footer from "../../DASHBOARD/Footer";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../CONTENT-MASTER/ContentMaster.css";

const ContentMaster = () => {
    const editorRef = useRef(null); // Reference to the textarea
    const [formData, setFormData] = useState({
        menu_id: "",
        description: "",
        content: "",
        enableDates: false,
        from_date: null,
        to_date: null,
        entry_user_id: null,
        entry_date: null,
        last_modified_by: 101,
        last_modified_date: new Date().toISOString().slice(0, 19),
        valid: true,
    });

    const [errors, setErrors] = useState({
        from_date: "",
        to_date: "",
    });

    const [menuOptions, setMenuOptions] = useState([]);

    // Function to fetch menu options
    const fetchMenus = () => {
        axios
            .get("http://10.226.25.102:8080/api/menus")
            .then((response) => {
                const data = response.data;
                console.log("Response data: ", data);
                if (Array.isArray(data)) {
                    const menuOptionData = data.map((item) => ({
                        id: item.menu_id,
                        name: item.menu_name,
                        parent: item.parent ? item.parent.menu_name : "No Parent",
                    }));
                    setMenuOptions(menuOptionData);
                } else {
                    console.log("Fetched data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching menus:", error);
            });
    };

    useEffect(() => {
        fetchMenus();

        const storedMessage = localStorage.getItem("data");
        if (storedMessage) {
            const jsonObject = JSON.parse(storedMessage);
            const id = Number(jsonObject.id);
        }

        const ckeditorScript = document.createElement("script");
        ckeditorScript.src = "/ckeditor/ckeditor.js";
        ckeditorScript.onload = () => {
            if (window.CKEDITOR && editorRef.current) {
                if (window.CKEDITOR.instances[editorRef.current.id]) {
                    window.CKEDITOR.instances[editorRef.current.id].destroy(true);
                }

                const editor = window.CKEDITOR.replace(editorRef.current.id);
                editor.on("change", () => {
                    const data = editor.getData();
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        content: data,
                    }));
                });
            } else {
                console.error("CKEditor failed to load or textarea is unavailable.");
            }
        };

        ckeditorScript.onerror = () => {
            console.error("Failed to load CKEditor script.");
        };
        document.body.appendChild(ckeditorScript);

        return () => {
            if (window.CKEDITOR && window.CKEDITOR.instances[editorRef.current.id]) {
                window.CKEDITOR.instances[editorRef.current.id].destroy(true);
            }
            document.body.removeChild(ckeditorScript);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));

        if (name === "from_date" || name === "to_date") {
            const today = new Date().toISOString().split('T')[0];

            if (name === "from_date" && value < today) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    from_date: "From Date cannot be in the past."
                }));
                return;
            }

            if (name === "to_date") {
                if (value < today) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        to_date: "To Date cannot be in the past.",
                    }));
                    return;
                } else if (value < formData.from_date) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        to_date: "To Date cannot be before the from date.",
                    }));
                    return;
                }
            }
        }

        if (name === "menu_id") {
            const selectedMenu = menuOptions.find((menu) => menu.id === parseInt(value));
            if (selectedMenu) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    menu_id: selectedMenu.id,
                   
                }));
                console.log("Selected Menu: ", selectedMenu);
                axios
                    .get(`http://10.226.25.102:8080/api/content/${selectedMenu.id}`)
                    .then((response) => {
                        const contentData = response.data;

                        const formatToDateInput = (isoDate) => {
                            if(!isoDate) return null;

                            return new Date(isoDate).toISOString().split("T")[0];
                        }

                        // EXTRACTING THE CURRENT USER ID FROM LOCALSTORAGE

                        const storedMessage = localStorage.getItem("data");
                        const jsonObject = storedMessage ? JSON.parse(storedMessage) : {};
                        const id = jsonObject.id;
                        console.log("Data fetched for Ckeditor: ", contentData);
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            to_date:formatToDateInput(contentData.to_date) || null,
                            from_date: formatToDateInput(contentData.from_date) || null,
                            enableDates: contentData.enableDates || false,
                            content: contentData.content || "",
                            description: contentData.description || "",
                            entry_user_id: id,
                            entry_date: new Date().toISOString().slice(0, 19),
                            last_modified_by: id,
                            last_modified_date: new Date().toISOString().slice(0, 19),
                        }));

                        if (window.CKEDITOR && window.CKEDITOR.instances[editorRef.current.id]) {
                            window.CKEDITOR.instances[editorRef.current.id].setData(contentData.content || "");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching content for selected menu:", error);
                    });
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { from_date, to_date } = formData;
        const today = new Date().toISOString().split('T')[0];
        let valid = true;

        if (from_date && from_date < today) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                from_date: "From Date cannot be in the past."
            }));
            valid = false;
        }

        if (to_date) {
            if (to_date < today) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    to_date: "To Date cannot be in the past.",
                }));
                valid = false;
            } else if (to_date < from_date) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    to_date: "To Date cannot be before the From Date.",
                }));
                valid = false;
            }
        }

        if (!valid) {
            return;
        }

        const formatDate = (dateString) => {
            if(!dateString) {
                return null;
            }
            const date = new Date(dateString);
            return date.toISOString();
        }

        const updatedFormData = {
            ...formData,
            from_date: formatDate(from_date),
            to_date: formatDate(to_date),
            last_modified_date: new Date().toISOString().slice(0, 19),
        };

        console.log("Form data to be sent:", updatedFormData);

        axios
            .post("http://10.226.25.102:8080/api/content/save", updatedFormData)
            .then((response) => {
                alert("Menu updated successfully!");
                console.log("Menu updated successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error updating menu:", error);
            });
    };

    return (
        <div className="page-container d-flex flex-column">
            <NavBar />
            <div className="content-area">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-10 p-5 m-5 mx-5">
                            <h2 className="menu_heading font-weight-bold">Content Master</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="menu_id">
                                    <Form.Label className="fw-bold">Menu Name</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="menu_id"
                                        value={formData.menu_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a Menu</option>
                                        {menuOptions.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item.id} {item.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="content">
                                    <Form.Label className="fw-bold">Content</Form.Label>
                                    <textarea
                                        id="add_title"
                                        ref={editorRef}
                                        className="form-control"
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({ ...formData, content: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label className="fw-bold">Description</Form.Label>
                                    <textarea
                                        className="form-control"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                    />
                                </Form.Group>

                                <Form.Group controlId="enableDates">
                                    <Form.Check
                                        type="checkbox"
                                        className="fw-bold"
                                        label="Enable Date Range"
                                        checked={formData.enableDates}
                                        onChange={() => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                enableDates: !prevData.enableDates,
                                                from_date: null,
                                                to_date: null,
                                            }));
                                        }}
                                    />
                                </Form.Group>

                                {formData.enableDates && (
                                    <>
                                        <Form.Group controlId="from_date">
                                            <Form.Label className="fw-bold">From Date<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="from_date"
                                                value={formData.from_date || ""}
                                                onChange={handleChange}
                                            />
                                            {errors.from_date && (
                                                <div className="text-danger mt-2" >
                                                    {errors.from_date}
                                                </div>
                                            )}
                                        </Form.Group>

                                        <Form.Group controlId="to_date">
                                            <Form.Label className="fw-bold">To Date<span className="text-danger">*</span></Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="to_date"
                                                value={formData.to_date || ""}
                                                onChange={handleChange}
                                            />
                                            {errors.to_date && (
                                                <span className="text-danger mt-2">
                                                    {errors.to_date}
                                                </span>
                                            )}
                                        </Form.Group>
                                    </>
                                )}

                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContentMaster;
