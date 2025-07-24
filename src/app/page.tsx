
import React from 'react';
import EditorPage from './editor/page';
import Link from 'next/link';
export default function DemoEditor() {
  return (
    <div style={{ border: '1px solid gray', padding: '1rem' }}>
      <Link href={"/editor"}>에디터
      </Link>
    </div>
  );
}
