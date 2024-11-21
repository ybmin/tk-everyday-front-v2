<script>
    import KakaoLogo from "../../assets/kakao_logo.svelte";
</script>

<div style="display:flex; width:100%; justify-content:center; margin-top:5rem; margin-bottom:5rem;">
    <div style="display:flex; align-items:center; gap:1rem;">
        <h2 >로그인</h2>
        <a href="https://api.tk-everyday.site/auth/kakao" class="btn bg-[#FFEB00] text-[#3C1E1E]">
            <KakaoLogo width={20}/> 카카오로 로그인</a>
        <h4>계정이 없으신가요?  <a href="/signup" style="text-decoration:underline; color:white; ">회원가입</a></h4>
        <span >왜 카카오으로의 로그인만 가능한가요? </span>
        <p >1인 다중 계정 생성을 방지하기 위함입니다.</p>
    </div>
</div>