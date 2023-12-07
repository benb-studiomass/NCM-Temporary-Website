<script>
  export let question;
  export let answer;

  import { balancer } from "svelte-action-balancer";
</script>

<div>
  <h2 class="small">{question}</h2>
  <p class="small" use:balancer={{ enabled: true, ratio: 0.2 }}>
    {answer}
  </p>
</div>

<style>
  div {
    padding-top: var(--padding);
    padding-bottom: 56px;
    border-top: var(--border);
  }
  div:first-child {
    border-top: 0px;
    padding-top: 0px;
  }
  h2 {
    margin-bottom: 6px;
  }
  p {
    color: var(--black-50);
  }

  @media only screen and (max-width: 767px) {
    div {
      padding: 32px 0px;
    }
    h2 {
      margin-bottom: 2px;
    }

    /* div:first-child {
		border-top: var(--border);
		padding-top: var(--padding);
	} */
  }
</style>
