import { useCalendarStore } from '../../hooks';


export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleClick = () => {
        startDeletingEvent();
    };

    return (
        <button
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
            onClick={handleClick}
            className='btn btn-danger fab-danger'
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    );
};

export default FabDelete;