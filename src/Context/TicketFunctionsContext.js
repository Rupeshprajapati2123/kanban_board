import React, { createContext, useContext } from 'react';

const TicketFunctionsContext = createContext();

export const useTicketFunctions = () => {
  return useContext(TicketFunctionsContext);
};

export const TicketFunctionsProvider = ({ children }) => {
  const groupByStatus = (tickets) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const status = ticket.status;

      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }

      groupedTickets[status].push(ticket);
    });

    return groupedTickets;
  };

  const groupByUser = (tickets, users) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      const userId = ticket.userId;
      const user = users.find((user) => user.id === userId);

      if (user) {
        const userName = user.name;

        if (!groupedTickets[userName]) {
          groupedTickets[userName] = [];
        }

        groupedTickets[userName].push(ticket);
      }
    });

    return groupedTickets;
  };

  const groupByPriority = (tickets) => {
    const groupedTickets = {};

    tickets.forEach((ticket) => {
      var priority = ticket.priority;
      
      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }

      groupedTickets[priority].push(ticket);
    });

    return groupedTickets;
  };

  const sortTickets = (tickets, sortOrder) => {
    if (sortOrder === 'asc') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    }
    return tickets; // Default case, no sorting
  };

  return (
    <TicketFunctionsContext.Provider value={{ groupByStatus, groupByUser, groupByPriority, sortTickets }}>
      {children}
    </TicketFunctionsContext.Provider>
  );
};
