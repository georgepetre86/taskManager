import React, { useEffect } from 'react'
import { useState } from 'react';
import "./activities.scss"
import { activities } from '../../dummyData'
import {DataGrid} from '@mui/x-data-grid';
import { CheckCircleOutline, Comment, AttachFile, CleaningServices } from '@mui/icons-material';
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function Activities() {

    

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'summary', headerName: 'Summary', width: 800, renderCell: (params) => {
            return(
                <div className='activitySummary'>{params.row.summary}</div>
            )
        } },
        { field: 'asignee', headerName: 'Asignee', width: 130, renderCell: (params) => {
            return(
    
            <div>{params.row.asignee}</div>
              
            )
        }
    
         },
        {
          field: 'priority', headerName: 'Priority', width: 90, renderCell: (params) => {
            return(
                <div className={`activityPriority ${params.row.priority === "high" ? "red" : params.row.priority === "medium" ? "yellow" : "green"}`}>{params.row.priority}</div>
            )
          }
    
        },
        { field: 'stage', headerName: 'Stage', width: 130, renderCell: (params) => {
            return(
              <div className={`activityStage ${params.row.stage === "completed" ? "green" : params.row.stage === "assigned"? "gray" : params.row.stage === "in progress" ? "yellow" : "red"}`}>{params.row.stage}</div>
            )
          } },
        {field:'actions',
        headerName: 'Actions',
        width:120,
        renderCell: (params) => {
            return(
                <>  
                    <button className='activityListView'>View</button>
                    <CheckCircleOutline className='activityListDone' />
                </>
                
            )
        }},
        { field: 'extra', headerName: 'Extra', width: 130, renderCell: (params) => {
            return(
                <>
                    {params.row.comment === "true" ? <Comment /> : ""}
                    
                    {params.row.attach === "true" ? <AttachFile /> : ""}
                </>
            )
        } },
      ];

      const [activityModal, setActivityModal] = useState(false)
      const [addNewModal, setAddNewModal] = useState(false)
      const [rowData, setRowData] = useState({})
      const [inputActivity, setInputActivity] = useState({})
      const [currentId, setCurrentId] = useState("")
      const [currentAsignee, setCurrentAsignee] = useState("all")
      const [dataToShow, setDataToShow] = useState({})
      const [currentPriority, setCurrentPriority] = useState("all")
      const [currentStage, setCurrentStage] = useState("all")
      //set Modal 

      //test push
      //show the _id of the row clicked
      const handleViewActivity = (id) => {
        const getRow = data.find(elem => elem.id === id)
        setCurrentId(getRow._id)
        setActivityModal(true) 
        setRowData(getRow)
      }

      //fetches all the activities from the database
      const {data, loading, error, reFetch} = useFetch("/activities")

      //maps a frontend id to each row from the database
      useEffect(() => {
        data.forEach((item, i) => {
          item.id = i+1;
      })
        setDataToShow(data)
      }, [data])
        
        

    const handleCloseActivityModal = () => {
        setActivityModal(false)
        reFetch()
    }
    
        //console.log(data)
    const handleAddNewActivity = () => {
        setAddNewModal(true)
    }

    const handleInput = (e) => {
        setInputActivity({...inputActivity, [e.target.name]: e.target.value})
    }

    const handleAsignee = (e) => {
        setInputActivity({...inputActivity, asignee: e.target.value})
    }

    const handlePriority = (e) => {
        setInputActivity({...inputActivity, priority: e.target.value})
    }

    const handleStage = (e) => {
        setInputActivity({...inputActivity, stage: e.target.value})
    }

    //Handle changes in the activity 

    const handleChangeAsignee = (e) => {

    }

    const handleChangePriority = (e) => {

    }

    const handleChangeStage = async (e) => {
        e.preventDefault()
        const saveData = {stage: e.target.value}
        
        try {
            await axios.put(`/activities/${currentId}`, saveData)
            const newRow = await axios.get(`/activities/${currentId}`)
            setRowData(newRow.data)

        } catch (err) {
            console.log(err)
        }
    }

  const handleFilterAsignee = (e) => {
      setCurrentAsignee(e.target.value)
    }

  const handleFilterPriority = (e) => {
      setCurrentPriority(e.target.value)
  }

  const handleFilterStage = (e) => {
    setCurrentStage(e.target.value)
  }

  //filter based on asignee, priority and stage
  useEffect(() => {
          if(currentAsignee === "all" && currentPriority === "all" && currentStage === "all"){
            reFetch()
          }
          
          if(currentAsignee === "all" && currentPriority !== "all"){
            setDataToShow(data.filter((item) => item.priority === currentPriority))
            console.log(dataToShow)
          }

          if(currentAsignee === "all" && currentStage !== "all"){
            setDataToShow(data.filter((item) => item.stage === currentStage))
            
          }

          if(currentAsignee !== "all" && currentPriority !== "all"){
            const asigneeList = data.filter((item) => item.asignee === currentAsignee)
            setDataToShow(asigneeList.filter((item) => item.priority === currentPriority))
          }

          if(currentAsignee !== "all" && currentStage !== "all"){
            const asigneeList = data.filter((item) => item.asignee === currentAsignee)
            setDataToShow(asigneeList.filter((item) => item.stage === currentStage))
          }

          if(currentAsignee !== "all" && currentStage === "all"){
            setDataToShow(data.filter((item) => item.asignee === currentAsignee))
          }

          if(currentAsignee === "all" && currentPriority !== "all" && currentStage !== "all"){
            const stageList = data.filter((item) => item.stage === currentStage)
            setDataToShow(stageList.filter((item) => item.priority === currentPriority))
            
          }

          if(currentAsignee !== "all" && currentPriority !== "all" && currentStage !== "all"){
            const stageList = data.filter((item) => item.stage === currentStage)
            const priorityList = stageList.filter((item) => item.priority === currentPriority)
            setDataToShow(priorityList.filter((item) => item.asignee === currentAsignee))
            
          }
      
  },[currentAsignee, currentPriority, currentStage])

  
  

    

  return (
    <div className="activities">
        <div className='topButtons'>
          <div className='addNewButton' onClick={()=>handleAddNewActivity()}>Add New</div>
          <div className='filterByName'>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">asignee</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={currentAsignee}
                          label="priority"
                          onChange={handleFilterAsignee}
                        >
                          <MenuItem value={"all"}>all</MenuItem>
                          <MenuItem value={"george"}>george</MenuItem>
                          <MenuItem value={"mihai"}>mihai</MenuItem>
                        </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">priority</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={currentPriority}
                          label="priority"
                          onChange={handleFilterPriority}
                        >
                          <MenuItem value={"all"}>all</MenuItem>
                          <MenuItem value={"low"}>low</MenuItem>
                          <MenuItem value={"medium"}>medium</MenuItem>
                          <MenuItem value={"high"}>high</MenuItem>
                        </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">stage</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={currentStage}
                          label="priority"
                          onChange={handleFilterStage}
                        >
                          <MenuItem value={"all"}>all</MenuItem>
                          <MenuItem value={"raised"}>raised</MenuItem>
                          <MenuItem value={"in progress"}>in progress</MenuItem>
                          <MenuItem value={"completed"}>completed</MenuItem>
                        </Select>
            </FormControl>
          </div>
        </div>
        
        <div className="activitiesWrapper">
                <DataGrid
                rows={dataToShow}
                columns={columns}
                disableSelectionOnClick
                onRowClick={(rows)=>{handleViewActivity(rows.id)}}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />



            {/* {<ul>
                    <li>
                        <div className='activityHeaders'>
                            <div className="headersLeft">
                                <div className="headersItem">ID</div>
                                <div className="headersItem">Summary</div>
                            </div>
                            <div className="headersRight">
                                <div className="headersItem right">Asignee</div>
                                <div className="headersItem right">Priority</div>
                                <div className="headersItem right">Stage</div>
                                <div className="headersItem right">Actions</div>
                            </div>
                        </div>
                    </li>
                {activities.map(activity => (
                    <li>
                        <div className='activity'>
                            <div className='activityLeft'>
                                <div className="activityItem">{activity.id}</div>
                                <div className="activityItem">{activity.summary}</div>

                            </div>
                            <div className='activityRight'>

                                <div className="activityItem right">{activity.asignee}</div>
                                <div className="activityItem right">{activity.priority}</div>
                                <div className="activityItem right">{activity.stage}</div>
                                <div className="activityItem right">actions</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>} */}
        </div>

        {activityModal && <div className='activityModal'>
                
                <div  className='modal-content'>
                <div className='closeModal' onClick={()=>handleCloseActivityModal()}><CloseIcon /></div>

                <div className='topModal'>
                
                    <div className='modalSummary'><h4>Summary</h4><span>{rowData.summary}</span></div>
                    <div className='topRightModal'>
                    <div className='modalAsignee'>
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">asignee</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={rowData.asignee}
                          label="Asignee"
                          onChange={handleChangeAsignee}
                        >
                          <MenuItem value={"george"}>george</MenuItem>
                          <MenuItem value={"mihai"}>mihai</MenuItem>
                        </Select>
                      </FormControl>
                      </div>
                    <div className={`modalPriority ${rowData.priority === "high" ? "red" : rowData.priority === "medium" ? "yellow" : "green"}`}>
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
                    <div className={`modalStage ${rowData.stage === "completed" ? "green" : rowData.stage === "raised"? "gray" : rowData.stage === "in progress" ? "yellow" : "red"}`}>
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

                <div className='midModal'>
                   
                    <div className='commentSectionModal'>
                    <h4>Comments</h4>
                        <ul>
                            {rowData.comment.map((item) => 
                            <li>{item}</li>)}
                        </ul>
                        <button>adauga </button>
                    </div>
                    <div className='attachSectionModal'>
                    <h4>Attachment</h4>
                        {rowData.attach}
                    </div>
                </div>

                </div>


            </div>}


            {addNewModal && <div className='addNewModal'>
                
                <div  className='modal-content'>
                <div className='closeModal' onClick={()=>setAddNewModal(false)}><CloseIcon /></div>

                <div className='topModal'>
                    
                    <div className='modalSummary'>
                    <h4>Summary</h4>
                    <input
                        name="summary"
                        type="text"
                        value={inputActivity.summary}
                        onChange={handleInput}
                      />
                    </div>
                    <div className='topLeftModal'>
                    <div className='modalAsignee'>
                    
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">asignee</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={inputActivity.asignee}
                          label="Asignee"
                          onChange={handleAsignee}
                        >
                          <MenuItem value={"george"}>george</MenuItem>
                          <MenuItem value={"mihai"}>mihai</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className={`modalPriority ${inputActivity.priority === "high" ? "red" : inputActivity.priority === "medium" ? "yellow" : "green"}`}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">priority</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={inputActivity.priority}
                          label="priority"
                          onChange={handlePriority}
                        >
                          <MenuItem value={"low"}>low</MenuItem>
                          <MenuItem value={"medium"}>medium</MenuItem>
                          <MenuItem value={"high"}>high</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className={`modalStage ${inputActivity.stage === "completed" ? "green" : inputActivity.stage === "raised"? "gray" : inputActivity.stage === "in progress" ? "yellow" : "red"}`}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">stage</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={inputActivity.stage}
                          label="stage"
                          onChange={handleStage}
                        >
                          <MenuItem value={"raised"}>raised</MenuItem>
                          <MenuItem value={"in progress"}>in progress</MenuItem>
                          <MenuItem value={"completed"}>completed</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    </div>  
                </div>

                <div className='midModal'>
                   
                    <div className='commentSectionModal'>
                    <h4>Comments</h4>
                        <ul>
                           
                        </ul>
                        <button>adauga </button>
                    </div>
                    <div className='attachSectionModal'>
                    <h4>Attachment</h4>
                        {rowData.attach}
                    </div>
                </div>
                <div className='botModal'>
                    <div className='saveBtn'>Save</div>
                </div>

                </div>


            </div>}
    </div>
  )
}
