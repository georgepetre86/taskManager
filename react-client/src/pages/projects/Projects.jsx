import React from 'react'
import ProjectsTopbar from '../../components/projectsTopbar/ProjectsTopbar'
import "./projects.scss"
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { projectsRows } from '../../dummyData';

const openProjects = projectsRows.filter(project => project.step === "open")
const completedProjects = projectsRows.filter(project => project.step === "completed")

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'project', headerName: 'Project', width: 130 },
  { field: 'summary', headerName: 'Summary', width: 230 },
  { field: 'priority', headerName: 'Priority', width: 130 },
  {
    field: 'startedAt',
    headerName: 'Started at',
    type: 'date',
    width: 160,
  },
  {
    field: 'deadline',
    headerName: 'Deadline',
    type: 'date',
    width: 160
  },
  {field: 'progress',
  headerName: 'Progress',
  width: 200,
  renderCell: (params) => {
      return(
          <progress id="projects" value={params.row.progress} max="100" />
      )
  }},
  { field: 'stage', headerName: 'Stage', width: 130 },
  { field: 'status', headerName: 'Status', width: 130, renderCell: (params) => {
    return(
      <div className={`projectStatus ${params.row.status === "ontrack" ? "green" : params.row.status === "delayed" ? "yellow":"red"}`}>{params.row.status}</div>
    )
  } },
  {field:'actions',
  headerName: 'Actions',
  width:120,
  renderCell: (params) => {
      return(
          <>  <Link to={"/projects/"+params.row.id}>
              <button className='taskListView'>View</button>
              </Link>
              
             
          </>
          
      )
  }},
];

export default function Projects({tab}) {
  
  return (
    <div className="projects">
        <ProjectsTopbar tab={tab}/>

        <div className="projectsWrapper">
            
            <div className="projectsContent">
              <DataGrid
                    rows={tab === "open" ? openProjects : tab === "completed" ? completedProjects : projectsRows}
                    columns={columns}
                    disableSelectionOnClick
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    </div>
  )
}
