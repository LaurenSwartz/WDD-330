export default class ProductList{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData();
        
        const idsToFilter = ["880RR", "985RF", "985PR", "344YJ"];

        const filterdList = list.filter(item => idsToFilter.includes(item.Id));

        // next, render the list – ** future **
        this.renderList(filterdList);
    }
    renderList(list) {
        this.listElement.innerHTML = "";
        const htmlStrings = list.map(this.productCardTemplate);
        this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
    
    productCardTemplate(product){
        const templ1 = `<li class="product-card">
                        <a href="product_pages/product-detail?product=${product.Id}">
                        <img src="${product.Image}" alt="${product.Name}">
                        <h2 class="card__brand">${product.Brand.Name}</h2>
                        <h3 class="card__name">${product.NameWithoutBrand}</h3>
                        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
                        </a>
                  </li>`
        return templ1;

    }
}