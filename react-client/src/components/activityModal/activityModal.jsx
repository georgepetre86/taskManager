import React, { useContext, useEffect } from 'react'
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { AuthContext } from "../../context/AuthContext";
import useFetch from '../../hooks/useFetch';
import "./activityModal.scss";

export default function ActivityModal(props) {

    const { user } = useContext(AuthContext);
    const [inputComment, setInputComment] = useState({});
    const [currentId, setCurrentId] = useState("");
    const [rowData, setRowData] = useState({});
    const [addCommentModal, setAddCommentModal] = useState(false);
    const [addParentModal, setAddParentModal] = useState(false);
    const [activeProjectsList, setActiveProjectsList] = useState([]);
    const [parentList, setParentList] = useState([]) // set the list to update to DB
    const [editSummaryModal, setEditSummaryModal] = useState(false);
    const [inputEditSummary, setInputEditSummary] = useState({});
    const [displayAssignedParent, setDisplayAssignedParent] = useState([])



    useEffect(() => {
        setCurrentId(props.activityId)
    },[props])

    const { data, loading, error, reFetch } = useFetch(`/api/activities/find/${currentId}`);

    useEffect(() => {
        setRowData(data)
    },[data])

    
    //COMMENT SECTION
    //handle open comment modal
        const handleOpenCommentModal = () => {
            setAddCommentModal(true);
        };

    //handle Input Comment in Activity Modal
        const handleInputComment = (e) => {
            setInputComment({
            ...inputComment,
            note: e.target.value,
            user: user.username,
            });
        };
    //ADD COMMENT TO DATABASE
    const handleAddCommentToDatabase = async () => {
        setInputComment({ ...inputComment, date: Date.now() });
        try {
        await axios.put(
            `/activities/addAnotherComment/${currentId}`,
            inputComment
        );
        const newRowData = await axios.get(`/activities/find/${currentId}`);
        setRowData(newRowData.data);
        setAddCommentModal(false);
        setInputComment({});
        } catch (err) {
        console.log(err);
        }
    };

    //DELETE COMMENT
    const handleDeleteComment = async (commId) => {
        const body = { commentId: commId };
        try {
        const res = await axios.put(
            `/activities/deleteComment/${currentId}`,
            body
        );
        const newRowData = await axios.get(`/activities/find/${currentId}`);
        setRowData(newRowData.data);
        } catch (err) {
        console.log(err);
        }
    };

    // ADD NEW PARENT PROJECT SECTION

  // Open Modal

  const handleAddNewParentModal = async () => {
    setAddParentModal(true);
    const projectsList = await axios.get(`/projects/getActiveList`);
    
    setActiveProjectsList(projectsList.data);
  };

  //Add all checked items to $parentList
  const handleNewParentClick = (id) => {
    
      if(!parentList.includes(id)){
        setParentList([...parentList, id])
      }else{
        setParentList(parentList.filter(item => item !== id))
      }
    }

  const handleAddParentToActivity = async () => {

    try {
      parentList.forEach(async (parent) => {
        await axios.put(`/activities/addParentToActivity/${currentId}/${parent}`)
        await axios.put(`/projects/addActivityToProject/${parent}/${currentId}`)
      })
      const newRowData = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRowData.data);
    } catch (err) {
      console.log(err)
    }
    setParentList([])
    setAddParentModal(false)
    
  };

  //get the details of the parent ids stored in activity
  useEffect(() => {
    const getParentObject = async () => {
      try {
        const res = await Promise.all(
          rowData.parent.map(async (item) => {
            const data = await axios.get(`/projects/find/${item}`)
            return data.data
          })
        )
        setDisplayAssignedParent(res)
      } catch (err) {
        console.log(err)
      }
    }
    getParentObject()
  }, [rowData])


  //Handle changes in the activity - CHANGE ASIGNEE, PRIORITY, STAGE

  const handleChangeAsignee = async (e) => {
    e.preventDefault();
    const saveData = { asignee: e.target.value };

    try {
      await axios.put(`/activities/${currentId}`, saveData);
      const newRow = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRow.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePriority = async (e) => {
    e.preventDefault();
    const saveData = { priority: e.target.value };

    try {
      await axios.put(`/activities/${currentId}`, saveData);
      const newRow = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRow.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStage = async (e) => {
    e.preventDefault();
    const saveData = { stage: e.target.value };

    try {
      await axios.put(`/activities/${currentId}`, saveData);
      const newRow = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRow.data);
    } catch (err) {
      console.log(err);
    }
  };


  //SUMMARY EDIT UPDATE SECTION
  //handle open edit summary modal
  const handleOpenEditSummaryModal = () => {
    setEditSummaryModal(!editSummaryModal); // open the modal
    setInputEditSummary({ summary: rowData.summary }); // initialize the input with current summary value
  };

  //handle edit summary

  const handleEditSummaryModal = (e) => {
    setInputEditSummary({
      ...inputEditSummary,
      [e.target.name]: e.target.value,
    });
  };

  //handle UPDATE summary
  const handleUpdateSummary = async () => {
    const saveData = { summary: inputEditSummary.summary };

    try {
      await axios.put(`/activities/${currentId}`, saveData);
      const newRow = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRow.data);
      setEditSummaryModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  //show the date in a readable format. Must pass an int
  const dateFormat = (item) => {
    let ConvDate = new Date(item);
    return (
      ConvDate.getDate() +
      "/" +
      (parseInt(ConvDate.getMonth()) + 1) +
      "/" +
      ConvDate.getFullYear()
    );
  };

  
  return (
    
        
            <>
            
            <div className="topModal">
              <div className="modalSummary">
                <div className="summaryLine">
                  <h4>Summary</h4>
                  <EditIcon
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "#fed766",
                    }}
                    onClick={() => handleOpenEditSummaryModal()}
                  />
                </div>
                {editSummaryModal && (
                  <div className="editSummaryModal">
                    <input
                      name="summary"
                      type="text"
                      value={inputEditSummary.summary}
                      onChange={handleEditSummaryModal}
                    />
                    <button onClick={() => handleUpdateSummary()}>
                      Update
                    </button>
                  </div>
                )}
                {!editSummaryModal && <span>{rowData.summary}</span>}
                <div className="currentData">
                    <div className="asignee">asignee: <br/>{rowData.asignee}</div>
                    <div className={`priority ${
                    rowData.priority === "low"
                      ? "green"
                      : rowData.priority === "medium"
                      ? "yellow"
                      : rowData.priority === "high"
                      ? "red"
                      : "gray"
                  }`}>priority: <br/>{rowData.priority}</div>
                    <div className={`stage ${
                    rowData.stage === "completed"
                      ? "green"
                      : rowData.stage === "raised"
                      ? "gray"
                      : rowData.stage === "in progress"
                      ? "yellow"
                      : "red"
                  }`}>stage: <br/>{rowData.stage}</div>
                </div>
              </div>

              <div className="topRightModal">
                
                <div className="modalAsignee">
                  <FormControl sx={{ m: 1, minWidth: 100}} size="small">
                    <InputLabel id="demo-select-small">asignee</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={rowData.asignee}
                      label="asignee"
                      onChange={handleChangeAsignee}
                    >
                      <MenuItem value={"unassigned"}>unassigned</MenuItem>
                      <MenuItem value={"george"}>george</MenuItem>
                      <MenuItem value={"mihai"}>mihai</MenuItem>
                    </Select>
                    
                  </FormControl>
                </div>
                <div
                  className={`modalPriority ${
                    rowData.priority === "high"
                      ? "red"
                      : rowData.priority === "medium"
                      ? "yellow"
                      : "green"
                  }`}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">priority</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={rowData.priority}
                      label="priority"
                      onChange={handleChangePriority}
                    >
                      <MenuItem value={"low"}>low</MenuItem>
                      <MenuItem value={"medium"}>medium</MenuItem>
                      <MenuItem value={"high"}>high</MenuItem>
                    </Select>
                   
                  </FormControl>
                </div>
                <div
                  className={`modalStage ${
                    rowData.stage === "completed"
                      ? "green"
                      : rowData.stage === "raised"
                      ? "gray"
                      : rowData.stage === "in progress"
                      ? "yellow"
                      : "red"
                  }`}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">stage</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={rowData.stage}
                      label="stage"
                      onChange={handleChangeStage}
                    >
                      <MenuItem value={"raised"}>raised</MenuItem>
                      <MenuItem value={"in progress"}>in progress</MenuItem>
                      <MenuItem value={"completed"}>completed</MenuItem>
                    </Select>
                   
                  </FormControl>

                </div>
              </div>
            </div>

            <div className="midModal">
              <div className="commentSectionModal">
                <div className="topCommentSection">
                  <span>Comments</span>
                  <button onClick={() => handleOpenCommentModal()}>
                    <AddIcon />
                    Add New
                  </button>
                </div>
                {addCommentModal && (
                  <div className="addNewComment">
                    <div className="topLine">
                      <span>Add new comment</span>
                      <Close
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        onClick={() => {
                          setAddCommentModal(false);
                          setInputComment({});
                        }}
                      />
                    </div>
                    <input
                      name="comment"
                      type="text"
                      value={inputComment.comment}
                      onChange={handleInputComment}
                    />
                    <button onClick={() => handleAddCommentToDatabase()}>
                      Add
                    </button>
                  </div>
                )}
                <div className="allCommentsSection">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "15%" }}>Date</th>
                        <th style={{ width: "55%" }}>Note</th>
                        <th style={{ width: "10%" }}>User</th>
                        <th style={{ width: "10%" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      { rowData.comment !== undefined && rowData.comment.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item.date.split("T")[0]}{" "}
                            {
                              item.date
                                .split("T")[1]
                                .split("Z")[0]
                                .split(".")[0]
                            }
                          </td>
                          <td
                            style={{
                              backgroundColor:
                                 item.note.charAt(0) === "!" ? "#aa5042" : item.note.charAt(0) === "*" ? "#7fc6a4" :"",
                              color:  item.note.charAt(0) === "!" ? "#fff" : item.note.charAt(0) === "*" ? "#fff" : "",
                            }}
                          >
                            {item.note}
                          </td>
                          <td>{item.user}</td>
                          <td>
                            <Delete
                              onClick={() => handleDeleteComment(item._id)}
                              style={{
                                color: "#d7826a",
                                cursor: "pointer",
                                fontSize: "18px",
                              }}
                            />
                            <Edit
                              style={{
                                color: "#fed766",
                                cursor: "pointer",
                                fontSize: "18px",
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="attachSectionModal">
                <div className="topAttachSection">
                  <span>Parent project</span>
                  <button onClick={() => handleAddNewParentModal()}>
                    <AddIcon />
                    Add New
                  </button>
                </div>
                {addParentModal && (
                  <div className="addNewParent">
                    <div className="topLine">
                      <span>Add new parent</span>
                      <Close
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        onClick={() => {
                          setAddParentModal(false);setParentList([]);
                        }}
                      />
                    </div>

                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "10%" }}>Mark</th>
                          <th style={{ width: "30%" }}>Client</th>
                          <th style={{ width: "25%" }}>Number</th>
                          <th style={{ width: "15%" }}>Deadline</th>
                          
                        </tr>
                      </thead>
                      {activeProjectsList.map((item, index) => (
                        <tr key={item._id}>
                         
                          <td>
                            <input
                              type="checkbox"
                              
                              onChange={()=>handleNewParentClick(item._id)}
                            />
                          </td>
                          <td>{item.client}</td>
                          <td>{item.number}</td>
                          <td>{dateFormat(parseInt(item.deadline))}</td>
                          
                        </tr>
                      ))}
                    </table>

                    <button onClick={() => handleAddParentToActivity()}>
                      Add
                    </button>
                  </div>
                )}
                <div className="allAttachmentSection">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Number</th>
                        <th style={{ width: "10%" }}>Deadline</th>
                        <th style={{ width: "60%" }}>Client</th>
                      </tr>
                    </thead>

                    {displayAssignedParent && displayAssignedParent.map((item, index) => (
                      <tr key={index}>
                        <td>{item.number}</td>
                        <td>{dateFormat(parseInt(item.deadline))}</td>
                        <td>{item.client}</td>
                        
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            <div className="botModal">
              {/* <div className='saveBtn'>Save</div> */}
            </div>
          </>
      
  )
}
