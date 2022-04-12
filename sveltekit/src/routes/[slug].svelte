<script context="module">
    export async function load({ url, params, fetch, session, stuff }) {
        return { 
            props: {
                slug : params.slug
            }
        }
	}
</script>

<script>
    import Error from './__error.svelte'
    import { getContext } from 'svelte'
	export let slug
    let page = null
    let json = null
    let pages = getContext ( 'pages' );
    console.log ( 'pages=>' , pages , slug )
    if ( pages[slug] ) {
        page = pages[slug];
        json = page.json.blocks
        console.log ( json )
    }
</script>

<svelte:head>
    {#if page}
        <title>{page.title}</title>
        <meta name="description" content="{page.description}"/>
    {/if}
</svelte:head>

{#if page}
    {@html page.html}
{:else}
    <Error/>
{/if}
    
