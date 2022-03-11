import { useContext } from "react";
import "./App.css";
import { Context } from "./context/Context";
import {
  BrowserRouter as Router,
  Routes,
  Route,   
  Link,
  BrowserRouter,
} from "react-router-dom";
import AssociateHomePage from "./pages/AssociateHomePage/AssociateHomePage";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HallPage from "./pages/HallPage/HallPage";
import ViewAssociates from "./pages/AssociateDetails/ViewAssociates";
import AddAssociate from "./pages/AssociateDetails/AddAssociate";
import CalenderViewPage from "./pages/AssociateCalendarViewPage";
import AdminCalenderViewPage from "./pages/AdminCalendarViewPage";
import AssociateBooking from "./pages/AssociateBooking/AssociateBooking";
import CreateAssociate from "./components/create-Associate.component";
import EditAssociate from "./components/edit-Associate.component";
import AssociateList from "./components/Associate-list.component";
function App() {
  const { user } = useContext(Context);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/userHome" element={<AssociateHomePage />} />
          <Route path="/halls" element={<HallPage />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/adminHome" element={<AdminHomePage />} />
          <Route path="/calendar" element={<CalenderViewPage />} />
          <Route path="/admincalendar" element={<AdminCalenderViewPage />} />
          <Route path="/schedule" element={<AssociateBooking />} />
          <Route path="/associates" element={<ViewAssociates />}>
            {/* <Route path="/associates/:id" element={<AddAssociate />} />
            <Route path="/associates/create-Associate" element={<CreateAssociate />}/>
            <Route path="/associates/Associate-list" element={<AssociateList />}/>
            <Route path="/associates/edit-Associate/:id" element={<EditAssociate />} /> */}
          </Route>
          <Route path="/create-Associate" element={<CreateAssociate />}/>
            <Route path="/Associate-list" element={<AssociateList />}/>
            <Route path="/edit-Associate/:id" element={(props) => <EditAssociate {...props} />} />       
        
        </Routes>
      </BrowserRouter>
    </>
    // <div className="App">

    //  {/* <AssociateHomePage /> */}
    //  <Login/>
    // </div>
  );
}

export default App;
