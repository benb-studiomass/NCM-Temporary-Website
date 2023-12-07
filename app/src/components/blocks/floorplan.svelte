<script>
	import FloorplanEmbed from "../atoms/floorplanEmbed.svelte";

</script>
<section id="building">
	<div class="container">
		<div class="header">
			<h2 class="small">Building</h2>
			<h3 class="small">The NCM is located in two floors of a refurbished telephone exchange</h3>
		</div>
		<FloorplanEmbed />
	</div>
</section>

<style>
	section {
		padding: 0px var(--padding) var(--padding) var(--padding);
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
	.placeholder {
		padding-top: 60%;
		background: var(--black-05);
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
