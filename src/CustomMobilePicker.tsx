import React, {
  useState,
  useEffect,
  useRef,
  TouchEvent,
  WheelEvent,
} from "react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

// Types for the picker options
export interface PickerOption {
  label: string;
  value: number | string;
}

export interface PickerColumnData {
  label: string;
  options: PickerOption[];
}

interface CustomMobilePickerProps {
  data: PickerColumnData[];
  onChange?: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  height?: number;
  itemHeight?: number;
  className?: string;
  showLabels?: boolean;
}

const PickerContainer = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme.palette.background.paper,
  width: "100%",
}));

const PickerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "12px 16px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const PickerLabel = styled(Typography)(({ theme }) => ({
  flex: 1,
  textAlign: "center",
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const PickerContent = styled(Box)({
  display: "flex",
  position: "relative",
});

const PickerColumn = styled(Box)({
  flex: 1,
  position: "relative",
  overflow: "hidden",
});

const PickerItems = styled(Box)<{ height: number }>(({ height }) => ({
  position: "relative",
  height: `${height}px`,
}));

const PickerItem = styled(Box)<{ itemHeight: number; isSelected: boolean }>(
  ({ theme, itemHeight, isSelected }) => ({
    height: `${itemHeight}px`,
    lineHeight: `${itemHeight}px`,
    textAlign: "center",
    color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: isSelected ? 600 : 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
  })
);

const PickerMask = styled(Box)<{ height: number }>(({ height, theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: `${height}px`,
  background: `linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.6) 45%,
    rgba(255, 255, 255, 0) 45%,
    rgba(255, 255, 255, 0) 55%,
    rgba(255, 255, 255, 0.6) 55%,
    rgba(255, 255, 255, 0.95)
  )`,
  pointerEvents: "none",
  zIndex: 1,
}));

const PickerHighlight = styled(Box)<{ itemHeight: number; top: number }>(
  ({ itemHeight, top, theme }) => ({
    position: "absolute",
    width: "100%",
    height: `${itemHeight}px`,
    top: `${top}px`,
    pointerEvents: "none",
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: 2,
  })
);

