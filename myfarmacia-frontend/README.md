# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Probar el flujo


Inicia el servidor del backend y asegúrate de que el endpoint /api/create-payment-intent esté funcionando.
Usa el número de tarjeta de prueba de Stripe: 4242 4242 4242 4242.
Usa cualquier fecha de vencimiento y CVC válidos.
Completa el pago y verifica que el estado exitoso aparezca en el frontend.

## Postman

POST http://localhost:5000/api/create-payment-intent
Content-Type: application/json

{
  "amount": 5000
}