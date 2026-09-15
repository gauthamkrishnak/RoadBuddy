import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { AIMessage } from '../../types';
import { Bot, Send, Mic, Sparkles, User, Car, AlertTriangle, Wrench, Navigation, ArrowRight } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: "Hello Gautham! 👋 I'm your RoadBuddy AI Travel & Safety Assistant. How can I assist your journey today?",
      timestamp: '10:00 AM',
      actionButtons: [
        { label: '🚗 Book a Ride', route: '/passenger/book-ride' },
        { label: '🆘 Emergency SOS', route: '/passenger/emergency' },
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedPrompts = [
    'Book me a ride to Cochin Airport',
    'Plan a 3-day trip to Munnar',
    'Find nearby hospitals & emergency clinics',
    'I need roadside assistance for a flat tyre',
    'I need emergency help right now!',
  ];

  const getAIResponse = (input: string): { text: string; actionButtons?: { label: string; route: string }[] } => {
    const lower = input.toLowerCase();

    if (lower.includes('ride') || lower.includes('book') || lower.includes('taxi') || lower.includes('car')) {
      return {
        text: 'I can help you book a ride immediately! I found nearby Sedan Premier and Traveller Vans ready in your area.',
        actionButtons: [
          { label: 'Go to Ride Booking Screen', route: '/passenger/book-ride' },
          { label: 'View Available Vehicles', route: '/passenger/dashboard' },
        ],
      };
    }

    if (lower.includes('flat tyre') || lower.includes('roadside') || lower.includes('tow') || lower.includes('breakdown') || lower.includes('mechanic')) {
      return {
        text: 'I can help you request roadside assistance right away for flat tyres, battery jumpstarts, or towing services.',
        actionButtons: [
          { label: 'Request Roadside Support', route: '/passenger/roadside' },
        ],
      };
    }

    if (lower.includes('emergency') || lower.includes('sos') || lower.includes('police') || lower.includes('ambulance') || lower.includes('hospital')) {
      return {
        text: '⚠️ EMERGENCY DETECTED: I can immediately notify Kerala Emergency Services, dispatch an ambulance, or connect to police patrol.',
        actionButtons: [
          { label: '🚨 Trigger SOS Emergency Now', route: '/passenger/emergency' },
        ],
      };
    }

    if (lower.includes('munnar') || lower.includes('trip') || lower.includes('tour') || lower.includes('plan')) {
      return {
        text: 'Munnar is beautiful this season! I recommend booking a 12-seater Traveller Van for family trips. The estimated trip fare from Kochi is ₹5,400.',
        actionButtons: [
          { label: 'Pre-Book Traveller Van', route: '/passenger/scheduled-rides' },
        ],
      };
    }

    return {
      text: `I've processed your query regarding "${input}". RoadBuddy AI monitors road safety, traffic telemetry, and instant vehicle dispatches 24/7 across South India.`,
      actionButtons: [
        { label: 'Book a Ride', route: '/passenger/book-ride' },
        { label: 'Roadside Help', route: '/passenger/roadside' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = getAIResponse(query);
      const aiMsg: AIMessage = {
        id: `m_ai_${Date.now()}`,
        sender: 'assistant',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButtons: responseData.actionButtons,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const toggleMic = () => {
    setIsListening((prev) => !prev);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage('I need roadside assistance');
      }, 2500);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Mobility Assistant"
        subtitle="Intelligent conversational assistant for trip planning, safety, and instant bookings."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[640px]">
        {/* Left Sidebar: Suggested Prompts & History */}
        <div className="glass-panel p-5 shadow-xl flex flex-col justify-between hidden lg:flex">
          <div className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Suggested Prompts
            </h3>

            <div className="space-y-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left p-3 rounded-2xl bg-[#080c14]/80 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 border border-slate-800/80 transition flex items-center justify-between group"
                >
                  <span className="truncate">{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 bg-[#080c14]/50 p-3.5 rounded-2xl">
            <span className="font-extrabold text-white block">AI Road Telemetry v2.4</span>
            <span className="text-[11px] text-emerald-400 font-bold">Active & Connected</span>
          </div>
        </div>

        {/* Center: Chat Interface */}
        <div className="lg:col-span-3 glass-panel shadow-2xl flex flex-col h-full overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-800/80 bg-[#080c14]/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#080c14] rounded-[14px] flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">RoadBuddy AI Copilot</h4>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online & Listening
                </p>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-tr-none shadow-md'
                        : 'bg-[#080c14] border border-slate-800/90 text-slate-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="font-medium">{msg.text}</p>
                    <span className="text-[10px] opacity-60 mt-1 block text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actionButtons && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.actionButtons.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(act.route)}
                          className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-extrabold transition flex items-center gap-1 shadow-sm"
                        >
                          {act.label} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#080c14] border border-slate-800/90 px-4 py-3 rounded-2xl text-xs text-slate-300 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-[#080c14]/90 border-t border-slate-800/80 flex items-center gap-3">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-2xl border transition ${
                isListening
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-500 animate-pulse shadow-lg shadow-rose-600/30'
                  : 'bg-[#0f172a] border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isListening ? 'Listening...' : 'Voice Input'}
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Ask anything (e.g. 'I need a ride' or 'flat tyre help')..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-[#0f172a] border border-slate-700/80 rounded-2xl py-3 px-4 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-medium"
            />

            <button
              onClick={() => handleSendMessage()}
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-lg transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
