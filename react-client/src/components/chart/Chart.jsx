import React from 'react'
import "./chart.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import {data, dataP, dataRadar, dataRadarProjects} from "../../dummyData.js"
export default function Chart({useFor}) {
    
    const usedData = useFor === "tasks" ? data : useFor === "projects" ? dataP : ""
    const usedDataRadar = useFor === "tasks" ? dataRadar : useFor === "projects" ? dataRadarProjects : ""
  return (
    <div className="chart">
        <div className="chartWrapper">
            <div className="chartLeft">

                <h3 className="chartAnalytics">{useFor} Analytics</h3>
                <ResponsiveContainer width="96%" aspect={4 / 1}>
                    <LineChart data={usedData}>
                        <XAxis dataKey="name" stroke="#475B5A"/>
                        <YAxis />
                        <Line type="monotone" dataKey={useFor === "tasks" ? "openTasks" : useFor === "projects" ? "projectsSigned" : ""} stroke="#ffd166" />
                        <Line type="monotone" dataKey={useFor === "tasks" ? "closedTasks" : useFor === "projects" ? "projectsCompleted" : ""} stroke="#7fc6a4"/>
                        <Tooltip/>
                        <Legend />
                        <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chartRight">
                 <h3 className="chartAnalytics">{useFor} Distribution</h3>
                 <ResponsiveContainer width="96%" aspect={1 / 1}>
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={usedDataRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <Tooltip />
                        <Radar name="George" dataKey="A" stroke="#475B5A" fill="#9BC1BC" fillOpacity={0.6} />
                    </RadarChart>

                 </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}
