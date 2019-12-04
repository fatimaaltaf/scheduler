import React, { useReducer, useEffect } from "react";
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const stateInitial = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};

/** API calls to database to book and cancel interviews **/
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
        dispatch({type: SET_INTERVIEW,
        id,
        interview
      })
    })
}
    function cancelInterview(id) {
      return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({type: SET_INTERVIEW,
          id,
          interview: null
        })
      })
    }
  
  return { state, setDay, bookInterview, cancelInterview }
}
