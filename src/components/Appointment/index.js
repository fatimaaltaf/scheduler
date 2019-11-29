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
  const CONFIRM = "ARE YOU SURE YOU WANT TO DELETE?"
  const EDIT = "EDIT"

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
    })
  };

  function deleteAppt() {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    })
  }

  return (
    <article className="appointment">
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
        onSave={save}
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
    </article>
  )
};