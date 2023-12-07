<script>
    export let url;
    export let text;
    export let active;
</script>

<a href="{url}" class:active={active}>{text}</a>

<style>
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

    @media only screen and (max-width: 767px) {
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