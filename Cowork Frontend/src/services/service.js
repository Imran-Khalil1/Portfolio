import axios from "axios";
import { toast } from "react-toastify";

export const PRODUCTION = "https://admin.tyrewaale.com/api/";
export const DEV = "https://app1-libkzfzgkq-uc.a.run.app/api/";

//http://localhost:4000/api/

export const getService = async (url, params) => {
  const res = await axios
    .get(DEV + url, params)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
  return res;
};

export const postService = async (url, data) => {
  const res = await axios
    .post(DEV + url, {
      ...data,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
  return res;
};

export const putService = async (url, data) => {
  const res = await axios
    .put(DEV + url, {
      ...data,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
  return res;
};
