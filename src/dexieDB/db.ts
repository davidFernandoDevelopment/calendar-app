import Dexie, { Table } from 'dexie';
import { User } from '../auth';
import { EventCalendar } from '../calendar';

export class SubClassedDexie extends Dexie {
	users!: Table<User>;
	events!: Table<EventCalendar>;

	constructor() {
		super('calendarApp');
		this.version(1).stores({
			events: '&id',
			users: '++id',
		});
	}
}

export const db = new SubClassedDexie();
