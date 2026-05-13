import { NextRequest, NextResponse } from "next/server";
import type { OnboardingProject } from "@/lib/types";
import { NotesExtractionResultSchema } from "@/lib/schemas";

const EXTRACTION_PROMPT = `You are an expert at extracting structured information from unstructured meeting notes and customer documents.

Given raw notes from a customer discovery call or shared documentation, extract the relevant fields and return them as JSON. Only include fields where you have reasonable confidence the value is present in the notes. Return null or omit fields that are not mentioned.

Return a JSON object with this structure:
{
  "discovery": {
    "businessProblem": "string or omit",
    "primaryUseCase": "string or omit",
    "desiredOutcome": "string or omit",
    "currentProcess": "string or omit",
    "successDefinition": "string or omit",
    "implementationDeadline": "string or omit",
    "buyerTeam": "string or omit",
    "constraints": "string or omit"
  },
  "suggestedStakeholders": [
    { "name": "string", "role": "string", "team": "string", "concerns": ["string"] }
  ],
  "suggestedSystems": [
    { "name": "string", "type": "string", "notes": "string" }
  ],
  "summary": "One sentence describing what was extracted from these notes"
}

For system "type", use one of: crm, case_management, document_management, data_warehouse, ticketing, email, chat, core_system, custom, other.
The "suggestedStakeholders" and "suggestedSystems" arrays may be empty if none are mentioned.
Keep extracted text concise and factual — do not embellish or infer beyond what is stated.`;

export async function POST(req: NextRequest) {
  let body: { notes: string; project: OnboardingProject };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const { notes } = body;

  if (!notes || notes.trim().length < 20) {
    return NextResponse.json({ error: "notes_too_short" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no_api_key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: EXTRACTION_PROMPT },
          { role: "user", content: `Extract structured fields from these notes:\n\n${notes}` },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response");

    const parsed = JSON.parse(content);
    const validated = NotesExtractionResultSchema.safeParse(parsed);

    if (!validated.success) {
      console.error("Extraction schema validation failed:", validated.error);
      return NextResponse.json({ error: "extraction_failed" });
    }

    return NextResponse.json({ suggestions: validated.data });
  } catch (err) {
    console.error("Notes extraction failed:", err);
    return NextResponse.json({ error: "extraction_failed" });
  }
}
