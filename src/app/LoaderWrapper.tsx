"use client";
import Navbar from "@/components/Navbar";
import { useLoader } from "@/context/LoaderContext";
import { useRouter } from "next/navigation";

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setLoading } = useLoader();

  const handleNavigation = async (href: string) => {
    setLoading(true);
    try {
      await router.push(href);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar handleNavigation={handleNavigation} />
      {children}
    </>
  );
}