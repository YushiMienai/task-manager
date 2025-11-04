import {ICONS} from '@constants'

export type IconName = keyof typeof ICONS

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export const Icon = ({name, className = "w-5 h-5", size}: IconProps) => {
  const icon = ICONS[name]

  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox={icon.viewBox}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={icon.path}
      />
    </svg>
  )
}