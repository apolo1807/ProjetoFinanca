import * as moment from "moment";

export function DataCurrentyYear(control: any): { [key: string]:boolean } | null {

  const yearInsert = moment(control.value);
  const yearToday = moment();

  if(yearInsert.year() != yearToday.year()) {
    return { validData: true };
  }

  return null;
}
