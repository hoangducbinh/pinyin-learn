import type { Route } from "./+types/home";
import PinyinConverter from "../components/PinyinConverter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Học Pinyin Tiếng Trung" },
    { name: "description", content: "Chuyển đổi pinyin có số sang pinyin có dấu thanh, học tiếng Trung dễ dàng" },
  ];
}

export default function Home() {
  return <PinyinConverter />;
}
