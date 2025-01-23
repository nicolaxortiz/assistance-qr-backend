export const dateOptions = {
  toTimeStamp: (stringDate) => {
    const [datePart, timePart] = stringDate.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    let [time, period] = timePart.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);

    period = period.replace(/\s+/g, "");

    if (period === "p.m." && hours !== 12) {
      hours += 12;
    }
    if (period === "a.m." && hours === 12) hours = 0;

    const fecha = new Date(year, month - 1, day, hours, minutes, seconds);

    const timestamp = fecha.getTime();

    return timestamp;
  },

  toLocaleDate: (timeStamp) => {
    const fecha = new Date(timeStamp);

    const opciones = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const fechaFormateada = fecha.toLocaleString(
      process.env.LOCALEZONE,
      opciones
    );

    return fechaFormateada;
  },
};
