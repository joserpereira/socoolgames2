<template>
  <div>
    So Cool Games
  </div>
    <div>
    So Cool Games
  </div>

  <div>
    So Cool Games
  </div>

  <div>
    So Cool Games
  </div>

  <div>
    So Cool Games
  </div>
  <div>
    So Cool Games
  </div>
  <div>
    <button @click.prevent="logOut">Logout</button>
  </div>
</template>
<script>

import EventBus from "@/common/EventBus";

// import UserService from "@/services/user.service";

export default {
  name: "AdminSidebar",
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/admin/signin');
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  
};
</script>