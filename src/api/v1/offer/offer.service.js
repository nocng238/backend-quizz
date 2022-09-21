const Appointment = require('./appointment.model');

const createOffersService = async (cvs, detail) => {
  const { content, startDate } = detail;

  const cvsDetail = cvs.map((cv) => {
    return {
      cv: cv.cvId,
      name: cv.name,
      email: cv.email,
      phone: cv.phone,
      link: cv.link,
      content,
      startDate,
    };
  });

  for (const cv of cvsDetail) {
    sendMailService(cv.email, cv.name, detail);
  }

  const newAppointments = Appointment.insertMany(cvsDetail);
  return newAppointments;
};

module.exports = {
  createOffersService,
};
