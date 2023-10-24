import React from 'react';
import TicketGrouping from './Components/TicketGrouping';
import { DataFetchingProvider } from './Context/DataFetchingContext';
import { TicketFunctionsProvider } from './Context/TicketFunctionsContext';
import './Styles/App.css'
function App() {
  return (
    <DataFetchingProvider>
        <TicketFunctionsProvider>
          <div className="App">
            <TicketGrouping />
          </div>
        </TicketFunctionsProvider>
    </DataFetchingProvider>
   
  );
}

export default App;
