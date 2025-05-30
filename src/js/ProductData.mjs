function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.baseURL = import.meta.env.VITE_SERVER_URL;
    this.category = category;
  }
  async getData(category) {
    const response = await fetch(`${this.baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const products = await this.getData(this.category);
    return products.find((item) => item.Id === id);
  }
}