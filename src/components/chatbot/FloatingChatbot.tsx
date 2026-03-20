'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'bot';
    text: string;
    time: string;
}

const BOT_RESPONSES: Record<string, string> = {
    price: "Our properties range from Studio to 3BHK units across multiple prime Addis Ababa locations. Would you like to know more about a specific site? Our sales team can provide exact pricing for you.",
    location: "We have 6 prime sites in Addis Ababa: Hayahulet, Teklehaymanot, CMC, Bole Atlas, Ayat, and La Gare. Each has unique advantages — which area interests you?",
    tour: "We offer both virtual 360° tours and in-person site visits! You can schedule a free site visit by calling +251 976 133 918 or via WhatsApp. Would you like me to connect you?",
    payment: "We have flexible payment plans: 20% down with installments, bank loan partnerships, and foreign currency options for the diaspora. Our sales team can customize a plan for you.",
    diaspora: "We have a dedicated Diaspora Gateway with foreign currency payment options and legal support. We serve clients from the US, UAE, Europe, and beyond. Where are you located?",
    contact: "You can reach our sales team at:\n📞 +251 976 133 918\n💬 WhatsApp: +251 976 133 918\n📧 info@giftrealestate.et",
};

function getBotResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('birr') || lower.includes('dollar'))
        return BOT_RESPONSES.price;
    if (lower.includes('location') || lower.includes('where') || lower.includes('site') || lower.includes('area'))
        return BOT_RESPONSES.location;
    if (lower.includes('tour') || lower.includes('visit') || lower.includes('view'))
        return BOT_RESPONSES.tour;
    if (lower.includes('payment') || lower.includes('loan') || lower.includes('installment') || lower.includes('finance'))
        return BOT_RESPONSES.payment;
    if (lower.includes('diaspora') || lower.includes('abroad') || lower.includes('us') || lower.includes('uae'))
        return BOT_RESPONSES.diaspora;
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('email'))
        return BOT_RESPONSES.contact;
    return "Thank you for your message! Our team will get back to you shortly. For immediate assistance, call +251 976 133 918 or WhatsApp us. You can also fill the form below and we'll email you directly.";
}

export function FloatingChatbot() {
    const [open, setOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            text: "👋 Hello! Welcome to Gift Real Estate Ethiopia. I'm here to help you find your dream home. How can I assist you today?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [notifCount, setNotifCount] = useState(1);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Show notification pulse after 8 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!open) setNotifCount(1);
        }, 8000);
        return () => clearTimeout(timer);
    }, [open]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setNotifCount(0);
        setSending(true);

        // Send to API
        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name || 'Website Visitor', email: email || '', message: input }),
            });
        } catch { }

        // Simulate typing delay
        setTimeout(() => {
            const botReply = getBotResponse(userMsg.text);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString() + '-bot',
                    role: 'bot',
                    text: botReply,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setSending(false);
        }, 1200);
    };

    const submitContactForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const lastUserMsg = messages.filter((m) => m.role === 'user').slice(-1)[0];
        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message: lastUserMsg?.text || 'Contact request from chatbot' }),
            });
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: 'bot',
                    text: `✅ Thank you ${name}! We'll contact you at ${email} shortly. You can also reach us on WhatsApp: +251 976 133 918`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
            ]);
            setShowContactForm(false);
        } catch { }
    };

    const quickReplies = ['Property Prices', 'Site Locations', 'Schedule a Tour', 'Payment Plans'];

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => { setOpen(!open); setNotifCount(0); }}
                className={cn(
                    'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300',
                    'bg-brand-yellow text-brand-dark hover:shadow-glow hover:scale-110 active:scale-95',
                    open && 'rotate-0'
                )}
                aria-label="Open chat"
            >
                {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                {!open && notifCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                        {notifCount}
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {open && (
                <div
                    className={cn(
                        'fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-brand-charcoal rounded-2xl shadow-luxury border border-border flex flex-col transition-all duration-300',
                        minimized ? 'h-16' : 'h-[500px]'
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-brand-yellow rounded-t-2xl flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">G</span>
                            </div>
                            <div>
                                <div className="font-semibold text-brand-dark text-sm">Gift Real Estate</div>
                                <div className="flex items-center gap-1 text-xs text-brand-dark/70">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    Online - Typically replies fast
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMinimized(!minimized)}
                                className="p-1 hover:bg-brand-dark/10 rounded-lg transition-colors"
                            >
                                <Minimize2 className="w-4 h-4 text-brand-dark" />
                            </button>
                        </div>
                    </div>

                    {!minimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                                    >
                                        {msg.role === 'bot' && (
                                            <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                                                <span className="text-brand-dark font-bold text-xs">G</span>
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                'max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed',
                                                msg.role === 'user'
                                                    ? 'bg-brand-yellow text-brand-dark rounded-br-sm'
                                                    : 'bg-gray-100 dark:bg-brand-dark text-foreground rounded-bl-sm'
                                            )}
                                        >
                                            <p className="whitespace-pre-line">{msg.text}</p>
                                            <div className={cn('text-xs mt-1 opacity-50', msg.role === 'user' ? 'text-right' : '')}>
                                                {msg.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {sending && (
                                    <div className="flex justify-start">
                                        <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center mr-2 flex-shrink-0">
                                            <span className="text-brand-dark font-bold text-xs">G</span>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-brand-dark px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                                            <span className="typing-dot" />
                                            <span className="typing-dot" />
                                            <span className="typing-dot" />
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Quick Replies */}
                            <div className="px-4 pb-2 flex gap-2 flex-wrap">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => { setInput(reply); sendMessage(); }}
                                        className="text-xs px-3 py-1.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-brand-dark transition-colors duration-200"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>

                            {/* Contact Form Toggle */}
                            {!showContactForm ? (
                                <div className="px-4 pb-2">
                                    <button
                                        onClick={() => setShowContactForm(true)}
                                        className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
                                    >
                                        📧 Leave your contact so we can follow up
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submitContactForm} className="px-4 pb-3 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-2 text-xs bg-brand-yellow text-brand-dark rounded-lg font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        ✓ Submit & We'll Follow Up
                                    </button>
                                </form>
                            )}

                            {/* Input */}
                            <div className="p-4 pt-2 border-t border-border flex gap-2 flex-shrink-0">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2.5 rounded-full border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-background"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                    className="w-10 h-10 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-40 flex-shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>

                            {/* WhatsApp shortcut */}
                            <div className="px-4 pb-4 flex gap-2">
                                <a
                                    href="https://wa.me/251976133918"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 rounded-full text-xs font-medium hover:bg-[#1ea855] transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                        <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.18 1.6 6L0 24l6.22-1.63A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12a11.93 11.93 0 0 0-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.86 1.01 1.03-3.74-.24-.38A9.96 9.96 0 0 1 2 12C2 6.49 6.49 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.51-4.49 10-10 10zm5.47-7.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.35.22-.65.07a8.1 8.1 0 0 1-2.39-1.47 9 9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6l.44-.52c.14-.18.18-.3.27-.5.09-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51l-.58-.01a1.12 1.12 0 0 0-.81.38 3.4 3.4 0 0 0-1.06 2.53c0 1.49 1.08 2.93 1.23 3.13.15.2 2.1 3.2 5.07 4.49.71.3 1.26.48 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
