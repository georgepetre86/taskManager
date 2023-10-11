import React from 'react'
import "./projectsTopbar.scss"
import {FileOpenOutlined, FileOpen,FileCopy, RemoveRedEye, PieChartOutline, Search, Add, MoreVert, ExpandMore, Splitscreen} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';


export default function ProjectsTopbar({tab}) {

    const location = useLocation()
    
    

  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <div className="navItems">
                    <Link to="/projects/open" style={{textDecoration: "none"}}>
                        <div className={`navItem ${tab === "open" ? "active" : ""}`}>
                            <FileOpenOutlined /> Open
                        </div>
                    </Link>
                    <Link to="/projects/completed" style={{textDecoration: "none"}}>

                        <div className={`navItem ${tab === "completed" ? "active" : ""}`}>
                            <FileOpen /> Completed
                        </div>
                    </Link>

                    

                    <Link to="/projects/all" style={{textDecoration: "none"}}>

                        <div className={`navItem ${tab === "all" ? "active" : ""}`}>
                        <FileCopy /> All
                        </div>
                    </Link>
                    <div className="navItem">
                        <RemoveRedEye /> Watchlist
                    </div>
                    
                </div>

            </div>

            <div className="topCenter">
                <div className="searchArea">
                    <Search />
                    <input type="text" placeholder="Search anything..."/>
                </div>
            </div>
            <div className="topRight">
                <button className='addNewProjectButton'> <Add /> Add new</button>

            </div>
        </div>
    </div>
  )
}
