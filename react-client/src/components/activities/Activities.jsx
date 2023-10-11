import React from 'react'
import "./activities.scss"
import { activities } from '../../dummyData'
import {DataGrid} from '@mui/x-data-grid';
import { CheckCircleOutline, Comment, AttachFile } from '@mui/icons-material';



const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'summary', headerName: 'Summary', width: 800, renderCell: (params) => {
        return(
            <div className='activitySummary'>{params.row.summary}</div>
        )
    } },
    { field: 'asignee', headerName: 'Asignee', width: 130, renderCell: (params) => {
        return(

        <div className={`activityAsignee ${params.row.asignee === "GP" ? "green" : params.row.asignee === "MB" ? "yellow" : "red"}`}>{params.row.asignee}</div>
          
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

export default function Activities() {
  return (
    <div className="activities">
        <div className="activitiesWrapper">
                <DataGrid
                rows={activities}
                columns={columns}
                disableSelectionOnClick
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
    </div>
  )
}
