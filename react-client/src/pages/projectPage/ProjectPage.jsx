import "./projectPage.scss"
import { Home, Close, Person, CalendarMonth, Place} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import ProjectFiles from '../../components/projectTasks/ProjectFiles'
import ProjectDetails from '../../components/projectDetails/ProjectDetails'
import ProjectWorkDetails from '../../components/projectWorkDetails/ProjectWorkDetails'
import ProjectProgressBar from '../../components/projectProgressBar/ProjectProgressBar'
import { useEffect, useState } from "react"
import { tasks } from "../../dummyData"
import useFetch from "../../hooks/useFetch"
import ProjectActivities from "../../components/projectRelationships/ProjectActivities"


export default function ProjectPage() {

    const location = useLocation();
    
    const projectId = location.pathname.split("/").pop()

    const {data, loading, error, reFetch} = useFetch(`/projects/find/${projectId}`)
    
    const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
    const [accessedTask, setAccessedTask] = useState({})
    const [dataToShow, setDataToShow] = useState({})

    useEffect( () => {
       setDataToShow(data)
    },[data])

    const handleEditTask = (id) => {
        setOpenEditTaskModal(true)
        const task = tasks.filter(task => task.id === id)
        setAccessedTask(task[0])
    }

    const jsonData = JSON.stringify(dataToShow)

    openEditTaskModal ? 
     (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "scroll");
    
   useEffect(() => {
    const element = document.getElementsByClassName("projectPageWrapper")[0]
    openEditTaskModal ? (element.style.filter = "blur(5px)")  : (element.style.filter = "blur(0)")
   }, [openEditTaskModal]);

  return (
   <div className="projectPage">
            {openEditTaskModal && 
            <div className='editTaskModal'>
                    <div className="editTaskModalWrapper">
                        <Close className="closeBtn" onClick={()=>setOpenEditTaskModal(false)}/>
                        <h4>{accessedTask.summary}</h4>
                        
                        <div className="taskContents">
                            
                            <div className="taskContentsLeft">
                                <div className="taskContentsItem">
                                    <div className="taskContentsItemLeft">ID</div>
                                    <div className="taskContentsItemRight">{accessedTask.id}</div>
                                </div>
                                <div className="taskContentsItem">
                                    <div className="taskContentsItemLeft">DEPARTMENT</div>
                                    <div className="taskContentsItemRight">{accessedTask.department}</div>
                                </div>
                                <div className="taskContentsItem">
                                    <div className="taskContentsItemLeft">priority</div>
                                    <div className="taskContentsItemRight">{accessedTask.priority}</div>
                                </div>
                            </div>
                            <div className="taskContentsRight">
                                <div className="taskContentsCard">
                                    <Person /> {accessedTask.asignee}
                                </div>
                                <div className="taskContentsCard">
                                    <CalendarMonth /> {accessedTask.duedate}
                                </div>
                                <div className="taskContentsCard">
                                    <Place /> {accessedTask.stage}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>}
    <div className="projectPageWrapper">
        <div className="topbarTitleNav">

            <ul>
                <li className='link'><Link to="/dashboard/tasks" style={{textDecoration: "none", color: "black"}}><Home /></Link></li>
                <li > • </li>
                <li className='link'><Link to="/projects" style={{textDecoration: "none", color: "black"}} >Projects</Link></li>
                <li> • </li>
                <li className='link'>{dataToShow.number}</li>
                <li> • </li>
                <li className='link'>{dataToShow.client}</li>
            </ul>
            
        </div>
        <div className="topbarProjectProgress">
            <ProjectProgressBar />
        </div>
        <div className="projectCards">
            <div className="projectCardsLeft">
                <ProjectWorkDetails dataToShow={{...dataToShow}} projectId={projectId} reFetch={reFetch}/>
                <ProjectActivities dataToShow={{...dataToShow}}/>

            </div>
            <div className="projectCardsRight">
            <ProjectFiles dataToShow={{...dataToShow}} projectId={projectId} reFetch={reFetch}/>
             <ProjectDetails dataToShow={{...dataToShow}} projectId={projectId} reFetch={reFetch}/>   
            </div>

        </div>

    </div>
   </div>
  )
}
