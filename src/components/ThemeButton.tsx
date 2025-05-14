import React from "react";
import { Button } from "./ui/button";

interface ThemeButtonProps extends React.ComponentProps<typeof Button> { }

export default function ThemeButton({ className, ...props }: ThemeButtonProps) {
  return (
    <Button
      className={`bg-mental-purple hover:bg-mental-blue text-white ${className}`}
      {...props}
    />
  );
}
