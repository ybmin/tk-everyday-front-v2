<script lang="ts">
    import { onMount } from 'svelte';
    let currentPage = 1;
    const pageSize = 20;
    let totalBlogs = 0;
    let accessToken: string | undefined; // 사용자 토큰
    let paginationData:any[] = []; // 추가된 변수

    async function fetchBlogs() {
        try {
            const response = await fetch(`https://api.tk-everyday.site/blogs?page=${currentPage}&limit=${pageSize}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('블로그를 가져오는데 실패했습니다.');
            }
            const data = await response.json();
            paginationData = data.blogs;
            totalBlogs = data.total;
        } catch (error) {
            console.error(error);
            // 에러 처리 로직 추가
        }
    }

    onMount(() => {
        accessToken = localStorage.getItem('access_token') || undefined;
        if (!accessToken) {
            // 로그인 페이지로 리다이렉트 또는 적절한 처리
            // 예: window.location.href = '/login';
        }
        fetchBlogs();
    });
    
    let searchTerm = '';
    let currentPosition = 0;
    const itemsPerPage = 10;
    const showPage = 5;
    let totalPages = 0;
    let pagesToShow:any[] = [];
    let totalItems = paginationData.length;
    let startPage:number|undefined;
    let endPage:number|undefined;

    const updateDataAndPagination = () => {
        const currentPageItems = paginationData.slice(currentPosition, currentPosition + itemsPerPage);
        renderPagination(currentPageItems.length);
    }

    const loadNextPage = () => {
        if (currentPosition + itemsPerPage < paginationData.length) {
            currentPosition += itemsPerPage;
            updateDataAndPagination();
        }
    }

    const loadPreviousPage = () => {
        if (currentPosition - itemsPerPage >= 0) {
            currentPosition -= itemsPerPage;
            updateDataAndPagination();
        }
    }

    const renderPagination = (totalItems:number) => {
        totalPages = Math.ceil(paginationData.length / itemsPerPage);
        const currentPage = Math.ceil((currentPosition + 1) / itemsPerPage);

        startPage = currentPage - Math.floor(showPage / 2);
        startPage = Math.max(1, startPage);
        endPage = Math.min(startPage + showPage - 1, totalPages);

        pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage! + i);
    }

    const goToPage = (pageNumber:number) => {
        currentPosition = (pageNumber - 1) * itemsPerPage;
        updateDataAndPagination();
    }

    $: startRange = currentPosition + 1;
    $: endRange = Math.min(currentPosition + itemsPerPage, totalItems);

    onMount(() => {
        // Call renderPagination when the component initially mounts
        renderPagination(paginationData.length);
    });

    $: currentPageItems = paginationData.slice(currentPosition, currentPosition + itemsPerPage);
    $: filteredItems = paginationData.filter((item) => item.product_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
</script>
