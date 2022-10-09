import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispach = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispach(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            //*actualizando
            dispach(onUpdateEvent({ ...calendarEvent }))
        } else {
            //*creando
            dispach(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const startDeletingEvent = () => {
        dispach(onDeleteEvent());
    }

    return {

        //*Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //*Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,

    }
}