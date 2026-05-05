import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Timer, Layout, ArrowRight, Shield, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-20 flex items-center justify-between px-8 md:px-20 border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-primary tracking-tight font-headline">Taskii</div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors text-[#6C5CE7]">Features</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors text-[#6C5CE7]">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="rounded-full px-6 bg-[#6C5CE7] hover:bg-[#5A4ED1]">Enter Workspace</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 px-8 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8">
            <Zap className="h-3 w-3" /> Developed by Muhammad Ahmed
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            Work smarter. <br />
            Focus deeper. <br />
            <span className="text-primary italic">Ship faster.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The minimalist suite for maximalist productivity. Local-first, professional-grade task management architected for elite performers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-10 text-lg h-16 group bg-[#6C5CE7] hover:bg-[#5A4ED1]">
                Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="py-24 bg-white px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center p-8 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Deep Work Mode</h3>
              <p className="text-muted-foreground text-sm">Activate ultra-focus. Minimalist UI, ambient sounds, and zero distractions to help you hit flow state instantly.</p>
            </div>
            <div className="space-y-4 text-center p-8 rounded-3xl border border-transparent hover:border-accent/20 hover:bg-accent/5 transition-all">
              <div className="h-16 w-16 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">AI Task Engine</h3>
              <p className="text-muted-foreground text-sm">Leverage Gemini to decompose complex goals into actionable roadmaps. Smart subtask generation at your fingertips.</p>
            </div>
            <div className="space-y-4 text-center p-8 rounded-3xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold">Privacy Architected</h3>
              <p className="text-muted-foreground text-sm">Developed by Muhammad Ahmed with a local-first philosophy. Your professional workspace data never leaves your browser.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-white px-8 md:px-20 text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-2xl font-bold text-primary mb-2">Taskii</div>
            <p className="text-sm text-muted-foreground">Work smarter. Focus deeper. Ship faster.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-bold text-primary">Developed by Muhammad Ahmed</p>
            <p className="text-xs text-muted-foreground mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}