import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ContactusScreen from "./screens/ContactusScreen";
import ReportScreen from "./screens/ReportScreen";
import AlertReport from "./screens/AlertReport";
const App = () => {
  return (
    <Router>
      <main className='py-3' style={{position:"relative",overflowX:"hidden",minHeight:"100vh"}}>
          <Routes>
            <Route element={<AlertReport/>}/>
            <Route path='/home' element={<HomeScreen/>}/>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/contactus" element={<ContactusScreen />} />
            <Route path="/reports" element = {<ReportScreen/>}/>
          </Routes>
      </main>
    </Router>
  );
}
export default App;