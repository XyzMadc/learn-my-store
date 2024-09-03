import { addData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("products");
    res.status(200).json({ status: true, statusCode: 200, data });
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          let data = req.body;
          data.created_at = new Date();
          data.updated_at = new Date();
          data.price = parseInt(data.price);
          data.stock.filter((stock: any) => {
            stock.qty = parseInt(stock.qty);
          });
          await addData("products", data, (status: boolean, result: any) => {
            if (status && result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                data: { id: result.id },
              });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, data: {} });
            }
          });
        } else {
          res.status(403).json({ status: false, statusCode: 403 });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { product }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("products", product[0], data, (status: boolean) => {
            if (status) {
              res.status(200).json({ status: true, statusCode: 200 });
            } else {
              res.status(400).json({ status: false, statusCode: 400 });
            }
          });
        } else {
          res.status(403).json({ status: false, statusCode: 403 });
        }
      }
    );
  }
  //  else if (req.method === "DELETE") {
  //   const { user }: any = req.query;
  //   const token = req.headers.authorization?.split(" ")[1] || "";
  //   jwt.verify(
  //     token,
  //     process.env.NEXTAUTH_SECRET || "",
  //     async (err: any, decoded: any) => {
  //       if (decoded && decoded.role === "admin") {
  //         await deleteData("users", user[1], (result: boolean) => {
  //           if (result) {
  //             res.status(200).json({ status: true, statusCode: 200 });
  //           } else {
  //             res.status(400).json({ status: false, statusCode: 400 });
  //           }
  //         });
  //       } else {
  //         res.status(403).json({ status: false, statusCode: 200 });
  //       }
  //     }
  //   );
  // }
}
