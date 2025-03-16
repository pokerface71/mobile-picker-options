import React, { useState } from "react";
import { CustomMobilePicker } from "../index";
import { Box, Typography, Container } from "@mui/material";

interface DateValues {
  Year: number;
  Month: number;
  Day: number;
}

const DatePickerExample: React.FC = () => {
  const [values, setValues] = useState<DateValues>({
    Year: 2023,
    Month: 1,
    Day: 1,
  });

  const pickerData = [
    {
      label: "Year",
      options: Array.from({ length: 10 }, (_, i) => ({
        label: `${2020 + i}`,
        value: 2020 + i,
      })),
    },
    {
      label: "Month",
      options: Array.from({ length: 12 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
      })),
    },
    {
      label: "Day",
      options: Array.from({ length: 31 }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
      })),
    },
  ];

  const handleChange = (newValues: Record<string, any>) => {
    const typedValues: DateValues = {
      Year: newValues.Year as number,
      Month: newValues.Month as number,
      Day: newValues.Day as number,
    };

    setValues(typedValues);
    console.log("Selected values:", typedValues);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Date Picker Example
        </Typography>

        <CustomMobilePicker
          data={pickerData}
          onChange={handleChange}
          initialValues={values}
          height={250}
          itemHeight={40}
        />

        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected Date: {values.Year}-{String(values.Month).padStart(2, "0")}-
          {String(values.Day).padStart(2, "0")}
        </Typography>
      </Box>
    </Container>
  );
};

export default DatePickerExample;
