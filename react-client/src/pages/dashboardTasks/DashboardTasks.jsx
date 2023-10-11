import React from 'react'
import Cards from '../../components/cards/Cards'
import Chart from '../../components/chart/Chart'
import OpenProjects from '../../components/openProjects/OpenProjects'
import OpenTasks from '../../components/openTasks/OpenTasks'
import Topbar from '../../components/dashboardTopbar/DashboardTopbar'
import "./dashboardTasks.scss"


export default function DashboardTasks() {
  return (
    <div className="dashboardTasks">
        <div className="dashboardTasksWrapper">
        <Topbar/>
        <Cards/>
        <Chart useFor="tasks"/>
        <OpenTasks/>
        </div>
    </div>
  )
}
