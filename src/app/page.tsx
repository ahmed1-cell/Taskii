import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Timer, Layout, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-20 flex items-center justify-between px-8 md:px-20 border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-primary tracking-tight font-headline">Taskii</div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it works</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full px-6">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8">
            <Zap className="h-3 w-3" /> Redefining Productivity
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Manage tasks with <span className="text-primary italic">effortless</span> clarity.
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Taskii combines minimalist design with advanced AI-powered tools to help you focus on what truly matters. From deep work to team collaboration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-8 text-lg h-14 group">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14">
              Watch Demo
            </Button>
          </div>
        </section>

        <section id="features" className="py-24 bg-white px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-border hover:bg-background/50 transition-all">
              <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layout className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">Flexible Views</h3>
              <p className="text-muted-foreground">Switch seamlessly between List, Kanban, and Calendar views to visualize your workflow exactly how you prefer.</p>
            </div>
            <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-border hover:bg-background/50 transition-all">
              <div className="h-14 w-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Timer className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">Pomodoro Integration</h3>
              <p className="text-muted-foreground">Stay focused with our integrated Pomodoro timer. Link focus sessions directly to your tasks for accurate tracking.</p>
            </div>
            <div className="space-y-4 text-center p-6 rounded-2xl border border-transparent hover:border-border hover:bg-background/50 transition-all">
              <div className="h-14 w-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">AI Task Breakdown</h3>
              <p className="text-muted-foreground">Don&apos;t let big goals overwhelm you. Our AI helper suggests actionable sub-tasks and step-by-step roadmaps instantly.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-white px-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <div className="text-2xl font-bold text-primary mb-2">Taskii</div>
            <p className="text-sm text-muted-foreground">The minimalist suite for maximalist productivity.</p>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Support</Link>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Developed by Muhammad Ahmed</p>
          </div>
        </div>
      </footer>
    </div>
  );
}