import * as yup from 'yup';

export const editTaskSchema = (minDate) => {
  const normalizedMinDate = new Date(minDate).setHours(0, 0, 0, 0);

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
      .date()
      .required('La fecha de vencimiento es obligatoria.')
      .test(
        'is-after-minDate',
        `La fecha debe ser posterior o igual a ${minDate}.`,
        (value) => {
          if (!value) return false;
          const normalizedValue = new Date(value).setHours(0, 0, 0, 0);
          return normalizedValue >= normalizedMinDate;
        }
      ),
  });
};
