import React, { useState } from "react";
import { MobilePickerOptions } from "../index";
import { Box, Typography, Container, Paper, Tabs, Tab } from "@mui/material";

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
      id={`infinite-tabpanel-${index}`}
      aria-labelledby={`infinite-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `infinite-tab-${index}`,
    "aria-controls": `infinite-tabpanel-${index}`,
  };
}

interface PickerValues {
  Number?: number;
  Month?: number;
}

const InfinitePickerExample: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [values, setValues] = useState<PickerValues>({
    Number: 1,
    Month: 1,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChange = (newValues: Record<string, any>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
    console.log("Selected values:", newValues);
  };

  // Example 1: Simple number picker with infinite loop
  const numberPickerData = [
    {
      label: "Number",
      options: Array.from({ length: 10 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
      })),
    },
  ];

  // Example 2: Month picker with infinite loop
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthPickerData = [
    {
      label: "Month",
      options: monthNames.map((name, index) => ({
        label: name,
        value: index + 1,
      })),
    },
  ];

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Infinite Loop Picker Examples
        </Typography>

        <Paper sx={{ mt: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="infinite picker examples"
          >
            <Tab label="Number Picker" {...a11yProps(0)} />
            <Tab label="Month Picker" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>
              Number Picker (1-10) with Infinite Loop
            </Typography>
            <MobilePickerOptions
              data={numberPickerData}
              onChange={handleChange}
              initialValues={{ Number: 1 }}
              height={250}
              itemHeight={40}
              infinite={true}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Selected Number: {values.Number}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try scrolling up or down continuously to see the infinite loop in
              action.
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Month Picker with Infinite Loop
            </Typography>
            <MobilePickerOptions
              data={monthPickerData}
              onChange={handleChange}
              initialValues={{ Month: 1 }}
              height={250}
              itemHeight={40}
              infinite={true}
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Selected Month:{" "}
              {monthNames[values.Month ? values.Month - 1 : 0] || "January"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try scrolling up or down continuously to see the infinite loop in
              action.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default InfinitePickerExample;
