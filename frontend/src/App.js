/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Residents from "./scenes/residents";
import Apartments from "./scenes/apartments";
import ResidentApartments from "./scenes/residentapartments";
import ResidentForm from "./scenes/forms/residentform";
import ApartmentForm from "./scenes/forms/apartmentform";
import ResidentApartmentForm from "./scenes/forms/residentapartmentform";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { RowProvider, DataProvider } from "./context/DataProvider";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <DataProvider>
              <RowProvider>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/residents" element={<Residents />} />
                  <Route path="/apartments" element={<Apartments />} />
                  <Route path="/residentapartments" element={<ResidentApartments />} />
                  <Route path="/residentform" element={<ResidentForm mode="create" />} />
                  <Route path="/residentformedit" element={<ResidentForm mode="edit" />} />
                  <Route path="/apartmentform" element={<ApartmentForm mode="create" />} />
                  <Route path="/apartmentformedit" element={<ApartmentForm mode="edit" />} />
                  <Route path="/residentapartmentform" element={<ResidentApartmentForm mode="create" />} />
                  <Route path="/residentapartmentformedit" element={<ResidentApartmentForm mode="edit" />} />
                </Routes>
              </RowProvider>
            </DataProvider>
          </main>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
