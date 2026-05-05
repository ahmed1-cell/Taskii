
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Timer, Layout, ArrowRight, Shield, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <header className="h-20 flex items-center justify-between px-8 md:px-20 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">T</div>
          <div className="text-3xl font-black text-primary tracking-tighter">Taskii</div>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <Link href="#features" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">Features</Link>
          <Link href="/about" className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors hidden sm:block">Log In</Link>
          <Link href="/dashboard">
            <Button className="rounded-2xl px-8 bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">Enter Workspace</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 md:py-32 px-8 text-center max-w-6xl mx-auto relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="h-3 w-3" /> Developed by Muhammad Ahmed
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Work smarter. <br />
            Focus deeper. <br />
            <span className="text-primary">Ship faster.</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            The minimalist suite for maximalist productivity. Architected for professional execution and elite focus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/signup">
              <Button size="lg" className="rounded-3xl px-12 text-xl h-20 group bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30">
                Get Started Now <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="py-32 bg-white px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: Rocket,
                title: "Deep Work Mode",
                desc: "Activate ultra-focus. Minimalist UI, ambient sounds, and zero distractions to hit flow state instantly.",
                color: "bg-primary/10 text-primary"
              },
              {
                icon: Zap,
                title: "Smart Task Engine",
                desc: "Intelligent priority suggestions and automated subtask generation to keep you moving at light speed.",
                color: "bg-accent/10 text-accent"
              },
              {
                icon: Shield,
                title: "Pro Architecture",
                desc: "Developed by Muhammad Ahmed with a local-first philosophy. Your professional data is secured and private.",
                color: "bg-primary/10 text-primary"
              }
            ].map((feature, i) => (
              <div key={i} className="space-y-6 group hover:-translate-y-4 transition-transform duration-500">
                <div className={cn("h-20 w-20 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-xl", feature.color)}>
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 border-t bg-muted/20 px-8 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="space-y-4">
            <div className="text-4xl font-black text-primary tracking-tighter">Taskii</div>
            <p className="text-lg text-muted-foreground max-w-xs font-medium">Work smarter. Focus deeper. Ship faster.</p>
          </div>
          <div className="space-y-2 md:text-right">
            <p className="text-xl font-black text-primary">Developed by Muhammad Ahmed</p>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">© {new Date().getFullYear()} Architected for Performance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
