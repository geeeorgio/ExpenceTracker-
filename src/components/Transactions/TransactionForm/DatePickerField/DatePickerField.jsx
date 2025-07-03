import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const DatePickerField = ({ label, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(props);

  const selectedDate = field.value ? parseISO(field.value) : null;

  return (
    <div className={props.wrapperClassName}>
      <label htmlFor={props.id || props.name} className={props.labelClassName}>
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        selected={selectedDate}
        onChange={(date) => {
          setFieldValue(field.name, date ? format(date, "yyyy-MM-dd") : "");
        }}
        onBlur={() => setFieldTouched(field.name, true)}
        dateFormat="MM/dd/yyyy"
        locale={enUS}
        placeholderText="mm/dd/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        maxDate={new Date()}
        className={props.inputClassName}
      />

      {meta.touched && meta.error ? (
        <div
          className={props.errorClassName || "error-message"}
          style={{ color: "red", fontSize: "0.8em", marginTop: "4px" }}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerField;
