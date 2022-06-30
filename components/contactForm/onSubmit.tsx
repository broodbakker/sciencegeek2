

type IValues = {
  name: string;
  instantie: string;
  email: string;
  message: string;
  subject: string;
};

export const onSubmit = async (values: any, test: any) => {
  const { name, email, message, instantie, subject } = values;




  test.resetForm({});
};
