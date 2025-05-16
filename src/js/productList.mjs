 import {renderListWithTemplate } from "./utils.mjs"
 function productCardTemplate(product){
    return `
        <li class="product-card">
        <a href="product_pages/?product=" >
        <img src="" alt ="Image of ">
        <h2 class="card__brand"></h2>
        <h3 class="card__name"></h3>
        <p class="product-card__price">$</p>
        </a>
        </li>
        `;

}
export default class ProductList{
    constructor(category,dataSource, listElement){
        this.category = category;
        this.dataspource = dataSource;
        this.listElement = listElement;
    }
    
    async init(){
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    renderList(list){
      const htmlStrings = list.map(productCardTemplate);
      this.listElement.insertAdjacentHTML("afterbegin", htmlString.join(""));

     // apply use new utility function instead of the commented code above
     //renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}