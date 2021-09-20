import nodemailer from 'nodemailer'

export async function mailSend(email,text){

  try {
     //mail configuration
        var transporter= nodemailer.createTransport({
            service: "gmail",
            auth:{
                user :process.env.EMAIL,
                pass:process.env.PASS
            }
        });

        var mail={
            from:process.env.EMAIL,
            to:email,
            subject: "forget password",
            html:`${text}`
            
        };
        //send mail
        const result =await transporter.sendMail(mail)
        return result; 
        } catch (error) {
            return error
        }  

}