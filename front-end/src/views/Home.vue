<template>
  <div class="home">
    <LandingPage v-if="!user" />
    <Dashboard v-else />
  </div>
</template>

<script>
import LandingPage from "@/components/LandingPage.vue";
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "Home",
  components: {
    LandingPage,
    Dashboard,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
};
</script>