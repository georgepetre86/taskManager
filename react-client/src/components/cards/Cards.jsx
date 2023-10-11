import React from 'react'
import "./cards.scss"
import { ArrowCircleRight, AccountTree, FormatListBulletedOutlined, ThumbUpOffAltSharp, RunningWithErrors } from '@mui/icons-material'

export default function Cards() {
  return (
    <div className="cards">
        <div className="cardsWrapper">
            <div className="cardsItem">
                <div className="cardsItemTitle">
                    <h3>Projects</h3>
                    <span className="iconItemTitle yellow"><AccountTree/></span>
                </div>
                
                <div className="projectsStatus">
                    <h4>4<br/>Finished</h4>
                    <h4>5<br/>Total</h4>
                </div>
                <progress id="projects" value="4" max="5" ></progress>
                <span><ArrowCircleRight/> See ongoing projects</span>
            </div>
            <div className="cardsItem">
                <div className="cardsItemTitle">
                    <h3>Tasks</h3>
                    <span className="iconItemTitle blue"><FormatListBulletedOutlined/></span>
                </div>
                <div className="projectsStatus">
                    <h4>59<br/>Finished</h4>
                    <h4>67<br/>Total</h4>
                </div>
                <progress id="projects" value="59" max="67" ></progress>
                <span><ArrowCircleRight/> See ongoing tasks</span>
            </div>
            <div className="cardsItem">
                <div className="cardsItemTitle">
                    <h3>Customer Satisfaction</h3>
                    <span className="iconItemTitle teal"><ThumbUpOffAltSharp/></span>
                </div>
                <div className="projectsStatus">
                    <h4>83<br/>Score</h4>
                    <h4>100<br/>Total</h4>
                </div>
                <progress id="projects" value="83" max="100" ></progress>
                <span><ArrowCircleRight/> See improvement actions</span>
            </div>
            <div className="cardsItem">
                <div className="cardsItemTitle">
                    <h3>Urgent Activities</h3>
                    <span className="iconItemTitle red"><RunningWithErrors/></span>
                </div>
                <div className="projectsStatus">
                    <h4>2<br/>Score</h4>
                    <h4>100<br/>Total</h4>
                </div>
                <progress id="projects" value="2" max="100" ></progress>
                <span><ArrowCircleRight/> See activities</span>
            </div>
        </div>
    </div>
  )
}
