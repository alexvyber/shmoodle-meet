import { cx } from "cvax"
import type React from "react"

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
}

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
}

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
}

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  side: "right" | "left" | "top" | "bottom"
} & React.PropsWithChildren

export const Drawer = ({ open, setOpen, children, side = "right" }: Props) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
    >
      <div className={cx("pointer-events-none fixed max-w-full ", classNames[side])}>
        <div
          className={cx(
            "pointer-events-auto relative w-full p-4 transform transition ease-in-out duration-500",
            open ? openClassNames[side] : closeClassNames[side]
          )}
          style={{
            height: "calc(100vh - 56px)",
          }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
        >
          <div className={cx("flex flex-col h-full overflow-y-scroll bg-white p-3 shadow-xl  rounded w-96")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
