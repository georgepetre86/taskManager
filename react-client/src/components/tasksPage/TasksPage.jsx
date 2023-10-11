import React from 'react'
import "./tasksPage.scss"
import {ExpandCircleDown, Comment, CropSquare, TaskAlt} from '@mui/icons-material'
import { tasks } from '../../dummyData'

const todoTasks = tasks.filter(task => task.stage === "todo")
const inprogressTasks = tasks.filter(task => task.stage === "inprogress")
const completedTasks = tasks.filter(task => task.stage === "completed")

export default function Activities() {
  return (
    <div className="tasksPage">
        <div className="tasksPageWrapper">
            <ul className='projectList'>
                <div className='listTitle'>
                <ExpandCircleDown />
                <span>KRBS0001</span> •
                <h5>Riflaje 90mp tavan living</h5> •
                <h5>Andrei Stanciu</h5>
                </div>
                {/* TO DO */}
                <li className='todoList'>
                    <div className='todoList-headers'>
                        <div className='todoListTAB'>
                            <span>to do</span>
                        </div>
                        <div className='todoListHeaders'>
                            <div className='todoListHeadersItem'>Asignee</div>
                            <div className='todoListHeadersItem'>Due Date</div>
                            <div className='todoListHeadersItem'>Priority</div>
                            <div className='todoListHeadersItem'>Comments</div>
                        </div>
                    </div>
                    
                    <div className='todoList-list'>

                        <ul>
                            {todoTasks.map( task => (

                                <li>
                                    <div className='todoList-taskLine'>
                                        <div className="taskLine-summary">
                                            <div className="switchButton"><CropSquare /></div>
                                            <div className="summaryText">{task.summary}</div>
                                        </div>
                                        <div className="taskLine-properties">
                                            <div className='taskLinePropItem asignee'>{task.asignee}</div>
                                            <div className='taskLinePropItem'>{task.duedate}</div>
                                            <div className='taskLinePropItem'>{task.priority}</div>
                                            <div className='taskLinePropItem'><Comment /></div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                           
                        </ul>
                    </div>
                    
                </li>
                {/* In progress */}
                <li className='todoList'>
                    <div className='todoList-headers'>
                        <div className='todoListTAB'>
                            <span className='inprogress'>in progress</span>
                        </div>
                        <div className='todoListHeaders'>
                            <div className='todoListHeadersItem'>Asignee</div>
                            <div className='todoListHeadersItem'>Due Date</div>
                            <div className='todoListHeadersItem'>Priority</div>
                            <div className='todoListHeadersItem'>Comments</div>
                        </div>
                    </div>
                    
                    <div className='todoList-list'>

                        <ul>
                        {inprogressTasks.map( task => (

                            <li>
                                <div className='todoList-taskLine'>
                                    <div className="taskLine-summary">
                                        <div className="switchButton"><CropSquare /></div>
                                        <div className="summaryText">{task.summary}</div>
                                    </div>
                                    <div className="taskLine-properties">
                                        <div className='taskLinePropItem asignee'>{task.asignee}</div>
                                        <div className='taskLinePropItem'>{task.duedate}</div>
                                        <div className='taskLinePropItem'>{task.priority}</div>
                                        <div className='taskLinePropItem'><Comment /></div>
                                    </div>
                                </div>
                            </li>
                            ))}
                           
                        </ul>
                    </div>
                    
                </li>

                {/* Completed */}
                <li className='todoList'>
                    <div className='todoList-headers'>
                        <div className='todoListTAB'>
                            <span className='completed'>completed</span>
                        </div>
                        <div className='todoListHeaders'>
                            <div className='todoListHeadersItem'>Asignee</div>
                            <div className='todoListHeadersItem'>Due Date</div>
                            <div className='todoListHeadersItem'>Priority</div>
                            <div className='todoListHeadersItem'>Comments</div>
                        </div>
                    </div>
                    
                    <div className='todoList-list'>

                        <ul>
                        {completedTasks.map( task => (
                                <li>
                                    <div className='todoList-taskLine'>
                                        <div className="taskLine-summary">
                                            <div className="switchButton"><CropSquare /></div>
                                            <div className="summaryText">{task.summary}</div>
                                        </div>
                                        <div className="taskLine-properties">
                                            <div className='taskLinePropItem asignee'>{task.asignee}</div>
                                            <div className='taskLinePropItem'>{task.duedate}</div>
                                            <div className='taskLinePropItem'>{task.priority}</div>
                                            <div className='taskLinePropItem'><Comment /></div>
                                        </div>
                                    </div>
                                </li>
                                ))}
                           
                        </ul>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
  )
}
