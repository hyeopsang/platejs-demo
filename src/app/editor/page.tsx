'use client';
import dynamic from 'next/dynamic';

const PlateWrapper = dynamic(() => import('./plate-wrapper'), {
  ssr: false,
});

export default function MyEditorPage() {
  return <PlateWrapper />;
}
