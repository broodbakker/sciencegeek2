type PropsType = {
  name: string;
  instantie: string;
  email: string;
  message: string;
  subject: string;
};

export const validate: React.FunctionComponent<PropsType> = (values: any) => {
  const errorName = !values.name && { name: "Required" };
  const errorInstantie = !values.instantie && { instantie: "Required" };

  const isRealEmail = !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    values.email
  );

  const errorEmail = !values.email
    ? { email: "Required" }
    : isRealEmail && { email: "Invalid email format" };

  const errorMessage = !values.message && { subject: "Required" };
  const errorSubject = !values.subject && { message: "Required" };

  return Object.assign(
    {},
    errorName,
    errorInstantie,
    errorEmail,
    errorMessage,
    errorSubject
  );
};
