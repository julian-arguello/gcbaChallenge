import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createTaskSchema } from '@validation/createTaskSchema';
import { useTasks } from '@context/TasksContext';

export const CreateForm = ({ setOnSubmit, setIsValid }) => {
  const { createTask } = useTasks();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        due_date: '',
      }}
      validationSchema={createTaskSchema()}
      onSubmit={async (values, { resetForm }) => {
        values.status = 'pending';
        await createTask(values);
        resetForm();
      }}
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
