import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    IconButton,
    Fade,
    Tooltip,
    Typography,
    TextField,
    Paper,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import api from '../services/api';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy el Guardián de Tu Energía Maya. Pregúntame lo que necesites sobre sabiduría maya.", sender: 'assistant' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: inputText,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMsg]);
        const queryText = inputText;
        setInputText("");
        setIsLoading(true);

        try {
            const response = await api.askAssistant(queryText, messages.concat(userMsg), kinData?.kin);
            const data = response;

            if (data.error) throw new Error(data.error);

            const assistantMsg = {
                id: Date.now() + 1,
                text: data.answer,
                sender: 'assistant'
            };
            setMessages(prev => [...prev, assistantMsg]);

        } catch (error) {
            console.error("Assistant Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 2,
                text: "Disculpa, he perdido la conexión con la fuente cósmica. Inténtalo de nuevo.",
                sender: 'assistant'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            <Fade in={isOpen}>
                <Paper
                    elevation={10}
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 0,
                        width: { xs: 'calc(100vw - 40px)', sm: 350 },
                        height: 500,
                        bgcolor: 'rgba(15, 15, 30, 0.95)',
                        border: '1px solid rgba(0, 200, 255, 0.3)',
                        borderRadius: 4,
                        boxShadow: '0 0 50px rgba(0, 200, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0, 200, 255, 0.05)', position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ChatIcon sx={{ color: '#00c8ff' }} />
                            <Typography variant="subtitle2" sx={{ fontFamily: 'Cinzel', color: '#00c8ff', fontWeight: 'bold', letterSpacing: 2 }}>
                                ASISTENTE MAYA
                            </Typography>
                        </Box>
                        <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white', position: 'absolute', right: 8 }}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>

                    {/* Messages Body */}
                    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%'
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        bgcolor: msg.sender === 'user' ? 'rgba(0, 200, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        color: 'white',
                                        borderRadius: msg.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                                        border: msg.sender === 'user' ? '1px solid rgba(0, 200, 255, 0.3)' : '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontFamily: 'Lora', lineHeight: 1.6 }}>
                                        {msg.text}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{ alignSelf: 'flex-start', ml: 1 }}>
                                <CircularProgress size={20} sx={{ color: '#00c8ff' }} />
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Escribe tu mensaje..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    fontFamily: 'Lora',
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    borderRadius: 3,
                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                    '&:hover fieldset': { borderColor: 'rgba(0, 200, 255, 0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: '#00c8ff' },
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handleSend()} sx={{ color: '#00c8ff' }} disabled={!inputText.trim() || isLoading}>
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Paper>
            </Fade>

            {/* Float Trigger */}
            <Tooltip title="Tu Asistente Maya" placement="left">
                <Box
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#00c8ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(0, 200, 255, 0.6)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            bgcolor: '#33d3ff'
                        },
                        animation: isOpen ? 'none' : 'Chat-pulse 2s infinite'
                    }}
                >
                    {isOpen ? <CloseIcon sx={{ color: 'black' }} /> : <ChatIcon sx={{ color: 'black' }} />}
                </Box>
            </Tooltip>

            <style>
                {`
                @keyframes Chat-pulse {
                    0% { box-shadow: 0 0 10px rgba(0, 200, 255, 0.4); }
                    50% { box-shadow: 0 0 30px rgba(0, 200, 255, 0.8); }
                    100% { box-shadow: 0 0 10px rgba(0, 200, 255, 0.4); }
                }
                `}
            </style>
        </Box>
    );
};

export default ChatAssistant;
