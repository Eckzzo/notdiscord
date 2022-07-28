import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const getTimeAgo = (date: string) => {
  if (!date) return;
  return `${timeAgo.format(new Date(date), 'mini-minute')} ago`;
};

export { getTimeAgo };
