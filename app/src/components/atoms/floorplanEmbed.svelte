<script>
  let active = "first";

  function setFirst() {
    active = "first";
  }

  function setSecond() {
    active = "second";
  }
</script>

<section>
  <div class="outer">
    <div
      class="inner"
      style="transform: {active == 'first'
        ? 'translateX(0%)'
        : 'translateX(-100%)'}"
    >
      <img
        class:active={active == "first"}
        on:click={setFirst}
        src="./images/floor-ground.svg"
        alt="floor plan"
      />
      <img
        class:active={active == "second"}
        on:click={setSecond}
        src="./images/floor-second.svg"
        alt="floor plan"
      />
    </div>
  </div>
  <div class="buttons">
    <a
      class="tiny"
      on:click={setFirst}
      class:active={active == "first"}
      href="#first">First Floor</a
    >
    <a
      class="tiny"
      on:click={setSecond}
      class:active={active == "second"}
      href="#second">Second Floor</a
    >
  </div>
</section>

<style>
  section {
    padding-top: var(--aspect-ratio);
    background: var(--black-05);
    position: relative;
    overflow: hidden;
  }
  .outer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inner {
    width: 55%;
    display: flex;
    transition: all 0.4s ease;
  }
  img {
    min-width: 100%;
    opacity: 0.2;
    transition: opacity 0.2 ease;
    cursor: pointer;
  }
  .buttons {
    display: flex;
    margin: var(--padding);
    position: absolute;
    bottom: 0;
    left: 0;
    gap: 8px;
  }
  a {
    padding: 12px 20px;
    border: var(--border);
    color: var(--black-100);
    display: flex;
    border-radius: 100px;
    transition: all 0.2s ease;
  }
  a.active {
    background: var(--black-100);
    color: white;
  }
  img.active {
    opacity: 1;
  }

  a:hover {
    background-color: var(--black-10);
  }

  a.active:hover {
    background-color: var(--black-100);
  }

  @media only screen and (max-width: 767px) {
    .inner {
      width: 87.5%;
    }

    a {
      padding: 10px 18px;
      border: var(--border);
      color: var(--black-100);
      display: flex;
      border-radius: 100px;
      transition: all 0.2s ease;
    }
  }
</style>
