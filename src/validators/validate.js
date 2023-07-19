import Joi from 'joi'

const inputSchema = Joi.object({
    province: Joi.string().trim().required().messages({
        'string.empty':'province is required.'
    }),
    due_date: Joi.string().trim().required().messages({
        'string.empty':'date start is required.'
    }),
    // dateEnd: Joi.string().trim().required().messages({
    //     'string.empty':'date end is required.'
    // }),
    // passenger: Joi.string().trim().required().messages({
    //     'string.empty':'input is required.'
    // }),

})

const validateInput = input => {
  const {error} = inputSchema.validate(input,{ abortEarly:false})
  if(error){
    return error.details.reduce((acc,el)=>{
        acc[el.path[0]]=el.message;
        return acc;
    },{});
  }
}

export default validateInput

