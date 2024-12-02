import React, { useState, useEffect } from "react"; // Ensure useState and useEffect are imported
import { useDispatch, useSelector } from "react-redux"; 
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Navbar from "../ui/Navbar"; 
import { fetchWithToken } from "../../helpers/fetch"; 
import CalendarEvent from "./CalendarEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import CalendarModal from "./CalendarModal";
import { eventSetActive, eventStartLoading,eventClearActive } from "../../actions/event";
import AddNewBtn from "../ui/AddNewBtn";
import DeleteBtn from "../ui/DeleteBtn";
import Swal from "sweetalert2";
import { uiOpenModal } from "../../actions/ui";
const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { auth, ui, calendar } = useSelector((state) => state); // Access Redux state
  const { events, activeEvent } = calendar;
  const { id } = auth; // Get the logged-in user's ID
  const { modalOpen } = ui;
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
  const [userEvents, setUserEvents] = useState([]); // State to store selected user's events

  useEffect(() => {
    dispatch(eventStartLoading()); // Load the events on mount
  }, [dispatch]);

  const viewUserEvents = async (userId) => {
    try {
      const response = await fetchWithToken(`/events/user/${userId}`);
      const data = await response.json();
      setUserEvents(data); // Set events of the selected user
    } catch (err) {
      Swal.fire("Error", "Failed to fetch user events", "error");
    }
  };

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal()); // Open event modal on double-click
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e)); // Set the active event
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: id === event.user._id ? "#367CF7" : "#465660", // Highlight the current user's events
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return { style };
  };

  const onSelectSlot = (e) => {
    // Handle event creation or selection on slot
    activeEvent && dispatch(eventClearActive());
    if (e.action === "select" || e.action === "doubleClick") {
      dispatch(
        eventSetActive({
          title: "",
          notes: "",
          start: e.start,
          end: e.end,
        })
      );
      dispatch(uiOpenModal());
    }
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e); // Save last view to localStorage
  };

  return (
    <div className="calendar">
      <Navbar viewUserEvents={viewUserEvents} /> {/* Pass viewUserEvents as prop to Navbar */}
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={userEvents.length > 0 ? userEvents : events} // Show user-specific events or default events
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{ event: CalendarEvent }} // Custom event component
        />
      </div>
      <AddNewBtn />
      {activeEvent && !modalOpen && <DeleteBtn />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
