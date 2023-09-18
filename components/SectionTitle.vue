<template>
    <h2 class="section-title">
        {{ title }}
    </h2>
</template>

<script setup lang="ts">
interface Props {
    title: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@import '../assets/scss/mixins.scss';
@import '../assets/scss/variables.scss';

.section-title {
    @include heading1;
}
</style>