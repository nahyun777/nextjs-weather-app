// pages/api/gpt.ts
'use server';

import type {NextApiRequest, NextApiResponse} from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        console.log('gpt 시작');
        const {messages} = req.body;
        
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        try{
            // 시스템 메시지를 추가하여 AI의 역할 정의
            const systemMessage = {
                role: 'system',
                content: '당신은 친절하고 도움이 되는 AI 어시스턴트입니다. 사용자의 질문에 명확하고 정확하게 답변해주세요.'
            };

            const response = await openai.chat.completions.create({
                model: 'gpt-5-nano',
                messages: [systemMessage, ...messages],
            });
            console.log(response)
            console.log(response.choices[0].message)
            const answer = response.choices[0].message.content;
            res.status(200).json({ answer });
        }catch(error){
            console.error('gpt 오류:', error);
            return res.status(404).json({ error: 'Failed to fetch from ChatGPT API' });
        }        
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

// npm install openai