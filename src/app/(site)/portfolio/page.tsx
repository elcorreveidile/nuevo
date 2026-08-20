import { redirect } from "next/navigation";
import { categories } from "@/lib/content";

export default function PortfolioIndex() {
  redirect(`/portfolio/${categories[0].slug}`);
}
