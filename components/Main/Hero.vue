<template>
    <section class="hero">
        <div class="container">
            <Swiper :modules="[SwiperPagination]" :slides-per-view="1" :loop="true" :pagination="true" class="hero-swiper">
                <SwiperSlide v-for="product in store.hero.results" :key="product.id" class="hero-slide">
                    <img class="hero-bg" :src="product.image[0]">
                    <div class="hero-wrapper">
                        <h2 class="hero-title">{{ product.name }}</h2>
                        <div class="hero-price">$ {{ product.price.toFixed(2) }}</div>
                        <NuxtLink :to="`/products/${product.id}`" class="hero-btn">View Product</NuxtLink>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/pagination';
import { useHeroStore } from '../../store/store'

const store = useHeroStore();
store.fetchHero();


</script>

<style scoped lang="scss">
@import '../../assets/scss/mixins.scss';
@import '../../assets/scss/variables.scss';

.hero {
    &-swiper {
        max-height: 646px;
        width: 100%;
        position: relative;
    }

    &-slide {
        width: 100%;
    }

    &-bg {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        object-fit: fill;
    }

    &-wrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 39px;
    }

    &-title {
        @include heading1;
        color: $white;
        margin-bottom: 16px;
    }

    &-price {
        @include heading2;
        color: $white;
        margin-bottom: 48px;
    }

    &-btn {
        border: 2px solid $white;
        color: $white;
        padding: 14px 32px;
        border-radius: 6px;
        color: #FFF;
        font-family: 'DM Sans';
        font-size: 20px;
        font-weight: 700;
    }

}

// .swiper-pagination-bullet-active
</style>