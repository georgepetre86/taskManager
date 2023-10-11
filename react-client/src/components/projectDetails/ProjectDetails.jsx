import React from 'react'
import "./projectDetails.scss"
import { Add, Apartment,DoorFront, Person, Kitchen, Chair, Shower, KingBed, Sell, Paid, AccessTime } from '@mui/icons-material'
export default function ProjectDetails() {
  return (
    <div className="cardItem">
                    <div className="topbarCardItem">
                        <h4>Details</h4>
                        <button><Add /> Add new</button>
                    </div>
                    <div className="detailsContents">
                        <ul>   
                            <li><Apartment /> Apartament 3 camere Ghencea</li>
                            <li>
                                <ul>
                                    <li><DoorFront />Hol</li>
                                    <li><Kitchen /> Bucatarie</li>
                                    <li><Chair />Living</li>
                                    <li><Shower />Baie</li>
                                    <li><KingBed />Dormitor</li>

                                </ul>
                            </li>
                            <li><Person /> Gigi muschi</li>
                            <li><Sell /> 37000 LEI</li>
                            <li><Paid /> 18000 LEI</li>
                            <li><AccessTime /> 30/09/2022</li>
                            

                        </ul>
                    </div>
                </div>
  )
}
