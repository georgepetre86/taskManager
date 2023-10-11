import React from 'react'
import Cards from '../../components/cards/Cards'
import Chart from '../../components/chart/Chart'
import OpenProjects from '../../components/openProjects/OpenProjects'
import Topbar from '../../components/dashboardTopbar/DashboardTopbar'
import "./dashboardProjects.scss"

export default function DashboardProjects() {
  return (
    <div className="dashboardProjects">
    <div className="dashboardProjectsWrapper">
    <Topbar/>
    <Cards/>
    <Chart useFor="projects"/>
    <OpenProjects/>
    </div>
</div>
  )
}
