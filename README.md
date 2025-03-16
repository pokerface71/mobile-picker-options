# React Mobile Picker options V [1.0.1]

A customizable mobile-friendly picker component for React applications, built with Material-UI.

## Features

- Mobile-friendly wheel picker with smooth animations
- Support for multiple columns
- Touch and mouse wheel support
- Customizable styling
- TypeScript support
- Compatible with Material-UI v5 and v6

## Installation

```bash
npm install mobile-picker-options
# or
yarn add mobile-picker-options
```

## Prerequisites

This component requires the following peer dependencies:

```
react: ^16.8.0 || ^17.0.0 || ^18.0.0
react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0
@mui/material: ^5.0.0 || ^6.0.0
@emotion/react: ^11.0.0
@emotion/styled: ^11.0.0
```

## Usage

```jsx
import React, { useState } from "react";
import { MobilePickerOptions } from "mobile-picker-options";

const App = () => {
  const [values, setValues] = useState({
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

  const handleChange = (newValues) => {
    setValues(newValues);
    console.log("Selected values:", newValues);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Date Picker</h2>
      <MobilePickerOptions
        data={pickerData}
        onChange={handleChange}
        initialValues={values}
        height={250}
        itemHeight={40}
      />
    </div>
  );
};

export default App;
```

## Props

| Prop            | Type                                    | Default  | Description                    |
| --------------- | --------------------------------------- | -------- | ------------------------------ |
| `data`          | `PickerColumnData[]`                    | Required | Array of column data objects   |
| `onChange`      | `(values: Record<string, any>) => void` | -        | Callback when values change    |
| `initialValues` | `Record<string, any>`                   | -        | Initial values for the picker  |
| `height`        | `number`                                | `200`    | Height of the picker in pixels |
| `itemHeight`    | `number`                                | `36`     | Height of each item in pixels  |
| `className`     | `string`                                | -        | Additional CSS class           |
| `showLabels`    | `boolean`                               | `true`   | Whether to show column labels  |

### Types

```typescript
interface PickerOption {
  label: string;
  value: number | string;
}

interface PickerColumnData {
  label: string;
  options: PickerOption[];
}
```

## Examples

### Time Picker

```jsx
const timePickerData = [
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

<MobilePickerOptions
  data={timePickerData}
  onChange={handleTimeChange}
  initialValues={{ Hour: 12, Minute: 30 }}
/>;
```

### Custom Styling

You can customize the appearance by providing a className prop and using CSS:

```jsx
<MobilePickerOptions
  data={pickerData}
  onChange={handleChange}
  className="custom-picker"
/>
```

```css
.custom-picker {
  /* Your custom styles */
}
```

## License

MIT
