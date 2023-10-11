import React from 'react'
import "./openTasks.scss"
import { DataGrid } from '@mui/x-data-grid';
import {CheckCircleOutline} from '@mui/icons-material';
import { tasksRows } from '../../dummyData';
import { Link } from 'react-router-dom';


//Colums for the open tasks component
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'project', headerName: 'Project', width: 130 },
    { field: 'task', headerName: 'Task', width: 230 },
    { field: 'assignedTo', headerName: 'Assigned to', width: 230 },
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
    { field: 'status', headerName: 'Status', width: 130, renderCell: (params) => {
      return(
        <div className={`tasksStatus ${params.row.status === "ontrack" ? "green" : params.row.status === "delayed" ? "yellow":"red"}`}>{params.row.status}</div>
      )
    } },
    {field:'actions',
    headerName: 'Actions',
    width:120,
    renderCell: (params) => {
        return(
            <>  <Link to={"/tasks/"+params.row.id}>
                <button className='taskListView'>View</button>
                </Link>
                
                <CheckCircleOutline className='taskListDone'/>
            </>
            
        )
    }},
  ];
  


export default function OpenTasks() {



  return (
    <div className="openTasks">
        <div className="openTasksWrapper">
            <div className="openTasksTable">
                <DataGrid
                rows={tasksRows}
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
