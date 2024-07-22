import { cx } from "cvax"

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
} & React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">

export function Heading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cx(className, "text-2xl/8  text-zinc-950 sm:text-3xl/8 dark:text-white")}
    />
  )
}

export function Subheading({ className, level = 3, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cx(className, "text-base/7  text-zinc-950 sm:text-lg/6 dark:text-white")}
    />
  )
}
