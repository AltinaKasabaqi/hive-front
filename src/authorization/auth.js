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


export default authorizeMiddleware;
