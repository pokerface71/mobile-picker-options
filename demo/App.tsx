import React, { useState } from "react";
import { Container, Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import { DatePickerExample, TimePickerExample } from "../src/examples";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          React Custom Mobile Picker
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          color="text.secondary"
        >
          A customizable mobile-friendly picker component for React applications
        </Typography>

        <Paper sx={{ mt: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="picker examples"
            >
              <Tab label="Date Picker" {...a11yProps(0)} />
              <Tab label="Time Picker" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <DatePickerExample />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TimePickerExample />
          </TabPanel>
        </Paper>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} React Custom Mobile Picker
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
