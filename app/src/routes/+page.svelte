<script>
  import { onMount } from "svelte";

  import Faqs from "../components/blocks/faqs.svelte";
  import Floorplan from "../components/blocks/floorplan.svelte";
  import Footer from "../components/blocks/footer.svelte";
  import Header from "../components/blocks/header.svelte";
  import Intro from "../components/blocks/intro.svelte";
  import List from "../components/blocks/list.svelte";
  import Location from "../components/blocks/location.svelte";
  import Nav from "../components/nav.svelte";
  import Acknowledgement from "../components/acknowledgement.svelte";

  let scrollY, ncm, building, resources, signup;
  let ncmPerc, buildingPerc, resourcesPerc, signupPerc;

  ncmPerc = 1;
  let notLoaded = true;

  const scrollListener = () => {
    let aboveSections = 0;
    ncmPerc = Math.round(((scrollY - aboveSections) / ncm) * 100) + 1;
    aboveSections = aboveSections + ncm;
    buildingPerc = Math.round(((scrollY - aboveSections) / building) * 100) + 1;
    aboveSections = aboveSections + building;
    resourcesPerc =
      Math.round(((scrollY - aboveSections) / (resources - signup / 2)) * 100) +
      1;
    aboveSections = aboveSections + (resources - signup / 2);
    signupPerc = Math.round(((scrollY - aboveSections) / (signup / 2)) * 100);
  };

  onMount(() => {
    window.addEventListener("scroll", scrollListener);
    notLoaded = false;

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });

  let acknowledge = true;

  export let data;
</script>

<section>
  {#if acknowledge}
    <Acknowledgement bind:showAcknowledgement={acknowledge} />
  {/if}
  <div bind:clientHeight={ncm}>
    <Header />
    <Intro {data} />
  </div>
  <div bind:clientHeight={building}>
    <Floorplan />
    <Faqs {data} />
    <Location />
  </div>
  <div bind:clientHeight={resources}>
    <List {data} />
  </div>
  <div bind:clientHeight={signup}>
    <Footer />
  </div>
  <Nav {ncmPerc} {buildingPerc} {resourcesPerc} {signupPerc} {notLoaded} />
</section>

<svelte:window bind:scrollY />

<style>
  section {
    transition: all 1.2s ease;
    transition-delay: 0.4s;
  }
  .notLoaded {
    opacity: 0;
  }
</style>
