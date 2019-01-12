const config = {
  production: {
    backendAPI: process.env.REACT_APP_BACKEND_PATH || 'http://localhost:3000/api',
    frontendURL: process.env.REACT_APP_FRONTEND_PATH || 'http://localhost:3000',
    socket: process.env.REACT_APP_SOCKET_PATH || 'http://localhost:8000',
    omisePublicKey: process.env.REACT_APP_OMISE_PKEY || 'pkey_test_5e08bof53jrfb8vi6fa',
  },
  development: {
    backendAPI: 'http://ec2-3-0-146-195.ap-southeast-1.compute.amazonaws.com/api',
    frontendURL: 'http://localhost:3000',
    socket: 'http://ec2-3-0-146-195.ap-southeast-1.compute.amazonaws.com:8000',
    omisePublicKey: 'pkey_test_5e08bof53jrfb8vi6fa',
  },
};

module.exports = config[process.env.REACT_APP_ENV || 'development'];
