import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faBell, faClock } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import "./Task.styles.css";
import { FetchedContext } from "../../../../../App";
import {WTReminder} from 'SDK';
import * as moment from 'moment';

const Task = ({ value, editTaskBox, showDescription, deleteTask }) => {

// Updating Task Completition


  return (
    <div className="task">
      <div className="task-description">

        {/* <input type="checkbox" /> */}
        <div className="task-desc" onClick={() => {
            showDescription(value.id);
          }}>
          <div className="task-heading">{value.title}</div>

        </div>
        <div className="task-desc" onClick={() => {
            showDescription(value.id);
          }}>
          <div className="task-heading">
          <span><FontAwesomeIcon

            icon={faBell}

          /></span>
          <span> {moment(value.remind_at).format('lll')}</span>
          </div>

        </div>
        <div className="task-desc" onClick={() => {
            showDescription(value.id);
          }}>
          <div className="task-heading">
          <span><FontAwesomeIcon

            icon={faClock}

          /></span>
        <span>  {moment(value.event_at).format('lll')}</span></div>

        </div>
      </div>
      <div className="task-category" onClick={() => {
          showDescription(value.id);
        }}>
        {value.type ? WTReminder.Type.toString(value.type) : "Not Set"}
      </div>
      <div className="edit-del-icons">
        <FontAwesomeIcon
          className="edit-task"
          icon={faPenToSquare}
          onClick={() => {
            editTaskBox(value.id);
          }}
        />
        <FontAwesomeIcon
          className="destroy-task"
          icon={faTrashAlt}
          onClick={() => {
            deleteTask(value.id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
