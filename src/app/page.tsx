// src/app/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { apiClient } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function Home() {
  const [dbStatus, setDbStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);
  const [apiCheck, setApiCheck] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [dialogName, setDialogName] = useState('');

  const testDBConnection = async () => {
    setDbStatus("loading");
    const { data, error } = await supabase.from("ping_test").select("*");

    if (error) {
      setDbStatus("error");
      setResult(error.message);
    } else {
      setDbStatus("success");
      setResult(data);
    }
  };

  const checkApi = async () => {
    const data = await apiClient.get<{ message: string }>('/api/hello');
    setApiCheck(data?.message || '❌ 실패');
  };

  const handleDialogSubmit = () => {
    setUser(dialogName);
    toast.success(`사용자 "${dialogName}"로 설정됨`);
    setDialogName('');
  };

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">🧪 시스템 종합 테스트</h1>

      {/* Supabase */}
      <section>
        <h2 className="font-semibold">📦 Supabase 연결</h2>
        <button
          onClick={testDBConnection}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          DB 연결 테스트 실행
        </button>

        <div className="mt-4">
          <p className="font-medium">상태: 
            <span className="ml-2 font-mono text-sm">
              {dbStatus === "idle" && "대기 중"}
              {dbStatus === "loading" && "로딩 중..."}
              {dbStatus === "success" && "✅ 성공"}
              {dbStatus === "error" && "❌ 실패"}
            </span>
          </p>

          <pre className="mt-2 p-3 bg-gray-100 text-sm rounded whitespace-pre-wrap">
            {result ? JSON.stringify(result, null, 2) : "결과 없음"}
          </pre>
        </div>
      </section>

      {/* Zustand */}
      <section>
        <h2 className="font-semibold">🧠 Zustand 상태</h2>
        <p>현재 유저: {user ?? '(없음)'}</p>
        <Input
          placeholder="유저 이름 변경"
          value={user ?? ''}
          onChange={(e) => setUser(e.target.value)}
          className="max-w-sm mt-2"
        />
      </section>

      {/* Axios */}
      <section>
        <h2 className="font-semibold">🌐 Axios Wrapper</h2>
        <Button onClick={checkApi}>/api/hello 호출</Button>
        <p className="mt-2">응답: {apiCheck}</p>
      </section>

      {/* Dialog + Form */}
      <section>
        <h2 className="font-semibold">💬 Dialog + Form</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">유저 이름 설정</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>유저 설정</DialogTitle>
              <DialogDescription>이름을 입력하면 Zustand에 저장됩니다.</DialogDescription>
            </DialogHeader>
            <Input
              value={dialogName}
              onChange={(e) => setDialogName(e.target.value)}
              placeholder="이름 입력"
              className="mt-4"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={handleDialogSubmit}>확인</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Toast */}
      <section>
        <h2 className="font-semibold">🔔 Sonner Toast</h2>
        <Button
          variant="destructive"
          onClick={() => toast.error('🔥 에러가 발생한 척합니다')}
        >
          에러 토스트 띄우기
        </Button>
      </section>

      {/* Tabs */}
      <section>
        <h2 className="font-semibold">📑 Tabs</h2>
        <Tabs defaultValue="one" className="w-[400px] mt-2">
          <TabsList>
            <TabsTrigger value="one">탭 1</TabsTrigger>
            <TabsTrigger value="two">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="one">
            <p>🧪 첫 번째 탭입니다.</p>
          </TabsContent>
          <TabsContent value="two">
            <p>📦 두 번째 탭입니다.</p>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
