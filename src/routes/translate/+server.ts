import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function POST({ request }) {
  const { text, targetLang } = await request.json();

  // 프롬프트 ID와 입력값 사용
  const response = await openai.responses.create({
    prompt: {
      "id": "pmpt_685b0954582c81969698968d13211ad508bec9396f98310e",
      "version": "1"
    },
    model: 'gpt-4o',
    input: [
      {
        "role": "user",
        "content": `Translate the following text to ${targetLang}: "${text}"`
      }
    ],
    reasoning: {},
    max_output_tokens: 2048,
    store: true
  });

  // 프롬프트에 따라 반환 구조가 다를 수 있으니, 적절히 수정 필요
  const translation = response.output_text ?? '';
  return json({ translation });
}