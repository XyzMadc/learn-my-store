import instance from "@/lib/axios/instance";

export const productServices = {
  getAllProducts: () => instance.get("api/product"),
  addProduct: (data: any, token: string) =>
    instance.post("api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  //   deleteUser: (id: string, token: string) =>
  //     instance.delete(`api/user/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   getProfile: (token: string) =>
  //     instance.get("api/user/profile", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   updateProfile: (data: any, token: string) =>
  //     instance.put(
  //       `/api/user/profile/`,
  //       { data },
  //       {
  //         headers: {
  //           Authorization: `Beares ${token}`,
  //         },
  //       }
  //     ),
};
