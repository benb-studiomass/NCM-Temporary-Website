<script>
    import { spring } from 'svelte/motion';
    import Gradient from '../atoms/gradient.svelte';
    import Orb from '../atoms/orb.svelte';

    let enabled = false;
    let sectionElement;
	let frameWidth, frameHeight, tipWidth, tipHeight;
	let windowWidth;

    // Define springs for x and y coordinates separately
    const mouseX = spring(0, { stiffness: 0.2, damping: 0.8 });
    const mouseY = spring(0, { stiffness: 0.2, damping: 0.8 });

    function handleMousemove(event) {
        const rect = sectionElement.getBoundingClientRect();
		mouseX.set(Math.min(Math.max(parseInt(event.clientX - rect.left + 15), 16), frameWidth - tipWidth - 16));
		mouseY.set(Math.min(Math.max(parseInt(event.clientY - rect.top + 15), 16), frameHeight - tipHeight - 16));
    }
</script>

<svelte:window bind:outerWidth={windowWidth} />

<section
bind:this={sectionElement}
href="#intro"
style="cursor: {enabled ? 'auto' : 'pointer'}"
on:mousemove={windowWidth > '767' ? handleMousemove : null}
bind:clientWidth={frameWidth}
	bind:clientHeight={frameHeight}
>
    <h1 class="large">National Communication Museum</h1>
    <h1 class="large">Opening Winter 2024</h1>
    <Orb bind:enabled={enabled}/>
        <p 	bind:clientWidth={tipWidth} bind:clientHeight={tipHeight} class="tiny" style="transform: translateX({$mouseX}px) translateY({$mouseY}px)">
            {#if !enabled}Click to enable microphone{:else}Listening ...{/if}
        </p>
</section>

<style>
	section {
		height: calc(100svh - var(--nav-height));
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: var(--padding);
		background-color: white;
		color: white;
		box-sizing: border-box;
		position: sticky;
		top: 0px;
		z-index: 0;
		overflow: hidden;
	}
	section:hover p {
		opacity: 0.5;
	}
	h1{
		z-index: 1;
		position: relative;
		pointer-events: none;
	}
	p {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.2s ease;
	}
	@media only screen and (max-width: 767px) {
		p {
			top: auto;
			left: var(--padding);
			bottom: var(--padding);
			opacity: 0.5;
		}
	}
</style>
