import axios from 'axios';
import FormData from 'form-data';
import fs from 'node:fs';
import { config } from './config.js';
import { products } from './data/products.js';
import { categories } from './data/categories.js';

// Preencha as informações no arquivo "./config.js"
const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: `Bearer ${config.userToken}`,
  },
});

// Pra rodar é só dar um "npm start"
async function seed() {
  for (const category of categories) {
    const categoryForm = new FormData();

    categoryForm.append('name', category.name);
    categoryForm.append('path', fs.createReadStream(category.path));

    try {
      const { data: createdCategory } = await api.post('/createCategory', categoryForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      console.log(createdCategory);
    } catch (err) {
      console.log(err);
      process.exit();
    }
  }

  for (const product of products) {
    const productForm = new FormData();

    productForm.append('name', product.name);
    productForm.append('price', product.price);
    productForm.append('path', fs.createReadStream(product.path));
    productForm.append('ofert', String(product.ofert));
    productForm.append('category_id', product.category_id);


    try {
      const { data: createdProduct } = await api.post('/productRegister', productForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      console.log(createdProduct);
    } catch (err) {
      console.log(err);
      process.exit();
    }
  }
}

seed();