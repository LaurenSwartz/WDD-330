async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    const error = new Error(`HTTP error! Status: ${res.status}`);
    error.name = "servicesError";
    error.message = data;
    error.statusCode = res.status;
    error.body = data;
    throw error;
  }
}

export default class ExternalServices {
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