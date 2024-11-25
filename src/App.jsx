import { BrowserRouter, Route, Routes } from "react-router-dom"
import SidebarLeft from "./SidebarLeft"
import Topbar from "./Topbar";
import Footer from "./Footer";
import LogoutModal from "./LogoutModal";
import Home from "./Home";
import Member from "./member/Member";
import MemberAdd from "./member/MemberAdd";
import MemberDetail from "./member/MemberDetail";
import Login from "./login/Login";
import Signup from "./login/Signup";
import MemberOrganizationChart from "./MemberOrganizationChart ";
import PrivateRoute from "./PrivateRoute";

function App() {
	
  return (
    <>
      <BrowserRouter>
        <SidebarLeft />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <Routes>
                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/member" element={<PrivateRoute><Member /></PrivateRoute>} />
                <Route exact path="/memberAdd" element={<PrivateRoute><MemberAdd /></PrivateRoute>} />
                <Route exact path="/memberDetail/:id" element={<MemberDetail />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signUp" element={<Signup />} />
                <Route exact path="/memberChart" element={<PrivateRoute><MemberOrganizationChart /></PrivateRoute>} />

              </Routes>
              <Footer />
            </div>
        </div>
        <LogoutModal />
      </BrowserRouter>
    </>
  )
}

export default App
