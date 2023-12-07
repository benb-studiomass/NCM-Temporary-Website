<script>
  export let text;
  export let url;
  export let perc = 0;

  let width;

  $: {
    width = Math.min(Math.max(parseInt(perc), 0), 101);
  }
</script>

<a href={url} class:active={width > 0 && width < 101}>
  <p class="tiny">{text}</p>
  <div class="bg" style={width > 100 ? "width: 0%" : `width: ${width}%`} />
</a>

<style>
  a {
    padding: 12px 10px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    color: var(--black-50);
    height: 100%;
    display: flex;
    align-items: center;
  }
  .active {
    color: var(--black-100);
  }
  a:first-child {
    padding-left: 21px;
  }
  a:last-child {
    padding-right: 21px;
  }
  p {
    z-index: 1;
    position: relative;
  }
  .bg {
    position: absolute;
    left: 0px;
    top: auto;
    bottom: 0px;
    width: 100%;
    height: var(--nav-height);
    background: var(--black-05);
    z-index: 0;
    pointer-events: none;
  }

  @media only screen and (max-width: 767px) {
    a {
      width: auto;
      flex-shrink: 0;
      white-space: nowrap;
      position: static;
      scroll-snap-align: center;
      scroll-snap-stop: always;
      padding: 12px 24px;
    }

    a:first-child {
      margin-left: 50vw;
    }

    a:last-child {
      padding-right: 45vw;
    }

    .bg {
      position: fixed;
    }
  }
</style>
