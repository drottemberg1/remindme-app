import React, { Component } from "react";
import "./AddTaskBox.styles.css";
import { DashContext } from "../../../DashboardPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-regular-svg-icons";
import { WTReminder, WTClient, WTEvent } from "SDK";
import * as moment from "moment";

class AddTaskBox extends Component {


  constructor(props) {
    super(props);
    this.state = {
      editData: new WTReminder(),
    };

    this.addTask = this.addTask.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  async addTask(e) {
    e.preventDefault();
    if (window.confirm("Do you want to save the reminder?")) {
      try {
        const reminder = await this.state.editData.save();
        this.props.setTaskBox(false);
        
      } catch (err) {
        alert(err.message);
      }
    }
  }

  changeData() {
    this.setState({ editData: this.state.editData});
  }

  render() {
    const { taskBox, setTaskBox } = this.props;
    const { editData } = this.state;

    return (
      <div className="box-background">
        <div className="add-task-container">
          <h3>Create New Reminder</h3>
          <form action="" onSubmit={this.addTask} className="addTask-form">
            {/* Title Input */}
            <div className="task-input">
              <label htmlFor="task-title-input">Title</label>
              <input
                id="task-title-input"
                type="text"
                placeholder="Eg. Complete Assignment"
                value={editData.title}
                onChange={(e) => {
                  editData.title = e.target.value;
                  this.changeData();
                }}
                required
              />
            </div>

            {/* Event Date and Time */}
            <div className="task-inputDateTime">
              <div>
                <b>Event:</b>
              </div>
              <div className="task-date">
                <label htmlFor="task-edate-input">Date</label>
                <input
                  type="date"
                  id="task-edate-input"
                  value={moment(editData.event_at).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-").map(Number);
                    editData.event_at = moment(editData.event_at)
                      .set({ year, month: month - 1, date: day })
                      .toDate();
                      editData.remind_at = moment(editData.event_at)
                        .subtract(15, 'minutes')
                        .toDate();
                    this.changeData();
                  }}
                  required
                />
              </div>

              <div className="task-time">
                <label htmlFor="task-etime-input">Time</label>
                <input
                  type="time"
                  id="task-etime-input"
                  value={moment(editData.event_at).format("HH:mm")}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value.split(":").map(Number);
                    editData.event_at = moment(editData.event_at)
                      .set({ hour, minute, second: 0 })
                      .toDate();
                    editData.remind_at = moment(editData.event_at)
                      .subtract(15, 'minutes')
                      .toDate();
                    this.changeData();
                  }}
                  required
                />
              </div>
            </div>

            {/* Reminder Date and Time */}
            <div className="task-inputDateTime">
              <div>
                <b>Reminder:</b>
              </div>
              <div className="task-date">
                <label htmlFor="task-idate-input">Date</label>
                <input
                  type="date"
                  id="task-idate-input"
                  value={moment(editData.remind_at).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    const [year, month, day] = e.target.value.split("-").map(Number);
                    editData.remind_at = moment(editData.remind_at)
                      .set({ year, month: month - 1, date: day })
                      .toDate();
                    this.changeData();
                  }}
                  required
                />
              </div>

              <div className="task-time">
                <label htmlFor="task-itime-input">Time</label>
                <input
                  type="time"
                  id="task-itime-input"
                  value={moment(editData.remind_at).format("HH:mm")}
                  onChange={(e) => {
                    const [hour, minute] = e.target.value.split(":").map(Number);
                    editData.remind_at = moment(editData.remind_at)
                      .set({ hour, minute, second: 0 })
                      .toDate();
                    this.changeData();
                  }}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="task-input">
              <label htmlFor="task-desc-input">Description</label>
              <textarea
                id="task-desc-input"
                cols="30"
                rows="10"
                value={editData.description}
                onChange={(e) => {
                  editData.description = e.target.value;
                  this.changeData();
                }}
                required
              ></textarea>
            </div>

            {/* Category Selection */}
            <div className="task-category-input">
              {["personal", "work", "school", "events"].map((type) => (
                <div
                  key={type}
                  className={`task-cat ${editData.type === type ? "active-category" : ""}`}
                  onClick={() => {
                    editData.type = WTReminder.Type[type];
                    this.changeData();
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="box-btn">
              <button type="submit" className="create-task-btn">
                Create Reminder
              </button>
              <button
                className="delete-task-btn"
                onClick={() => setTaskBox(!taskBox)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTaskBox;
