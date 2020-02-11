export const formatTime = counter => {
  if (typeof counter === 'undefined') {
    return null;
  } else if (typeof counter === 'string') {
    return null;
  } else if (typeof counter === 'function') {
    return null;
  } else if (counter < 0) {
    return null;
  } else if (typeof counter === 'number') {
    const seconds = Math.floor(counter % 60)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((counter / 60) % 60)
      .toString()
      .padStart(2, '0');
    const hours = Math.floor(counter / 3600)
      .toString()
      .padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }
};
