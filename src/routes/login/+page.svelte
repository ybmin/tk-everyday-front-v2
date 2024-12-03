<script>
    import KakaoLogo from "../../assets/kakao_logo.svelte";
</script>

<div class="w-full content-center my-28 xl:my-72">
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <h2 >로그인</h2>
        <a href="https://api.tk-everyday.site/auth/kakao" class="btn bg-[#FFEB00] text-[#3C1E1E] hover:bg-[#e6d700]">
            <KakaoLogo width={20}/> 카카오로 로그인</a>
        <h4>계정이 없으신가요?  <a href="/signup" style="text-decoration:underline; color:white; ">회원가입</a></h4>
        <div class="divider">Q&A</div>
        <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">왜 카카오로의 로그인만 가능한가요? </div>
            <div class="collapse-content">
              <p>1인 다중 계정 생성을 방지하기 위해 현재 카카오 연동을 통한 계정 생성만을 지원하고 있습니다.</p>
            </div>
          </div>
    </div>
</div>