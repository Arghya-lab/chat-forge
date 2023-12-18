import { format, isSameDay, parseISO } from "date-fns";

const areDatesSame = (dateString1, dateString2) => {
  const date1 = parseISO(dateString1);
  const date2 = parseISO(dateString2);
  return isSameDay(date1, date2);
};

const getDetailDateTime = (isoDateString) => {
  if (!isoDateString) return null;
  
  const date = parseISO(isoDateString);
  return format(date, "EEEE, d LLLL yyyy kk:m");
};

const getDateTime = (isoDateString) => {
  if (!isoDateString) return null;
  
  const date = parseISO(isoDateString);
  return format(date, "dd/MM/yyyy HH:mm");
};

const getTime = (isoDateString) => {
  if (!isoDateString) return null;
  
  const date = parseISO(isoDateString);
  return format(date, "HH:mm");
};

export { areDatesSame, getDateTime, getTime, getDetailDateTime };
