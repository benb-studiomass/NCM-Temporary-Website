<script>
  import emblaCarouselSvelte from "embla-carousel-svelte";

  let emblaApi;
  let options = {
    align: "center",
  };

  const onInit = (event) => {
    emblaApi = event.detail;
    console.log(emblaApi.slideNodes()); // Access API
  };

  let ncmWidth;
</script>

{ncmWidth}
<div class="embla" use:emblaCarouselSvelte={{ options }} on:emblaInit={onInit}>
  <div class="embla__container" style="width: {ncmWidth}">
    <div bind:clientWidth={ncmWidth} class="item">
      National Communication Museum
    </div>
    <div class="item">Building</div>
    <div class="item">Resources</div>
    <div class="item">Signup</div>
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
    margin: 0px auto;
  }
  .item {
    flex: 0 0 auto;
    min-width: 0;
  }
</style>
