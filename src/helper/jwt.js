import JWT from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-errors';
//generate access token
export function signAccessToken(userId) {
    return new Promise((resolve, reject) => {
        const payload={}
        const secret = process.env.secret;
        const option = {
            expiresIn: '20s',
            audience:userId
        };
        //generate token
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                console.log(err);
                return reject(Error());
            }
            resolve(token);
        });
    });
}

//generate refresh token
export function signReferesToken(userId) {
    return new Promise((resolve, reject) => {
        const payload={}
        const secret = process.env.secretRef
        const option = {
            expiresIn: '15h',
            audience:userId
        };
        //generate token
        JWT.sign(payload, secret, option, (err, token) => {
            if (err) {
                console.log(err);
                return reject(Error());
            }
            resolve(token);
        });
    });
}

//verify refresh token
export async function veifyRefreshToken(token){
    try {
        // console.log("token+++++",token)
     const payload= await JWT.verify(token,process.env.secretRef)
    //  console.log(payload)
     return payload.aud
    } catch (error) {
        return error
    }
 }

 //decode access token
export async function decodeToken(token){
   try {
    const payload= await JWT.verify(token, process.env.secret)
    // console.log(data)
    return payload
   } catch (error) {
       throw new Error('invalid token')
   }
}
