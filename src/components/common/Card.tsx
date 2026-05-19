import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { motion, Transition } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'outline' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    hover = false,
    padding = 'md',
    children, 
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-100 shadow-sm',
      gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm',
      outline: 'bg-transparent border-2 border-gray-200',
      glass: 'bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const transition: Transition = {
      type: 'spring',
      stiffness: 300,
    };

    const cardContent = (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );

    if (hover) {
      return (
        <motion.div
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          transition={transition}
        >
          {cardContent}
        </motion.div>
      );
    }

    return cardContent;
  }
);

Card.displayName = 'Card';

export default Card;
