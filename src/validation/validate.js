// import Joi from "joi";
import Joi from 'joi';

class Validator {

  //validation for register user
  validateRegisterUser = async (name,email,password,roleName) => {
    try {
      const pattern = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{3,10})";
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string()
          .trim()
          .email()
          .required(),
        password: Joi.string()
          .regex(RegExp(pattern))
          .required(),
          // .error(errors => {
          //   errors.forEach(err => {
          //       console.log(")))))",err.code)
          //       if(err.code="object.regex"){
          //           err.message = 'Password must contain one capital letter, one small letter and one special character and atleast 3 characters long '
          //       }else{
          //           err.message='password is required'
          //       }
          //   })
          //   return errors
          //    }),
             
            roleName: Joi.string(),
      });
      
      const value = await schema.validateAsync({name,email,password,roleName});
      // console.log(value)
    } catch (e) {
      // console.log(e.)
      throw new Error(e.details[0].message)
    }
  };
  
  //validation for login user
  validateLoginUser = async (email,password) => {
    try {
      const pattern = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{3,10})";
      const schema = Joi.object().keys({
        email: Joi.string()
        .trim()
        .email()
        .required(),
      password: Joi.string()
        .regex(RegExp(pattern))
        .required()
        // .error(errors => {
        //   errors.forEach(err => {
        //       console.log(")))))",err.code)
        //       if(err.code="object.regex"){
        //           err.message = 'Password must contain one capital letter, one small letter and one special character and atleast 3 characters long '
        //       }else{
        //           err.message='password is required'
        //       }
        //   })
        //   return errors
        //    }),
      })
      const value = await schema.validateAsync({email,password});
    } catch (e) {
      throw new Error(e.details[0].message)

    }
  }
}
export default new Validator();
