import JWT from 'jsonwebtoken'

//generate access token
export function signAccessToken(userId) {
    return new Promise((resolve, reject) => {
        const payload={}
        const secret = process.env.secret;
        const option = {
            expiresIn: '15m',
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

//verify access token
export async function verifyAccessToken (context) {
    const header = context.req.headers.authorization

    // console.log(header)
    if (header) {
    const token = header.split('Bearer ')[1];
    if(token){
        try {
            const decoded = JWT.verify(token, process.env.secret)
            return decoded
        } catch (error) {
            throw new Error('Invalid/Expired token')
        }
     }
        throw new Error('Authentication required')
    }

    throw new Error('Authentication header must be provided')
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
     const payload= await JWT.verify(token,process.env.secretRef)
     // console.log(data)
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
