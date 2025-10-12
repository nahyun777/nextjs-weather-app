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
        const {prompt} = req.body;
        try{
            const response = await openai.chat.completions.create({
                model: 'gpt-5-nano',
                messages:[
                    {role:'user', content:prompt},
                ],
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