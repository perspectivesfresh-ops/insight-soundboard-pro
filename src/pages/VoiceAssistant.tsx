import { useState, useRef } from 'react';
import { Mic, MicOff, Volume2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { generateInsight } from '@/lib/financial-data';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I\'m your AI financial assistant. Ask me about revenue, cash flow, expenses, or any financial metric.' },
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const response = generateResponse(text);
    const assistantMsg: Message = { role: 'assistant', text: response };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    // Speak the response
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
  };

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('revenue')) return generateInsight('monthly', 'all');
    if (q.includes('cash flow')) return 'Cash flow this month is $2.7M, representing an 8.4% increase. Operating cash flow remains strong driven by improved collections.';
    if (q.includes('expense')) return 'Total expenses are $4.0M. The largest category is salaries at 42%, followed by operations at 18%. Marketing spend has decreased by 2% this quarter.';
    if (q.includes('profit') || q.includes('margin')) return 'Profit margin is currently at 44.4%, up 2.3% from the previous period. This is driven by revenue growth outpacing expense increases.';
    if (q.includes('ebitda')) return 'EBITDA stands at $3.7M, up 5.7% from the previous period. Depreciation and amortization remain stable.';
    return `Based on current data: ${generateInsight('monthly', 'all')}`;
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Voice Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask questions about your financial data</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant={listening ? 'destructive' : 'outline'} size="icon" onClick={toggleListening}>
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Input
          placeholder="Ask about cash flow, revenue, expenses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          className="flex-1"
        />
        <Button size="icon" onClick={() => handleSend(input)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {['Explain cash flow this month', 'What is our profit margin?', 'Break down expenses', 'How is EBITDA trending?'].map((q) => (
          <Button key={q} variant="outline" size="sm" className="text-xs justify-start" onClick={() => handleSend(q)}>
            {q}
          </Button>
        ))}
      </div>
    </div>
  );
}
