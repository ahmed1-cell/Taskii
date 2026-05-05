import { AiTaskHelper } from "@/components/ai/AiTaskHelper";

export default function AiHelperPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Smart Planner</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Turn your high-level goals into actionable roadmaps. Our AI analyzes your project description to suggest specific, manageable sub-tasks.
        </p>
      </div>
      <AiTaskHelper />
    </div>
  );
}