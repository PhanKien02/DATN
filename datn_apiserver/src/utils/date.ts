import moment from "moment";
import { BadRequestError } from "./httpErrors";

const formatDate = (date: Date | string, format = "DD-MM-YYYY") => {
  if (!date) return "";
  return moment(date).format(format).toString();
};

const isValidDate = (date: Date | string) => date ? moment(date).isValid() : false;

const getValidDate = (date: Date | string, message?: string) => {
  if (!date || date === 'NaN-NaN-NaN') return null;
  if (!isValidDate(date))
    throw new BadRequestError(
      `${message ? message + " - " : ""}Date invalid: ${date}`
    );

  return new Date(date);
};

const dateCompare = (date: string | Date, than: string | Date = new Date()) => {
  return moment(date).diff(than);
};

export { formatDate, getValidDate, dateCompare, isValidDate };
