import { defaultLocale, type Locale } from './config';
import { siteConfig } from '../site-config';

const messages = {
  de: {
    metadata: {
      title: siteConfig.product.metadata.title.de,
      description: siteConfig.product.metadata.description.de
    },
    common: {
      home: 'Start',
      pricing: 'Preise',
      faq: 'FAQ',
      links: 'Links',
      dashboard: 'Dashboard',
      features: 'Features',
      legal: 'Rechtliches',
      company: siteConfig.product.companyDisplayName,
      allRightsReserved: 'Alle Rechte vorbehalten.',
      backToHome: 'Zur Startseite'
    },
    home: {
      heroTitle: 'Baue dein SaaS',
      heroAccent: 'schneller als je zuvor',
      heroDescription:
        'Starte dein SaaS in Rekordzeit mit einer produktionsnahen Vorlage inklusive moderner Technologien und zentraler Integrationen.',
      heroEyebrow: 'Direkt nutzbar',
      deployCta: 'Eigenes Projekt deployen',
      productEyebrow: 'Produktbereich',
      productTitle: 'Hier sollte direkt das eigentliche SaaS starten.',
      productDescription:
        'Wenn dein Free-Plan sofort nutzbar ist, gehört das Kernprodukt direkt unter den ersten Marketing-Block. So landet der Nutzer ohne Umweg direkt im Tool.',
      productPrimaryCta: 'Produkt starten',
      productSecondaryCta: 'Preise ansehen',
      productPreviewTitle: 'Platz für dein erstes Tool',
      productPreviewBody:
        'Zum Beispiel ein PDF-Merger mit Upload, Queue und Ergebnis-Download. Dieser Bereich sollte später die eigentliche App-Oberfläche enthalten, nicht nur eine Demo.',
      productPreviewList: [
        'Kurze Einführung statt langem Hero',
        'Direkter Einstieg in den Free-Plan',
        'Upgrade erst nach echter Nutzung'
      ],
      featureTitle1: 'Next.js und React',
      featureBody1:
        'Moderne Webtechnologien für starke Performance und eine schnelle Developer Experience.',
      featureTitle2: 'Postgres und Drizzle ORM',
      featureBody2:
        'Robuste Datenhaltung mit schlankem ORM für klare Datenmodelle und saubere Skalierung.',
      featureTitle3: 'Stripe Integration',
      featureBody3:
        'Zahlungen und Subscriptions ohne Sonderwege, direkt mit Stripe eingebunden.',
      pricingBadge: 'Einfache Preise',
      pricingTitle: 'Kostenlos starten. Erst upgraden, wenn es Sinn ergibt.',
      pricingDescription:
        'Keine überladenen Pakete. Ein sauberer Free-Plan und ein Pro-Upgrade für regelmäßige Nutzung.',
      freeLabel: 'Free',
      freeTitle: 'Direkt loslegen',
      freeTag: 'Kein Risiko',
      freePrice: 'EUR 0',
      month: '/ Monat',
      freeDescription:
        'Ideal zum Testen, für kleine Workloads und für den ersten produktiven Eindruck ohne Zahlung.',
      freeFeatures: [
        'Basisnutzung inklusive',
        'Kernfunktionen freigeschaltet',
        'Klare und einfache UX',
        'Upgrade jederzeit möglich'
      ],
      freeCta: 'Kostenlos starten',
      proLabel: 'Pro',
      proTitle: 'Für regelmäßige Nutzung',
      proTag: 'Beliebteste Wahl',
      proPrice: 'EUR 9',
      proDescription:
        'Für Nutzer, die weniger Limits, schnellere Workflows und einen verlässlichen Daily-Use-Pfad wollen.',
      proFeatures: [
        'Alles aus Free',
        'Höhere Nutzungslimits',
        'Vorrang bei erweiterten Features',
        'Beste Wahl für wiederkehrende Workflows'
      ],
      proCta: 'Zu Pro wechseln',
      fullPricingCta: 'Alle Preise',
      footerDescription:
        'Einfache Werkzeuge für tägliche Workflows, gebaut mit Fokus auf Privatsphäre, Performance und klarer Nutzerführung.',
      legalLinks: {
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        terms: 'AGB'
      }
    },
    links: {
      title: 'Alle Links',
      description:
        'Die offiziellen Profile, Projekte und Kontaktwege von Arratel an einem Ort.',
      website: 'Website',
      contact: 'Kontakt'
    },
    faq: {
      eyebrow: 'Häufige Fragen',
      title: 'Antworten auf die wichtigsten Fragen vor dem Start.',
      intro:
        'Kurz, klar und ohne Sales-Floskeln. Hier findest du die Punkte, die vor Signup, Testphase oder Upgrade am häufigsten offen bleiben.',
      badgePrimary: 'Schnelle Antworten',
      badgeSecondary: 'Kein Support-Ticket nötig',
      sections: [
        {
          title: 'Produkt und Zugang',
          items: [
            {
              question: 'Kann ich das Produkt erst testen, bevor ich zahle?',
              answer:
                'Ja. Der Einstieg ist bewusst niedrig gehalten, damit du das Produkt erst im echten Kontext ausprobieren kannst, bevor ein Upgrade sinnvoll wird.'
            },
            {
              question: 'Brauche ich direkt ein Team oder mehrere Nutzer?',
              answer:
                'Nein. Du kannst allein starten und später weitere Mitglieder einladen, sobald dein Workflow stabil ist oder Zusammenarbeit wichtig wird.'
            },
            {
              question: 'Kann ich später auf einen bezahlten Plan wechseln?',
              answer:
                'Ja. Der Upgrade-Pfad ist bewusst einfach gehalten, damit du erst dann zahlst, wenn die Nutzung regelmäßig wird oder du mehr Limits brauchst.'
            }
          ]
        },
        {
          title: 'Abrechnung und Datenschutz',
          items: [
            {
              question: 'Was passiert mit meinen Daten, wenn ich kündige?',
              answer:
                'Dein Zugang und deine Daten sollten nachvollziehbar behandelt werden. Die rechtlichen Details findest du in Datenschutz und AGB, die im Footer verlinkt sind.'
            },
            {
              question: 'Fallen Kosten an, wenn ich das Produkt kaum nutze?',
              answer:
                'Das Produkt ist darauf ausgelegt, mit einer klaren Free- und Upgrade-Logik zu arbeiten. So entstehen Kosten erst dann, wenn die Nutzung den Mehrwert rechtfertigt.'
            },
            {
              question: 'Ist Stripe für Zahlungen verpflichtend?',
              answer:
                'Für echte Zahlungen ja. In der Entwicklung kann Billing aber im Mock-Modus simuliert werden, damit Produktarbeit ohne frühe Stripe-Abhängigkeit möglich bleibt.'
            }
          ]
        },
        {
          title: 'Technik und Betrieb',
          items: [
            {
              question: 'Brauche ich für den produktiven Betrieb eine eigene Datenbank?',
              answer:
                'Ja. Die App läuft separat von der Datenbank. In Production wird eine externe Postgres-Datenbank eingebunden, während lokal auch Docker oder eine gehostete Test-DB reicht.'
            },
            {
              question: 'Ist das eher für MVPs oder schon für echte Kunden gedacht?',
              answer:
                'Beides. Das Setup ist schlank genug für schnelle Validierung, aber strukturiert genug, um daraus ein produktives SaaS mit echten Nutzern weiterzuentwickeln.'
            },
            {
              question: 'Wie schnell komme ich ins Dashboard?',
              answer:
                'Sobald dein Account angelegt ist, kommst du direkt in den geschützten Bereich. Navigation und geladene Daten sind darauf ausgelegt, den Einstieg möglichst reibungsarm zu machen.'
            }
          ]
        }
      ],
      supportTitle: 'Noch etwas unklar?',
      supportBody:
        'Wenn eine Frage vor Signup oder Upgrade offen bleibt, sollte sie hier auftauchen. Wenn nicht, ist das ein Signal, dass die FAQ erweitert werden sollte.',
      supportPrimary: 'Preise ansehen',
      supportSecondary: 'Zum Start'
    },
    auth: {
      signInTitle: 'Melde dich in deinem Konto an',
      signUpTitle: 'Erstelle dein Konto',
      email: 'E-Mail',
      emailPlaceholder: 'E-Mail eingeben',
      password: 'Passwort',
      passwordPlaceholder: 'Passwort eingeben',
      loading: 'Lädt...',
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      newHere: 'Neu auf der Plattform?',
      existingAccount: 'Du hast bereits ein Konto?',
      createAccount: 'Konto erstellen',
      signInExisting: 'Mit bestehendem Konto anmelden'
    },
    header: {
      localeLabel: 'Sprache',
      navigation: 'Navigation',
      signIn: 'Anmelden',
      signOut: 'Abmelden',
      signUp: 'Registrieren',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen'
    },
    pricing: {
      mockBillingActive:
        'Mock Billing ist aktiv. Checkout und Subscription-Status laufen lokal ohne Stripe-Account.',
      withTrial: 'mit {days} Tagen kostenloser Testphase',
      perUser: 'pro Nutzer / {interval}',
      cta: 'Jetzt starten',
      currentPlan: 'Aktueller Plan',
      featuresBase: [
        'Unbegrenzte Nutzung',
        'Unbegrenzte Workspace-Mitglieder',
        'E-Mail-Support'
      ],
      featuresPlus: [
        'Alles aus Base',
        'Früher Zugriff auf neue Features',
        '24/7 Support plus Slack-Zugang'
      ]
    },
    dashboard: {
      settings: 'Einstellungen',
      nav: {
        team: 'Team',
        general: 'Allgemein',
        activity: 'Aktivität',
        security: 'Sicherheit'
      },
      teamSettings: 'Team-Einstellungen',
      teamSubscription: 'Team Subscription',
      currentPlan: 'Aktueller Plan',
      billedMonthly: 'Monatliche Abrechnung',
      trialPeriod: 'Testphase',
      noActiveSubscription: 'Keine aktive Subscription',
      manageSubscription: 'Subscription verwalten',
      teamMembers: 'Team-Mitglieder',
      noTeamMembers: 'Noch keine Team-Mitglieder.',
      removing: 'Entferne...',
      remove: 'Entfernen',
      inviteTeamMember: 'Team-Mitglied einladen',
      role: 'Rolle',
      member: 'Mitglied',
      owner: 'Owner',
      inviting: 'Lade ein...',
      inviteMember: 'Mitglied einladen',
      ownerOnly:
        'Du musst Team-Owner sein, um neue Mitglieder einzuladen.',
      generalSettings: 'Allgemeine Einstellungen',
      accountInformation: 'Kontoinformationen',
      name: 'Name',
      namePlaceholder: 'Deinen Namen eingeben',
      saveChanges: 'Änderungen speichern',
      saving: 'Speichert...',
      activityLog: 'Aktivitätsprotokoll',
      recentActivity: 'Letzte Aktivität',
      noActivityYet: 'Noch keine Aktivität',
      noActivityDescription:
        'Aktionen wie Login oder Kontoänderungen erscheinen später hier.',
      relativeTime: {
        justNow: 'gerade eben',
        minutesAgo: 'vor {count} Minuten',
        hoursAgo: 'vor {count} Stunden',
        daysAgo: 'vor {count} Tagen'
      },
      actions: {
        signUp: 'Du hast dich registriert',
        signIn: 'Du hast dich angemeldet',
        signOut: 'Du hast dich abgemeldet',
        updatePassword: 'Du hast dein Passwort geändert',
        deleteAccount: 'Du hast dein Konto gelöscht',
        updateAccount: 'Du hast dein Konto aktualisiert',
        createTeam: 'Du hast ein neues Team erstellt',
        removeTeamMember: 'Du hast ein Team-Mitglied entfernt',
        inviteTeamMember: 'Du hast ein Team-Mitglied eingeladen',
        acceptInvitation: 'Du hast eine Einladung angenommen',
        unknown: 'Unbekannte Aktion'
      },
      securitySettings: 'Sicherheitseinstellungen',
      currentPassword: 'Aktuelles Passwort',
      newPassword: 'Neues Passwort',
      confirmNewPassword: 'Neues Passwort bestätigen',
      updatePassword: 'Passwort aktualisieren',
      updating: 'Aktualisiert...',
      deleteAccount: 'Konto löschen',
      deleteWarning:
        'Das Löschen des Kontos kann nicht rückgängig gemacht werden. Bitte vorsichtig fortfahren.',
      confirmPassword: 'Passwort bestätigen',
      deleting: 'Löscht...',
      billingMockControl: 'Billing Mock Control',
      billingMockDescription:
        'Diese Seite ersetzt im Dev-Modus das Stripe Customer Portal. Hier steuerst du Plan und Status direkt.',
      currentTeamState: 'Aktueller Team-Status',
      plan: 'Plan',
      status: 'Status',
      productId: 'Produkt-ID',
      subscriptionId: 'Subscription-ID',
      applyState: 'Status setzen'
    },
    notFound: {
      title: 'Seite nicht gefunden',
      description:
        'Die gesuchte Seite wurde entfernt, umbenannt oder ist temporär nicht verfügbar.'
    }
  },
  en: {
    metadata: {
      title: siteConfig.product.metadata.title.en,
      description: siteConfig.product.metadata.description.en
    },
    common: {
      home: 'Home',
      pricing: 'Pricing',
      faq: 'FAQ',
      links: 'Links',
      dashboard: 'Dashboard',
      features: 'Features',
      legal: 'Legal',
      company: siteConfig.product.companyDisplayName,
      allRightsReserved: 'All rights reserved.',
      backToHome: 'Back to home'
    },
    home: {
      heroTitle: 'Build your SaaS',
      heroAccent: 'faster than ever',
      heroDescription:
        'Launch your SaaS quickly with a production-ready template that includes modern tooling and the integrations you actually need.',
      heroEyebrow: 'Ready to use',
      deployCta: 'Deploy your own',
      productEyebrow: 'Product area',
      productTitle: 'The actual SaaS should start here right away.',
      productDescription:
        'If the free plan is usable immediately, the core product belongs directly below the first marketing block. That gets users into the tool without friction.',
      productPrimaryCta: 'Launch product',
      productSecondaryCta: 'View pricing',
      productPreviewTitle: 'Space for your first tool',
      productPreviewBody:
        'For example a PDF merge tool with upload, queue, and result download. This area should later contain the real app interface, not just a demo.',
      productPreviewList: [
        'Short intro instead of a long hero',
        'Direct entry into the free plan',
        'Upgrade only after real usage'
      ],
      featureTitle1: 'Next.js and React',
      featureBody1:
        'Use modern web technologies for performance and a faster developer workflow.',
      featureTitle2: 'Postgres and Drizzle ORM',
      featureBody2:
        'A solid database stack with a clean ORM for maintainable data access and growth.',
      featureTitle3: 'Stripe Integration',
      featureBody3:
        'Payments and subscriptions handled cleanly through Stripe without extra plumbing.',
      pricingBadge: 'Simple pricing',
      pricingTitle: 'Start free. Upgrade when it actually makes sense.',
      pricingDescription:
        'No bloated plans. Just a clean free tier and a pro upgrade for regular usage.',
      freeLabel: 'Free',
      freeTitle: 'Get started',
      freeTag: 'No risk',
      freePrice: 'EUR 0',
      month: '/ month',
      freeDescription:
        'Perfect for testing the product, small workloads, and getting comfortable before paying anything.',
      freeFeatures: [
        'Basic usage included',
        'Core features available',
        'Clean and simple experience',
        'Upgrade anytime'
      ],
      freeCta: 'Start for free',
      proLabel: 'Pro',
      proTitle: 'Built for regular use',
      proTag: 'Most popular',
      proPrice: 'EUR 9',
      proDescription:
        'For users who want fewer limits, faster workflows, and a smoother path for daily use.',
      proFeatures: [
        'Everything in Free',
        'Higher usage limits',
        'Priority access to advanced features',
        'Best choice for regular workflows'
      ],
      proCta: 'Go Pro',
      fullPricingCta: 'Full pricing',
      footerDescription:
        'Simple tools for everyday workflows, built with a focus on privacy, performance, and a clean user experience.',
      legalLinks: {
        imprint: 'Imprint',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    },
    links: {
      title: 'All links',
      description:
        'The official profiles, projects, and contact paths for Arratel in one place.',
      website: 'Website',
      contact: 'Contact'
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'Answers to the questions that matter before getting started.',
      intro:
        'Short, clear, and without filler. This page covers the points people usually want to understand before signing up, testing the product, or upgrading.',
      badgePrimary: 'Fast answers',
      badgeSecondary: 'No support ticket needed',
      sections: [
        {
          title: 'Product and access',
          items: [
            {
              question: 'Can I try the product before paying?',
              answer:
                'Yes. The onboarding path is intentionally lightweight so you can evaluate the product in a real workflow before an upgrade becomes relevant.'
            },
            {
              question: 'Do I need a team or multiple users right away?',
              answer:
                'No. You can start solo and invite more people later once your workflow is stable or collaboration actually matters.'
            },
            {
              question: 'Can I upgrade to a paid plan later?',
              answer:
                'Yes. The upgrade path is designed to stay simple so you only pay once usage becomes regular or you need higher limits.'
            }
          ]
        },
        {
          title: 'Billing and privacy',
          items: [
            {
              question: 'What happens to my data if I cancel?',
              answer:
                'Access and data handling should stay predictable. The legal details are covered in the privacy policy and terms linked in the footer.'
            },
            {
              question: 'Will I be charged if I barely use the product?',
              answer:
                'The product is structured around a clear free-to-upgrade path so costs should only appear once the value and usage justify them.'
            },
            {
              question: 'Is Stripe required for payments?',
              answer:
                'For real billing, yes. During development, billing can still run in mock mode so product work is not blocked by early Stripe setup.'
            }
          ]
        },
        {
          title: 'Technical setup',
          items: [
            {
              question: 'Do I need my own database in production?',
              answer:
                'Yes. The app runs separately from the database. In production you connect an external Postgres database, while locally you can use Docker or a hosted test database.'
            },
            {
              question: 'Is this better suited for MVPs or real customers?',
              answer:
                'Both. The setup is lean enough for fast validation, but structured enough to keep evolving into a real SaaS used by actual customers.'
            },
            {
              question: 'How quickly can I get into the dashboard?',
              answer:
                'As soon as your account exists, you can move straight into the protected area. Navigation and data loading are designed to keep that path smooth.'
            }
          ]
        }
      ],
      supportTitle: 'Still missing an answer?',
      supportBody:
        'If something important is still unclear before sign-up or upgrade, it should probably live on this page. That is usually a content gap, not a user problem.',
      supportPrimary: 'View pricing',
      supportSecondary: 'Back home'
    },
    auth: {
      signInTitle: 'Sign in to your account',
      signUpTitle: 'Create your account',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      loading: 'Loading...',
      signIn: 'Sign in',
      signUp: 'Sign up',
      newHere: 'New to our platform?',
      existingAccount: 'Already have an account?',
      createAccount: 'Create an account',
      signInExisting: 'Sign in to existing account'
    },
    header: {
      localeLabel: 'Language',
      navigation: 'Navigation',
      signIn: 'Sign in',
      signOut: 'Sign out',
      signUp: 'Sign up',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    pricing: {
      mockBillingActive:
        'Mock billing is active. Checkout and subscription state run locally without a Stripe account.',
      withTrial: 'with {days} day free trial',
      perUser: 'per user / {interval}',
      cta: 'Get started',
      currentPlan: 'Current plan',
      featuresBase: [
        'Unlimited usage',
        'Unlimited workspace members',
        'Email support'
      ],
      featuresPlus: [
        'Everything in Base',
        'Early access to new features',
        '24/7 support plus Slack access'
      ]
    },
    dashboard: {
      settings: 'Settings',
      nav: {
        team: 'Team',
        general: 'General',
        activity: 'Activity',
        security: 'Security'
      },
      teamSettings: 'Team Settings',
      teamSubscription: 'Team Subscription',
      currentPlan: 'Current plan',
      billedMonthly: 'Billed monthly',
      trialPeriod: 'Trial period',
      noActiveSubscription: 'No active subscription',
      manageSubscription: 'Manage subscription',
      teamMembers: 'Team Members',
      noTeamMembers: 'No team members yet.',
      removing: 'Removing...',
      remove: 'Remove',
      inviteTeamMember: 'Invite Team Member',
      role: 'Role',
      member: 'Member',
      owner: 'Owner',
      inviting: 'Inviting...',
      inviteMember: 'Invite Member',
      ownerOnly: 'You must be a team owner to invite new members.',
      generalSettings: 'General Settings',
      accountInformation: 'Account Information',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      activityLog: 'Activity Log',
      recentActivity: 'Recent Activity',
      noActivityYet: 'No activity yet',
      noActivityDescription:
        "When you perform actions like signing in or updating your account, they'll appear here.",
      relativeTime: {
        justNow: 'just now',
        minutesAgo: '{count} minutes ago',
        hoursAgo: '{count} hours ago',
        daysAgo: '{count} days ago'
      },
      actions: {
        signUp: 'You signed up',
        signIn: 'You signed in',
        signOut: 'You signed out',
        updatePassword: 'You changed your password',
        deleteAccount: 'You deleted your account',
        updateAccount: 'You updated your account',
        createTeam: 'You created a new team',
        removeTeamMember: 'You removed a team member',
        inviteTeamMember: 'You invited a team member',
        acceptInvitation: 'You accepted an invitation',
        unknown: 'Unknown action occurred'
      },
      securitySettings: 'Security Settings',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      updatePassword: 'Update Password',
      updating: 'Updating...',
      deleteAccount: 'Delete Account',
      deleteWarning:
        'Account deletion is not reversible. Please proceed with caution.',
      confirmPassword: 'Confirm Password',
      deleting: 'Deleting...',
      billingMockControl: 'Billing Mock Control',
      billingMockDescription:
        'This page replaces the Stripe Customer Portal in development mode. Control the visible plan and status directly here.',
      currentTeamState: 'Current Team State',
      plan: 'Plan',
      status: 'Status',
      productId: 'Product ID',
      subscriptionId: 'Subscription ID',
      applyState: 'Apply State'
    },
    notFound: {
      title: 'Page Not Found',
      description:
        'The page you are looking for might have been removed, renamed, or is temporarily unavailable.'
    }
  }
} as const;

export function getMessages(locale: Locale = defaultLocale) {
  return messages[locale] ?? messages[defaultLocale];
}
