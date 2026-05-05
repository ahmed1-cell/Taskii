"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Shield, Zap, Heart, Code, Database, Layout } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black tracking-tighter mb-4 text-primary">Taskii v2.0</h1>
          <p className="text-2xl text-muted-foreground font-medium italic">Architected by Muhammad Ahmed</p>
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="secondary" className="px-6 py-1.5 text-sm">Next.js 14</Badge>
            <Badge variant="secondary" className="px-6 py-1.5 text-sm">TypeScript</Badge>
            <Badge variant="secondary" className="px-6 py-1.5 text-sm">MongoDB</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-primary/5 border-primary/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Rocket className="h-6 w-6 text-primary" /> The Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Taskii was designed to eliminate productivity friction. Our local-first, blazing-fast architecture ensures your focus remains on execution, not orchestration.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/5 border-accent/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="h-6 w-6 text-accent" /> Security First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Developed by Muhammad Ahmed with professional-grade security. From JWT-based authentication to encrypted private notes, your workspace is a fortress.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">The Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Layout, label: "Next.js 14", sub: "Frontend" },
              { icon: Code, label: "TypeScript", sub: "Safety" },
              { icon: Database, label: "MongoDB", sub: "Storage" },
              { icon: Zap, label: "Redis", sub: "Caching" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white border rounded-2xl text-center group hover:border-primary/50 transition-all">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-bold text-lg">{item.label}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 text-center bg-primary text-primary-foreground p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Zap className="h-64 w-64" />
          </div>
          <Heart className="h-16 w-16 mx-auto animate-pulse" />
          <h2 className="text-4xl font-black">Built for elite performers.</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            "Taskii is the manifestation of modern full-stack excellence—designed to help you ship faster and focus deeper."
          </p>
          <div className="pt-4">
            <p className="font-bold text-2xl">Muhammad Ahmed</p>
            <p className="text-sm opacity-70 uppercase tracking-widest">Lead Architect</p>
          </div>
        </section>
      </main>
      <div className="px-8 md:px-20">
        <Footer />
      </div>
    </div>
  );
}
