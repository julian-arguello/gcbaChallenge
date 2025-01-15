import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Debe ser un mail valido.')
    .required('El email es obligatorio.'),
  password: yup.string().required('La contraseña es obligatoria.'),
});
