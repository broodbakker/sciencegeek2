//typescript
import { IFormItems } from "../../typescript";

type IFormItemsExtra = IFormItems & { option?: string };

const extractInputProps: React.FunctionComponent<any> = (
  { formik, options, ...otherProps },
  option
) => {
  const props: any = {
    value: formik.values[otherProps.name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    ...otherProps,
  };



  if (props.type === "checkbox") {
    props.value = option.value;
    props.checked = formik.values[props.name].includes(option.value);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = formik.values[props.name];
      e.target.checked
        ? val.push(e.target.value)
        : val.slice(val.indexOf(e.target.value));
      formik.setFieldValue(val);
    };
    const checked = formik.values[props.name].includes(option.value);

    return { ...props, value: props.value, checked, onChange };
  } else if (props.type === "radio") {
    const checked = option.value === formik.values[props.name];
    return { ...props, value: option.values, checked };
  }

  return props;
};

const SelectInput: React.FunctionComponent<IFormItems> = (props: any) => (
  <select {...extractInputProps(props)}>
    <option value="">Select a value</option>
    {props.options.map((o: any) => (
      <option key={o.value} value={o.value}>
        {o.label || o.value}
      </option>
    ))}
  </select>
);

const CheckInput: React.FunctionComponent<IFormItems> = (props: any) => (
  <>
    {props.options.map((option: any) => (
      <label key={option.value}>
        <input {...extractInputProps(props, option)} />
        {option.label || option.value}
      </label>
    ))}
  </>
);

const TextInput: React.FunctionComponent<IFormItems> = (props: any) => (
  <>
    <input
      {...extractInputProps(props)}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-fontColor leading-tight focus:outline-none focus:shadow-outline mb-4 `}
    />
  </>
);

const TextAreaInput: React.FunctionComponent<IFormItems> = (props: any) => (
  <textarea
    {...extractInputProps(props)}
    rows={5}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-fontColor  leading-tight focus:outline-none focus:shadow-outline mb-4"
  />
);

export const FormInput: React.FunctionComponent<IFormItems> = (props: any) => {
  switch (props.type) {
    case "radio":
    case "checkbox":
      return CheckInput(props);
    case "select":
      return SelectInput(props);
    case "textarea":
      return TextAreaInput(props);
    default:
      return TextInput(props);
  }
};
