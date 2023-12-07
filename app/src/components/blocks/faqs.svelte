<script>
	import Question from '../atoms/question.svelte';

	export let data;
</script>

<section>
	<div class="container">
		<div class="lhs small">Frequently asked questions</div>
		<div class="rhs small">
			{#each data.posts[0].faqs as item}
				<Question question={item.question} answer={item.answer} />
			{/each}
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

	@media only screen and (max-width: 767px) {
		.container {
			flex-direction: column;
		}
		.lhs {
			position: static;
			margin-bottom: calc(32px - var(--padding));
		}
	}
</style>
