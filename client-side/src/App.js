import { useContext } from "react";
import "./App.css";
import { Context } from "./context/Context";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AssociateHomePage from "./pages/AssociateHomePage/AssociateHomePage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HallPage from "./pages/HallPage/HallPage";
import ViewAssociates from "./pages/AssociateDetails/ViewAssociates";
import AddAssociate from "./pages/AssociateDetails/AddAssociate";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/userHome" element={<AssociateHomePage />} />
          <Route path="/halls" element={<HallPage />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/adminHome" element={<AdminHomePage />} />
          <Route path="/associates" element={<ViewAssociates />} />
          <Route path="/associates/:id" element={<AddAssociate />} />
        </Routes>
      </Router>
    </>
    // <div className="App">

    //  {/* <AssociateHomePage /> */}
    //  <Login/>
    // </div>
  );
}

export default App;
