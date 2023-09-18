import { defineStore } from "pinia";

type Products = {
  results: {
    price: number;
    title: string;
    images: Array<string>;
    category: string;
    description: string;
    id: string;
  }[];
};

type Product = {
  price: number;
  title: string;
  images: Array<string>;
  category: string;
  description: string;
  id: string;
};

interface State {
  products: Product[];
}

export const useProductStore = defineStore("product", {
  state: (): State => ({
    products: [],
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      const config = useRuntimeConfig();
      const { data: products } = await useFetch<Products>(
        `${config.public.apiBase}collections/products/`,
        {
          headers: {
            "X-Api-Key": `${config.apiSecret}`,
          },
        }
      );

      if (products && products.value) {
        this.products = products.value.results;
        return this.products;
      } else {
        console.error("Ошибка при получении данных");
      }
    },
  },
});
