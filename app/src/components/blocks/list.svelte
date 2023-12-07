<script>
  import { slide } from "svelte/transition";
  import Filters from "../elements/filters.svelte";
  import Li from "../elements/li.svelte";

  export let data;

  let filter = "all";
</script>

<section id="resources">
  <div class="container">
    <div class="lhs small">Further readings</div>
    <div class="rhs">
      <p class="small">
        {data.posts[0].listpara}
      </p>
      <Filters data={data.posts[0].item} bind:selectedValue={filter} />
      <div class="body">
        {#each data.posts[0].item as item (item._key)}
          {#if item.contentType == filter || filter == "all"}
            <div transition:slide>
              <Li
                title={item.title}
                tag={item.contentType}
                author={item.author}
                img={item.image}
                url={item.link}
              />
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  section {
    padding: 0px var(--padding) 220px var(--padding);
    position: relative;
    background: white;
  }
  .container {
    display: flex;
    gap: var(--padding);
    padding-top: var(--padding);
    border-top: var(--border);
    align-items: start;
  }
  .container div {
    width: 100%;
  }
  .lhs {
    position: sticky;
    top: var(--padding);
  }
  p {
    margin-bottom: 76px;
  }

  .body {
    /* border-top: var(--border); */
    /* margin-top: 16px; */
  }

  @media only screen and (max-width: 767px) {
    .container {
      flex-direction: column;
    }
    .lhs {
      position: static;
    }
  }
</style>
