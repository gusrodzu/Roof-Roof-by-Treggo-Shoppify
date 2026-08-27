export function ExperienceIcon({name, size = 24}) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    sparkles: (
      <svg {...props}>
        <path d="M12 3l1.1 3.2L16 7.5l-2.9 1.3L12 12l-1.1-3.2L8 7.5l2.9-1.3L12 3z" />
        <path d="M18.5 13l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
      </svg>
    ),
    ruler: (
      <svg {...props}>
        <path d="M3 17l4 4L21 7l-4-4L3 17z" />
        <path d="M7 17l-2-2M11 13l-2-2M15 9l-2-2M19 5l-2-2" />
      </svg>
    ),
    book: (
      <svg {...props}>
        <path d="M4 4.5A2.5 2.5 0 016.5 2H11v18H6.5A2.5 2.5 0 004 22V4.5z" />
        <path d="M20 4.5A2.5 2.5 0 0017.5 2H13v18h4.5A2.5 2.5 0 0120 22V4.5z" />
      </svg>
    ),
    account: (
      <svg {...props}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0116 0" />
      </svg>
    ),
    home: (
      <svg {...props}>
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    moon: (
      <svg {...props}>
        <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
      </svg>
    ),
    lock: (
      <svg {...props}>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
    bowl: (
      <svg {...props}>
        <path d="M4 11h16c0 5-3.6 9-8 9s-8-4-8-9z" />
        <path d="M7 8c0-2 1.2-3 3-3M14 8c0-2 1.2-3 3-3" />
      </svg>
    ),
    shield: (
      <svg {...props}>
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    support: (
      <svg {...props}>
        <path d="M4 15v-3a8 8 0 0116 0v3" />
        <path d="M4 15a2 2 0 002 2h1v-6H6a2 2 0 00-2 2v2zM20 15a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2v2z" />
      </svg>
    ),
    truck: (
      <svg {...props}>
        <path d="M3 5h11v12H3zM14 9h4l3 3v5h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    ),
    building: (
      <svg {...props}>
        <path d="M4 21V5l8-3 8 3v16" />
        <path d="M9 21v-5h6v5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
    heart: (
      <svg {...props}>
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z" />
      </svg>
    ),
    compare: (
      <svg {...props}>
        <path d="M8 3L4 7l4 4M4 7h13a3 3 0 013 3" />
        <path d="M16 21l4-4-4-4M20 17H7a3 3 0 01-3-3" />
      </svg>
    ),
    checklist: (
      <svg {...props}>
        <path d="M9 6h11M9 12h11M9 18h11" />
        <path d="M3.5 6l1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2" />
      </svg>
    ),
    paw: (
      <svg {...props}>
        <circle cx="8" cy="7" r="2" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <path d="M12 11c-3.5 0-6 3.1-6 6 0 2 1.5 3 3.2 3 1 0 1.8-.5 2.8-.5s1.8.5 2.8.5c1.7 0 3.2-1 3.2-3 0-2.9-2.5-6-6-6z" />
      </svg>
    ),
    arrow: (
      <svg {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
  };

  return icons[name] ?? icons.paw;
}
