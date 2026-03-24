@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand: #1B4D3E;
  --brand-light: #2E7D5E;
  --brand-pale: #E8F5EF;
  --gold: #C8922A;
  --gold-pale: #FDF4E7;
}

@layer base {
  html {
    -webkit-tap-highlight-color: transparent;
  }
  body {
    @apply antialiased;
  }
  * {
    box-sizing: border-box;
  }
}

@layer components {
  .btn-primary {
    @apply w-full flex items-center justify-center gap-2 bg-brand text-white 
           font-semibold text-base px-6 py-3 rounded-lg transition-colors
           hover:bg-brand-light active:scale-[0.99];
  }
  .btn-secondary {
    @apply w-full flex items-center justify-center gap-2 bg-transparent text-brand
           font-medium text-base px-5 py-[11px] rounded-lg border border-brand
           transition-colors hover:bg-brand-pale;
  }
  .card {
    @apply bg-white border border-gray-200 rounded-xl p-5 mb-4;
  }
  .section-title {
    @apply font-serif text-[22px] text-brand mb-1;
  }
  .section-sub {
    @apply text-sm text-gray-500 mb-6;
  }
  .tag {
    @apply px-3 py-1 rounded-full text-[13px] font-medium;
  }
  .tag-domain   { @apply bg-brand-pale text-brand; }
  .tag-language { @apply bg-purple-50 text-purple-700; }
  .tag-technical { @apply bg-blue-50 text-blue-700; }
  .tag-soft     { @apply bg-amber-50 text-amber-800; }
  .input-field {
    @apply w-full px-4 py-[11px] border border-gray-200 rounded-lg
           font-sans text-[15px] text-gray-900 bg-[#FAFAF8]
           focus:outline-none focus:border-brand-light focus:bg-white
           transition-colors;
  }
}
