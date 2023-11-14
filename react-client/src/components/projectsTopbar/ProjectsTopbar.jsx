import React, { useEffect, useState } from "react";
import "./projectsTopbar.scss";
import {
  FileOpenOutlined,
  FileOpen,
  FileCopy,
  RemoveRedEye,
  PieChartOutline,
  Search,
  Add,
  MoreVert,
  ExpandMore,
  Splitscreen,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../hooks/useFetch";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function ProjectsTopbar({ tab, passNewProject }) {
  const { data, loading, error, reFetch } = useFetch("/projects");

  const location = useLocation();
  const [addNewProjectModal, setAddNewProjectModal] = useState(false);
  const [newProjectInput, setNewProjectInput] = useState({});
  const [projectNumberArray, setProjectNumberArray] = useState([]);
  const [newProjectNumber, setNewProjectNumber] = useState("");
  const [projectPriority, setProjectPriority] = useState("normal");
  const [deadline, setDeadline] = useState("")

  const handleAddNewProjectModal = async () => {
    setAddNewProjectModal(true);
    const lastElem = await axios.get(`/projects/getLastElement`);

    

    const newProjectNumber = () => {
      let string = lastElem.data.toString().slice(-5);

      //split the number of project before after 0
      function splitLastOccurrence(str, substring) {
        let substringCount = 0;
          for (let i=0; i<str.length; i++){
            if (str[i]===substring){
              substringCount++
            }else break
          }
        const lastIndex = substringCount - 1;


        const before = str.slice(0, lastIndex) + substring;

        const after = str.slice(lastIndex + 1);

        return [before, after];
      }

      const [before, after] = splitLastOccurrence(string.toString(), "0");

      const newNumber =
        "KRBS" + before  + (parseInt(after) + 1).toString();

      return newNumber;
    };

    setNewProjectNumber(newProjectNumber());
  };

  //set deadline 

  const handleInputProjectDeadline = (e) => {
    setDeadline(e.target.value)
  }

  //change project priority with radio buttons
  const handleProjectPriority = (e) => {
    e.preventDefault();
    setProjectPriority(e.target.value);
  };


  const handleCloseActivityModal = () => {
    setAddNewProjectModal(false);
    setNewProjectInput({});
    setDeadline("")
    setProjectPriority("normal")
  };

  const handleInputProject = (e) => {
    e.preventDefault();
    setNewProjectInput({
      ...newProjectInput,
      [e.target.name]: e.target.value,
      
    });
  };

  useEffect(() => {
    setNewProjectInput({
      ...newProjectInput,
      priority: projectPriority,
      number: newProjectNumber,
      progress: "0",
      status: "ontrack",
      deadline: deadline ? weeksToMilliseconds(deadline) : Date.now() + 4838400000,
    })
  },[deadline, projectPriority])

  const weeksToMilliseconds = (arg) => {
    
    const  millis = Date.now() + arg * 7 * 24 * 60 * 60 * 1000;
   
    
    return millis;
  }

  const handleAddNewProject = async () => {
    try {
      const proj = await axios.post(`/projects`, newProjectInput);
      console.log("uploaded", proj);
    } catch (err) {
      console.log(err);
    }

    setNewProjectInput({});
    setAddNewProjectModal(false);
    window.location.reload(true);//refresh the page
    passNewProject(true) //pass to parent newProject value true
    
  };

  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <div className="navItems">
            <Link to="/projects/open" style={{ textDecoration: "none" }}>
              <div className={`navItem ${tab === "open" ? "active" : ""}`}>
                <FileOpenOutlined /> Open
              </div>
            </Link>
            <Link to="/projects/completed" style={{ textDecoration: "none" }}>
              <div className={`navItem ${tab === "completed" ? "active" : ""}`}>
                <FileOpen /> Completed
              </div>
            </Link>

            <Link to="/projects/all" style={{ textDecoration: "none" }}>
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
            <input type="text" placeholder="Search anything..." />
          </div>
        </div>
        <div className="topRight">
          <button
            className="addNewProjectButton"
            onClick={() => handleAddNewProjectModal()}
          >
            {" "}
            <Add /> Add new
          </button>
        </div>

        {addNewProjectModal && (
          <div className="addNewProjectModal">
            <div className="modal-content">
              <div
                className="closeModal"
                onClick={() => handleCloseActivityModal()}
              >
                <CloseIcon />
              </div>
              <div className="topModal">
                <h3>Add new project</h3>
              </div>
              <div className="midModal">
                <div className="itemClient">
                  <span>Project ID</span>
                  <input
                    name="projectNumber"
                    type="text"
                    value={newProjectNumber}
                    onChange={handleInputProject}
                    readOnly={true}
                  ></input>
                </div>
                <div className="itemClient">
                  <span>Priority</span>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={projectPriority ? projectPriority : "normal"}
                    onChange={handleProjectPriority}
                    
                    
                  >
                    <FormControlLabel
                      value="low"
                      control={<Radio size="small" />}
                      label="low"
                    />
                    <FormControlLabel
                      value="normal"
                      control={<Radio size="small" />}
                      label="normal"
                      defaultChecked
                    />
                    <FormControlLabel
                      value="high"
                      control={<Radio size="small" />}
                      label="high"
                    />
                  </RadioGroup>
                </div>
                <div className="itemClient">
                  <span>Deadline (weeks)</span>
                  <input
                    name="deadline"
                    type="text"
                    value={deadline}
                    onChange={handleInputProjectDeadline}
                    readOnly={false}
                  ></input>
                </div>
                <div className="itemClient">
                  <span>Client</span>
                  <input
                    name="client"
                    type="text"
                    value={newProjectInput.projectClient}
                    onChange={handleInputProject}
                    readOnly={false}
                  ></input>
                </div>
                <div className="itemClient">
                  <span>Summary</span>
                  <input
                    name="summary"
                    type="text"
                    value={newProjectInput.projectSummary}
                    onChange={handleInputProject}
                    readOnly={false}
                  ></input>
                </div>
              </div>
              <div className="footerModal">
                <button onClick={() => handleAddNewProject()}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
