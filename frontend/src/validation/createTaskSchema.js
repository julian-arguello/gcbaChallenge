import * as yup from 'yup';

export const createTaskSchema = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedToday = today.toISOString().split('T')[0];

  return yup.object({
    title: yup
      .string()
      .required('El título es obligatorio.')
      .min(3, 'El título debe tener al menos 3 caracteres.')
      .max(100, 'El título no puede tener más de 100 caracteres.'),
    description: yup
      .string()
      .max(255, 'La descripción no puede tener más de 255 caracteres.'),

    due_date: yup
      .string()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'La fecha debe tener el formato YYYY-MM-DD.'
      )
      .test(
        'is-after-today',
        `La fecha debe ser mayor a ${formattedToday}.`,
        (value) => {
          if (!value || value.trim() === '') return true;
          return value > formattedToday;
        }
      ),
  });
};
