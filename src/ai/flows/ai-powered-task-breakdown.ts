'use server';
/**
 * @fileOverview An AI agent that helps break down high-level goals into detailed sub-tasks and action plans.
 *
 * - aiPoweredTaskBreakdown - A function that handles the AI-powered task breakdown process.
 * - AiPoweredTaskBreakdownInput - The input type for the aiPoweredTaskBreakdown function.
 * - AiPoweredTaskBreakdownOutput - The return type for the aiPoweredTaskBreakdown function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiPoweredTaskBreakdownInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A high-level goal or project description.'),
});
export type AiPoweredTaskBreakdownInput = z.infer<typeof AiPoweredTaskBreakdownInputSchema>;

const AiPoweredTaskBreakdownOutputSchema = z.object({
  subTasks: z
    .array(z.string())
    .describe('A detailed list of specific, actionable sub-tasks required to achieve the goal.'),
  actionPlan: z
    .string()
    .describe('A step-by-step initial action plan for how to approach and execute these sub-tasks.'),
});
export type AiPoweredTaskBreakdownOutput = z.infer<typeof AiPoweredTaskBreakdownOutputSchema>;

export async function aiPoweredTaskBreakdown(
  input: AiPoweredTaskBreakdownInput
): Promise<AiPoweredTaskBreakdownOutput> {
  return aiPoweredTaskBreakdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredTaskBreakdownPrompt',
  input: { schema: AiPoweredTaskBreakdownInputSchema },
  output: { schema: AiPoweredTaskBreakdownOutputSchema },
  prompt: `You are an expert project manager and productivity coach.
Your goal is to help users break down complex projects into manageable parts.

Given the following high-level goal or project description:

Project Description: {{{projectDescription}}}

Please generate a detailed list of sub-tasks and a clear, step-by-step initial action plan.

Ensure the sub-tasks are specific, actionable, and comprehensive.
The action plan should outline the sequence or strategy for tackling these sub-tasks to achieve the overall goal efficiently.`,
});

const aiPoweredTaskBreakdownFlow = ai.defineFlow(
  {
    name: 'aiPoweredTaskBreakdownFlow',
    inputSchema: AiPoweredTaskBreakdownInputSchema,
    outputSchema: AiPoweredTaskBreakdownOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
