<script lang="ts">
  let translation = '';
  let inputText = '';
  let targetLang = 'ko'; // 기본값 한국어

  let result = '';

  async function translate() {
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
  }
</script>

<div>
  <h4>번역할 언어 선택</h4>
  <select bind:value={targetLang}>
    <option value="en">영어</option>
    <option value="ja">일본어</option>
    <option value="zh">중국어</option>
    <option value="ko">한국어</option>
    <!-- 필요하면 더 추가 -->
  </select>
  <h4>번역할 텍스트 입력</h4>
  <input type="text" bind:value={inputText} placeholder="번역할 텍스트를 입력하세요" />
  <button on:click={translate}>번역하기</button>

  <h4>결과</h4>
  <p>{result}</p> 
</div>