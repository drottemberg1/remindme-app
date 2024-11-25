import React, { Component } from "react";
import "./dashboardContainer.styles.css";
import PieChartComponent from "./Pie";
import { DashContext } from "../../DashboardPage";

class DashboardContainer extends Component {
  render() {

    if(this.props.isLoading){
      return (
       <div className="dashboard-container" id="dash-container">
        LOADING
        </div>
      )
    }

    return (
      <DashContext.Consumer>
        {({ reminders }) => {
          const completed = reminders.filter((reminder) => reminder.completed).length;
          const pending = reminders.filter((reminder) => !reminder.completed).length;

          return (
            <div className="dashboard-container" id="dash-container">
              <div className="dash-heading">
                <h2>Dashboard</h2>
                <p>See your overall Performance</p>
              </div>
              <div className="status-container">
                <div className="total-tasks task-status">
                  <h1>{reminders ? reminders.length : 0}</h1>
                  <p>Total Reminders</p>
                </div>
                <div className="pending-tasks task-status">
                  <h1>{pending}</h1>
                  <p>Upcoming Reminders</p>
                </div>
                <div className="completed-tasks task-status">
                  <h1>{completed}</h1>
                  <p>Complete Reminders</p>
                </div>
              </div>
              <h2 className="chart-heading">Performance</h2>
              <PieChartComponent completed={completed} pending={pending} />
            </div>
          );
        }}
      </DashContext.Consumer>
    );
  }
}

export default DashboardContainer;
