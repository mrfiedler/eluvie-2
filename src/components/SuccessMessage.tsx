
import { useLanguage } from '@/contexts/LanguageContext';

interface SuccessMessageProps {
  className?: string;
}

const SuccessMessage = ({ className = "" }: SuccessMessageProps) => {
  const { t } = useLanguage();
  
  return (
    <div className={`bg-[#1a1a1a]/70 border border-gray-700 rounded-xl p-8 text-center ${className}`}>
      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {t('thank-you')}
      </h3>
      <p className="text-gray-400">
        {t('notify-launch')}
      </p>
    </div>
  );
};

export default SuccessMessage;
