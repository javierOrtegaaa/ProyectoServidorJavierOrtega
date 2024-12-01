// utils/auth.js

export function validateLogin(username, password) {
    if (username === 'admin' && password === 'admin') {
      return true; // Credenciales correctas
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }
  