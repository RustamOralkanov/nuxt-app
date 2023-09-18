<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-wrapper flex items-center justify-between">
                <ul class="footer-links flex">
                    <li class="footer-link">
                        <NuxtLink to="/">CONTACT</NuxtLink>
                    </li>
                    <li class="footer-link">
                        <NuxtLink to="/">TERMS OF SERVICES</NuxtLink>
                    </li>
                    <li class="footer-link">
                        <NuxtLink to="/">SHIPPING AND RETURNS</NuxtLink>
                    </li>
                </ul>
                <div class="footer-subscribe">
                    <form class="footer-form flex justify-between items-center">
                        <input type="email" name="email" id="email" placeholder="Give an email, get the newsletter.">
                        <button type="submit">
                            <IconsSubmit />
                        </button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom flex justify-between items-center">
                <div class="footer-copyright">
                    © 2021 Shelly. Terms of use and privacy policy.
                </div>
                <ul class="footer-socials flex">
                    <li class="footer-social">
                        <IconsSocialsLinkedin />
                    </li>
                    <li class="footer-social">
                        <IconsSocialsFacebook />
                    </li>
                    <li class="footer-social">
                        <IconsSocialsInstagram />
                    </li>
                    <li class="footer-social">
                        <IconsSocialsTwitter />
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import '../assets/scss/mixins.scss';
@import '../assets/scss/variables.scss';

.footer {
    margin-top: 250px;

    &-subscribe {
        border-bottom: 1px solid $black;
    }

    &-links {
        gap: 41px;
    }

    &-link {
        * {
            @include heading5;
            color: $dark-grey;
        }
    }

    &-form {
        border-radius: 0px;
        background-color: unset;
        width: 396px;
        padding: 6px 0;

        input {
            width: 100%;
        }

        &::placeholder {
            @include heading5;
        }
    }

    &-bottom {
        margin-top: 50px;
    }

    &-socials {
        gap: 30px;
    }

    &-copyright {
        @include heading5;
    }
}

.container {
    border-top: 1px solid $light-grey;
    padding: 36px 0 90px;
}
</style>