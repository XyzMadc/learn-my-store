import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("products");
    res.status(200).json({ status: true, statusCode: 200, data });
  }
  //   } else if (req.method === "PUT") {
  //     const { user }: any = req.query;
  //     const { data } = req.body;
  //     const token = req.headers.authorization?.split(" ")[1] || "";
  //     jwt.verify(
  //       token,
  //       process.env.NEXTAUTH_SECRET || "",
  //       async (err: any, decoded: any) => {
  //         if (decoded && decoded.role === "admin") {
  //           await updateData("users", user[1], data, (result: boolean) => {
  //             if (result) {
  //               res.status(200).json({ status: true, statusCode: 200 });
  //             } else {
  //               res.status(400).json({ status: false, statusCode: 400 });
  //             }
  //           });
  //         }
  //       }
  //     );
  //   } else if (req.method === "DELETE") {
  //     const { user }: any = req.query;
  //     const token = req.headers.authorization?.split(" ")[1] || "";
  //     jwt.verify(
  //       token,
  //       process.env.NEXTAUTH_SECRET || "",
  //       async (err: any, decoded: any) => {
  //         if (decoded && decoded.role === "admin") {
  //           await deleteData("users", user[1], (result: boolean) => {
  //             if (result) {
  //               res.status(200).json({ status: true, statusCode: 200 });
  //             } else {
  //               res.status(400).json({ status: false, statusCode: 400 });
  //             }
  //           });
  //         } else {
  //           res.status(403).json({ status: false, statusCode: 200 });
  //         }
  //       }
  //     );
  //   }
}
