import { useContext } from "react";
import "./Description.styles.css";
import { FetchedContext } from "../../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash} from "@fortawesome/free-regular-svg-icons";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as moment from "moment";
import {WTClient} from "SDK";

const Description = ({editTaskBox, descriptionData, hideDescription, deleteTask}) => {
  const { isDescriptionOpen }=useContext(FetchedContext);

  return (
    <div className="desc-background" >
      <div className="desc-box">
        {/* Close Description Box */}
      <div className="close-desc center-content" onClick={()=>{hideDescription()}}>
      <FontAwesomeIcon icon={faXmark} />
      </div>
        <h1 className="desc-heading">{descriptionData.title}</h1>
        {/* Category and Alert */}
        <div className="cat-alert-desc">
          <div className="cat-desc center-content">{descriptionData.type?descriptionData.type:"Not Available"}</div>
          <div className="alert-desc center-content">
          {descriptionData.remind_at?<FontAwesomeIcon icon={faBell}/>:<FontAwesomeIcon icon={faBellSlash} />}
          </div>
        </div>
        {/* Description */}
        <p className="description-desc">{descriptionData.description?descriptionData.description:"Data Not Available"}</p>
        <p>Event</p>
        <div className="date-time-desc">
          <div className="date-desc center-content">Date: {descriptionData.event_at ? moment(descriptionData.event_at).format("ll"):"Not Set" }</div>
          <div className="time-desc center-content">Time: {descriptionData.event_at ? moment(descriptionData.event_at).format("LT"):"Not Set"}</div>
        </div>
        <p>Reminder</p>
        <div className="date-time-desc">
          <div className="date-desc center-content">Date: {descriptionData.remind_at?moment(descriptionData.remind_at).format("ll"):"Not Set" }</div>
          <div className="time-desc center-content">Time: {descriptionData.remind_at?moment(descriptionData.remind_at).format("LT"):"Not Set"}</div>
        </div>
        <br/>
        <div className="btn-desc">
          <div className="edit-desc btn-cat center-content" onClick={()=>{editTaskBox(descriptionData.id)}}>Edit Task</div>
          <div className="delete-desc btn-cat center-content" onClick={() => {deleteTask(descriptionData.id)}}>Delete</div>
        </div>
      </div>
    </div>
  );
};

export default Description;
