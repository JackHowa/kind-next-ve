import VerticalStack from "@/shared/VerticalStack";
import Link from "next/link";

export default function BoardPage() {
  return (
    <VerticalStack themeColor="secondary" framingStyle="topSecondary">
      <Link href="/">Home</Link>
    </VerticalStack>
  );
}
