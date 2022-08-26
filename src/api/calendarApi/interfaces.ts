export interface EventCalendarResponse {
	id?: string | number;
	title: string;
	start: string;
	end: string;
	notes: string;
	bgColor?: string;
	user: {
		_id: string;
		name: string;
	};
}
