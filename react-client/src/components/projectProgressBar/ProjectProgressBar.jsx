import React from 'react'
import "./projectProgressBar.scss"
import { Add, Receipt, Handshake, Code, LastPage, Apartment, Handyman, LocalShipping, Diversity2, ShoppingCart, Person, DoorFront, Kitchen, Chair, Shower, KingBed, Sell, Paid, AccessTime, Home, AddCircle, CalendarMonth, ArrowForwardIos } from '@mui/icons-material'
import { progress, tasksList } from '../../dummyData'
export default function ProjectProgressBar() {

    const IconProgress = (stage) => {
        switch (stage) {
            case "Open":
                return <AddCircle />
            case "Ofertare":
                return <Receipt />
            case "Acceptare":
                return <Handshake />
            case "Avans achitat":
                return <Paid />
            case "Proiectare":
                return <Code />
            case "Comanda materiale":
                return <ShoppingCart />
            case "Productie":
                return <Diversity2 />
            case "Livrare":
                return <LocalShipping />
            case "Montaj":
                return <Handyman />
            case "Closed":
                return <LastPage />
        } 
    }
  return (
    <div className="progressWrapper">
                <ul>
                    {progress.map((step, index) => (
                        <>
                            <li className={step.status} key={index}>
                            <div className="header">{IconProgress(step.stage)} {step.stage}</div>
                            <ul>
                                
                                <li>
                                    <ul>
                                        <li><CalendarMonth />{step.date !=="" ? step.date : "TBD"}</li>
                                    </ul>
                                </li>
                            </ul>
                            </li>
                            {index < progress.length - 1 && <li className='separator'><ArrowForwardIos /></li>}
                             
                        </>
                             
                    ))}
                    
                    
                </ul>

            </div>
  )
}
