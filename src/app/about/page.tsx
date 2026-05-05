"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Shield, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-primary">Taskii v2.0</h1>
          <p className="text-xl text-muted-foreground italic">Developed by Muhammad Ahmed</p>
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-1">Next.js 15</Badge>
            <Badge variant="secondary" className="px-4 py-1">TypeScript</Badge>
            <Badge variant="secondary" className="px-4 py-1">Shadcn/UI</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" /> Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Taskii was built to eliminate the friction in productivity. We believe that professional task management shouldn't require complex onboarding or account setups.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" /> Security First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Developed by Muhammad Ahmed with a focus on local-first privacy. Your workspace data stays in your browser, ensuring complete ownership of your work.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-8 text-center bg-muted/30 p-12 rounded-3xl">
          <Heart className="h-12 w-12 text-primary mx-auto animate-pulse" />
          <h2 className="text-3xl font-bold">Built with passion for developers.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            "Taskii is my vision of a high-performance productivity suite that respects your time and your data."
          </p>
          <p className="font-bold text-lg">— Muhammad Ahmed, Lead Architect</p>
        </section>
      </main>
      <div className="px-8 md:px-20">
        <Footer />
      </div>
    </div>
  );
}