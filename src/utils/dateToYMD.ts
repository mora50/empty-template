export default function dateToYMD(date: string) {
  const timeArray = date.split("/");

  const timeFormatted = `${timeArray[2]}-${timeArray[1]}-${timeArray[0]}`;

  return timeFormatted;
}
