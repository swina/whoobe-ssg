<script>
    export let block
</script>

<h2>TEST</h2>

<div class={Object.values(block.css).join(' ')}>
    {#each block.blocks as element }
        <svelte:component block={block}/>
    {/each}
 </div>