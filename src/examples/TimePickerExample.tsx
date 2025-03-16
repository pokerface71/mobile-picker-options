import React, { useState } from "react";
import { MobilePickerOptions } from "../index";
import { Box, Typography, Container } from "@mui/material";

interface TimeValues {
  Hour: number;
  Minute: number;
}

const TimePickerExample: React.FC = () => {
  const [values, setValues] = useState<TimeValues>({
    Hour: 12,
    Minute: 30,
  });

  const pickerData = [
    {
      label: "Hour",
      options: Array.from({ length: 24 }, (_, i) => ({
        label: i.toString().padStart(2, "0"),
        value: i,
      })),
    },
    {
      label: "Minute",
      options: Array.from({ length: 60 }, (_, i) => ({
        label: i.toString().padStart(2, "0"),
        value: i,
      })),
    },
  ];

  const handleChange = (newValues: Record<string, any>) => {
    const typedValues: TimeValues = {
      Hour: newValues.Hour as number,
      Minute: newValues.Minute as number,
    };

    setValues(typedValues);
    console.log("Selected time:", typedValues);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Time Picker Example
        </Typography>

        <MobilePickerOptions
          data={pickerData}
          onChange={handleChange}
          initialValues={values}
          height={200}
          itemHeight={40}
        />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected Time: {String(values.Hour).padStart(2, "0")}:
          {String(values.Minute).padStart(2, "0")}
        </Typography>
      </Box>
    </Container>
  );
};

export default TimePickerExample;
