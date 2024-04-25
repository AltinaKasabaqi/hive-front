import Cookies from 'js-cookie';


const authorizeMiddleware = (to, from, next) => {
      const token = Cookies.get('token');
      console.log("Tokeni i marrur nga cookie:", token); 

      if (to.meta.requiresAuth && !token) {
        next('/login');
      } else {
        next();
          
      }
     
};


<<<<<<< HEAD
export default authorizeMiddleware;
=======
export default authorizeMiddleware;
>>>>>>> 294d80893857cc082e955e1e51eb7696b9833a51
