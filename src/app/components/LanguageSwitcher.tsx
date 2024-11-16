'use client';
import { useRouter } from 'next/router';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hu')}>Magyar</button>
    </div>
  );
};

export default LanguageSwitcher;
