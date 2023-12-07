<script>
  import { onDestroy, onMount } from "svelte";
  import { mapboxgl } from "./../../lib/utils/mapbox.js";

  let map;
  let mapContainer;
  let observer;
  let viewThreshold = 0.75; // Variable to control the percentage of in-view trigger

  const lng = 145.036471;
  const lat = -37.822357;
  const initialZoom = 16.75;
  const initialPitch = 0;
  const initalBearing = 9;
  const transitionDuration = 800; // Duration of the transition in milliseconds

  function initMap(container) {
    map = new mapboxgl.Map({
      container: container,
      style: "mapbox://styles/bbeagley00/clcjzdubo005414kdrx4x6yj2",
      cooperativeGestures: "true",
      center: [lng, lat],
      zoom: initialZoom,
      pitch: initialPitch,
      interactive: false,
    });

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            map.flyTo({
              center: [lng, lat],
              zoom: 17.75,
              pitch: 60,
              bearing: 30,
              duration: transitionDuration,
              easing: (t) => t * (2 - t), // Easing function for a smooth effect
            });
          } else {
            map.flyTo({
              center: [lng, lat],
              zoom: initialZoom,
              pitch: initialPitch,
              bearing: initalBearing,
              duration: transitionDuration,
              easing: (t) => t * (2 - t), // Easing function for a smooth effect
            });
          }
        });
      },
      { threshold: viewThreshold }
    );

    observer.observe(container);
  }

  onDestroy(() => {
    if (map) map.remove();
    if (observer) observer.disconnect();
  });
</script>

<div use:initMap />

<style>
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
