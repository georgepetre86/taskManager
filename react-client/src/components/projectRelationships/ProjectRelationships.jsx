import React from 'react'
import "./projectRelationships.scss"
import { Add } from '@mui/icons-material'

export default function ProjectRelationships() {
  return (
    <div className="cardItem">
                    <div className="topbarCardItem">
                        <h4>Relationships</h4>
                        <button><Add /> Add new</button>
                    </div>
                    <div className="tableRelationships">
                        <div className="filterRelationship">
                            <div className="filteredRelasionshipItem active">Children</div>
                            <div className="filteredRelasionshipItem">Parent</div>
                        </div>
                        <div className="tableHead">
                                <ul>
                                    <li style={{width: "10%"}}>ID</li>
                                    <li style={{width: "56%"}}>Name</li>
                                    <li style={{width: "10%"}}>Due date</li>
                                    <li style={{width: "10%"}}>Stage</li>
                                    <li style={{width: "10%"}}>Status</li>

                                    
                                </ul>
                            </div>
                            <div className="tableContents">
                                <ul>
                                    <li style={{width: "10%"}}>KRBS0002</li>
                                    <li style={{width: "56%"}}>Dulapuri hol MDF soft touch</li>
                                    <li style={{width: "10%"}}>30/09/2022</li>
                                    <li style={{width: "10%"}}>gaurire</li>
                                    <li style={{width: "10%"}}>delayed</li>
                                    
                                </ul>
                                <ul>
                                    <li style={{width: "10%"}}>KRBS0004</li>
                                    <li style={{width: "56%"}}>Bucatarie 3.6m fronturi MDF vopsit</li>
                                    <li style={{width: "10%"}}>30/09/2022</li>
                                    <li style={{width: "10%"}}>vopsire</li>
                                    <li style={{width: "10%"}}>on-track</li>
                                </ul>
                                <ul>
                                    <li style={{width: "10%"}}>KRBS0005</li>
                                    <li style={{width: "56%"}}>Living MDF ST + suspendat fronturi sticla</li>
                                    <li style={{width: "10%"}}>30/09/2022</li>
                                    <li style={{width: "10%"}}>montaj</li>
                                    <li style={{width: "10%"}}>on-track</li>
                                </ul>
                                <ul>
                                    <li style={{width: "10%"}}>KRBS0006</li>
                                    <li style={{width: "56%"}}>Dormitor dulap + noptiere MDF ST</li>
                                    <li style={{width: "10%"}}>30/09/2022</li>
                                    <li style={{width: "10%"}}>montaj</li>
                                    <li style={{width: "10%"}}>on-track</li>
                                </ul>
                                <ul>
                                    <li style={{width: "10%"}}>KRBS0007</li>
                                    <li style={{width: "56%"}}>Bai dulap + masti MDF ST</li>
                                    <li style={{width: "10%"}}>30/09/2022</li>
                                    <li style={{width: "10%"}}>montaj</li>
                                    <li style={{width: "10%"}}>on-track</li>
                                </ul>
                            </div>
                    </div>
                    
                </div>
  )
}
