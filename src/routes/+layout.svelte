<script>
    import "../app.css";
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { page } from "$app/stores";
</script>

{#if !$page.url.pathname.startsWith('/tekkenUser/iframe/') && !$page.url.pathname.startsWith('/tekkenMatch/')}
    <Header></Header>
{/if}
<slot></slot>
{#if !$page.url.pathname.startsWith('/tekkenUser/iframe/')&& !$page.url.pathname.startsWith('/tekkenMatch/')}
    <Footer></Footer>
{/if}
