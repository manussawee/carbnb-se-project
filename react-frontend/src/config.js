const config = {
  production: {
    backendAPI: 'http://34.80.139.21:3000/api',
    frontendURL: 'http://34.80.139.21:3000',
    socket: 'http://34.80.139.21:8000',
    omisePublicKey: 'pkey_test_5e08bof53jrfb8vi6fa',
  },
  development: {
    backendAPI: 'http://ec2-3-0-146-195.ap-southeast-1.compute.amazonaws.com/api',
    frontendURL: 'http://localhost:3000',
    socket: 'http://ec2-3-0-146-195.ap-southeast-1.compute.amazonaws.com:8000',
    omisePublicKey: 'pkey_test_5e08bof53jrfb8vi6fa',
  },
};

module.exports = config[process.env.REACT_APP_ENV || 'development'];
