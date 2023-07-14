import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type BasicDateTimePickerProps = {
  value: Date;
  handleChange: (date: Date | undefined) => void;
};

export default function BasicDatePicker(props: BasicDateTimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ width: "40%" }}>
        <DatePicker
          label="Pick the date"
          onChange={(newValue) => {
            props.handleChange(newValue?.toDate());
          }}
          value={dayjs(props.value)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
