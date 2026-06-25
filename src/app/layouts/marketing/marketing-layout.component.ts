import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketingNavbarComponent } from './components/navbar/marketing-navbar.component';
import { MarketingFooterComponent } from './components/footer/marketing-footer.component';

interface Feature { tag: string; title: string; desc: string; img: string; bullets: string[]; }
interface PricingMini { tier: string; price: string; desc: string; items: string[]; highlight?: boolean; }

@Component({
  selector: 'app-marketing-layout',
  templateUrl: './marketing-layout.component.html',
  styleUrls: ['./marketing-layout.component.css'],
  standalone: true,
  imports: [RouterOutlet, MarketingNavbarComponent, MarketingFooterComponent],
  
})
export class MarketingLayoutComponent {

  pad = (n: number) => String(n).padStart(2, "0");
  avatars = ["avatar-1.png", "avatar-2.png", "avatar-3.png"];
  unis = ["STANFORD", "MIT", "OXFORD", "ETH ZÜRICH", "NUS", "UC BERKELEY"];
  steps = [
    { n: "01", t: "Upload", d: "Drag in a PDF or DOCX — up to 200 pages on the free plan.", i: "📎" },
    { n: "02", t: "Process", d: "We chunk, embed and index the document privately to your account.", i: "✨" },
    { n: "03", t: "Study", d: "Chat with it, quiz yourself, or generate a structured summary.", i: "🎓" },
    { n: "04", t: "Master", d: "Track progress, revisit weak spots, and retain more — calmly.", i: "🏆" },
  ];
  features: Feature[] = [
    { tag: "Chat", title: "Ask anything, get cited answers.", desc: "Have a real conversation with your document. Every answer is grounded in the source, with page-level citations you can verify.",
      img: "feature-chat.png", bullets: ["Page-level citations", "Follow-up suggestions", "Plain-English explanations"] },
    { tag: "Quiz Me", title: "Practice questions, auto-graded.", desc: "Generate MCQs straight from your material. Get feedback, retry, and watch your confidence climb session by session.",
      img: "feature-quiz.png", bullets: ["MCQ + true/false", "Instant explanations", "Difficulty modes"] },
    { tag: "Summarize", title: "Study notes that actually scan.", desc: "Get a structured outline with key terms and study tips — perfect for a last-minute review the night before.",
      img: "feature-summary.png", bullets: ["Sectioned headings", "Key term glossary", "Copy / export ready"] },
  ];
  stats = [
    { k: "3.2×", l: "Faster review sessions", d: "Skip skimming. Ask, quiz, done." },
    { k: "84%", l: "Better retention", d: "Active recall built into every tool." },
    { k: "12k+", l: "Documents studied weekly", d: "From textbooks to lecture notes." },
    { k: "4.9★", l: "Student rating", d: "Loved across 90+ universities." },
  ];
  testimonials = [
    { name: "Maya R.", role: "CS Junior, Stanford", img: "avatar-1.png", q: "It feels like having a TA on call. The cited answers are the killer feature — I trust them." },
    { name: "Ethan K.", role: "Med Student, Oxford", img: "avatar-2.png", q: "I run every lecture PDF through DocuTutor before exams. My retention is honestly through the roof." },
    { name: "Priya N.", role: "PhD, ETH Zürich", img: "avatar-3.png", q: "The quizzes catch the gaps I didn't know I had. Beautiful UI is the cherry on top." },
  ];
  miniPricing: PricingMini[] = [
    { tier: "Free", price: "$0", desc: "Try DocuTutor with 3 documents per month.", items: ["3 documents / mo", "Chat & summary", "10 quiz questions"] },
    { tier: "Pro", price: "$9", highlight: true, desc: "Everything you need for a busy semester.", items: ["Unlimited documents", "Unlimited chat & quizzes", "Priority processing", "Export to Notion / Markdown"] },
    { tier: "Student Plus", price: "$5", desc: "50% off with a verified .edu email.", items: ["All of Pro", "Verified student badge", "Group study (soon)"] },
  ];
  faq: [string, string][] = [
    ["Which file types can I upload?", "PDF and DOCX, up to 200 pages on the free plan and 500 pages on Pro."],
    ["Is my document private?", "Yes. Documents are encrypted at rest, scoped to your account, and never used to train models."],
    ["Does DocuTutor make things up?", "Answers are grounded in your document and cited. If something isn't in the doc, the tutor says so."],
    ["Can I use it for textbooks?", "Absolutely — textbook chapters, lecture notes, research papers and slide decks all work."],
    ["Do you offer a student discount?", "Yes. Verify with a .edu email and get 50% off Pro forever."],
  ];
}
