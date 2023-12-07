<script>
  export let data;

  let allCount = data.length;
  let articleCount = data.filter(
    (item) => item.contentType === "article"
  ).length;
  let podcastCount = data.filter(
    (item) => item.contentType === "podcast"
  ).length;
  let videoCount = data.filter((item) => item.contentType === "video").length;

  export let selectedValue = "all";
</script>

<div>
  <a
    class="small"
    class:active={selectedValue == "all"}
    href="#resources"
    on:click={() => (selectedValue = "all")}>All<span>{allCount}</span></a
  >
  <a
    class="small"
    class:active={selectedValue == "article"}
    href="#resources"
    on:click={() => (selectedValue = "article")}
    >Articles<span>{articleCount}</span></a
  >
  <a
    class="small"
    class:active={selectedValue == "podcast"}
    href="#resources"
    on:click={() => (selectedValue = "podcast")}
    >Podcasts<span>{podcastCount}</span></a
  >
  <a
    class="small"
    class:active={selectedValue == "video"}
    href="#resources"
    on:click={() => (selectedValue = "video")}
    >Videos<span>{videoCount}</span></a
  >
</div>

<style>
  div {
    display: flex;
    gap: var(--padding);
    border-bottom: var(--border);
    padding: var(--padding) 0px;
  }
  span {
    font-feature-settings: "ss14" on, "sups" on;
    margin-left: 4px;
  }
  a {
    opacity: var(--opacity);
    transition: opacity 0.2 ease;
  }
  a:hover {
    opacity: 1;
  }
  a.active {
    opacity: 1;
  }
</style>
