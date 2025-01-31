import * as React from "react";

// Simple utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Card component
const Card = React.forwardRef(({
  className,
  bordered = true,
  children,
  style,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-lg shadow-sm",
      bordered && "border border-gray-200",
      className
    )}
    style={style}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

// Space component for layout
const Space = React.forwardRef(({
  children,
  direction = "horizontal",
  size = "middle",
  style,
  className,
  ...props
}, ref) => {
  const getSpacing = () => {
    switch(size) {
      case "small": return "gap-2";
      case "large": return "gap-6";
      default: return "gap-4";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        getSpacing(),
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});
Space.displayName = "Space";

// Typography components
const Typography = {
  Title: ({ level = 4, children, style, className, ...props }) => {
    const getSize = () => {
      switch(level) {
        case 1: return "text-4xl font-bold";
        case 2: return "text-3xl font-bold";
        case 3: return "text-2xl font-bold";
        case 4: return "text-xl font-bold";
        case 5: return "text-lg font-bold";
        default: return "text-base font-bold";
      }
    };

    return (
      <div
        className={cn(getSize(), className)}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  },
  Text: ({ children, style, className, ...props }) => (
    <span
      className={cn("text-base", className)}
      style={style}
      {...props}
    >
      {children}
    </span>
  )
};

export { Card, Space, Typography };