import jwt from "jsonwebtoken";

/**
 * @description this method check if token is valid
 * @param token
 * @returns
 */
 export const verify = (token: string) => {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    return decodedToken;

};