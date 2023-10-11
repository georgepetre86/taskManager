import React from 'react'
import "./projectWorkDetails.scss"
import { Add } from '@mui/icons-material'

export default function ProjectWorkDetails() {
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
                            <ul>
                                <li style={{width: "67%"}}>Comanda pal efectuata</li>
                                <li style={{width: "10%"}}>no</li>
                                <li style={{width: "10%"}}>31/10/2022</li>
                                <li style={{width: "10%"}}>bmihai</li>
                            </ul>
                            <ul>
                                <li style={{width: "67%"}}>Task gaurire efectuat</li>
                                <li style={{width: "10%"}}>no</li>
                                <li style={{width: "10%"}}>31/10/2022</li>
                                <li style={{width: "10%"}}>pgeorge</li>
                            </ul>
                            

                        </div>
                    </div>
                    
                </div>
  )
}
