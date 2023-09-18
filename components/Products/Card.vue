<template>
    <div class="card" v-for="product in products" :key="product.id">
        <div class="card-img">
            <img :src="product.images[0]" alt="">
            <div class="card-add-to-cart">
                ADD TO CART
            </div>
        </div>
        <h3 class="card-title">{{ product.title }}</h3>
        <h4 class="card-price">$ {{ product.price.toFixed(2) }}</h4>
    </div>
</template>

<script setup lang="ts">
interface Props {
    products: {
        price: number;
        title: string;
        images: Array<string>;
        category: string;
        description: string;
        id: string;
    }[]
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@import '../assets/scss/mixins.scss';
@import '../assets/scss/variables.scss';

.card {
    width: calc(33% - 32px);

    &-img {
        margin-bottom: 24px;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: fill;
        }

        &:hover {
            .card-add-to-cart {
                bottom: 0;
                transition: 0.3s ease-in;
            }
        }
    }

    &-add-to-cart {
        position: absolute;
        z-index: 2;
        bottom: -65px;
        width: 100%;
        background-color: #ffffff50;
        @include bodyLarge;
        text-align: center;
        padding: 22px 0;
        cursor: pointer;
        transition: 0.5s ease-out;
    }

    &-title {
        @include heading3;
        color: $black;
        margin-bottom: 16px;
    }

    &-price {
        @include heading4;
        color: $accent-color;
    }
}
</style>