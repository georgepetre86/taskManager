import React, { useEffect, useState } from 'react'
import "./projectActivities.scss"
import { Add } from '@mui/icons-material'
import axios from 'axios'
import ActivityModal from '../activityModal/activityModal'
import CloseIcon from "@mui/icons-material/Close";

export default function ProjectActivities(props) {

    const [activityArray, setActivityArray] = useState([])
    const [allActivityArray, setAllActivityArray] = useState([{}])
    const [activityModal, setActivityModal] = useState(false)
    const [currentId, setCurrentId] = useState("") 
    const [tab, setTab] = useState("all")
    const [displayActivityArray, setDisplayActivityArray] = useState([{}])

    

    useEffect(() => {
        const getActivityObjectArray = async () => {
            try {
                const res = await Promise.all(
                    props.dataToShow.activities.map( async (item) => {
                        const data = await axios.get(`/activities/find/${item}`)
                        return data.data
                    })
                )
                setAllActivityArray(res)
                setDisplayActivityArray(res)
            } catch (err) {
                console.log(err)
            }
            
        }
        getActivityObjectArray()
       
    },[props])

    useEffect(() => {
        getActiveActivityList(tab)
    },[tab])

    //DISPLAY ACTIVITIES ONGOING VS COMPLETED
    
    const getActiveActivityList = (tab) => {
        if(tab === "ongoing"){
            setDisplayActivityArray(allActivityArray.filter((item) => item.stage !== "completed"))
        }else if(tab === "completed"){
            setDisplayActivityArray(allActivityArray.filter((item) => item.stage === "completed"))
        }else {
            setDisplayActivityArray(allActivityArray)
        }
    }    
    
    const handleOpenActivityModal = (id) => {
        setActivityModal(true)
        setCurrentId(id)
    }

    const handleCloseActivityModal = () => {
        setActivityModal(false);
        props.reFetch()
        
        getActiveActivityList(tab)
      };
    
   
     
  return (
    <>
    <div className="cardItem">
                    <div className="topbarCardItem">
                        <h4>Activities</h4>
                        <button><Add /> Add new</button>
                    </div>
                    <div className="tableRelationships">
                        <div className="filterRelationship">
                            <div className={`filteredRelasionshipItem ${tab === "all" ? "active" : ""}`} onClick={()=>setTab("all")}>All</div>
                            <div className={`filteredRelasionshipItem ${tab === "ongoing" ? "active" : ""}`} onClick={()=>setTab("ongoing")}>Ongoing</div>
                            <div className={`filteredRelasionshipItem ${tab === "completed" ? "active" : ""}`} onClick={()=>setTab("completed")}>Completed</div>
                        </div>
                        <div className="tableHead">
                                <ul>
                                    <li style={{width: "10%"}}>Raised</li>
                                    <li style={{width: "46%"}}>Summary</li>
                                    <li style={{width: "10%"}}>Asignee</li>
                                    <li style={{width: "10%"}}>Updated</li>
                                    <li style={{width: "10%"}}>Stage</li>
                                    <li style={{width: "10%"}}>Priority</li>
                                    
                                    
                                </ul>
                            </div>
                            <div className="tableContents">
                                {Object.keys(displayActivityArray).length !== 0 ? displayActivityArray.map((item, index) => (

                                    <ul key={index} onClick={()=>handleOpenActivityModal(item._id)}>
                                    <li style={{width: "10%"}}>{item.createdAt ? item.createdAt.split("T")[0] : ""}</li>
                                    <li style={{width: "46%"}}>{item.summary}</li>
                                    <li style={{width: "10%"}}>{item.asignee}</li>
                                    <li style={{width: "10%"}}>{item.updatedAt ? item.updatedAt.split("T")[0] : ""}</li>
                                    <li style={{width: "10%"}}>{item.stage}</li>
                                    <li style={{width: "10%"}}>{item.priority}</li>
                                    
                                    </ul>
                                )) : ""}
                                
                                
                            </div>
                    </div>
                    
    </div>
    {activityModal && (
        <div className="activityModal">
          <div className="modal-content">
            <div
              className="closeModal"
              onClick={() => handleCloseActivityModal()}
            >
              <CloseIcon />
            </div>

            <ActivityModal activityId={currentId}/> 

           
            <div className="botModal">
              {/* <div className='saveBtn'>Save</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
