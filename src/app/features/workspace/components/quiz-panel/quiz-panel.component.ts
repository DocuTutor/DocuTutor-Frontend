import { Component, computed, input, OnInit, signal } from '@angular/core';
import { QuizQuestion } from '../../models/workspace.models';

@Component({
  selector: 'app-quiz-panel',
  templateUrl: './quiz-panel.component.html',
  styleUrls: ['./quiz-panel.component.css']
})
export class QuizPanelComponent  {

  readonly questions = input.required<QuizQuestion[]>();

  readonly qIdx = signal(0);
  readonly selected = signal<number | null>(null);
  readonly revealed = signal(false);
  readonly score = signal(0);
  readonly done = signal(false);

  readonly quizLen = computed(() => this.questions().length);
  readonly q = computed(() => this.questions()[this.qIdx()]);
  readonly percent = computed(() =>
    Math.round((this.score() / this.quizLen()) * 100)
  );

  pick(idx: number): void {
    if (this.revealed()) {
      return;
    }

    this.selected.set(idx);
    this.revealed.set(true);

    if (idx === this.q().answer) {
      this.score.update((score) => score + 1);
    }
  }

  next(): void {
    if (this.qIdx() + 1 >= this.quizLen()) {
      this.done.set(true);
      return;
    }

    this.qIdx.update((i) => i + 1);
    this.selected.set(null);
    this.revealed.set(false);
  }

  restart(): void {
    this.qIdx.set(0);
    this.selected.set(null);
    this.revealed.set(false);
    this.score.set(0);
    this.done.set(false);
  }

  optClass(idx: number): string {
    const isCorrect = idx === this.q().answer;
    const isSelected = idx === this.selected();

    if (this.revealed() && isCorrect) {
      return 'bg-success/15 border-success text-foreground';
    }

    if (this.revealed() && isSelected && !isCorrect) {
      return 'bg-destructive/10 border-destructive text-foreground';
    }

    return 'bg-card border-border hover:bg-brand-pale/60';
  }

  badgeClass(idx: number): string {
    const isCorrect = idx === this.q().answer;
    const isSelected = idx === this.selected();

    if (this.revealed() && isCorrect) {
      return 'border-success bg-success text-white';
    }

    if (this.revealed() && isSelected) {
      return 'border-destructive bg-destructive text-white';
    }

    return 'border-border bg-background';
  }

  badge(idx: number): string {
    const isCorrect = idx === this.q().answer;
    const isSelected = idx === this.selected();

    if (this.revealed() && isCorrect) {
      return '✓';
    }

    if (this.revealed() && isSelected) {
      return '✕';
    }

    return String.fromCharCode(65 + idx);
  }

}
