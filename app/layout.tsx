import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "자율차-일반차 혼재상황 대비 AI기반 자율주행모빌리티 운영 플랫폼",
  description: "디지털 트윈 기반 교통 모니터링 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-background">
      <body className={`${notoSansKR.className} antialiased`}>{children}</body>
    </html>
  );
}
