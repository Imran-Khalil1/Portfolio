import { toast } from "react-toastify";

export const addToFav = async (product) => {
  const cart = localStorage.getItem("coWorkFav");
  if (cart) {
    const carts = JSON.parse(cart);
    const filteredProducts = carts?.filter(
      (x) => x?.product?._id === product?._id
    );
    if (filteredProducts?.length !== 0) {
      toast.info("item is already in favorites.");
      return true;
    } else {
      carts?.push({
        product: product,
      });
      localStorage.setItem("coWorkFav", JSON.stringify(carts));
      toast.success("Item added in favorites.");
      return true;
    }
  } else {
    const cartss = [];
    cartss.push({
      product: product,
    });
    localStorage.setItem("coWorkFav", JSON.stringify(cartss));
    toast.success("Item added in favorites.");
    return true;
  }
};

export const getFav = async () => {
  const cart = JSON.parse(localStorage.getItem("coWorkFav"));
  if (cart) {
    return cart;
  } else {
    return null;
  }
};

export const removeFromFav = async (product) => {
  const cart = JSON.parse(localStorage.getItem("coWorkFav"));
  if (cart) {
    const cart = JSON.parse(localStorage.getItem("coWorkFav"));
    const finalProducts = cart?.filter((x) => x?.product?._id !== product);
    localStorage.setItem("coWorkFav", JSON.stringify(finalProducts));
    toast.success("item removed from the favorites");
    return true;
  } else {
    return false;
  }
};
