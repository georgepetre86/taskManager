
import Sidebar from "./components/sidebar/Sidebar"
import "./app.scss"
import DashboardTasks from "./pages/dashboardTasks/DashboardTasks";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Tasks from "./pages/tasks/Tasks";
import DashboardProjects from "./pages/dashboardProjects/DashboardProjects";
import DashboardActivities from "./pages/dashboardActivities/DashboardActivities";
import Projects from "./pages/projects/Projects";
import ProjectsOpen from "./pages/projects/Projects";
import ProjectPage from "./pages/projectPage/ProjectPage";
import { useContext, useRef } from "react";
import PriceGenerator from "./pages/priceGenerator/PriceGenerator";
import PriceOffer from "./pages/priceOffer/PriceOffer";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
function App() {
  
  const {user} = useContext(AuthContext)
  return (
    <div className="appWrapper" >
      <Router>

      
      <div className="sidebar">
      <Sidebar/>
      </div>
      
      {user && <div className="container">
        <Routes>
          <Route path="/" element={<DashboardTasks />} />
          <Route path="/dashboard"  >
              <Route path="tasks" element={<DashboardTasks />}/>
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="activities" element={<DashboardActivities />} />
          </Route>
          <Route path="/tasks" element={<Tasks />}>

          </Route>

          <Route path="/projects"  >
              <Route index element={<Projects tab="all"/>} />
              <Route path="open" element={<Projects tab="open"/>} />
              <Route path="completed" element={<Projects tab="completed"/>} />
              <Route path="all" element={<Projects tab="all"/>} />
              <Route path=":id" element={<ProjectPage />} />
          </Route>
          <Route path="/priceGenerator" element={<PriceGenerator />}></Route>
          <Route path="/priceOffer" element={<PriceOffer />}></Route>
          
        </Routes>
      </div>}
      {!user && <div className="container">
        <Routes>
        <Route path="/login" element={<Login />}/>
        </Routes>
      </div>}
      </Router>
    </div>
  );
}

export default App;
