import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY, PROMPT_ID } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST({ request }) {
  const { text, targetLang } = await request.json();

  // 프롬프트 ID와 입력값 사용
  const response = await openai.responses.create({
    prompt: {
      "id": `${PROMPT_ID}`,
      "version": "1"
    },
    model: 'o3-mini',
    input: [
      {
        "role": "user",
        "content": `Translate the following text to ${targetLang}:/n ${text}`
      }
    ],
    reasoning: {},
    max_output_tokens: 2048,
    store: true
  });

  // 프롬프트에 따라 반환 구조가 다를 수 있으니, 적절히 수정 필요
  const translation = response.output_text.replace(/^\n+|\n+$/g, '') ?? '';
  return json({ translation });
}