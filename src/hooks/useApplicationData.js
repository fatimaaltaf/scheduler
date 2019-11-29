import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => setState({ ...state, day });

    useEffect(() => {
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers")
      ]).then(([days, appointments, interviewers]) => {
        setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
      })
    }, []);    

    function bookInterview(id, interview) {
      // Updating appt object
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      // Updating new appt to the database object
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState(prev => ({...prev, appointments}))
     })
    }
    
    function cancelInterview(id) {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      // Updating new appt to the database object
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({...prev, appointments}))
     })
    }
  return { state, setDay, bookInterview, cancelInterview }
}
