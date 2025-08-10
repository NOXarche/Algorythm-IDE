'use client';

import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function MonacoEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Theme: Dark with orange keywords
    monaco.editor.defineTheme('algorhythm-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'FFA63F' },
        { token: 'identifier', foreground: 'FFD580' }
      ],
      colors: {
        'editor.background': '#1E1E2E'
      }
    });

    editorRef.current = monaco.editor.create(ref.current, {
      value,
      language: 'javascript',
      theme: 'algorhythm-dark',
      automaticLayout: true,
      minimap: { enabled: false },
      cursorBlinking: 'smooth',
      cursorStyle: 'line',
      cursorWidth: 2
    });

    const sub = editorRef.current.onDidChangeModelContent(() => {
      const v = editorRef.current?.getValue() ?? '';
      onChange(v);
    });

    return () => {
      sub.dispose();
      editorRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;
    const current = editorRef.current.getValue();
    if (current !== value) editorRef.current.setValue(value);
  }, [value]);

  return <div className="w-full h-full rounded-md border border-white/10" ref={ref} />;
}
