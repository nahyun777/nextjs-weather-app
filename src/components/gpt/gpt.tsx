'use client';

import { useEffect, useState, useRef } from 'react';
import './gpt.css';

type Message = {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export default function Gpt()
{
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 컴포넌트 마운트 시 localStorage에서 대화 내용 불러오기
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    // 메시지가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages]);

    // 새 메시지가 추가되면 스크롤을 아래로
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: inputValue,
            timestamp: Date.now()
        };

        // 사용자 메시지를 즉시 추가
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            // API 형식에 맞게 메시지를 변환 (timestamp 제거)
            const apiMessages = updatedMessages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.answer,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('gpt error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const clearChat = () => {
        if (window.confirm('대화 내용을 모두 삭제하시겠습니까?')) {
            setMessages([]);
            localStorage.removeItem('chatMessages');
        }
    }

    return (
        <>
            {/* 플로팅 아이콘 버튼 */}
            <button 
                className={`chat-float-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="AI 챗봇"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* 대화창 */}
            {isOpen && (
                <div className='chat-window'>
                    <div className='chat-header'>
                        <h3>AI 챗봇 (GPT-5)</h3>
                        <button 
                            className='clear-button'
                            onClick={clearChat}
                            title='대화 내용 삭제'
                        >
                            🗑️
                        </button>
                    </div>

                    <div className='chat-messages'>
                        {messages.length === 0 && (
                            <div className='empty-state'>
                                안녕하세요! 무엇을 도와드릴까요?
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.role}`}
                            >
                                <div className='message-content'>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className='message assistant'>
                                <div className='message-content loading'>
                                    <span className='dot'></span>
                                    <span className='dot'></span>
                                    <span className='dot'></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className='chat-input-form'>
                        <input 
                            type='text'
                            className='chat-input'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='메시지를 입력하세요...'
                            disabled={isLoading}
                        />
                        <button 
                            type='submit' 
                            className='chat-send-button'
                            disabled={isLoading || !inputValue.trim()}
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}