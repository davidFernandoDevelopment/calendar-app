import { useAppSelector } from './';
import { useAppDispatch } from './useRedux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUIStore = () => {
    const dispatch = useAppDispatch();
    const { isDateModalOpen } = useAppSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };
    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };
    const toggleDateModal = () => {
        isDateModalOpen
            ? closeDateModal()
            : openDateModal();
    };

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    };
};