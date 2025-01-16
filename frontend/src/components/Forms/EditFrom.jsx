import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { editTaskSchema } from '@validation/editTaskSchema';
import { useTasks } from '@context/TasksContext';

export const EditForm = ({ task, setOnSubmit, setIsValid }) => {
  const { editTask } = useTasks();

  return (
    <Formik
      initialValues={{ ...task, description: task?.description || '' }}
      validationSchema={editTaskSchema(task.due_date)}
      enableReinitialize
      onSubmit={async (values) => await editTask(values, task.id)}
    >
      {({ handleSubmit, errors, touched, isValid, dirty }) => {
        useEffect(() => {
          setOnSubmit(() => handleSubmit);
        }, [handleSubmit, setOnSubmit]);

        useEffect(() => {
          setIsValid(isValid && dirty);
        }, [isValid, dirty, setIsValid]);

        return (
          <Form>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Estado
              </label>
              <Field
                id="status"
                as="select"
                name="status"
                className={`form-select ${
                  errors.status && touched.status ? 'is-invalid' : ''
                }`}
              >
                <option value="pending">Pendientes</option>
                <option value="in_progress">En progreso</option>
                <option value="completed">Completados</option>
              </Field>
              <ErrorMessage
                name="status"
                component="p"
                className="text-danger pt-1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <Field
                id="title"
                type="text"
                name="title"
                className={`form-control ${
                  errors.title && touched.title ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-danger pt-1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className={`form-control ${
                  errors.description && touched.description ? 'is-invalid' : ''
                }`}
                rows="5"
                placeholder="Ingresa una descripción"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-danger pt-1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="due_date" className="form-label">
                Fecha de Vencimiento
              </label>
              <Field
                id="due_date"
                name="due_date"
                type="date"
                className={`form-control ${
                  errors.due_date && touched.due_date ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                name="due_date"
                component="p"
                className="text-danger pt-1"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
