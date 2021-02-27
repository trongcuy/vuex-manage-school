<template>
  <div id="app">
    <div class="main">
      <TheSidebar />
      <div class="right">
        <TheHeader />
        <TheContent />
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./components/TheSidebar";
import TheContent from "./components/TheContent";
import TheHeader from "./components/TheHeader";
export default {
  components: {
    TheSidebar,
    TheContent,
    TheHeader
  }
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
* {
  font-family: "Barlow", sans-serif;
}

.main {
  display: flex;
  .right {
    width: 100%;
  }
}
</style>
