<script>
  import Mapbox from "../elements/mapbox.svelte";
</script>

<section>
  <div class="container">
    <div class="header">
      <h2 class="small">Location</h2>
      <h3 class="small">375 Burwood Rd, Hawthorn VIC 3122</h3>
    </div>
    <div class="frame">
      <Mapbox />
    </div>
  </div>
</section>

<style>
  section {
    padding: var(--padding);
    background: white;
    position: relative;
  }
  .header {
    display: flex;
  }
  .header * {
    width: 100%;
    margin-bottom: var(--padding);
  }
  h3 {
    color: var(--black-50);
  }
  .container {
    border-top: var(--border);
    padding-top: var(--padding);
  }
  .frame {
    padding-top: var(--aspect-ratio);
    background: var(--black-05);
    position: relative;
    overflow: hidden;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 767px) {
    .header {
      /* flex-direction: column; */
      margin-bottom: var(--padding);
      gap: 4px;
      display: block;
    }

    .header * {
      display: inline;
      width: auto;
      margin-bottom: 0px;
    }

    h2::after {
      content: " –";
    }
  }
</style>
