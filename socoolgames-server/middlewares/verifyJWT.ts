import { Request, Response, NextFunction } from 'express';
const UserModel = require('../models/user')
const RoleModel = require('../models/role')

const jwt = require('jsonwebtoken');


export async function verifyJWTToken(request: any, response: Response, next: any) {
/*
* Normally JWTs are specified as Bearer Tokens.
* Authorization Header will have something like 'Bearer <token>' 
*/
  const header = request.headers.authorization;
  if (header && header.startsWith('Bearer ')) { 
    const token = header.slice(7, header.length);
    const secret = process.env.ACCESS_TOKEN_SECRET;
    try {
      jwt.verify(token, secret,
        (err: any, decoded: any) => {
          if (err) {
            //next(new Error('Authentication Failed.'));
            response.status(401).json({ error: 401, message: 'Authentication Failed.', data: "" });
          } else {
            request.userId = decoded.userId;
            request.email = decoded.email;
            //console.log("decoded", decoded, new Date(decoded.iat * 1000), new Date(decoded.exp * 1000))
            next();
          }
        }
      );
    } catch (error: any) {
      //next(new Error('Authentication Failed'));
      response.status(401).json({ error: 401, message: 'Authentication Failed', data: "" });
    }
  } else {  
    response.status(401).json({ error: 400, message: 'Missing Authentication Token', data: "" });

    //next(new Error('Missing Authentication Token'));
  }
}

export async function isAdmin (request: any, response: Response, next: any) {
  UserModel.findById(request.userId).exec((err: any, user: any) => {
    if (err) {
      response.status(500).send({ message: err });
      return;
    }

    RoleModel.find(
      {
        _id: { $in: user.roles },
      },
      (err: any, roles: any) => {
        if (err) {
          response.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        response.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
}

export async function isModerator (request: any, response: Response, next: any)  {
  UserModel.findById(request.userId).exec((err: any, user: any) => {
    if (err) {
      response.status(500).send({ message: err });
      return;
    }

    RoleModel.find(
      {
        _id: { $in: user.roles },
      },
      (err: any, roles: any) => {
        if (err) {
          response.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        response.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};