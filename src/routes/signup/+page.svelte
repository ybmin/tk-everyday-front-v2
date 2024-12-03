<script>
    import KakaoLogo from "../../assets/kakao_logo.svelte";
</script>

<ul class="steps mx-auto w-full mb-24 mt-10">
    <li class="step step-primary">회원가입</li>
    <li class="step step-primary">카카오 로그인</li>
    <li class="step">기본 정보 입력</li>
    <li class="step">(선택) 철권 계정 연동</li>
    <li class="step">회원가입 완료</li>
  </ul>
<div class="w-full content-center mt-16 mb-28 xl:mb-72 xl:mt-52">
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <h2 >회원가입</h2>
        <a href="https://api.tk-everyday.site/auth/kakao" target="_self" class="btn bg-[#FFEB00] text-[#3C1E1E] hover:bg-[#e6d700]">
            <KakaoLogo width={20}/> 카카오로 회원가입</a>
        <h4>계정이 있으신가요?  <a href="/login" style="text-decoration:underline; color:white; ">로그인</a></h4>
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