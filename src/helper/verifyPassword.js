import bcrypt from 'bcrypt';
export async function verifyPassword(plainPass,encPass){
   try {
    const result= await bcrypt.compare(plainPass,encPass)
    return result
   } catch (error) {
       return error
   } 
   
}