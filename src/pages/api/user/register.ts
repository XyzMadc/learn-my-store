import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    signUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, statusCode: 200 });
      } else {
        res.status(400).json({ status: false, statusCode: 400 });
      }
    });
  } else {
    res.status(405).json({ status: false, statusCode: 405 });
  }
}
