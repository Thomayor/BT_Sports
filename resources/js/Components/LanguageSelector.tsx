import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FlagIconProps {
  countryCode?: string;
}

function FlagIcon({ countryCode = '' }: FlagIconProps) {
  return (
    <span
      className={`fi fis rounded-full text-2xl inline-block mr-2 fi-${countryCode === 'en' ? 'gb' : countryCode}`}
    />
  );
}

interface Language {
  key: string;
  name: string;
}

const LANGUAGE_SELECTOR_ID = 'language-selector';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages: Language[] = [
    { key: 'en', name: 'English' },
    { key: 'fr', name: 'Français' },
    { key: 'es', name: 'Español' },
    { key: 'it', name: 'Italiano' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const selectedLanguage = languages.find(
    language => language.key === i18n.language,
  );

  const handleLanguageChange = async (language: Language) => {
    await i18n.changeLanguage(language.key);
    setIsOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpen(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  if (!selectedLanguage) {
    return null;
  }

  return (
    <div className="flex items-center z-40">
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label="Language selector"
            className="inline-flex items-center justify-center w-full border-none px-2 py-3  text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id={LANGUAGE_SELECTOR_ID}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <FlagIcon countryCode={selectedLanguage.key} />
            <svg
              className="-mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-selector"
          >
            <div className="py-1 grid grid-cols-2 gap-2" role="none">
              {languages.map((language, index) => {
                return (
                  <button
                    type="button"
                    key={language.key}
                    onClick={() => handleLanguageChange(language)}
                    className={`${
                      selectedLanguage.key === language.key
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700'
                    } block px-4 py-2 text-sm text-left items-center  hover:bg-gray-100 ${index % 2 === 0 ? 'rounded-r' : 'rounded-l'}`}
                    role="menuitem"
                  >
                    <FlagIcon countryCode={language.key} />
                    <span className="truncate">{language.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LanguageSelector;
