<script>
	import ButtonSecondary from '../atoms/buttonSecondary.svelte';

	export let data;
</script>

<section id="intro">
	<div class="container">
		<h2 class="large">{data.posts[0].intro}</h2>

		<ButtonSecondary text="Signup for updates" url="#signup" />
	</div>
</section>

<style>
	section {
		padding: var(--padding);
		background: white;
		position: relative;
		min-height: 60vh;
	}
	h2 {
		margin-bottom: 32px;
	}
	.container {
		position: sticky;
		top: var(--padding);
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	@media only screen and (max-width: 767px) {
		.container {
			position: static;
		}

		h2 {
			margin-bottom: 24px;
		}
	}
</style>
