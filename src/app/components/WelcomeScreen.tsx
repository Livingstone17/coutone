import { User, UserRound } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onSelectGender: (gender: 'male' | 'female') => void;
}

export function WelcomeScreen({ onSelectGender }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl tracking-tight text-[var(--text-primary)]">
            Coutone
          </h1>
          <p className="text-stone-600">
            Match your outfit with confidence
          </p>
        </div>

        {/* Gender Selection Cards */}
        <div className="space-y-4 pt-8">
          <button
            onClick={() => onSelectGender('male')}
            className="w-full bg-[var(--bg-secondary)] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-color)] hover:border-stone-300 active:scale-[0.98] group"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-stone-100 group-hover:bg-stone-200 transition-colors flex items-center justify-center">
                <UserRound className="w-10 h-10 text-stone-700" />
              </div>
              <span className="text-xl text-[var(--text-primary)]">Male Styling</span>
            </div>
          </button>

          <button
            onClick={() => onSelectGender('female')}
            className="w-full bg-[var(--bg-secondary)] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-color)] hover:border-stone-300 active:scale-[0.98] group"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-stone-100 group-hover:bg-stone-200 transition-colors flex items-center justify-center">
                <User className="w-10 h-10 text-stone-700" />
              </div>
              <span className="text-xl text-[var(--text-primary)]">Female Styling</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
