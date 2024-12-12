import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home'; 
import NotFound from './components/NotFound';
import Login from './components/Login';  
import { lazy, Suspense } from 'react';
import LoadingIndicator from './components/LoadingIndicator';
function App() {

  function Logout() {
    localStorage.clear(); 
    return <Navigate to="/login"/>
  }
 
  const Register = lazy(() => import('./components/Register'));

  function AppRoutes() {  
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
          } 
        /> 
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound/>} />
      </Routes> 
    )
  }
  


  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingIndicator />}>
        <AppRoutes />
      </Suspense> 
    </BrowserRouter>
    
  );
}

export default App;
