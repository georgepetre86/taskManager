import React from 'react'
import Cards from '../../components/cards/Cards'
import Activities from '../../components/activities/Activities'
import Topbar from '../../components/dashboardTopbar/DashboardTopbar'

export default function DashboardActivities() {
  return (
    <div className="dashboardActivities">
        <div className="dashboardActivitiesWrapper">
        <Topbar/>
        <Activities />
        </div>
    </div>
  )
}
