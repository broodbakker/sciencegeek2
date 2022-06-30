import { validate } from "./validate";
import { Formik } from "formik";
import { FormConstruct } from "./form";
import { onSubmit } from "./onSubmit";

const initialValues = {
  name: "",
  instantie: "",
  email: "",
  message: "",
  subject: "error",
};

export const ContactForm = () => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}

    >

      {(props: any) => (

        <div>
          <FormConstruct />
          <div> </div>
        </div>
      )}

    </Formik>
  );
};
