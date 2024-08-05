// tmp
// TODO: use this namespace from package

declare namespace Vyber {
  // React helper similar to React.PropsWithChildren
  type PropsWithClassname<P = unknown> = P & {
    className?: string
  }
}
