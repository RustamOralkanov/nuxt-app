<template>
    <section class="products">
        <div class="container">
            <div class="products-head flex justify-between items-center">
                <SectionTitle :title="'Shop The Latest'" />
                <NuxtLink to="/shop" class="products-link">View all</NuxtLink>
            </div>
            <ProductsWrapper />
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '../assets/scss/mixins.scss';
@import '../assets/scss/variables.scss';

.products {
    padding-top: 64px;

    &-link {
        @include heading4;
        color: $accent-color;
    }
}
</style>