import React, { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import { ClassicEditor, Context, Bold, Essentials, Italic, Paragraph, ContextWatchdog } from 'ckeditor5';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import axios from "axios";

import 'ckeditor5/ckeditor5.css';
import NavBar from '../NAVBAR/NavBar';
import SideNavBar from '../NAVBAR/SideNavbar';
import '../DASHBOARD/AdminDashBoard.css';
import Footer from './Footer';

function AdminDashBoard() {
    const [editorContent, setEditorContent] = useState(null);
    const id = 1;
    const [content, setContent] = useState(null);

    useEffect(() => {
        axios
            .post('http://localhost:8080/content/get', { id: id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                setContent(response.data.content); // Assuming response contains 'content' key
                console.log(response.data); // Log the response from the backend
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
            });
    }, [id]);

    return (       
            <div className='page-container d-flex flex-column'>
                <NavBar />
                <div className="content-area">
                    <div className='container-fluid'>
                        {/* Main Content */}
                        <div className='row'>
                            {/* <div className="col-md-3 col-lg-2">
                                <SideNavBar />

                            </div> */}

                            <div className='col-md-12 col-lg-12'>
                                <h2>Using CKEditor 5 in React</h2>
                                
                                {content !== null ? (
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzQ5OTgzOTksImp0aSI6IjFlZjVjNTllLWUyOTgtNDc0ZS1hODgxLWI5ZTc2YmZmODdmNyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImJkZWNlYWQ2In0.c8OGVpi3uhEQbBwf9TBORBnI093CYO5SzpQw2UmpCEJEqmsfvgYW7eZKTk1_NrWxPbnMky56OUfGj-qUSkg6sA',
                                            plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
                                            toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter'],
                                            initialData: content, // Use the updated content
                                        }}
                                        onReady={(editor) => {
                                            console.log("Editor is ready to use!", editor);
                                            setEditorContent(editor.getData());
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setEditorContent(data);
                                            axios
                                                .put("http://localhost:8080/content/save", { content: data }, {
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                })
                                                .then((response) => {
                                                    if (response.status === 200) {
                                                        console.log("Data sent successfully");
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.log("Data was not able to send");
                                                    console.error(error);
                                                });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus', editor);
                                        }}
                                    />
                                ) : (
                                    <p>Loading content...</p> // Fallback while content is being loaded
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <Footer />
            </div>
    );
}


export default AdminDashBoard;



