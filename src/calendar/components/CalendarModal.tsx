import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: 'David',
        notes: 'Sanchez',
        start: new Date(),
        end: addHours(new Date(), 2)
    });
    const titleClasses = useMemo(() => {
        if (!formSubmitted) return '';

        return formValues.title.length > 0
            ? 'is-valid'
            : 'is-invalid';
    }, [formValues.title, formSubmitted]);

    const onCloseModal = () => {
        console.log('Cerrando modal');
        setIsOpen(false);
    };

    const onInputChanged = ({
        target: { name, value }
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    const onDateChanged = (e: Date | null, changing: 'start' | 'end') => {
        if (!e) return;
        setFormValues({
            ...formValues,
            [changing]: e
        });
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        const diffDate = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(diffDate) || diffDate < 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        };
        if (formValues.title.length <= 0) {
            Swal.fire('Rellenar titulo', 'El titulo es obligatorio', 'error');
            return;
        }

    };

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Example Modal"
            onRequestClose={onCloseModal}
            className='modal'
            closeTimeoutMS={200}
            overlayClassName='modal-fondo'
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmit}
            >
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className='form-control'
                        selected={formValues.start}
                        onChange={e => onDateChanged(e, 'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        className='form-control'
                        selected={formValues.end}
                        onChange={e => onDateChanged(e, 'end')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                        minDate={formValues.start}
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClasses}`}
                        placeholder="Título del evento"
                        autoComplete="off"
                        name="title"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );
};

export default CalendarModal;