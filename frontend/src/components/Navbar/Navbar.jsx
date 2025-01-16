import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { filterTasksSchema } from '@validation/filterTasksSchema';
import styles from '@components/Navbar/navbar.module.scss';
import { useAuth } from '@context/AuthContext';
import { useTasks } from '@context/TasksContext';
import { LogoutModal } from '@components/Modals/LogoutModal';
import { useNotification } from '@context/NotificationContext';

export const Navbar = () => {
  const { user } = useAuth();
  const { setFilters } = useTasks();
  const { addNotification } = useNotification();

  const handleSubmit = async (values) => {
    try {
      setFilters(values);
    } catch (error) {
      addNotification(error.message, 'danger');
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={'container ' + styles.container}>
        <div className={styles.info}>
          <p className="h6">Hola {user.name}</p>

          <button
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
          >
            Cerrar Sesión
          </button>
        </div>

        <hr />

        <Formik
          initialValues={{
            status: '',
            search: '',
          }}
          validationSchema={filterTasksSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="input-group pb-3">
                <Field
                  type="text"
                  name="search"
                  placeholder="Filtrar por Titulo o Descripción"
                  className={`form-control ${
                    errors.search && touched.search ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage
                  name="search"
                  component="p"
                  className="text-danger pt-1"
                />

                <Field
                  as="select"
                  name="status"
                  className={`form-select ${
                    errors.status && touched.status ? 'is-invalid' : ''
                  }`}
                >
                  <option value="">Todas</option>
                  <option value="pending">Pendientes</option>
                  <option value="in_progress">En progreso</option>
                  <option value="completed">Completados</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="p"
                  className="text-danger pt-1"
                />

                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <LogoutModal />
    </nav>
  );
};
