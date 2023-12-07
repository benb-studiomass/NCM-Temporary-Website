<script>
	export let text;
	export let url;
</script>

<a href={url}>
	<p class="small">{text}</p>
	<div class="outer"><div class="inner"/></div>
</a>

<style>
	a {
		padding: 4px 0px;
		display: flex;
		position: relative;
	}
	a:hover .inner {
		width: 100%;
	}
	/* a:hover .outer {
		height: 2px;
	} */
	.outer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 1px;
		background-color: var(--black-10);
		transition: height 0.2s ease;
	}
	.inner {
		height: 100%;
		width: 0%;
		background: var(--black-100);
		transition: width 0.2s ease;
	}
</style>