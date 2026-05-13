"use client";

import type { OnboardingProject } from "@/lib/types";

const KEY = (id: string) => `onboarding_project_${id}`;

export function saveProject(project: OnboardingProject): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY(project.id), JSON.stringify({ ...project, updatedAt: new Date().toISOString() }));
}

export function loadProject(id: string): OnboardingProject | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY(id));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingProject;
  } catch {
    return null;
  }
}

export function deleteProject(id: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY(id));
}
