<script>
  import { onMount } from 'svelte';

  let translation = '';

  onMount(() => {
    // 초기 번역 설정
    translation = '초기 번역';
  });
</script>

<div>
  <div>
    <h4>번역</h4>
    <input type="text" bind:value={translation} placeholder="번역을 입력하세요" />
    <button on:click={() => translation = '새로운 번역'}>번역 업데이트</button>
  </div>
  <div>
    <h4>결과</h4>
    <p>{translation}</p>
  </div>
</div>