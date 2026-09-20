export const CONTACT_EMAIL = 'taskmarelabs@gmail.com';
export const CONTACT_WHATSAPP = '919760556855';

export const AI_PROJECT_TYPE = 'AI feature or automation';

// Each question is asked one at a time. `when` skips a question based on earlier answers.
export const leadQuestions = [
  {
    id: 'type',
    label: 'Project',
    text: 'What do you want to build?',
    options: ['Mobile app', 'Website or web app', AI_PROJECT_TYPE, 'Something else'],
  },
  {
    id: 'platform',
    label: 'Platform',
    text: 'Which platform should it run on?',
    options: ['Android', 'iOS', 'Android + iOS', 'Not sure yet'],
    when: (answers) => answers.type === 'Mobile app',
  },
  {
    id: 'details',
    label: 'Details',
    text: 'Tell us a little about it. What should it do and who is it for?',
    kind: 'text',
    placeholder: 'e.g. An app where customers can book appointments...',
    validate: (value) => (value.trim().length >= 5 ? '' : 'Please add a few words about your idea.'),
  },
  {
    id: 'timeline',
    label: 'Timeline',
    text: 'When do you need it?',
    options: ['As soon as possible', 'Within 1–3 months', '3+ months from now', 'Just exploring'],
  },
  {
    id: 'budget',
    label: 'Budget',
    text: 'What budget range are you working with?',
    options: ['Under ₹15,000', '₹15,000 – ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000+', 'Not sure yet'],
  },
  {
    id: 'name',
    label: 'Name',
    text: 'What’s your name?',
    kind: 'text',
    placeholder: 'Your name',
    validate: (value) => (value.trim() ? '' : 'Please enter your name.'),
  },
  {
    id: 'phone',
    label: 'Phone / WhatsApp',
    text: 'What’s the best phone or WhatsApp number to reach you on?',
    kind: 'text',
    inputType: 'tel',
    placeholder: '+91 98765 43210',
    validate: (value) => (value.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a valid phone number.'),
  },
  {
    id: 'email',
    label: 'Email',
    text: 'What’s your email? (optional)',
    kind: 'text',
    inputType: 'email',
    placeholder: 'you@company.com',
    optional: true,
    validate: (value) => (/^\S+@\S+\.\S+$/.test(value.trim()) ? '' : 'Please enter a valid email address.'),
  },
];

export function buildEnquiryMessage(answers) {
  const lines = leadQuestions
    .filter((question) => answers[question.id])
    .map((question) => `${question.label}: ${answers[question.id]}`);
  return ['New project enquiry for Taskmare Labs', '', ...lines].join('\n');
}
