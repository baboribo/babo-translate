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
  <input class="text-input" type="text" bind:value={inputText} placeholder="번역할 텍스트를 입력하세요" />
  <h4>목표 언어 선택</h4>
  <select bind:value={targetLang}>
    <option value="en">영어</option>
    <option value="ja">일본어</option>
    <option value="zh">중국어</option>
    <option value="ko">한국어</option>
    <!-- 필요하면 더 추가 -->
  </select>
  <button on:click={translate}>번역하기</button>
  <h4>결과</h4>
  <p>{result}</p>
  {#if loading}
    <p>생각 중...</p>
  {/if}
</div>

<style>
  .back-container {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .text-input {
    padding: 10px 18px;
    margin-bottom: 0px;
    margin-top: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 30px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 14px;
    border: 1px solid #ccc;
    border-radius: 30px;
  }
  button:hover {
    background-color: #d8eafb;
  }
  select {
    padding: 10px;
    padding-right: 18px;
    margin-top: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 30px;
  }
  h4 {
    margin-top: 20px;
    margin-bottom: 0px;
  }
</style>