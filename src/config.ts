export const site = {
  name: 'Ishan Asati',
  brand: 'ishan.asati',
  wordmark: 'ishan.asati.',
  title: 'Ishan Asati — Ideas into things.',
  description:
    'Ishan Asati is a student, developer and maker in India, exploring artificial intelligence, software engineering and embedded systems. A portfolio of projects, experiments and notes.',
  url: 'https://ishan.devs.surf',
  email: 'hello@smartfools.in',
  github: 'https://github.com/IshanAsati',
  location: 'India',
  issue: 'Vol. 01',
  year: 2026,
  tagline: 'Ideas into things.',
} as const;

export const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Notes', href: '/notes' },
] as const;

export const socialLinks = [
  { label: 'GitHub', href: site.github, external: true },
  { label: 'Email', href: `mailto:${site.email}`, external: false },
] as const;
