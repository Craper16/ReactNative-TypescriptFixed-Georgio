import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username must not be empty'),
  password: yup.string().required('Password must not be empty'),
});
