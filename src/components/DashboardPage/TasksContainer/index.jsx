import React, { Component } from "react";
import "./TasksContainer.styles.css";
import plus from "../../../assets/svg/plus.svg";
import Task from "./Task";
import AddTaskBox from "./AddTaskBox";
import EditBox from "./EditBox";
import Description from "./Description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {WTReminder, WTUtils} from "SDK";

class TasksContainer extends Component {


  constructor(props) {
    super(props);
    this.state = {
      taskBox: false,
      taskStatus: "all",
      filterTaskCategory: "all",
      taskCategoryBox: false,
      editBox: false,
      editData: new WTReminder(),
      searchInput: "",
      searchedTask: null,
      showDescription: false,
    };
  }

  editTaskBox = (id) => {
    const  tasks  = this.props.reminders;
    const editableTask = new WTReminder(tasks.find((task) => task.id === id));
    this.setState({
      editBox: !this.state.editBox,
      editData: editableTask,
      showDescription: false,
    });
  };

  showDescription = (id) => {
    const  tasks  = this.props.reminders;
    const editableTask = new WTReminder(tasks.find((task) => task.id === id));
    this.setState({
      editBox: false,
      editData: editableTask,
      showDescription: true,
    });
  }

  deleteTask = async (id) => {
    const  tasks  = this.props.reminders;
    const editableTask = new WTReminder(tasks.find((task) => task.id === id));
    if(window.confirm('Do you wnat to delete this reminder?')){
      try{
        await editableTask.delete();
        this.setState({
          showDescription: false,
        });
      }catch(err){
        alert(err.message);
      }
    }



  }

  hideDescription = () => {

    this.setState({

      showDescription: false,
    });
  }

  handleSearch = (e) => {
    const  tasks  = this.props.reminders;
    const search = e.target.value;

    if (search === "") {
      this.setState({
        searchedTask: null,
        taskStatus: "all",
        filterTaskCategory: "all",
      });
    } else {
      const regex = new RegExp(search, "i");
      const searchedTasks = tasks.filter((task) => regex.exec(task.title));

      this.setState({
        searchedTask: searchedTasks,
        taskStatus: "all",
        filterTaskCategory: "all",
      });
    }
  };

  settingCategory = (category) => {
    this.setState({
      filterTaskCategory: category,
      searchedTask: null,
      taskStatus: "all",
    });
  };

  settingStatus = (status) => {
    this.setState({
      taskStatus: status,
      filterTaskCategory: "all",
      searchedTask: null,
    });
  };

  renderTasks = () => {
    const  tasks  = this.props.reminders;
    const { searchedTask, taskStatus, filterTaskCategory } = this.state;

    if (searchedTask) {
      return searchedTask.map((task) => (
        <Task key={task.id} value={task} editTaskBox={this.editTaskBox}   showDescription={this.showDescription} deleteTask={this.deleteTask}/>
      ));
    }

    if (taskStatus === "pending") {
      return tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <Task key={task.id} value={task} editTaskBox={this.editTaskBox}   showDescription={this.showDescription} deleteTask={this.deleteTask}/>
        ));
    }

    if (taskStatus === "completed") {
      return tasks
        .filter((task) => task.completed)
        .map((task) => (
          <Task key={task.id} value={task} editTaskBox={this.editTaskBox}   showDescription={this.showDescription} deleteTask={this.deleteTask}/>
        ));
    }

    if (filterTaskCategory !== "all") {
      return tasks
        .filter((task) => task.type === filterTaskCategory)
        .map((task) => (
          <Task key={task.id} value={task} editTaskBox={this.editTaskBox}  showDescription={this.showDescription} deleteTask={this.deleteTask}/>
        ));
    }

    return tasks.map((task) => (
      <Task key={task.id} value={task} editTaskBox={this.editTaskBox}   showDescription={this.showDescription} deleteTask={this.deleteTask}/>
    ));
  };

  render() {
    const { isDescriptionOpen } = this.props;
    const {
      taskBox,
      taskCategoryBox,
      taskStatus,
      filterTaskCategory,
      searchInput,
      editBox,
      editData,
    } = this.state;

    const editBoxProps = {
      editData,
      setEditData: (data, update) => {
        this.setState({ editData: data }, ()=>{

          if(update){
              const  tasks  = this.props.reminders;
              let i = tasks.findIndex((task) => task.id === data.id)
              if(i !== false){
                tasks[i] = data;
                this.forceUpdate();
              }
          }
        })
      },
      editBox,
      setEditBox: (value) => this.setState({ editBox: value }),
    };

    const currentDate = new Date();
    const monthsName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = currentDate.getDate();
    const month = monthsName[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
      <div className="tasks-main-container">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="three-dot-menu"
          onClick={() => this.setState({ taskCategoryBox: true })}
        />

        {/* Task Category Box */}
        {taskCategoryBox && (
          <div
            className="task-category-background"
            onClick={() => this.setState({ taskCategoryBox: false })}
          >
            <div className="tasks-category">
              {["all",WTReminder.Type.personal, WTReminder.Type.work, WTReminder.Type.school, WTReminder.Type.events].map((category) => (
                <div
                  key={category}
                  className={`tasks-category-item ${
                    filterTaskCategory === category ? "active-item" : ""
                  }`}
                  onClick={() => this.settingCategory(category)}
                >
                  {WTReminder.Type.toString(category) ?? category}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="heading">
          <div className="heading-tasks">Reminders</div>
          <div className="date">
            {month} {day}, {year}
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            className="search-bar"
            name="searchbox"
            onChange={(e) => {
              this.setState({ searchInput: e.target.value });
              this.handleSearch(e);
            }}
          />
          <input value="Search" type="button" className="text-search-btn" />
        </div>

        <div className="container-header">
          <div className="pen-comp-toggler">
            {["all", "pending", "completed"].map((status) => (
              <div
                key={status}
                className={`${status}-btn ${
                  taskStatus === status ? "active-item" : ""
                }`}
                onClick={() => this.settingStatus(status)}
              >
                {status === "pending" ? "upcoming" : status}
              </div>
            ))}
          </div>
        </div>

        {/* Render Tasks */}
        <div className="tasks-container">{this.renderTasks()}</div>

        {/* Add Task Button */}
        <div
          className="add-tasks"
          onClick={() => this.setState({ taskBox: !taskBox })}
        >
          <img src={plus} alt="" />
        </div>

        {/* Task and Edit Boxes */}
        {taskBox && (
          <AddTaskBox taskBox={taskBox} setTaskBox={(value) => this.setState({ taskBox: value })} />
        )}
        {editBox && <EditBox {...editBoxProps} />}
        {this.state.showDescription && <Description editTaskBox={this.editTaskBox} descriptionData={this.state.editData} hideDescription={this.hideDescription}  deleteTask={this.deleteTask} />}
      </div>
    );
  }
}

export default TasksContainer;
