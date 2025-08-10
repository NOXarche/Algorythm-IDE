'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';

type Props = {
  value: string;
  onChange: (v: string) => void;
  language?: string;
  theme?: string;
};

export default function MonacoEditor({ 
  value, 
  onChange, 
  language = 'javascript',
  theme = 'algorhythm-dark' 
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorChange = useCallback(() => {
    const v = editorRef.current?.getValue() ?? '';
    onChange(v);
  }, [onChange]);
  useEffect(() => {
    if (!ref.current) return;

    // Theme: Dark with orange keywords
    monaco.editor.defineTheme('algorhythm-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'FFA63F' },
        { token: 'identifier', foreground: 'FFD580' },
        { token: 'string', foreground: '98C379' },
        { token: 'comment', foreground: '5C6370' },
        { token: 'number', foreground: 'D19A66' }
      ],
      colors: {
        'editor.background': '#1E1E2E',
        'editor.foreground': '#ABB2BF',
        'editorCursor.foreground': '#FF8C32',
        'editor.selectionBackground': '#3E4451'
      }
    });

    editorRef.current = monaco.editor.create(ref.current, {
      value,
      language,
      theme,
      automaticLayout: true,
      minimap: { enabled: false },
      cursorBlinking: 'smooth',
      cursorStyle: 'line',
      cursorWidth: 2,
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      tabSize: 2,
      insertSpaces: true
    });

    const sub = editorRef.current.onDidChangeModelContent(handleEditorChange);

    return () => {
      sub.dispose();
      editorRef.current?.dispose();
    };
  }, [language, theme, handleEditorChange]);

  useEffect(() => {
    if (!editorRef.current) return;
    const current = editorRef.current.getValue();
    if (current !== value) editorRef.current.setValue(value);
  }, [value]);

  return <div className="w-full h-full rounded-md border border-white/10" ref={ref} />;
}
