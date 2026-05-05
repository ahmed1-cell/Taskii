"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 py-8 border-t bg-muted/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-bold text-primary tracking-tight">Taskii</p>
          <p className="text-xs text-muted-foreground mt-1">Work smarter. Focus deeper. Ship faster.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Taskii Productivity Suite.</p>
          <p className="text-sm font-semibold text-primary">Developed by Muhammad Ahmed</p>
          <nav className="flex items-center gap-4 mt-2">
            <Link href="/about" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
