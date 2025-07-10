<script lang="ts">
  let inputText = '';
  let targetLang = 'ko'; // 기본값 한국어
  let loading = false;

  let result = '';

  async function translate() {
    loading = true;
    // 서버에 번역 요청
    const res = await fetch('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputText,
        targetLang
      })
    });
    const data = await res.json();
    result = data.translation;
    loading = false;
  }
</script>

<div class="back-container">
  <h4>번역할 텍스트 입력</h4>
  <textarea class="textarea-input" bind:value={inputText} placeholder="번역할 텍스트를 입력하세요"></textarea>
  <h4>목표 언어 선택</h4>
  <select bind:value={targetLang}> <!-- 언어 선택 -->
    <option value="en">영어</option>
    <option value="ja">일본어</option>
    <option value="zh">중국어</option>
    <option value="ko">한국어</option>
    <!-- <option value="de">독일어</option>
    <option value="es">스페인어</option> -->
  </select>
  <button on:click={translate}>번역하기</button>
  <h4>번역 결과</h4>
  <p class="bigtext" style="white-space: pre-line;">{result}</p>
  {#if loading}
    <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <div class="loader"></div>
      <h4>생각 중</h4>
      <p style="color: #636369;">열심히 해석하고 있어요, 잠시만 기다려주세요.</p>
    </div>
  {:else if result}
    <div>
      <p style="color: #636369;">AI 번역은 정확하지 않을 수 있습니다.</p>
    </div>
  {:else}
    <div>
      <p class="bigtext" style="color: #00000070;">번역 결과가 여기에 표시됩니다.</p>
    </div>
  {/if}
</div>

<style>
  .loader {
    border: 2px solid #f3f3f3;
    border-radius: 50%;
    border-top: 2px solid #000;
    width: 24px;
    height: 24px;
    animation: spin 1s ease infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .back-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .textarea-input {
    padding: 10px 18px;
    margin-bottom: 0px;
    margin-top: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 14px;
    border: 1px solid #ccc;
    border-radius: 12px;
    transition: ease 0.1s;
  }
  button:hover {
    background-color: #d8eafb;
  }
  select {
    padding: 4px;
    padding-right: 18px;
    margin-top: 10px;
    font-size: 16px;
    border: none;
    border-radius: 12px;
    background: none;
    transition: ease 0.1s;
  }
  select:hover {
    background-color: #00000010;
    transition: ease 0.2s;
  }
  h4 {
    margin-top: 20px;
    margin-bottom: 0px;
  }
  .bigtext {
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #333;
    transition: ease 0.4s;
  }
</style>