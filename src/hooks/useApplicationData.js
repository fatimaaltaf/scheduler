import React, { useReducer, useEffect } from "react";
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const stateInitial = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {...state, day: action.day}
      case SET_APPLICATION_DATA:
        return {...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: (action.interview ? {...action.interview} : null)
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return {...state, id: action.id, appointments: appointments}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, stateInitial)
 
  const setDay = day => dispatch({type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch(
        {type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        })
      })
    }, []);     
    
    function bookInterview(id, interview) {
      return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        let interviewSlot = state.appointments[id].interviews
        if (interviewSlot === null) {
          let dayObj = state.days.find(day => day.name === state.day)
          state.days[dayObj.id - 1].spots-- 
        }
        dispatch({type: SET_INTERVIEW,
        id,
        interview
      })
    })
}
    function cancelInterview(id) {
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        let dayObj = state.days.find(day => day.name === state.day)
        state.days[dayObj.id - 1].spots++
        dispatch({type: SET_INTERVIEW,
          id,
          interview: null
        })
      })
    }
  
  return { state, setDay, bookInterview, cancelInterview }
}
