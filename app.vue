<template>
  <VueLenis root>
    <NuxtLoadingIndicator />
    <Menu />
    <NuxtPage />
  </VueLenis>
</template>

<script>
import Lenis from 'lenis'
// Initialize Lenis 
const lenis = new Lenis({
  autoRaf: true,
});


</script>