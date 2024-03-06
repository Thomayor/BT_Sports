import React, { useEffect, useRef, useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  response: string;
}

interface DropdownFAQProps {
  faqs: FAQ[];
}

function DropdownFAQ({ faqs }: DropdownFAQProps) {
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>(faqs);

  const handleSearchFocus = () => {
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filterFaqs = () => {
    const lowerCaseSearch = search.toLowerCase();
    const filtered = faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(lowerCaseSearch) ||
        faq.response.toLowerCase().includes(lowerCaseSearch),
    );
    setFilteredFaqs(filtered);
  };

  useEffect(() => {
    filterFaqs();
  }, [search, faqs]);

  return (
    <div>
      <style>
        {`
            * {
              font-family: 'Quicksand', sans-serif;
            }
          `}
      </style>

      <article id="the-article">
        <div>
          <div className="mx-auto max-w-6xl">
            <div className="p-2 rounded">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4 text-sm">
                  <div className="sticky inset-x-0 top-0 left-0 py-12">
                    <div className="text-3xl text-green-400 mb-8">
                      Frequently asked questions.
                    </div>
                    <div className="mb-2">Lorem Ipsum ?</div>
                    <div className="text-xs text-gray-600">
                      See our FAQ for more details
                    </div>
                    <div className="relative text-gray-600 mt-8 lg:mr-16">
                      <input
                        aria-label="Close"
                        id="search"
                        ref={searchFieldRef}
                        value={search}
                        onKeyDown={e => e.key === '/' && handleSearchFocus()}
                        onChange={e => setSearch(e.target.value)}
                        type="search"
                        name="search"
                        placeholder="Search"
                        className="bg-white w-full h-10 px-5 rounded-full text-sm focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="focus:outline-none absolute right-0 top-0 mt-3 mr-4"
                        aria-label="Submit Search"
                      >
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 56.966 56.966"
                          xmlSpace="preserve"
                          width="512px"
                          height="512px"
                        >
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 py-12">
                  <div className="p-4">
                    {filteredFaqs.map(element => (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleAccordion(element.id)}
                        onKeyPress={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            toggleAccordion(element.id);
                          }
                        }}
                        className={`item px-6 py-6 ${
                          element.id === activeIndex ? 'active' : ''
                        }`}
                        key={element.id}
                      >
                        <h4
                          className={
                            element.id === activeIndex
                              ? 'text-green-400 font-medium'
                              : ''
                          }
                        >
                          {element.question}
                        </h4>
                        <svg
                          className={`w-5 h-5 text-gray-500 ${
                            element.id === activeIndex
                              ? 'transform rotate-180'
                              : ''
                          }`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleAccordion(element.id)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              toggleAccordion(element.id);
                            }
                          }}
                          className={`mt-3 ${
                            element.id === activeIndex
                              ? 'text-gray-600'
                              : 'hidden'
                          }`}
                        >
                          <p>{element.response}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div
        className="fixed h-screen w-1 hover:bg-gray-200 top-0 left-0 bg-gray-300"
        aria-hidden="true"
        // onScroll={e => calculateHeight(e.currentTarget.scrollTop)}
      >
        <div className="h-full bg-green-400" />
      </div>

      <div id="alpine-devtools" />
    </div>
  );
}

export default DropdownFAQ;