const CustomMobilePicker: React.FC<CustomMobilePickerProps> = ({
  data,
  onChange,
  initialValues,
  height = 200,
  itemHeight = 36,
  className,
  showLabels = true,
}) => {
  // Initialize picker values
  const [pickerValues, setPickerValues] = useState<Record<string, any>>({});
  const [positions, setPositions] = useState<Record<string, number>>({});
  const touchStartY = useRef<Record<string, number>>({});
  const currentPositions = useRef<Record<string, number>>({});
  const momentumTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Calculate the number of items visible in the picker
  const visibleItems = Math.floor(height / itemHeight);
  // Calculate the middle position
  const middlePosition = Math.floor(visibleItems / 2) * itemHeight;

  useEffect(() => {
    // Initialize with default values (first option of each column)
    const defaultValues: Record<string, any> = {};
    const defaultPositions: Record<string, number> = {};

    data.forEach((column) => {
      if (column.options.length > 0) {
        defaultValues[column.label] = column.options[0].value;
        defaultPositions[column.label] = 0;
      }
    });

    // Use initialValues if provided, otherwise use default values
    if (initialValues) {
      data.forEach((column) => {
        const optionIndex = column.options.findIndex(
          (option) => option.value === initialValues[column.label]
        );
        if (optionIndex !== -1) {
          defaultPositions[column.label] = -optionIndex * itemHeight;
        }
      });
    }

    setPickerValues(initialValues || defaultValues);
    setPositions(defaultPositions);
    currentPositions.current = defaultPositions;
  }, [data, initialValues, itemHeight]);

  const handleTouchStart =
    (columnName: string) => (e: TouchEvent<HTMLDivElement>) => {
      // Clear any momentum scrolling
      if (momentumTimers.current[columnName]) {
        clearTimeout(momentumTimers.current[columnName]);
      }

      touchStartY.current[columnName] = e.touches[0].clientY;
    };

  const handleTouchMove =
    (columnName: string, options: PickerOption[]) =>
    (e: TouchEvent<HTMLDivElement>) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchY - touchStartY.current[columnName];

      let newPosition = (positions[columnName] || 0) + deltaY;

      // Apply boundaries
      const minPosition = -((options.length - 1) * itemHeight);
      const maxPosition = 0;

      if (newPosition > maxPosition) {
        newPosition = maxPosition;
      } else if (newPosition < minPosition) {
        newPosition = minPosition;
      }

      // Update positions
      setPositions((prev) => ({
        ...prev,
        [columnName]: newPosition,
      }));

      currentPositions.current[columnName] = newPosition;
      touchStartY.current[columnName] = touchY;
    };

  const handleTouchEnd =
    (columnName: string, options: PickerOption[]) => () => {
      const position = currentPositions.current[columnName];

      // Calculate the closest snap position
      const itemIndex = Math.round(Math.abs(position) / itemHeight);
      const snapPosition = -itemIndex * itemHeight;

      // Animate to snap position
      setPositions((prev) => ({
        ...prev,
        [columnName]: snapPosition,
      }));

      currentPositions.current[columnName] = snapPosition;

      // Update the selected value
      if (itemIndex >= 0 && itemIndex < options.length) {
        const newValue = options[itemIndex].value;
        const newValues = {
          ...pickerValues,
          [columnName]: newValue,
        };

        setPickerValues(newValues);

        if (onChange) {
          onChange(newValues);
        }
      }
    };

  const handleWheel =
    (columnName: string, options: PickerOption[]) =>
    (e: WheelEvent<HTMLDivElement>) => {
      e.preventDefault();

      // Clear any momentum scrolling
      if (momentumTimers.current[columnName]) {
        clearTimeout(momentumTimers.current[columnName]);
      }

      // Get the current position
      const currentPosition = positions[columnName] || 0;

      // Calculate new position based on wheel delta
      // Normalize the delta to make the scrolling speed reasonable
      const delta = e.deltaY > 0 ? -itemHeight / 3 : itemHeight / 3;
      let newPosition = currentPosition + delta;

      // Apply boundaries
      const minPosition = -((options.length - 1) * itemHeight);
      const maxPosition = 0;

      if (newPosition > maxPosition) {
        newPosition = maxPosition;
      } else if (newPosition < minPosition) {
        newPosition = minPosition;
      }

      // Update positions
      setPositions((prev) => ({
        ...prev,
        [columnName]: newPosition,
      }));

      currentPositions.current[columnName] = newPosition;

      // Add momentum effect with snap
      momentumTimers.current[columnName] = setTimeout(() => {
        // Calculate the closest snap position
        const itemIndex = Math.round(Math.abs(newPosition) / itemHeight);
        const snapPosition = -itemIndex * itemHeight;

        // Animate to snap position
        setPositions((prev) => ({
          ...prev,
          [columnName]: snapPosition,
        }));

        currentPositions.current[columnName] = snapPosition;

        // Update the selected value
        if (itemIndex >= 0 && itemIndex < options.length) {
          const newValue = options[itemIndex].value;
          const newValues = {
            ...pickerValues,
            [columnName]: newValue,
          };

          setPickerValues(newValues);

          if (onChange) {
            onChange(newValues);
          }
        }
      }, 100);
    };

  return (
    <PickerContainer className={className}>
      {showLabels && (
        <PickerHeader>
          {data.map((column) => (
            <PickerLabel key={`header-${column.label}`}>
              {column.label}
            </PickerLabel>
          ))}
        </PickerHeader>
      )}

      <PickerContent>
        {data.map((column) => (
          <PickerColumn key={column.label}>
            <PickerItems height={height}>
              <Box
                style={{
                  transform: `translateY(${
                    middlePosition + (positions[column.label] || 0)
                  }px)`,
                  transition: "transform 0.3s ease-out",
                }}
                onTouchStart={handleTouchStart(column.label)}
                onTouchMove={handleTouchMove(column.label, column.options)}
                onTouchEnd={handleTouchEnd(column.label, column.options)}
                onWheel={handleWheel(column.label, column.options)}
              >
                {column.options.map((option, index) => {
                  const isSelected =
                    pickerValues[column.label] === option.value;
                  return (
                    <PickerItem
                      key={`${column.label}-${option.value}`}
                      itemHeight={itemHeight}
                      isSelected={isSelected}
                    >
                      {option.label}
                    </PickerItem>
                  );
                })}
              </Box>
            </PickerItems>
            <PickerMask height={height} />
            <PickerHighlight itemHeight={itemHeight} top={middlePosition} />
          </PickerColumn>
        ))}
      </PickerContent>
    </PickerContainer>
  );
};

export default CustomMobilePicker;
