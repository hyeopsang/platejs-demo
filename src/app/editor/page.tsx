'use client';

import * as React from 'react';
import type { Value } from 'platejs';

import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react';
import {
  Plate,
  usePlateEditor,
} from 'platejs/react';
import { CalloutPlugin } from '@platejs/callout/react';
import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { Editor, EditorContainer } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { MarkToolbarButton } from '@/components/ui/mark-toolbar-button';
import { ToolbarButton } from '@/components/ui/toolbar';
import { CalloutElement } from '@/components/ui/callout-node';
import { CalloutKit } from '@/components/callout-kit';
import inValed
const initialValue: Value = [
  {
    type: 'h3',
    children: [{ text: 'Title' }],
  },
  {
    type: 'blockquote',
    children: [{ text: 'This is a quote.' }],
  },
  {
    type: 'p',
    children: [{ text: 'This is a paragraph.' }],
  },
  {
    type: 'callout',
    calloutType: 'info',
    children: [{ text: '💡 이것은 Callout입니다.' }],
  },
];


export default function MyEditorPage() {
  const editor = usePlateEditor({
  plugins: [
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    H1Plugin.withComponent(H1Element),
    H2Plugin.withComponent(H2Element),
    H3Plugin.withComponent(H3Element),
    BlockquotePlugin.withComponent(BlockquoteElement),
    CalloutPlugin.withComponent(CalloutElement),
  ],
  value: () => {
    try {
      const saved = localStorage.getItem('installation-next-demo');
      const parsed = saved ? JSON.parse(saved) : initialValue;
      return isValidSlateValue(parsed) ? parsed : initialValue;
    } catch (e) {
      return initialValue;
    }
  },
});

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        localStorage.setItem('installation-next-demo', JSON.stringify(value));
      }}
    >
      <FixedToolbar className="flex justify-start gap-1 rounded-t-lg">
        <ToolbarButton onClick={() => editor.tf.h1.toggle()}>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h2.toggle()}>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.h3.toggle()}>H3</ToolbarButton>
        <ToolbarButton
  onClick={() =>
    editor.tf.insert.callout()
  }
>
  + Callout
</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.blockquote.toggle()}>Quote</ToolbarButton>
        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">B</MarkToolbarButton>
        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">I</MarkToolbarButton>
        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">U</MarkToolbarButton>
        <div className="flex-1" />
        <ToolbarButton
          className="px-2"
          onClick={() => editor.tf.setValue(initialValue)}
        >
          Reset
        </ToolbarButton>
      </FixedToolbar>
      <EditorContainer>
        <Editor placeholder="Type your amazing content here..." />
      </EditorContainer>
    </Plate>
  );
}
