<script>
	import { getContext } from 'svelte'
	let footer = getContext ( 'footer' )
</script>

{#if footer}
	{@html footer.html}
{/if}


