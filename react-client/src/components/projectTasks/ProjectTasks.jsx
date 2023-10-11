import React, { useRef, useState } from 'react'
import "./projectTasks.scss"
import { Add } from '@mui/icons-material'
import { tasks } from '../../dummyData'
import { useEffect } from 'react'

export default function ProjectTasks(props) {
    
    
    
  return (
    <>
        
        <div className="cardItem">
                    <div className="topbarCardItem">
                        <h4>Tasks</h4>
                        <button><Add /> Add new</button>
                    </div>
                    <div className="tableTasks">
                            <div className="filterTasks">
                                <div className="filteredTasksItem active">Open</div>
                                <div className="filteredTasksItem">Completed</div>
                            </div>
                            <div className="tableHead">
                                <ul>
                                    <li style={{width: "57%"}}>Summary</li>
                                    <li style={{width: "20%"}}>Due date</li>
                                    <li style={{width: "10%"}}>Asignee</li>
                                    
                                </ul>
                            </div>
                            <div className="tableContents">
                            {tasks.map((task, index) => (
                                <ul onClick={()=>props.func(task.id)} key={index}>
                                    <li style={{width: "57%"}}>{task.summary}</li>
                                    <li style={{width: "20%"}}>{task.duedate}</li>
                                    <li style={{width: "10%"}}>{task.asignee}</li>
                                    
                                </ul>
                            ))}
                                
                               
                            </div>
                        </div>
        </div>
    </>
    
  )
}
