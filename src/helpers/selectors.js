export function getAppointmentsForDay(state, day) {
  const filtered = state.days.filter(d => d.name === day)
  if (filtered[0] === undefined) {
    return [];
  }
  const filteredAppointments = filtered[0].appointments;

  const result = [];

  for (let appointment in state.appointments) {
    if (filteredAppointments.includes(state.appointments[appointment].id)) {
      result.push(state.appointments[appointment])
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    const result = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return result
  }
  return null;
}

export function getInterviewersForDay(state, interviewers) {
  const filtered = state.days.filter(d => d.name === interviewers)
  console.log("filter is ", filtered);

  if (filtered[0] === undefined) {
    return [];
  }
  const filteredInterviewers = filtered[0].interviewers;
  const result = [];

  for (let interviewer in state.interviewers) {
    if (filteredInterviewers.includes(state.interviewers[interviewer].id)) {
      result.push(state.interviewers[interviewer])
    }
  }
  return result;
}