<script context="module">
    
    // let page, website
	// export async function load({ url, params, fetch, session, stuff }) {
    //     let slug = params.slug
    //     page = stuff.config.pages[slug]
	// 	return true
	// }
    
    
        export async function load({ fetch }) {
        let res = await fetch('http://localhost:3000/serverapi');
        if (res.ok) {
            console.log ( res )
            return {
                props: {
                    items: await res
                }
            };
        }
        return {
            status: res.status,
            error: new Error()
        };
    }
    
</script>

<script>
    export let items = []
</script>    

<pre>
    {{ items }}
</pre>