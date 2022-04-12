
<script context='module'>
    import Header from '$lib/header/Header.svelte';
    import Footer from '$lib/footer/Footer.svelte';
	//import whoobe  from '$lib/config.js';

    let website, slug, fonts = []
   


	export async function load({ url, params , fetch, session, stuff }) {
        const api = 'http://localhost:9000/'
        const response = await fetch ( api )
        const res = await response.json()
        // console.log ( res )

		if (res) {
			website = res //await res.json()
            website.header.fonts ?
                fonts = [ ...fonts , ...website.header.fonts ] : null
            website.footer.fonts ?
                fonts = [ ...fonts , ...website.footer.fonts ] : null
            website.homepage.fonts ?
                fonts = [ ...fonts , ...website.homepage.fonts ] : null

            let pagefonts = Object.keys(website.pages).map ( page => {
                return website.pages[page].fonts ? 
                    [ ...website.pages[page].fonts] : null
            })
            pagefonts = Array.prototype.concat.apply( fonts, pagefonts)
            fonts = [ ...new Set ( pagefonts ) ] 
            website.fonts = fonts
            slug = params 
			return { stuff : { website: website , params: params } }
		}

		return {
			status: 404,
			//error: new Error(`Could not load whoobe`)
		};
	}
</script>

<script>
    import "virtual:windi.css"
    import "$lib/carousel.css"
    import { setContext, onMount } from 'svelte'
    import { fade } from 'svelte/transition';
    
    import Error from './__error.svelte';
    
    //import "$lib/carousel.js";
    
    // if you want to enable windi devtools
    import { browser } from "$app/env";
    if (browser) import("virtual:windi-devtools")
    
    
    setContext ( 'header', website.header );
    setContext ( 'footer', website.footer );
    setContext ( 'website', website );
    setContext ( 'pages', website.pages );

    onMount(()=>{
        console.log ( 'mount carousel')
        import("$lib/carousel.js")
    })
</script>

<svelte:head>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    {#if website}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family={website.fonts.join('|')}">
    {/if}
</svelte:head>

{#if website}

<Header/>

	<slot />
    
<Footer/>
{/if}
