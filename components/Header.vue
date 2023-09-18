<template>
    <div class="container">
        <nav class="nav flex justify-between items-center">
            <NuxtLink to="/" class="nav-logo">
                <span>S</span>HOPPE
            </NuxtLink>
            <div class="nav-side flex items-center">
                <ul class="nav-links flex">
                    <li class="nav-link">
                        <NuxtLink to="/shop">Shop</NuxtLink>
                    </li>
                    <li class="nav-link">
                        <NuxtLink to="/blog">Blog</NuxtLink>
                    </li>
                    <li class="nav-link">
                        <NuxtLink to="/our-story">Our Story</NuxtLink>
                    </li>
                </ul>
                <div class="divider"></div>
                <ul class="nav-buttons flex">
                    <li class="nav-btn">
                        <IconsSearch />
                    </li>
                    <li class="nav-btn">
                        <IconsCart />
                    </li>
                    <li class="nav-btn">
                        <IconsUser />
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';

.nav {
    padding-top: 64px;
    padding-bottom: 16px;

    &-logo {
        color: $black;
        font-family: Allerta Stencil;
        font-size: 35px;
        font-style: normal;
        font-weight: 400;
        line-height: 40.5px;

        span {
            color: $accent-color;
        }
    }

    &-link {
        &:not(:last-child) {
            margin-right: 64px;
        }
    }

    .divider {
        width: 1px;
        height: 17px;
        background-color: $dark-grey;
        margin: 0 48px;
    }

    &-btn {
        &:not(:last-child) {
            margin-right: 39px;
        }
    }
}
</style>