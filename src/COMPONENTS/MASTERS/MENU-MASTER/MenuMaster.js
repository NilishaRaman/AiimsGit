import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../NAVBAR/NavBar";
import Footer from "../../DASHBOARD/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuMaster.css";
import { Button, Modal, Form } from "react-bootstrap";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

DataTable.use(DT);

const MenuMaster = () => {
  const [menuEntity, setMenuEntity] = useState([]);
  const [showModal, setShowModal] = useState(false); // FOR SHOWING THE MODAL AND HIDING IT 
  const [formData, setFormData] = useState({
    menu_name: "",
    hindiMenuName: "",
    parent: null,
    display_order: "",
    user_id: "",
    isvalid: true,
    last_modified_date: new Date().toISOString(),
    entry_date: new Date().toISOString(),
    entry_user_id: 101,
    last_modified_user_id: null,
  });
  const [editingMenu, setEditingMenu] = useState(null); // FOR CHECKING IF THE MENU IS NEWLY CREATED OR IS PRESENT IN THE DB
  const [parentOptions, setParentOptions] = useState([]); // FOR CHECKING WHICH OF THE MENU ITEM ARE THE TOP LEVEL ITEMS
  const currentDate = new Date().toISOString(); // CURRENT DATE AND TIME 

  // FOR EXTRACTING THE DATA FROM LOCAL STORAGE
  const storedMessage = localStorage.getItem("data");
  const jsonObject = JSON.parse(storedMessage);
  const id = Number(jsonObject.id);

  const currentUserId = id; // CURRENT ID EXTRACTED FROM LOCAL STORAGE

  // FOR UPDATING ANY CHANGES THAT HAS OCCURED IN THE VISIBLE TABLE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      last_modified_user_id: currentUserId,
      last_modified_date: currentDate,
      [name]: value,
    }));
  };

  // FOR SUBMITITNG THE EDITTED DATA AND THE NEW ADDED DATA 
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Current user id : ", currentUserId);

    // DOING THE NECESSARY CHANGES AND SENDING THE DATA TO BACKEND USING THIS CONSTANT
    const newMenuData = {
      ...formData,
      // entry_date: editingMenu ? formData.entry_date : currentDate,
      entry_user_id: editingMenu ? formData.entry_user_id : currentUserId,
      last_modified_user_id: currentUserId,
      last_modified_date: currentDate,
      parent: formData.parent ? { menu_id: formData.parent } : null, // send parent as an object
    };

    console.log("Menu Data that needs to be sent:");
    console.log(newMenuData);

    const request = editingMenu
      ? axios.put(`http://10.226.25.102:8080/api/menus/${editingMenu.menu_id}`, newMenuData) // EDIT API
      : axios.post(`http://10.226.25.102:8080/api/menus?currentUserId=${currentUserId}`, newMenuData); // ADD API

    request
      .then(() => {
        // UPDATING THE DATA TO DEFAULT VALUES
        // console.log("Menu saved successfully!");
        alert("Menu saved successfully!");
        setShowModal(false);
        setFormData({
          menu_name: "",
          hindiMenuName: "",
          parent: null,
          display_order: "",
          user_id: "",
          isvalid: true,
          last_modified_date: currentDate,
          entry_date: currentDate,
          entry_user_id: 101,
          last_modified_user_id: currentUserId,
        });
        setEditingMenu(null);
        fetchMenus(); // Refresh menus
      })
      .catch((error) => {
        console.error("Error saving menu:", error);
      });
  };

  // DROP DOWN IS SHOWING BUT THE PARENT ID IS NOT ⬇️
  const fetchMenus = () => {
    axios
      .get("http://10.226.25.102:8080/api/menus")
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data)) {
          console.log("Response:", data);

          // Prepare parent options
          const parentOptionsData = data.map((item) => ({
            id: item.menu_id,
            name: item.menu_name,
          }));
          setParentOptions(parentOptionsData);

          // Format and process the data
          const formattedData = data.map((item) => {
            const onlyDateEntryDate = item.entry_date.split("T")[0];
            const onlyDateLastModified = item.last_modified_date.split("T")[0];

            // Find parent if it exists
            const parent = data.find((parentItem) =>
              parentItem.children.some((child) => child.menu_id === item.menu_id)
            );

            return {
              ...item,
              entry_date: onlyDateEntryDate,
              last_modified_date: onlyDateLastModified,
              parent: parent || null, // Assign parent or null if no parent
              display_order: parent ? null : item.menu_id, // Assign display_order based on parent
            };
          });

          // Set the menu entity and initialize the data table
          setMenuEntity(formattedData);
          initializeDataTable(formattedData);
        } else {
          console.error("Fetched data is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  };


  const initializeDataTable = (data) => {
    const table = $("#menuTable").DataTable();
    table.destroy();

    $("#menuTable").DataTable({
      data: data,
      columns: [
        { title: "ID", data: "menu_id" },
        { title: "Name (English)", data: "menu_name" },
        { title: "Name (Hindi)", data: "hindiMenuName" },
        {
          title: "Parent", data: "parent",
          render: (data, type, row) => {
            // Display the parent name if it exists, otherwise show 'None'
            return data ? data.menu_name : 'Top Level';
          },
        },
        // { title: "Display Order", data: "display_order" },
        // { title: "Entry User ID", data: "entry_user_id" },
        { title: "Entry Date", data: "entry_date" },
        // { title: "Last Modified Date", data: "last_modified_date" },pa
        // { title: "Last Modified By", data: "last_modified_user_id" },
        {
          title: "Actions",
          data: null,
          render: (data, type, row) => {
            return ` 
              <div class="d-flex justify-content-around">
                <a href="#" class="fa fa-pencil text-primary p-3" data-menu-id="${row.menu_id}"></a>
                <a href="#" class="fa fa-trash text-danger p-3" data-menu-id="${row.menu_id}"></a>
              </div>
            `;
          },
        },
      ],
    });

    $("#menuTable tbody").on("click", ".fa-pencil", function () {
      const menuId = $(this).data("menu-id");
      const selectedRow = data.find((menu) => menu.menu_id === menuId);
      if (selectedRow) {
        handleEdit(selectedRow);
      }
    });

    $("#menuTable tbody").on("click", ".fa-trash", function () {
      const menuId = $(this).data("menu-id");
      if (menuId) {
        handleDelete(menuId);
      }
    });
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleEdit = (menu) => {
    setEditingMenu(menu);

    setFormData({
      menu_name: menu.menu_name || "",
      hindiMenuName: menu.hindiMenuName || "",
      parent: menu.parent ? menu.parent.menu_id : null, // Extract the parent ID
      display_order: menu.display_order || "",
      user_id: menu.user_id || "",
      isvalid: menu.isvalid !== undefined ? menu.isvalid : true,
      last_modified_date: menu.last_modified_date || new Date().toISOString(),
      entry_date: menu.entry_date || new Date().toISOString(),
      entry_user_id: menu.entry_user_id || 101,
      last_modified_user_id: menu.last_modified_user_id || 101,
    });

    setShowModal(true);
  };


  const handleDelete = (menuId) => {
    axios
      .post(`http://10.226.25.102:8080/api/menus/delete?menuId=${menuId}`)
      .then(() => {
        // alert("Data deleted successfully!");
        setMenuEntity((prevData) => prevData.filter((item) => item.menu_id !== menuId));
        fetchMenus();
      })
      .catch((error) => {
        console.error("Error deleting menu:", error);
      });
  };

  return (
    <>
      <div className="page-container d-flex flex-column">
        <NavBar />
        <div className="content-area">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-10 col-12 p-5 m-5 mx-5">
                <div className="row">
                  <div className="col-md-10">
                    <h2 className="menu_heading font-weight-bold">Menu List</h2>
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setFormData({
                          menu_name: "",
                          hindiMenuName: "",
                          parent: null,
                          display_order: "",
                          user_id: "",
                          isvalid: true,
                          last_modified_date: currentDate,
                          entry_date: currentDate,
                          entry_user_id: 101,
                          last_modified_user_id: null,
                        });
                        setEditingMenu(null);
                        setShowModal(true);
                      }}
                      className="mb-3"
                    >
                      Add Menu
                    </Button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table id="menuTable" className="display" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingMenu ? "Edit Menu" : "Add Menu"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="menu_name">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                name="menu_name"
                value={formData.menu_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="hindiMenuName">
              <Form.Label>Menu Name (Hindi)</Form.Label>
              <Form.Control
                type="text"
                name="hindiMenuName"
                value={formData.hindiMenuName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="parent">
              <Form.Label>Parent Menu</Form.Label>
              <Form.Control
                as="select"
                name="parent"
                value={formData.parent || ""}
                onChange={handleChange}
              >
                <option value="">Select Parent Menu</option>
                {parentOptions.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="display_order">
              <Form.Label>Display Order</Form.Label>
              <Form.Control
                type="text"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Menu
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MenuMaster;




