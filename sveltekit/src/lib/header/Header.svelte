<script>
	import { getContext } from 'svelte'
	let header = getContext ( 'header' )
</script>
<svelte:head>
	{#if header && header.fonts.length }
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family={header.fonts.join('|')}">
	{/if}
</svelte:head>

{#if header}
	{@html header.html}
{/if}


