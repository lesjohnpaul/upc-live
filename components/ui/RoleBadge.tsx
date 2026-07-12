'use client';

import { ROLES, type Role } from '@/lib/types';

type RoleBadgeProps = {
  role: Role;
  className?: string;
};

/* ponytail: static class map so Tailwind sees full class names */
const hue: Record<Role, string> = {
  head_teacher: 'bg-gold-400/15 text-gold-600 ring-gold-400/40',
  nurse_dentist: 'bg-spruce-400/15 text-spruce-600 ring-spruce-400/40',
  counselor: 'bg-clay-400/15 text-clay-600 ring-clay-400/40',
  admin: 'bg-forest-400/15 text-forest-600 ring-forest-400/40',
};

const dot: Record<Role, string> = {
  head_teacher: 'bg-gold-500',
  nurse_dentist: 'bg-spruce-400',
  counselor: 'bg-clay-400',
  admin: 'bg-forest-500',
};

/** Pill identifying one of the four participant roles. */
export default function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-full px-5 font-sans text-sm font-bold tracking-wide ring-1 ring-inset ${hue[role]} ${className}`}
    >
      <span aria-hidden className={`size-2 rounded-full ${dot[role]}`} />
      {ROLES[role]}
    </span>
  );
}
