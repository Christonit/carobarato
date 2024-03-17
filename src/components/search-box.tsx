import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import cx from 'classnames';
const SearchBox = ({
  options,
  onSearch,
  onSelected,
  className,
  alternative = false,
  loading = false,
  clearSearch,
}: {
  alternative?: boolean;
  loading?: boolean;
  className?: string;
  options?: Product[];
  onSearch: (value: string) => void;
  onSelected: (value: Product) => void;
  clearSearch?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (options && options?.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [options]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      onSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className={cx('dropdown', className)} ref={dropdownRef}>
      <div className='dropdown-header'>
        <div className='material-icons input-icon'>search</div>
        <input
          className=''
          ref={inputRef}
          placeholder='Buscar producto'
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={() => {
              inputRef.current!.value = '';
              setSearchTerm('');
              onSearch('');
            }}
            className='ml-auto material-icons delete-btn text-slate-500 !text-[20px] rounded-full border border-slate-300 h-[24px] min-w-[24px]'
          >
            close
          </button>
        )}
      </div>
      {isOpen && (
        <ul className='dropdown-list'>
          {options &&
            options.map(option => {
              return (
                <li
                  className='dropdown-list-item'
                  onClick={() => {
                    onSelected(option);
                    setIsOpen(false);
                  }}
                  key={Math.random()}
                >
                  {alternative ? (
                    <div>
                      <span className='text-slate-400 text-[14px] leading-tight mb-[4px] inline-block'>
                        {option.product_name}
                      </span>

                      <div className='flex'>
                        <span className='w-[24px] h-[24px]'>
                          <img
                            className='dropdown-img w-full mx-auto block'
                            src={option.img_url}
                          />
                        </span>

                        <b> ${option.prices && option.prices[0].list_price}</b>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className='w-[24px] h-[24px]'>
                        <img
                          className='dropdown-img w-full mx-auto block'
                          src={option.img_url}
                        />
                      </span>

                      <b> ${option.prices && option.prices[0].list_price}</b>
                      <span className='text-slate-400 text-[14px]'>
                        {option.product_name}
                      </span>
                    </>
                  )}
                </li>
              );
            })}

          {loading && (
            <li className='dropdown-list-item'>
              <img
                src='/images/loading.svg'
                alt='loading-spinner'
                className='mx-auto'
              />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
