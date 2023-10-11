import React, { useContext } from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";
import {
  AccountTree,
  DashboardOutlined,
  FormatListBulletedOutlined,
  CalendarMonthOutlined,
  MessageOutlined,
  GroupsOutlined,
  HelpOutline,
  SettingsOutlined,
  NotificationsNone,
  Settings,
  MoreVert,
  Sell,
  AttachMoney
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

export default function Sidebar() {

  const location = useLocation()
  const tab = location.pathname.split("/")[1]
  const [moreUserModal, setMoreUserModal] = useState(false)

  const {user, dispatch} = useContext(AuthContext)
  
  const handleLogout = () => {
    setMoreUserModal(false)
    dispatch({type:"LOGOUT"})
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarLogo">
          <span className="logo">
            <img src="https://res.cloudinary.com/dydivylgi/image/upload/v1667753023/kribstudio/krib_Studio_logo_v1.1_fara_floare_g1pnns.png" alt="" />
            {" "}
            <div className="taskManagerDiv">
              <AccountTree /> task manager
            </div>
           
          </span>
        </div>

        {user && <div className="sidebarNav">
          <span className="greyedOutText">OVERVIEW</span>

          <div className="overviewElements">
            <div className={`elementsItem ${tab === "dashboard" ? "active" : ""}`}>
              <div className="elementsWrapper">
                <Link to="/dashboard/tasks" style={{textDecoration: "none"}}>
                  <div className="elementName">
                    <DashboardOutlined /> Dashboard
                  </div>
                </Link>
                
                <div className="elementBadge">2</div>
              </div>
            </div>
            <div className={`elementsItem ${tab === "tasks" ? "active" : ""}`}>
              <div className="elementsWrapper">
                <Link to="/tasks" style={{textDecoration: "none"}}>
                  <div className="elementName">
                    <FormatListBulletedOutlined /> Tasks
                  </div>
                </Link>
               

                <div className="elementBadge">2</div>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <div className="elementName">
                  <CalendarMonthOutlined /> Schedule
                </div>

                <div className="elementBadge">2</div>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <div className="elementName">
                  <MessageOutlined /> Messages
                </div>

                <div className="elementBadge">2</div>
              </div>
            </div>
            <span className="greyedOutText">WORKSPACE</span>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <div className="elementName">
                  <GroupsOutlined /> Teams
                </div>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <Link to="/projects" style={{textDecoration: "none"}}>
                <div className="elementName">
                  <AccountTree /> Projects
                </div>
                </Link>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <Link to="/priceGenerator" style={{textDecoration: "none"}}>
                <div className="elementName">
                  <  Sell /> Price Generator
                </div>
                </Link>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <Link to="/priceOffer" style={{textDecoration: "none"}}>
                <div className="elementName">
                  <  AttachMoney /> Price Offer
                </div>
                </Link>
              </div>
            </div>
            <span className="greyedOutText">GENERAL</span>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <div className="elementName">
                  <HelpOutline /> Help
                </div>
              </div>
            </div>
            <div className="elementsItem">
              <div className="elementsWrapper">
                <div className="elementName">
                  <SettingsOutlined /> Settings
                </div>
              </div>
            </div>
          </div>
        </div>}

        <div className="sidebarFooter">
            <div className="sidebarFooterContent">
                {!user && <div className="footerIconContainer">
                  <Link to={"/login"} style={{textDecoration: "none", color: "inherit"}}>Login</Link>
                  <Link to={"/register"} style={{textDecoration: "none", color: "inherit"}}>Register</Link>
                </div>  }
                {user && <><div className="footerIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="footerIconContainer">
                    <Settings/>
                </div>
                <div className="footerIconContainer">
                    
                    <img src={user.picture} className="profilePic"/>
                    <h5>logged in as<br/><span>{user.firstname} {user.lastname}</span></h5>
                    <MoreVert onClick={() => setMoreUserModal(!moreUserModal)}/>
                </div>
                {moreUserModal && <div className="moreUserModal">
                  <button className="moreBtn" onClick={handleLogout}>Logout</button>
                </div> }
                </>}
            </div>
        </div>
      </div>
    </div>
  );
}
