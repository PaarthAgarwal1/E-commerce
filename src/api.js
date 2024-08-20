import axios from "axios";

// Fetch products with search, sort, and order functionality
export async function getProducts(search, sortBy, order) {
  const res = await axios.get("https://dummyjson.com/products/search", {
    params: { q: search, sortBy, order, limit: 0 },
  });
  const products = res.data.products.filter((product) => product.id <= 100);
  return { products, total: products.length };
}

// Fetch a single product by ID
export async function getProduct(id) {
  if (id > 100 || id < 1) throw new Error("Product not found");
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
    
}

// Fetch all products
export async function getData() {
  const res = await axios.get('https://dummyjson.com/products');
  return res.data.products;
}

// Fetch products in a cart by their IDs
export async function getCartProducts(cart) {
  const promises = Object.keys(cart).map((id) =>
    axios.get(`https://dummyjson.com/products/${id}`)
  );
  const res = await Promise.all(promises);
  return res.reduce((acc, { data }) => {
    acc[data.id] = { product: data, qty: cart[data.id] };
    return acc;
  }, {});
}

// Fetch user account details
export async function getAccount(token) {
  const res = await axios.get("https://myeasykart.codeyogi.io/me", {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
}

// User login function
export async function login(email, password) {
  const res = await axios.post("https://myeasykart.codeyogi.io/login", {
    email,
    password,
  });
  return res.data;
}

// User signup function
export async function signup(fullName, email, password) {
  const res = await axios.post("https://myeasykart.codeyogi.io/signup", {
    fullName,
    email,
    password,
  });
  return res.data;
}

// Save cart to the server
export async function saveCart(cart) {
  const response = await axios.post(
    "https://myeasykart.codeyogi.io/carts",
    { data: cart },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response.data;
}

// Get cart data from the server
export async function getCart() {
  const response = await axios.get("https://myeasykart.codeyogi.io/carts", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data.reduce((acc, { product, quantity }) => {
    acc[product.id] = quantity;
    return acc;
  }, {});
}

export default getData;
