import React, { useEffect, useState } from 'react'
import "./projectsTopbar.scss"
import {FileOpenOutlined, FileOpen,FileCopy, RemoveRedEye, PieChartOutline, Search, Add, MoreVert, ExpandMore, Splitscreen} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../../hooks/useFetch';


export default function ProjectsTopbar({tab}) {

    const {data, loading, error, reFetch} = useFetch("/projects")

    
    const location = useLocation()
    const [addNewProjectModal, setAddNewProjectModal] = useState(false)
    const [newProjectInput, setNewProjectInput] = useState({})
    const [projectNumberArray, setProjectNumberArray] = useState([])
    const [lastProjectNumber, setLastProjectNumber] = useState("")

    useEffect(() => {
        data.forEach((item) => {
           
            if (!projectNumberArray.includes(item.number)){
                projectNumberArray.push(item.number)
            }
            
        })

        setLastProjectNumber(projectNumberArray.pop())

    },[data])

    
    
   

    
    const handleAddNewProjectModal = () => {
        setAddNewProjectModal(true)
    }

    const handleCloseActivityModal = () => {
        setAddNewProjectModal(false)
        setNewProjectInput({})
    }

    const handleInputProject = (e) => {
        setNewProjectInput({...newProjectInput, [e.target.name]: e.target.value})
    
    }

    const handleAddNewProject = () => {

    }

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
                <button className='addNewProjectButton' onClick={()=>handleAddNewProjectModal()}> <Add /> Add new</button>

            </div>

            {addNewProjectModal && <div className='addNewProjectModal'>
                   <div className='modal-content'>
                   <div className='closeModal' onClick={()=>handleCloseActivityModal()}><CloseIcon /></div>
                   <div className="topModal">
                       <h3>Add new project</h3> 
                        
                   </div>
                   <div className="midModal">
                   <div className="itemClient">
                            <span>Project ID</span>
                            <input
                            name="projectNumber"
                            type="text"
                            value={newProjectInput.number}
                            onChange={handleInputProject}
                            readOnly = { true }
                            ></input>
                        </div>
                        <div className="itemClient">
                            <span>Client</span>
                            <input
                            name="projectClient"
                            type="text"
                            value={newProjectInput.projectClient}
                            onChange={handleInputProject}
                            readOnly = {false}
                            ></input>
                        </div>
                        <div className="itemClient">
                            <span>Summary</span>
                            <input
                            name="projectSummary"
                            type="text"
                            value={newProjectInput.projectSummary}
                            onChange={handleInputProject}
                            readOnly = {false}
                            ></input>
                        </div>
                        <div className="itemClient">
                            <span>Priority</span>
                            <input
                            name="projectPriority"
                            type="text"
                            value={newProjectInput.projectPriority}
                            onChange={handleInputProject}
                            readOnly = {false}
                            ></input>
                        </div>

                   </div>
                   <div className="footerModal">
                        <button onClick={()=>handleAddNewProject()}>Add</button>
                   </div>
                   </div>
                </div>}
        </div>
    </div>
  )
}
