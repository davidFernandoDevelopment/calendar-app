import { dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import esEs from 'date-fns/locale/es';
import {
  getDay,
  startOfWeek,
  parse,
  format
} from 'date-fns';

const locales = {
  'es': esEs,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});