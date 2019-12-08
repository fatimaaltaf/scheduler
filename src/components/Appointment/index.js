import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "Are you sure you would like to delete?";
  const EDIT = "EDIT";
  const ERROR_SAVE = "Could not save appointment.";
  const ERROR_DELETE = "Could not delete appointment.";
  const ERROR_INTERVIEWER = "Interviewer not selected. Please try again";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    }).catch((error) => {
      transition(ERROR_SAVE, true)
    })
  };

  function deleteAppt() {
    transition(DELETING, true)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    }).catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }

  function checkIfInterviewerSelected(name, interviewer) {
    !interviewer ? transition(ERROR_INTERVIEWER, true) : save(name, interviewer);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE);}} />}
      {mode === SHOW && (
      <Show
        student={props.interview && props.interview.student }
        interviewer={props.interview && props.interview.interviewer}
        onDelete={() => {transition(CONFIRM)}}
        onEdit={() => {transition(EDIT)}}
      />
      )}
      {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={() => {back()}}
        onSave={checkIfInterviewerSelected}
      />
      )}
      {mode === SAVING && (
        <Status
          message={SAVING}
        />
      )}
      {mode === DELETING && (
        <Status
          message={DELETING}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={CONFIRM}
          onCancel={() => {back()}}
          onConfirm={deleteAppt}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => {back()}}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={ERROR_DELETE}
          onClose={() => {back()}}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={ERROR_SAVE}
          onClose={() => {back()}}
        />
      )}
      {mode === ERROR_INTERVIEWER && (
        <Error 
        message={ERROR_INTERVIEWER}
        onClose={() => {back()}}
        />
      )}
    </article>
  )
};