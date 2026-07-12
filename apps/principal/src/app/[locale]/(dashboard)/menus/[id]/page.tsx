import { use } from 'react';
import MenuDetailView from '@/views/MenuDetail';

export default function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <MenuDetailView menuId={resolvedParams.id} />;
}
