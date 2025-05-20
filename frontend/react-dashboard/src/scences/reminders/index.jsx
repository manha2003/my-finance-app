import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Button,Typography, useTheme , List, ListItem, ListItemText} from '@mui/material';
import { tokens } from '../../theme';
import { driver } from 'driver.js';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popup from '../../components/Popup';
import './Calendar.css';
import Header from '../../components/Header';
import reminderApi from '../../data/reminderApi';
import ReminderForm from './ReminderForm';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';

const EventCalendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [events, setEvents] = useState([]); 
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const token = localStorage.getItem('authToken');

  const driverObj = driver({
    showProgress: true,
    steps:[
      {
        element: '#element1',
        popover: {
          title: 'Calendar Overview',
          description: 'This section provides an overview of your events in an interactive calendar. You can view, add, or delete events directly from here.',
          side: "left",
          align: 'start'
        }
      },
      {
        element: '#element2',
        popover: {
          title: 'Event List',
          description: 'This list shows all your upcoming events and reminders. Events marked in green are successfully sent, while grey indicates pending events.',
          side: "right",
          align: 'start'
        }
      },
      {
        element: '#element3',
        popover: {
          title: 'Interactive Calendar',
          description: 'Use the calendar to manage your events. Click on a date to add a new reminder or click on an event to view or delete it.',
          side: "top",
          align: 'center'
        }
      },
      {
        popover: {
          title: 'Congratulations!',
          description: 'You are now familiar with the calendar features. Start scheduling and managing your events effectively!',
        }
      }
    ]
  });

  const fetchReminders =async () => {
    try {
      const reminders = await reminderApi.getAllReminders(token);
      const formattedEvents = reminders.map((reminder) => ({
        reminderId: reminder.reminderId,
        title: reminder.title,
        isSend:reminder.isSend,
        start: dayjs(reminder.reminderDate).format(),
        message: reminder.message,
      }));
      console.log("Fetch reminders:", reminders);
      console.log("Fetch formatted reminder:", formattedEvents);
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast.error('Failed to load reminders.');
    }
  };



  
  const handleCreateReminder = async (reminderData) => {
    try {
      const dataToSend = {
        title: reminderData.title,
        message: reminderData.message,
        reminderDate: reminderData.reminderDateTime,
      };
      console.log("Data Send:", dataToSend);

       await reminderApi.createReminder(dataToSend, token);
      toast.success('Reminder created successfully!');
      fetchReminders(); 
      setOpenPopup(false);
    } catch (error) {
      console.error('Error creating reminder:', error.response.data);
      toast.error(error.response.data);
    }
  };

  

  
  const handleDateClick = (selected) => {
  
    console.log("Selected Date (before dayjs):", dayjs(selected.dateStr).format());
    setSelectedDate(dayjs(selected.dateStr));
    setOpenPopup(true); 
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const handleEventClick = async(selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the reminder '${selected.event.title}'`
      )
    ) {
      try {
       
        console.log("Choosen Reminder" , selected.event.extendedProps.reminderId);
        const token = localStorage.getItem('authToken');
        await reminderApi.deleteReminder(selected.event.extendedProps.reminderId, token);
        toast.success('Reminder deleted successfully!');
        fetchReminders();
       
      } catch (error) {
        toast.error(error.response.data);
        console.error('Error deleting reminder', error);
      }
    }
  };

  const getEmailStatusColor = (isSend) => {
    if (!isSend) {
      return colors.grey[500];
    } else  {
      return colors.greenAccent[500];
    } 
  };

  

  return (
    <Box m="20px">
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box id="element1" display="flex" justifyContent="space-between" >
        
        <Box 
            id="element2"
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            p="15px"
            borderRadius="4px"
            sx={{
                maxHeight: "500px", 
                overflowY: "auto", 
              }}
            >
            <Typography variant="h5">
              Events 
              <Button
                sx={{
                backgroundColor: colors.grey[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                marginLeft:"4px"
                }}
                onClick={() => driverObj.drive()}
              >
                <QuestionMarkIcon sx={{ mr: "10px" }} />
                  Tour Guide
              </Button>
             </Typography>
          
           
                <List>
                    {events.map((event) => (
                    <ListItem
                        key={event.id}
                        sx={{
                        backgroundColor: getEmailStatusColor(event.isSend),
                        margin: "10px 0",
                        borderRadius: "2px",
                        }}
                    >
                        <ListItemText
                        primary={event.title}
                        secondary={<>
                           
                       

                            <Typography>
                            {dayjs(event.start).format('MMMM D, YYYY')}
                            </Typography>
                            </>
                        }
                        />

                    </ListItem>
                    ))}
                </List>
            </Box>

        <Box id ="element3" flex="1 1 100%" ml="15px">
            <FullCalendar
                plugins={
                    [dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                initialView="dayGridMonth"
                editable={true}
                timeZone="local"
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={events}
               
                dateClick={handleDateClick} 
                eventClick={handleEventClick}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                height="75vh"

               
            />
        </Box>
      </Box>

    
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Add Reminder">
        <ReminderForm
          onSubmit={handleCreateReminder}
          defaultValues={{
             title: '',
             message: '',
             reminderDateTime: selectedDate }}
        />
      </Popup>

    </Box>
  );
};

export default EventCalendar;
