// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
// Constants.js
const prod = {
    url: {
     API_URL: '',
     API_URL_USERS: '/users'}
   };
   const dev = {
    url: {
     API_URL: 'http://localhost:8000'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;