export type DocPage = {
  href: string;
  title: string;
  lede: string;
  sections: [id: string, label: string][];
};

export const groups: { title: string; pages: DocPage[] }[] = [
  {
    title: 'getting started',
    pages: [
      {
        href: '/docs',
        title: 'introduction',
        lede: 'the client model, the fpui project split, and a guide to these docs.',
        sections: [
          ['overview', 'what maycord is'],
          ['fpui', 'built on fpui'],
          ['next', 'where to go next']
        ]
      },
      {
        href: '/docs/installation',
        title: 'installation',
        lede: 'requirements, startup, app changes, and removal behavior.',
        sections: [
          ['requirements', 'what you will need'],
          ['injector', 'the planned launch flow'],
          ['wrapper', 'automatic loading'],
          ['removing', 'removing a wrap'],
          ['offline', 'what changes on disk']
        ]
      }
    ]
  },
  {
    title: 'the project',
    pages: [
      {
        href: '/docs/parity',
        title: 'features',
        lede: 'plugin portability, theme formats, and behavior after client updates.',
        sections: [
          ['scope', 'client background'],
          ['plugins', 'plugins'],
          ['themes', 'themes'],
          ['updates', 'client updates']
        ]
      },
      {
        href: '/docs/status',
        title: 'status and roadmap',
        lede: 'release availability, supported clients, test results, and remaining milestones.',
        sections: [
          ['discord', 'availability and supported clients'],
          ['demonstrated', 'what fpui has demonstrated'],
          ['remaining', 'what remains for maycord'],
          ['license', 'licensing']
        ]
      },
      {
        href: '/docs/development',
        title: 'development',
        lede: 'choose where to contribute, get source access, and run the website locally.',
        sections: [
          ['scope', 'where to contribute'],
          ['client', 'working on the client'],
          ['website', 'working on this website'],
          ['contributing', 'sharing work']
        ]
      }
    ]
  }
];

export const pages = groups.flatMap((group) => group.pages);
