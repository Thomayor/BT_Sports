import { Link } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';
import HomePageLogo from '@/Components/HomePageLogo';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({ canLogin, canRegister }: Props) {
  const route = useRoute();
  const page = useTypedPage();

  const BTSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-send"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );

  return (
    <section className="relative">
      <Head title="Welcome" />

      <div className="relative min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-sky-500 selection:text-white">
        {canLogin ? (
          <div className="absolute top-6 right-6 z-10">
            {page.props.auth.user ? (
              <Link
                href={route('dashboard')}
                className="font-semibold text-sky-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-sky-500"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="font-semibold text-white hover:text-gray-200 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-sky-500"
                >
                  Log in
                </Link>

                {canRegister ? (
                  <Link
                    href={route('register')}
                    className="ml-4 font-semibold text-white hover:text-gray-200 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-sky-500"
                  >
                    Register
                  </Link>
                ) : null}
              </>
            )}
          </div>
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center ">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/assets/sports.webm" type="video/webm" />
            <source src="/assets/sports.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
            <div className="text-4xl font-bold text-white">
              <div className="flex justify-center">
                <HomePageLogo />
              </div>
              Practicing every sport, everywhere, with everyone
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
