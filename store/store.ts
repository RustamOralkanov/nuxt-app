import { defineStore } from "pinia";

type Hero = {
  results: {
    id: string;
    name: string;
    image: Array<string>;
    price: number;
    description: string;
  }[];
};

export const useHeroStore = defineStore("hero", {
  state: () => ({
    hero: <Ref<Hero>>{},
  }),
  getters: {},
  actions: {
    async fetchHero() {
      const config = useRuntimeConfig();
      const { data: hero } = await useFetch<Hero>(
        `${config.public.apiBase}collections/hero/`,
        {
          headers: {
            "X-Api-Key": `${config.apiSecret}`,
          },
        }
      );

      if (hero && hero.value) {
        this.hero = hero.value;
      } else {
        console.error("Ошибка при получении данных");
      }
    },
  },
});
