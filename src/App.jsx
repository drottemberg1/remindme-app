import { createContext, useEffect, useState } from "react";
import {ProtectedRoute,ConditionalRoute} from "./components/routing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, DashboardPage, About, SignUp, SignIn } from "./components/pages";
import { Footer, Navbar, SpinnerApp, showLoader, hideLoader } from "./components/main";
import React from "react";
// For Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
import "react-toastify/dist/ReactToastify.min.css";

import { WTClient } from "SDK"

const FetchedContext = createContext();


class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading:true,
      tasks: [],
      isDescriptionOpen: false,
      descriptionData: {},
      openUserAccount: false,
    }

    this.connect();


    window.showLoader = showLoader;
    window.hideLoader = hideLoader;
  }

  //Loading configuration 1
  async connect(){
    try{
        await WTClient.getInstance().connect();
    }catch(e){

    }finally{
       this.setState({
         isLoading:false
       },()=>{
         }
       );
    }
  }






  render() {

     if(this.state.isLoading){

       return <SpinnerApp size={SpinnerApp.Size.x4} />;
     }else{


       const { tasks, isDescriptionOpen, descriptionData, openUserAccount } = this.state;


       // Setting Data to Local Storage


       // API request to Fetch Tasks
      const setTasks = this.setTasks
      const notify = this.notify


       // Deleting Task
       const deleteTask = (id) => {

       };

       // Function to show description
         const showDescription = (id)=>{
           setIsDescriptionOpen(!isDescriptionOpen)
           const updatedDesc = tasks.find((task) => task.id === id);
           setDescriptionData(updatedDesc)
         }

     // Configured Notification



        const setIsDescriptionOpen = (tasks) => {
            this.setState((prevState) => ({ ...prevState, isDescriptionOpen }));
        }

        const setDescriptionData = (tasks) => {
            this.setState((prevState) => ({ ...prevState, descriptionData }));
        }

        const setOpenUserAccount = (tasks) => {
            this.setState((prevState) => ({ ...prevState, openUserAccount }));
        }

        const authenticated = WTClient.getInstance().authenticated;


      return (
        <FetchedContext.Provider
          value={{
            tasks,
            setTasks,
            deleteTask,
            isDescriptionOpen,
            setIsDescriptionOpen,
            showDescription,
            descriptionData,
            setDescriptionData,
            openUserAccount,
            setOpenUserAccount
          }}
        >
          <div className="App">
          <ToastContainer />
            {/* <Home/> */}
            <Router>
            {!WTClient.getInstance().authenticated && <Navbar />}
              <Routes>
              <Route path="/" element=
                  {<ConditionalRoute
                    isAuthenticated={authenticated}
                    Component={Home}
                  />}
              />
                <Route path="/signup" element=
                  {<ConditionalRoute
                    isAuthenticated={authenticated}
                    Component={SignUp}
                  />}
                />
                <Route path="/signin" element=
                  {<ConditionalRoute
                    isAuthenticated={authenticated}
                    Component={SignIn}
                  />}
                />
                <Route path="/dashboard" element=
                    {<ProtectedRoute
                      isAuthenticated={authenticated}
                      Component={DashboardPage}
                    />}
                />
                <Route path="/about" element={<About/>}/>
              </Routes>
            </Router>
            <Footer />
          </div>
        </FetchedContext.Provider>
      );
    }

  }


}


export { AppComponent as App };
export { FetchedContext };
