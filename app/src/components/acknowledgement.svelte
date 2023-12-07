<script>
  import { onMount } from "svelte";
  import ButtonSecondary from "./atoms/buttonSecondary.svelte";

  import { fade } from "svelte/transition";

  let notLoaded = true;
  export let showAcknowledgement = true;

  onMount(() => {
    notLoaded = false;
  });

  function closeAcknowledgement() {
    showAcknowledgement = false;
  }
</script>

<a
  on:click={closeAcknowledgement}
  class:fade={!showAcknowledgement}
  transition:fade
>
  <h2 class="medium" class:notLoaded>
    The NCM acknowledges all First Peoples of this land and celebrate their
    enduring connections to Country, knowledge and stories. We pay our respects
    to Elders and Ancestors who watch over us and guide Aboriginal and Torres
    Strait Islander community.
  </h2>
  <p class="small" class:notLoaded>Proceed</p>
</a>

<style>
  a {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--black-100);
    color: white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--padding);
    box-sizing: border-box;
    transition: opacity 0.4s ease;
    cursor: pointer;
  }
  a.fade {
    opacity: 0;
  }
  h2 {
    max-width: 50ch;
    text-align: center;
    margin-bottom: 16px;
    transition: opacity 1.8s ease;
    transition-delay: 0.2s;
  }
  p {
    position: absolute;
    bottom: calc(var(--padding) * 3);
    opacity: 0.5;
    transition: opacity 0.2s ease;
    transition: opacity 1.8s ease;
    transition-delay: 1.2s;
  }
  p:hover {
    opacity: 1;
  }
  .notLoaded {
    opacity: 0;
  }
</style>
