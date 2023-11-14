import React, { useEffect } from 'react'
import "./projectWorkDetails.scss"
import { Add } from '@mui/icons-material'

export default function ProjectWorkDetails(props) {
    console.log(props.dataToShow)
   

    
  return (
    <div className="cardItem">
                    <div className="topbarCardItem">
                        <h4>Work details</h4>
                        <button><Add /> Add new</button>
                    </div>
                    <div className="tableWorkDetails">
                        <div className="tableHead">
                            <ul>
                                <li style={{width: "67%"}}>Note</li>
                                <li style={{width: "10%"}}>Files</li>
                                <li style={{width: "10%"}}>Date</li>
                                <li style={{width: "10%"}}>Submitter</li>
                            </ul>
                        </div>

                        <div className="tableContents">

                            {Object.keys(props.dataToShow).length !== 0 ? props.dataToShow.workDetails.map((item, index)=>(
                                <ul key={index}>
                                <li style={{width: "67%"}}>{item.note}</li>
                                <li style={{width: "10%"}}>{item.file.length}</li>
                                <li style={{width: "10%"}}>{item.date}</li>
                                <li style={{width: "10%"}}>{item.user}</li>
                            </ul>
                            )) : ""}
                            
                            
                            

                        </div>
                    </div>
                    
    </div>
  )
}
