/**
 * Contracts for the Process module.
 *
 * The component reads these interfaces only; the concrete copy lives in
 * Process.content.ts and is injected through props.
 */

export interface ProcessStep {
  /** Unique slug. Feeds the step anchor, its heading id and the JSON-LD url. */
  readonly id: string;
  /** Rendered numeral, e.g. "01". Decorative: the <ol> already conveys order. */
  readonly index: string;
  readonly title: string;
  readonly description: string;
  /** What the client actually receives when the step closes. */
  readonly deliverable: string;
  readonly duration: string;
}

export interface ProcessContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  /** Visible label in front of `step.deliverable`, e.g. "Entregable". */
  readonly deliverableLabel: string;
  /** Visible label in front of `step.duration`, e.g. "Duración". */
  readonly durationLabel: string;
  readonly steps: readonly ProcessStep[];
  readonly footnote: string;
}

export interface ProcessProps {
  /** Copy injection point. Defaults to the module's own content object. */
  readonly content?: ProcessContent;
  /** Anchor id of the landmark. The heading id is `${id}-title`. */
  readonly id?: string;
  /**
   * Set to false when the route layer emits this section's nodes inside a
   * combined `@graph` (see src/app/page.tsx), so the page never ships the
   * same entity twice.
   */
  readonly withSchema?: boolean;
}

export interface ProcessStepCardProps {
  readonly step: ProcessStep;
  readonly headingId: string;
  readonly deliverableLabel: string;
  readonly durationLabel: string;
}

export interface ProcessLineProps {
  readonly className?: string;
}
