import { React, useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../NAVBAR/NavBar";
import Footer from "../../DASHBOARD/Footer";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { Button, Modal, Form } from "react-bootstrap";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import Swal from 'sweetalert2'
import "../FILE_UPLOAD-MASTER/FileUploadMaster.css";

DataTable.use(DT);

const FileUploadMaster = () => {

    // Getting the current id from localstorage
    const storedMessage = localStorage.getItem("data");
    const jsonObject = JSON.parse(storedMessage);
    const currentUserId = Number(jsonObject.id);

    // State management for modal
    const [showModal, setShowModal] = useState(false);

    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const [sendData, setSendData] = useState({
        file: null,
        fileUrl: fileUrl,
        entry_user_id: 101,
        entry_date: new Date().toISOString(),
        rendering_name: "",
        last_modified_user_id: null,
        last_modified_date: new Date().toISOString(),
        valid: true,
    })

    const onFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("No File Selected!");
            return;
        }

        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit

        if (file.size > maxSizeInBytes) {
            // alert("File size exceeds the 2MB limit. Please upload a smaller file.");
            // THIS IS THE ALERT FOR EXCEEDING THE LIMIT ON THE FILE SIZE
            Swal.fire({
                title: 'Error!',
                text: 'File size exceeds the 2MB limit',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            // Reset the file input
            e.target.value = ""; // Reset the file input
            setFile(null);
            setSendData({
                ...sendData,
                file: null,
            })
            return; // Stop the function execution
        }

        setFile(file); // Set the file state
        setSendData({
            file: e.target.files[0],
            entry_user_id: currentUserId,
            rendering_name: "",
            entry_date: new Date().toISOString(),
            last_modified_user_id: currentUserId,
            last_modified_date: new Date().toISOString(),
            valid: true,
        });
    }


    const onFileUpload = () => {

        if (!file) {
            // alert("Please select a file before uploading");
            //ALERT FOR SIZE ERROR
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "File is not present",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('entry_user_id', Number(sendData.entry_user_id));
        formData.append('entry_date', sendData.entry_date);
        formData.append('last_modified_user_id', Number(sendData.last_modified_user_id));
        formData.append('last_modified_date', sendData.last_modified_date);
        formData.append('valid', sendData.valid);
        formData.append('rendering_name', sendData.rendering_name);

        console.log("DATA to be sendt : " , formData);
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        if (file) {
            axios.post('http://10.226.25.102:8080/api/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // alert("File uploaded successfully!");
                    // ALERT FOR FILE UPLOADED SUCCESSFULLY
                    Swal.fire({
                        title: "Success!",
                        icon: "success",
                        draggable: true,
                        timer: 1000,  // Alert will close after 2 seconds
                        showConfirmButton: false  // Optionally hide the confirm button
                    });

                    console.log("Response data: ", response.data);
                    setFileUrl(response.data.fileUrl);
                    setSendData({
                        file: null,
                        fileUrl: response.data.fileUrl,
                        entry_user_id: currentUserId,
                        entry_date: new Date().toISOString(),
                        rendering_name: "",
                        last_modified_user_id: currentUserId,
                        last_modified_date: new Date().toISOString(),
                        valid: true,
                    });
                    setFile(null);

                    fetchFiles();
                })
                .catch(e => {
                    console.error("Error uploading file: ", e);
                })
        }
        else {
            alert("Kindly upload the file");
        }

    }

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        axios.get("http://10.226.25.102:8080/api/files/allFiles")
            .then((response) => {
                const data = response.data;

                console.log("Fetched all files: ", data);

                if (Array.isArray(data)) {

                    const formattedData = data.map((item) => {
                        const onlyDateEntryDate = item.entry_date.split("T")[0];
                        // const onlyDateLastModified = item.last_modified_date.split("T")[0];

                        return {
                            ...item,
                            entry_date: onlyDateEntryDate,
                            // last_modified_date: onlyDateLastModified,
                        }
                    })

                    initializeDataTable(formattedData);
                }
                else {
                    console.log("Fetched data is not an array");

                }

            })
            .catch((e) => {
                console.error("Error Fetching the File List", e);
            })
    }

    const initializeDataTable = (data) => {
        let rowIdCounter = 1;
        const table = $("#fileTable").DataTable();
        table.destroy();

        // Add the unique ID to each row in the data
        const dataWithIds = data.map(item => {
            item.row_id = rowIdCounter++; // Assign a unique ID
            return item;
        });

        $("#fileTable").DataTable({
            data: data,
            columns: [
                { title: "Id", data: "row_id" },
                // { title: "DataBase Name", data: "file_name" },
                {title: "Name", data: "rendering_name"},
                {
                    title: "Link", data: "file_link",
                    render: (data, type, row) => {
                        return `
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="${data}" target="_blank">${data}</a>
                                <a class="copy-btn fa fa-copy" data-link="${data}"></a>
                            </div>`;
                    },
                },
                { title: "Entry Date", data: "entry_date" },
                {
                    title: "Action", data: null,
                    render: (data, type, row) => {
                        return `
                            <div class="d-flex justify-content-around">
                                <a href="#" class="fa fa-trash text-danger p-3" data-file-id="${row.file_id}"></a>
                            </div>`;
                    },
                },
            ],
        });

        // Add event listener for the copy button
        $("#fileTable tbody").on("click", ".copy-btn", function () {
            const link = $(this).data("link");
            const $icon = $(this);

            // Copy the link to clipboard
            navigator.clipboard.writeText(link)
                .then(() => {
                    // Create a 'Copied' message using Bootstrap classes
                    const copiedMessage = $("<div>")
                        .text("Copied!")
                        .addClass("position-absolute p-1 bg-success text-white rounded")
                        .css({
                            top: $icon.position().top - 20,
                            left: $icon.position().left,
                            zIndex: 1000,
                        })
                        .appendTo($icon.closest("td"));

                    // Remove the 'Copied' message after 2 seconds
                    setTimeout(() => {
                        copiedMessage.fadeOut(() => {
                            copiedMessage.remove();
                        });
                    }, 2000);

                    console.log("File link copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                });
        });

        // $("#fileTable tbody").on("click", ".fa-pencil", function () {
        //     const fileId = $(this).data("file-id");
        //     const selectedRow = data.find((file) => file.file_id === fileId);
        //     if (selectedRow) {
        //         handleEdit(selectedRow);
        //     }
        // });

        // const handleEdit = (row) => {
        //     console.log("Edit row: ", row);
        // };

        $("#fileTable tbody").on("click", ".fa-trash", function () {
            const fileId = $(this).data("file-id");
            if (fileId) {
                handleDelete(fileId);
            }

        });
    };




    const handleDelete = (fileId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/files/delete?id=${fileId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        fetchFiles();  // Fetch files after successful deletion
                    })
                    .catch((e) => {
                        console.error("Error detected : ", e);
                    });
            } else {
                console.log("File deletion was canceled");
            }
        });
    };


    // file upload using the fa icon 

    $('document').ready(function () {

        var $file = $('#file-input'),
            $label = $file.next('label'),
            $labelText = $label.find('span'),
            $labelRemove = $('i.remove'),
            labelDefault = $labelText.text();

        // on file change
        $file.on('change', function (event) {
            var fileName = $file.val().split('\\').pop();
            if (fileName) {
                console.log($file)
                $labelText.text(fileName);
                $labelRemove.show();
            } else {
                $labelText.text(labelDefault);
                $labelRemove.hide();
            }
        });

        // Remove file   
        $labelRemove.on('click', function (event) {
            $file.val("");
            $labelText.text(labelDefault);
            $labelRemove.hide();
            console.log($file)
        });
    })
    return (
        <>
            <div className="d-flex flex-column">
                <NavBar />
                <div className="content-area">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 p-5 m-5 mx-5">
                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <h2 className="font-weight-bold">File Upload</h2>
                                    </div>
                                    <div className="col-12 col-md-4 d-flex align-items-center gap-3 justify-content-end">
                                        {/* <div className="wrapper">
                                            <input
                                                type="file"
                                                id="file-input"
                                                accept=".png,.jpg,.pdf"
                                                onChange={onFileChange}
                                                className="custom-file-input"
                                            />
                                            <label htmlFor="file-input">
                                                <i className="fa fa-upload"></i>
                                                <span className="text-danger">{file ? file.name : "Click here"}</span>
                                            </label>
                                            <i className="fa fa-times-circle remove" onClick={() => { setFile(null); setSendData({ ...sendData, file: null }); }}></i>
                                        </div> */}
                                        {/* <Button variant="primary" className="btn-sm" onClick={onFileUpload}>Upload</Button> */}
                                        <Button variant="primary" className="btn-sm" onClick={() => { setShowModal(true) }}>Upload File</Button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table id="fileTable" className="display w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Modal rendering code  */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload File</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={onFileUpload}>
                        {/* Rendered Name Input */}
                        <Form.Group controlId="rendering_name">
                            <Form.Label>Rendered Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="rendering_name"
                                value={sendData.rendering_name || ""}
                                onChange={(e) => setSendData({ ...sendData, rendering_name: e.target.value })}
                            />
                        </Form.Group>

                        {/* File Upload */}
                        <Form.Group controlId="file-upload">
                            <Form.Label>Upload File</Form.Label>
                            <div className="wrapper">
                                <input
                                    type="file"
                                    id="file-input"
                                    accept=".png,.jpg,.pdf"
                                    onChange={onFileChange}
                                    className="custom-file-input"
                                />
                                <label htmlFor="file-input">
                                    <i className="fa fa-upload"></i>
                                    <span className="text-danger">{file ? file.name : "Click here"}</span>
                                </label>
                                <i
                                    className="fa fa-times-circle remove"
                                    onClick={() => {
                                        setFile(null);
                                        setSendData({ ...sendData, file: null });
                                    }}
                                ></i>
                            </div>
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" className="btn-sm" type="submit">
                            Upload
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>

    );

}

export default FileUploadMaster;