import { render, screen } from "@testing-library/react";
import { CustomMobilePicker } from "../index";

// Mock data for testing
const mockData = [
  {
    label: "Year",
    options: [
      { label: "2020", value: 2020 },
      { label: "2021", value: 2021 },
      { label: "2022", value: 2022 },
    ],
  },
  {
    label: "Month",
    options: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
    ],
  },
];

describe("CustomMobilePicker", () => {
  it("renders without crashing", () => {
    render(<CustomMobilePicker data={mockData} />);
  });

  it("displays column labels", () => {
    render(<CustomMobilePicker data={mockData} showLabels={true} />);
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
  });

  it("does not display column labels when showLabels is false", () => {
    render(<CustomMobilePicker data={mockData} showLabels={false} />);
    expect(screen.queryByText("Year")).not.toBeInTheDocument();
    expect(screen.queryByText("Month")).not.toBeInTheDocument();
  });

  it("displays option values", () => {
    render(<CustomMobilePicker data={mockData} />);
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2021")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("applies custom height and itemHeight", () => {
    const { container } = render(
      <CustomMobilePicker data={mockData} height={300} itemHeight={50} />
    );

    // Check if the height is applied correctly
    const pickerItems = container.querySelectorAll('[height="300"]');
    expect(pickerItems.length).toBeGreaterThan(0);

    // Check if the itemHeight is applied correctly
    const pickerItem = container.querySelectorAll('[itemHeight="50"]');
    expect(pickerItem.length).toBeGreaterThan(0);
  });
});
