import { FormEvent } from 'react';

import './LoginPage.css';
import { useForm } from '../../../hooks';

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
};
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange } = useForm(registerFormFields);

  const loginSubmit = () => {
    console.log({ loginEmail, loginPassword });
  };

  const registerSubmit = () => {
    console.log({ registerEmail, registerPassword });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <button
                type="button"
                className="btnSubmit"
                onClick={loginSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <button
                type="submit"
                className="btnSubmit"
                onClick={registerSubmit}
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;