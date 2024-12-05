<script>
    import "../app.css";
    import "../prism.css";
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import { page } from "$app/stores";
</script>

<svelte:head>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Tekken EveryDay" />
    <meta property="og:description" content="철권 클랜 사이트 Tekken EveryDay입니다." />
    <meta property="og:site_name" content="Tekken EveryDay">
    <title>Tekken EveryDay</title> 
</svelte:head>
{#if !$page.url.pathname.startsWith('/tekkenUser/iframe/') && !$page.url.pathname.startsWith('/tekkenMatch/')}
    <Header></Header>
{/if}
<slot></slot>
{#if !$page.url.pathname.startsWith('/tekkenUser/iframe/')&& !$page.url.pathname.startsWith('/tekkenMatch/')}
    <Footer></Footer>
{/if}
