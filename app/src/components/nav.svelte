<script>
  import { onMount, onDestroy } from "svelte";
  import NavLink from "./atoms/navLink.svelte";

  export let ncmPerc;
  export let buildingPerc;
  export let resourcesPerc;
  export let signupPerc;
  export let notLoaded;

  let barScrollPercentage = 0;
  let section;
  let ncmLink, buildingLink, resourcesLink, signupLink;
  let ncmOffset, buildingOffset, resourcesOffset, signupOffset;

  function handleScroll() {
    const maxScrollLeft = section.scrollWidth - section.clientWidth;
    barScrollPercentage = (section.scrollLeft / maxScrollLeft) * 100;
    console.log(section.scrollLeft);
  }

  function calculateOffsets() {
    ncmOffset = ncmLink.offsetLeft;
    buildingOffset = buildingLink.offsetLeft;
    resourcesOffset = resourcesLink.offsetLeft;
    signupOffset = signupLink.offsetLeft;
  }

  onMount(() => {
    calculateOffsets();
    section.addEventListener("scroll", handleScroll);
  });
</script>

<section bind:this={section}>
  <NavLink
    bind:this={ncmLink}
    text="National Communication Museum"
    url="#"
    perc={ncmPerc}
  />
  <NavLink
    bind:this={buildingLink}
    text="Building"
    url="#building"
    perc={buildingPerc}
  />
  <NavLink
    bind:this={resourcesLink}
    text="Resources"
    url="#resources"
    perc={resourcesPerc}
  />
  <NavLink
    bind:this={signupLink}
    text="Signup"
    url="#signup"
    perc={signupPerc}
  />
</section>

<style>
  section {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    background: white;
    height: var(--nav-height);
    display: flex;
    box-sizing: border-box;
    align-items: center;
  }

  section {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
  section::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  @media only screen and (max-width: 767px) {
    section {
      max-width: 100%;
      overflow: scroll;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
    }
    section::before {
      content: "";
      position: fixed;
      bottom: 0;
      left: 0;
      width: 20%;
      height: var(--nav-height);
      background: red;
      z-index: 2;
    }
    section::after {
      content: "";
      position: fixed;
      bottom: 0;
      left: auto;
      right: 0;
      width: 20%;
      height: var(--nav-height);
      background: red;
      z-index: 2;
    }
  }
</style>
