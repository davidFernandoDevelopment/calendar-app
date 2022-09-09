import { addHours } from 'date-fns';

import { useUIStore, useCalendarStore } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';


export const FabAddNew = () => {
    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();
    const { user } = useAuthStore();

    const handleClick = () => {
        setActiveEvent({
            title: '',
            start: new Date(),
            end: addHours(new Date(), 2),

            bgColor: 'red',
            notes: '',
            user: {
                _id: user?.uid!,
                name: user?.name!
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