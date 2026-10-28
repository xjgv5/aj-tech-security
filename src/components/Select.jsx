import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Select({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  return (
    <div className="sel">
      <button type="button" className="sel-btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={value ? '' : 'ph'}>{value || placeholder}</span>
        <i className="fa-solid fa-chevron-down" style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      <AnimatePresence>
        {open && <div key="v" className="sel-veil" onClick={() => setOpen(false)} />}
        {open && (
          <motion.ul key="l" className="sel-list" role="listbox"
            initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 460, damping: 30 }}>
            {options.map((o) => (
              <li key={o} role="option" aria-selected={o === value} onClick={() => { onChange(o); setOpen(false) }}>
                {o}{o === value && <i className="fa-solid fa-check" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
