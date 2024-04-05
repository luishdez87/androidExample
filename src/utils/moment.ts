import moment from 'moment';
import {Show} from '../models/show';

export const parsePremieredDate = (premiered: string): string => {
  const date = new Date(premiered);
  const momentDate = moment(date);

  return ` ${momentDate.format('MMMM Do YYYY')}`;
};

export const calculateRunTime = (item: Show) => {
  const premiered = moment(item.premiered, 'YYYY-MM-DD');
  const ended = item.ended ? moment(item.ended, 'YYYY-MM-DD') : moment();
  const duration = moment.duration(ended.diff(premiered));
  return ` ${duration.years() > 0 ? duration.years() + ' years, ' : null}${
    duration.months() > 0 ? duration.months() + ' months and ' : null
  }${duration.days()} days`;
};
