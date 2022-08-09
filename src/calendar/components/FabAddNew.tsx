import { addHours } from 'date-fns';

import { useUIStore, useCalendarStore } from '../../hooks';


export const FabAddNew = () => {
    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {
        setActiveEvent({
            title: '',
            start: new Date(),
            end: addHours(new Date(), 2),
        
            bgColor: 'red',
            notes: '',
            user: {
                _id: '123',
                name: 'David'
            }
        });
        openDateModal();
    };

    return (
        <button
            onClick={handleClick}
            className='btn btn-primary fab'
        >
            <i className='fas fa-plus'></i>
        </button>
    );
};

export default FabAddNew;