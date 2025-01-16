import * as yup from 'yup';

export const filterTasksSchema = yup.object({
  search: yup
    .string()
    .max(100, 'El filtro no puede tener más de 100 caracteres.'),

  status: yup
    .string()
    .oneOf(
      ['', 'pending', 'in_progress', 'completed'],
      'El estado debe ser uno de: todas, pendientes, en progreso, completados.'
    ),
});
