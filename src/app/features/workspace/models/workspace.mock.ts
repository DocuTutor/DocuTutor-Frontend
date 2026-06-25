import { ChatMessage, QuizQuestion, SummaryData, WorkspaceDocument, WorkspaceTabOption } from '../models/workspace.models';

export const workspaceTabs: WorkspaceTabOption[] = [
  { id: 'chat', label: '💬 Chat' },
  { id: 'quiz', label: '🧪 Quiz Me' },
  { id: 'summary', label: '📝 Summary' },
];


export const documents: WorkspaceDocument[] = [
  { id: "neural-networks", title: "Introduction to Neural Networks", type: "PDF", pages: 42, size: "3.2 MB", updatedAt: "2h ago", progress: 78, emoji: "🧠", color: "from-brand-deep to-brand" },
  { id: "organic-chemistry", title: "Organic Chemistry — Chapter 7", type: "PDF", pages: 28, size: "2.1 MB", updatedAt: "Yesterday", progress: 45, emoji: "⚗️", color: "from-brand to-brand-soft" },
  { id: "macroeconomics", title: "Macroeconomics Final Review", type: "DOCX", pages: 18, size: "0.9 MB", updatedAt: "3d ago", progress: 12, emoji: "📈", color: "from-brand-soft to-brand" },
  { id: "world-history", title: "World History — Cold War Era", type: "PDF", pages: 64, size: "5.6 MB", updatedAt: "1w ago", progress: 100, emoji: "🌍", color: "from-brand-deep to-brand-soft" },
];

export const suggestedPrompts = [
  "Summarize chapter 3 in plain English",
  "Explain back-propagation like I'm a beginner",
  "What are the key terms I should memorize?",
  "Give me 5 likely exam questions",
];


export const seedChat: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hi! I've finished reading **Introduction to Neural Networks**. I can explain concepts, quote pages, or generate practice questions. Where would you like to start?",
  },
  {
    id: "m2",
    role: "user",
    content: "Explain the difference between a perceptron and a multi-layer network.",
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "A **perceptron** is the simplest neuron — a single layer that computes a weighted sum of inputs and applies an activation. It can only learn linearly-separable patterns.\n\nA **multi-layer network** stacks several layers of perceptrons with non-linear activations (like ReLU). The hidden layers let it model complex, non-linear decision boundaries — which is why it can solve XOR while a single perceptron cannot.",
    citations: [
      { page: 7, label: "p.7 — Perceptron model" },
      { page: 12, label: "p.12 — Hidden layers" },
    ],
  },
];



export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    q: "Which activation function is most commonly used in modern hidden layers?",
    options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
    answer: 2,
    explanation: "ReLU avoids the vanishing-gradient problem and is computationally cheap, making it the default for hidden layers.",
  },
  {
    id: "q2",
    q: "What problem does back-propagation solve?",
    options: ["Choosing the network architecture", "Efficiently computing gradients for every weight", "Selecting training data", "Preventing overfitting directly"],
    answer: 1,
    explanation: "Back-propagation applies the chain rule to compute partial derivatives of the loss w.r.t. every weight in one backward pass.",
  },
  {
    id: "q3",
    q: "A single perceptron cannot learn the XOR function because it is…",
    options: ["Too slow", "Not linearly separable", "Too deep", "Stochastic"],
    answer: 1,
    explanation: "XOR cannot be separated by a single straight line, so a single-layer perceptron fails. Adding a hidden layer fixes it.",
  },
];

export const summary = {
  title: "Introduction to Neural Networks",
  reading: "12 min read",
  generated: "Just now",
  sections: [
    { heading: "Core idea", body: "A neural network learns a function from data by adjusting the weights of stacked layers of artificial neurons. Training minimizes a loss with gradient-based optimization." },
    { heading: "Key components", body: "Neurons compute a weighted sum + non-linear activation. Layers stack neurons; depth gives the model expressive power. The loss function defines what 'good' means for a task." },
    { heading: "How it learns", body: "Forward pass produces a prediction; the loss compares it to the target. Back-propagation pushes gradients backward; an optimizer (SGD, Adam) updates the weights." },
  ],
  keyTerms: [
    { term: "Weight", def: "A learnable parameter that scales an input signal." },
    { term: "Activation", def: "Non-linear function applied to a neuron's output (ReLU, sigmoid)." },
    { term: "Loss", def: "Scalar measuring how wrong the prediction is." },
    { term: "Gradient descent", def: "Iterative algorithm that follows the negative gradient of the loss." },
    { term: "Epoch", def: "One full pass over the training dataset." },
  ],
  studyTips: [
    "Sketch the forward pass for a 2-layer network on paper before the exam.",
    "Memorize the formula for ReLU and its derivative — it's an easy mark.",
    "Practice deriving the gradient for a small example by hand.",
  ],
};
export const previewLines = [100, 96, 88, 92, 70, 100, 84, 76, 92, 60];