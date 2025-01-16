import logo from './logo.svg';
import './App.css';
import Login from './COMPONENTS/LOGIN/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from './COMPONENTS/SIGNUP/SignUp';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import AdminDashBoard from './COMPONENTS/DASHBOARD/AdminDashBoard';


import Footer from './COMPONENTS/DASHBOARD/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import MenuMaster from './COMPONENTS/MASTERS/MENU-MASTER/MenuMaster';
import { AuthProvider } from './COMPONENTS/AUTHENTICATION/AuthProvider';
import ProtectedRoute from './COMPONENTS/AUTHENTICATION/ProtectedRoute';
import ContentMaster from './COMPONENTS/MASTERS/CONTENT-MASTER/ContentMaster';
import UserDashBoard from './COMPONENTS/DASHBOARD/USER-DASHBOARD/COMPONENTS/UserDashBoard';
import FileUploadMaster from './COMPONENTS/MASTERS/FILE_UPLOAD-MASTER/FileUploadMaster';
import Index from './COMPONENTS/INDEX/Index';


function App() {
  return (

    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><MenuMaster /></ProtectedRoute> } />
          <Route path="/file-upload" element={<ProtectedRoute> <FileUploadMaster/> </ProtectedRoute> } />
          {/* <Route path="/admin-dashboard" element={<AdminDashBoard />} /> */}
          <Route path="/user-dashboard" element={<ProtectedRoute> <UserDashBoard/> </ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/footer" element={<Footer />} /> */}
          <Route path="/menu-master" element={<ProtectedRoute><MenuMaster /></ProtectedRoute> } />
          {/* <Route path="/menu-master" element={<MenuMaster /> } /> */}
          <Route path="/content-master" element={<ContentMaster/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
