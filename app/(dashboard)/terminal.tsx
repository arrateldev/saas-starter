'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const terminalSteps = [
  'git clone https://github.com/nextjs/saas-starter',
  'pnpm install',
  'pnpm db:setup',
  'pnpm db:migrate',
  'pnpm db:seed',
  'pnpm dev'
];

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTerminalStep((prev) => {
        if (prev >= terminalSteps.length - 1) {
          window.clearInterval(timer);
          return prev;
        }

        return prev + 1;
      });
    }, 550);

    return () => window.clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-gray-950 font-mono text-sm text-white shadow-lg shadow-black/20">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <Button
            type="button"
            onClick={copyToClipboard}
            variant="ghost"
            size="icon"
            className="h-8 w-8 border-0 text-gray-400 hover:bg-transparent hover:text-white"
            aria-label="Copy to clipboard"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </Button>
        </div>
        <div className="space-y-2">
          {terminalSteps.map((step, index) => (
            <div
              key={step}
              className={`transition-[transform,opacity] duration-300 ${
                index > terminalStep
                  ? 'translate-y-2 opacity-0'
                  : 'translate-y-0 opacity-100'
              }`}
            >
              <span className="text-emerald-400">$</span> {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
