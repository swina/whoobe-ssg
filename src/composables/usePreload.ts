!import.meta.env?.VITE_APP_SHOPIFY_URL ?
    console.log ( 'Shopify config not defined') :
    console.log ( 'Shopify configured')

!import.meta.env?.VITE_APP_GRAPHCMS_CONTENT_API ?
    console.log ( 'GraphCMS config not defined') :
    console.log ( 'GraphCMS configured')
