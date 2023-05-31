const addLeadingZero = (value) => {
  return value < 10 ? "0" + value : value;
};

export const getCurrentDateTime = () => {
  const currentDate = new Date();

  const currentDay = addLeadingZero(currentDate.getDate());
  const currentMonth = addLeadingZero(currentDate.getMonth() + 1); // Months are zero-based
  const currentYear = currentDate.getFullYear();
  let currentHours = currentDate.getHours();
  const currentMinutes = addLeadingZero(currentDate.getMinutes());
  const currentSeconds = addLeadingZero(currentDate.getSeconds());
  const amOrPm = currentHours >= 12 ? "PM" : "AM";

  // Convert hours to standard time
  if (currentHours > 12) {
    currentHours -= 12;
  } else if (currentHours === 0) {
    currentHours = 12;
  }

  const dateString = `${currentDay}/${currentMonth}/${currentYear}`;
  const timeString = `${currentHours}:${currentMinutes}:${currentSeconds} ${amOrPm}`;

  return `${dateString} ${timeString}`;
};
