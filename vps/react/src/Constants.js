// TODO https://a-carreras-c.medium.com/development-and-production-variables-for-react-apps-c04af8b430a5
// Constants.js
const prod = {
    url: {
     API_URL: 'http://client.ingenious.or.ke:5059',
     API_URL_USERS: 'http://client.ingenious.or.ke:5059/users'}
   };
   const dev = {
    url: {
     API_URL: 'http://localhost:8000'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;