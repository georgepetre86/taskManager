import React from 'react'
import "./dashboardTopbar.scss"
import {NotificationsNone, Settings,FormatListBulletedOutlined, AccountTree, PieChartOutline, Search, MoreVert, ExpandMore, Splitscreen} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';


export default function DashboardTopbar() {

    const location = useLocation()
    const tab = location.pathname.split("/").pop()
    

  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <div className="navItems">
                    <Link to="/dashboard/tasks" style={{textDecoration: "none"}}>
                        <div className={`navItem ${tab === "tasks" ? "active" : ""}`}>
                            <FormatListBulletedOutlined /> Tasks
                        </div>
                    </Link>
                    <Link to="/dashboard/projects" style={{textDecoration: "none"}}>

                        <div className={`navItem ${tab === "projects" ? "active" : ""}`}>
                            <AccountTree /> Projects
                        </div>
                    </Link>
                    <div className="navItem">
                        <PieChartOutline /> Reports
                    </div>

                    <Link to="/dashboard/activities" style={{textDecoration: "none"}}>

                        <div className={`navItem ${tab === "activities" ? "active" : ""}`}>
                        <Splitscreen /> Activities
                        </div>
                    </Link>
                    
                </div>

            </div>

            <div className="topCenter">
                <div className="searchArea">
                    <Search />
                    <input type="text" placeholder="Search anything..."/>
                </div>
            </div>
            <div className="topRight">
                

            </div>
        </div>
    </div>
  )
}
