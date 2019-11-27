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
      interviewer: state.interviewers[interview.interviewer] // interviewer object
    }
    return result
  }
  return null;
}