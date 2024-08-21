import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const profile: any = await retrieveDataById("users", decoded.id);
            if (profile) {
              profile.id = decoded.id;
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Not Found",
                data: {},
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access Denied",
              data: {},
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded) {
          if (data.password) {
            const confirmPassword = await compare(
              data.currentPassword,
              data.encPassword
            );
            if (!confirmPassword) {
              res.status(400).json({ status: false, statusCode: 400 });
            }
            data.password = await hash(data.password, 10);
            delete data.currentPassword;
            delete data.encPassword;
          }

          await updateData("users", user[0], data, (result: boolean) => {
            if (result) {
              res.status(200).json({ status: true, statusCode: 200 });
            } else {
              res.status(400).json({ status: false, statusCode: 400 });
            }
          });
        } else {
          res.status(405).json({ status: false, statusCode: 405 });
        }
      }
    );
  }
}
