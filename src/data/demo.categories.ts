import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2, LucideIcon } from 'lucide-react'

export interface CategoryWithIcon {
  name: string
  iconName: string
}

export const categories: CategoryWithIcon[] = [
  { name: 'Mobile', iconName: 'Smartphone' },
  { name: 'Computer', iconName: 'Monitor' },
  { name: 'Smartwatch', iconName: 'Watch' },
  { name: 'Camera', iconName: 'Camera' },
  { name: 'Headphones', iconName: 'Headphones' },
  { name: 'Gaming', iconName: 'Gamepad2' },
]

export const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
}

