// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { count, error } = await supabase
        .from('users') // 실제 존재하는 테이블명으로 수정
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setUserCount(count);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">Supabase 연동 완료 🎉</h1>
      {userCount !== null && <p>총 사용자 수: {userCount}</p>}
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">shadcn/ui 버튼 테스트 🎉</h1>
        <Button>기본 버튼</Button>
        <Button variant="outline">아웃라인 버튼</Button>
        <Button variant="destructive">삭제 버튼</Button>
      </div>
    </main>
  );
}
