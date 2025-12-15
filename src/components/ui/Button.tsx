import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
    
    const variants = {
      primary: "bg-orange text-white shadow-lg hover:shadow-orange/20 hover:scale-105 border border-transparent",
      secondary: "bg-transparent border-2 border-primary/10 text-primary hover:bg-primary/5"
    }

    const sizes = {
      default: "text-sm px-6 py-3 rounded-xl",     // Matches Home "Generate" & "Send" size
      lg: "text-lg px-8 py-4 rounded-2xl"          // Matches Artists/Tracks large CTAs
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
