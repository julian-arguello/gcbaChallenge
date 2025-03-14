import * as yup from 'yup';

export const editTaskSchema = (minDate) => {
  return yup.object({
    title: yup
      .string()
      .required('El título es obligatorio.')
      .min(3, 'El título debe tener al menos 3 caracteres.')
      .max(100, 'El título no puede tener más de 100 caracteres.'),
    description: yup
      .string()
      .max(255, 'La descripción no puede tener más de 255 caracteres.'),
    status: yup
      .string()
      .required('El estado es obligatorio.')
      .oneOf(
        ['all', 'pending', 'in_progress', 'completed'],
        'El estado debe ser válido.'
      ),
    due_date: yup
      .string()
      .nullable()
      .matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'La fecha debe tener el formato YYYY-MM-DD.'
      )
      .test(
        'is-after-minDate',
        `La fecha debe ser posterior o igual a ${minDate || 'la fecha mínima permitida'}.`,
        (value) => {
          if (!value) return true;
          if (!minDate) return true;
          return value >= minDate;
        }
      ),
  });
};
