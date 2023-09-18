<template>
    <div class="products-wrapper flex flex-wrap">
        <ProductsCard :products="store.products" />
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '../../store/products'

const store = useProductStore();
store.fetchProducts()
</script>

<style scoped lang="scss">
.products-wrapper {
    margin-top: 40px;
    gap: 54px;
}
</style>