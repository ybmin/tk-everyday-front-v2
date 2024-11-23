<script>
    import SteamLogo from "../../../assets/steam_logo.svelte";
    async function handleClick() {
    }
</script>

<ul class="steps mx-auto w-full mb-24 mt-10">
    <li class="step step-primary">회원가입</li>
    <li class="step step-primary">카카오 로그인</li>
    <li class="step step-primary">기본 정보 입력</li>
    <li class="step step-primary">(선택) 철권 계정 연동</li>
    <li class="step">회원가입 완료</li>
  </ul>
<div class="w-full content-center mt-16 mb-28 xl:mb-72 xl:mt-52">
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <h2 >(선택) 철권 계정 연동</h2>
        <a on:click={handleClick} class="bg-black text-white btn btn-lg ">
            <SteamLogo className="w-6"/> 스팀 계정 연동하기</a>
        <span class="text-base-content/70 py-4 font-light md:text-base">스팀 계정을 연동하면, 철권 계정을 인증할 수 있습니다.</span>
        <div class="divider">or</div>
        <a class="btn btn-primary btn-lg mt-10" href="/signup/5">건너뛰기 →</a>
        <!-- <div class="divider">Q&A</div>
        <div class="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title text-xl font-medium">왜 카카오로의 로그인만 가능한가요? </div>
            <div class="collapse-content">
              <p>1인 다중 계정 생성을 방지하기 위해 현재 카카오 연동을 통한 계정 생성만을 지원하고 있습니다.</p>
            </div>
          </div> -->
    </div>
</div>