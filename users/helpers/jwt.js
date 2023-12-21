const { expressjwt: expressJwt } = require('express-jwt');

    function authJwt() {
      const secret = process.env.secret;
      const api = process.env.API_URL;

      return  (
        expressJwt({
          secret,
          algorithms: ["HS256"],
        }).unless({
            path: [
                    { url : `${api}/users/`, methods: ['GET'] },
                    { url : `${api}/users/`, methods: ['POST'] },
                    `${api}/users/login`,
                    `${api}/users/register`,


                    
                  ]
            })



      );
    }
    
    module.exports = authJwt;
