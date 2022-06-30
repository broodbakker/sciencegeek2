import { connect } from "formik";
import { FormInput } from "./formInput";

//typescript
import { IFormItems } from "../../typescript";

const FormItem = (props: any) => {
  const { ...inputProps }: IFormItems = props;
  const { name } = props;
  const { errors, touched }: Record<string, any> = props.formik;

  return (
    <div>
      {props.label && (
        <label className="block text-fontColor text-sm font-bold mb-2">
          {props.label}
        </label>
      )}

      <FormInput {...inputProps} />

      {errors[name] && touched[name] && (
        <p className="text-error text-base font-bold"> {errors[name]}</p>
      )}
    </div>
  );
};

export default connect(FormItem);
