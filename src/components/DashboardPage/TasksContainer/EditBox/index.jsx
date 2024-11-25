import { useContext } from "react";
import "./EditBox.styles.css";
import { FetchedContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash} from "@fortawesome/free-regular-svg-icons";
import * as moment from 'moment';
import {WTReminder} from 'SDK';

const EditBox = (props) => {

  const { tasks, setTasks,notify,setDescriptionData,isDescriptionOpen } = useContext(FetchedContext);

  const {
    editData,
    setEditData,
    editBox,
    setEditBox,
  } = props;

  // Editing Task and Updating
  const editTask = async (e) => {
    e.preventDefault();


    if(window.confirm("Do you want to save the reminder?")){
        try{
          await editData.save()

          setEditData(editData, true);
          setEditBox(false);
        }catch(err){
          alert(err.message);
        }


        }else{

        }
  };

  const changeData = () => {
      console.log(editData);
      setEditData(editData);
  }


  return (
    <div className="box-background">
      <div className="add-task-container">
        <h3>Edit Your Reminder</h3>
        <form action="" onSubmit={editTask} className="editBox-form">
          <div className="task-input">
            <label htmlFor="task-title-input">Title</label>
            <input
              id="task-title-input"
              type="text"
              placeholder="Eg. Complete Assignment"
              value={editData.title}
              onChange={(e) => {
                editData.title = e.target.value;
                changeData()
              }}
              required
            />
          </div>

          <div className="task-inputDateTime">
          <div><b>Event:</b></div>

            <div className="task-date">
              <label htmlFor="task-eventdate-input">Date</label>
              <input
                type="Date"
                id="task-eventdate-input"
                value={moment(editData.event_at).format("yyyy-MM-DD")}
                onChange={(e) => {

                  let [year, month, day] =  e.target.value.split("-").map(Number);

  // Update the original moment object with the new date
  let updatedDate = moment(editData.event_at).set({
    year,
    month: month - 1, // Months are zero-indexed in moment.js
    date: day,
  });
                  // Update the original date with the new time


                  editData.event_at = updatedDate.toDate();
                  editData.remind_at = moment(editData.event_at)
                    .subtract(15, 'minutes')
                    .toDate();
                  changeData()
                }}
                required
              />
            </div>

            <div className="task-time">
              <label htmlFor="task-eventtime-input">Time</label>
              <input
                type="time"
                id="task-eventtime-input"
                value={moment(editData.event_at).format("HH:mm")}
                onChange={(e) => {
                  let [hour, minute] = e.target.value.split(":").map(Number);

                  // Update the original date with the new time
                  let updatedDate = moment(editData.event_at).set({
                    hour,
                    minute,
                    second: 0, // Default seconds to 0
                  });

                  editData.remind_at = moment(editData.event_at)
                    .subtract(15, 'minutes')
                    .toDate();

                  editData.event_at = updatedDate.toDate();
                    changeData()
                }}
                required
              />
            </div>
          </div>

          <div className="task-inputDateTime">
            <div><b>Reminder:</b></div>

            <div className="task-date">
              <label htmlFor="task-date-input">Date</label>
              <input
                type="Date"
                id="task-event-input"
                value={moment(editData.remind_at).format("yyyy-MM-DD")}
                onChange={(e) => {

                  let [year, month, day] =  e.target.value.split("-").map(Number);

  // Update the original moment object with the new date
  let updatedDate = moment(editData.remind_at).set({
    year,
    month: month - 1, // Months are zero-indexed in moment.js
    date: day,
  });
                  // Update the original date with the new time


                  editData.remind_at = updatedDate.toDate();
                  changeData()
                }}
                required
              />
            </div>

            <div className="task-time">
              <label htmlFor="task-remindtime-input">Time</label>
              <input
                type="time"
                id="task-remindtime-input"
                value={moment(editData.remind_at).format("HH:mm")}
                onChange={(e) => {
                  let [hour, minute] = e.target.value.split(":").map(Number);

                  // Update the original date with the new time
                  let updatedDate = moment(editData.remind_at).set({
                    hour,
                    minute,
                    second: 0, // Default seconds to 0
                  });

                  editData.remind_at = updatedDate.toDate();
                    changeData()
                }}
                required
              />

            </div>
          </div>

          <div className="task-input">
            <label htmlFor="task-desc-input">Description</label>
            <textarea
              name=""
              id="task-desc-input"
              cols="30"
              rows="10"
              value={editData.description}
              onChange={(e) => {
                editData.description = e.target.value;
                changeData()
              }}
              required
            ></textarea>
          </div>

          <div className="task-category-input">
            <div
              className={`task-cat ${editData.type==="personal"? "active-category":""}`}
              onClick={() => {
                editData.type = WTReminder.Type.personal;
                changeData()
              }}
            >
              Personal
            </div>
            <div
              className={`task-cat ${editData.type==="work"? "active-category":""}`}
              onClick={() => {
                editData.type = WTReminder.Type.work;
                changeData()
              }}
            >
              Work
            </div>
            <div
              className={`task-cat ${editData.type==="school"? "active-category":""}`}
              onClick={() => {
                editData.type = WTReminder.Type.school;
                changeData()
              }}
            >
              School
            </div>
            <div
              className={`task-cat ${editData.type==="events"? "active-category":""}`}
              onClick={() => {
                editData.type = WTReminder.Type.events;
                changeData()
              }}
            >
              Events
            </div>
          </div>


          <div className="box-btn">
            <button type="submit" className="create-task-btn">
              Save
            </button>
            <button
              className="delete-task-btn"
              onClick={() => {
                setEditBox(!editBox);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBox;
