import React, { Component } from "react";
import "./DashboardPage.styles.css";
import DashNav from "./DashNav";
import DashboardContainer from "./DashboardContainer";
import TasksContainer from "./TasksContainer";
import UserAccount from "./UserAccount";
import userImg from "../../assets/images/userImg.png";
import { Link } from "react-router-dom";
import {WTReminder, WTClient, WTEvent} from "SDK";

// Create Context for Dashboard
export const DashContext = React.createContext();

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      isDash: true,
      isLoading: true
    };

    this.reminders = [];
  }

  // Toggle Dashboard and Task views
  toggleView = () => {
    this.setState((prevState) => ({ isDash: !prevState.isDash }));
  };

  componentDidMount(){
    	this.addEventsListeners()
      this.fetch();
  }

  componentWillUnmount() {
		this.removeEventsListeners()
	}
	addEventsListeners(){
		WTClient.getInstance().addListener(this,(event,options)=>{
			if ([
				WTEvent.reminders_add,
			].includes(event)) {
				this.fetch()
			}

      if ([
				WTEvent.reminders_delete,
			].includes(event)) {
				this.reminders = this.reminders.filter(el => el.id != options.id);
        this.forceUpdate();
			}

		})
	}
  removeEventsListeners(){
		WTClient.getInstance().removeListener(this)
	}

   async fetch(){
     try{
       this.reminders = await WTReminder.fetch()
     }catch(e){


     }finally{
       this.setState({isLoading:false})
     }


   }

  // Render the DashboardPage component
  render() {

    return (

          <>
            <DashContext.Provider
              value={{
                isDash: this.state.isDash,
                setIsDash: this.toggleView,
                reminders: this.reminders,
                fetch: this.fetch,

              }}
            >
              <div className="dashboard-page">
                <DashNav />

                <div className="dash-container-content">
                  {this.state.isDash ? <DashboardContainer isLoading={this.state.isLoading} reminders={this.reminders} /> : <TasksContainer isLoading={this.state.isLoading} reminders={this.reminders}/>}
                  <UserAccount />
                </div>
              </div>
            </DashContext.Provider>
          </>

    );
  }
}

export default DashboardPage;
