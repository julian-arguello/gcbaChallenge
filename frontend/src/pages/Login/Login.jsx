import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '@validation/loginSchema';
import styles from '@pages/Login/login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

export const Login = () => {
  const [seePassword, SetSeePassword] = useState(false);
  const { handleLogin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/tareas');
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await handleLogin(values);
      //Todo: manejar mensaje exitoso
      navigate('/tareas');
    } catch (error) {
      //Todo: manejar mensaje de error.
      console.log(error);
    }
  };

  return (
    <section className={styles.section}>
      <h2>Iniciar Sesión</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                type="email"
                name="email"
                placeholder="Ingresa tu email"
                className={`form-control ${
                  errors.email && touched.email ? 'is-invalid' : ''
                }`}
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-danger pt-1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <Field
                  id="password"
                  type={seePassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className={`form-control ${
                    errors.password && touched.password ? 'is-invalid' : ''
                  }`}
                  autoComplete="current-password"
                />

                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => SetSeePassword(!seePassword)}
                >
                  {seePassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-danger pt-1"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ingresando' : 'Ingresar'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
