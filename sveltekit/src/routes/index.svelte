
<script>
    import { getContext } from 'svelte'
    let website = getContext('website');
    let home = website.homepage
</script>
<svelte:head>
    {#if website}
        <title>{website.name}</title>
        <meta name="description" content="{website.description}"/>
    {/if}
</svelte:head>
{#if home }
    {@html home.html}
{/if}
