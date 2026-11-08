import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18, delay }}>
      {children}
    </motion.div>
  )
}
