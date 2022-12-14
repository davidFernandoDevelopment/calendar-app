export interface EventCalendar {
	id?: string | number;
	title: string;
	start: Date;
	end: Date;
	notes: string;
	bgColor?: string;
	user: {
		_id: string;
		name: string;
	};
}
