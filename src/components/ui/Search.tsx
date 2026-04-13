import React, { useState, useEffect } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SearchProps {
  onSearch: (value: string) => void
  placeholder?: string
  className?: string
  debounceTime?: number
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Search...',
  className,
  debounceTime = 300,
}) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value)
    }, debounceTime)

    return () => clearTimeout(handler)
  }, [value, debounceTime, onSearch])

  return (
    <div className={cn('relative group w-full max-w-sm', className)}>
      <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
      />
    </div>
  )
}

export default Search
