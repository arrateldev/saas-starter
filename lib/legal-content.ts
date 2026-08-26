import type { Locale } from './i18n/config';
import { features } from './config/feature-flags';
import { siteConfig } from './site-config';

type LegalSectionContent = {
  title: string;
  paragraphs: string[];
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSectionContent[];
};

type LegalContent = {
  impressum: LegalPageContent;
  privacy: LegalPageContent;
  terms: LegalPageContent;
};

function compactParagraphs(paragraphs: Array<string | null | undefined>) {
  return paragraphs.filter((paragraph): paragraph is string => Boolean(paragraph));
}

function legalAddress(locale: Locale) {
  const address = siteConfig.company.address;

  return compactParagraphs([
    siteConfig.company.legalName,
    address?.street,
    address ? `${address.postalCode} ${address.city}` : null,
    address?.country[locale]
  ]);
}

function controllerDetails(locale: Locale) {
  return legalAddress(locale).join(', ');
}

function providerParagraphs(locale: Locale) {
  return siteConfig.privacy.providers
    .filter((provider) => {
      if (provider.id === 'payments') {
        return features.stripe;
      }

      if (provider.id === 'database') {
        return features.userProfiles;
      }

      return true;
    })
    .map(
      (provider) =>
        `${provider.name}: ${provider.purpose[locale]} (${provider.location[locale]}).`
    );
}

function fullModeParagraphs<T>(items: T[]) {
  return features.auth ? items : [];
}

function billingParagraphs<T>(items: T[]) {
  return features.billing ? items : [];
}

const legalContent: Record<Locale, LegalContent> = {
  de: {
    impressum: {
      eyebrow: 'Rechtliches',
      title: 'Impressum',
      intro:
        'Diese Angaben müssen vor einem öffentlichen geschäftsmäßigen Betrieb mit den vollständigen Anbieterinformationen ergänzt und geprüft werden.',
      sections: [
        {
          title: 'Angaben gemäß § 5 DDG',
          paragraphs: legalAddress('de')
        },
        {
          title: 'Vertreten durch',
          paragraphs: compactParagraphs([siteConfig.company.representative?.de])
        },
        {
          title: 'Kontakt',
          paragraphs: compactParagraphs([
            `E-Mail: ${siteConfig.company.contact.email}`,
            siteConfig.company.contact.phone
              ? `Telefon: ${siteConfig.company.contact.phone}`
              : null
          ])
        }
      ]
        .filter((section) => section.paragraphs.length > 0)
        .concat(
          siteConfig.company.register
            ? [
                {
                  title: 'Registereintrag',
                  paragraphs: [
                    `Handelsregister: ${siteConfig.company.register.court.de}`,
                    `Registernummer: ${siteConfig.company.register.number}`
                  ]
                }
              ]
            : [],
          siteConfig.company.vatId
            ? [
                {
                  title: 'Umsatzsteuer-ID',
                  paragraphs: [
                    `Umsatzsteuer-Identifikationsnummer: ${siteConfig.company.vatId}`
                  ]
                }
              ]
            : []
        )
    },
    privacy: {
      eyebrow: 'Rechtliches',
      title: 'Datenschutzerklärung',
      intro:
        'Diese Datenschutzerklärung beschreibt, welche personenbezogenen Daten bei der Nutzung von Arratel und darauf basierenden SaaS-Produkten verarbeitet werden.',
      sections: [
        {
          title: '1. Verantwortlicher',
          paragraphs: [
            `Verantwortlich für die Datenverarbeitung ist ${controllerDetails('de')}.`,
            `Bei Datenschutzfragen erreichst du uns unter ${siteConfig.company.contact.email}.`
          ]
        },
        {
          title: '2. Verarbeitete Daten',
          paragraphs: [
            'Beim Aufruf der Website werden technische Zugriffsdaten verarbeitet, die für Auslieferung, Sicherheit und Betrieb der Anwendung erforderlich sind.',
            ...fullModeParagraphs([
              'Bei der Registrierung und Nutzung verarbeiten wir Accountdaten wie E-Mail-Adresse, Name, Passwort-Hash, Rollen, Teamzuordnung, Einladungen und Zeitpunkte der Erstellung oder Aktualisierung.',
              'Für den Betrieb des Dashboards verarbeiten wir Teamdaten, Mitgliedschaften, Rollen, Aktivitätsereignisse und technische Informationen wie IP-Adressen, soweit sie für Sicherheit, Missbrauchsprävention und Nachvollziehbarkeit erforderlich sind.'
            ]),
            ...billingParagraphs([
              'Für kostenpflichtige Funktionen verarbeiten wir Abonnementdaten wie Stripe-Kundennummer, Stripe-Abonnementnummer, Produkt-ID, Planname und Abonnementstatus. Vollständige Zahlungsdaten wie Kreditkartennummern werden nicht in der Anwendung gespeichert.'
            ]),
            'Die aktuell enthaltene PDF-Oberfläche ist eine Demo. Solange keine echte Upload-Funktion implementiert ist, werden über diese Demo keine Dateien hochgeladen oder gespeichert.'
          ]
        },
        {
          title: '3. Zwecke und Rechtsgrundlagen',
          paragraphs: [
            'Wir verarbeiten Daten zur Bereitstellung der Anwendung, zur Sicherheit des Dienstes und zur Kommunikation mit Nutzern.',
            ...fullModeParagraphs([
              'Wenn Authentifizierung und Dashboard aktiv sind, verarbeiten wir Daten außerdem zur Verwaltung von Nutzerkonten und Teams.'
            ]),
            ...billingParagraphs([
              'Wenn Billing aktiv ist, verarbeiten wir Daten außerdem zur Abrechnung und Abonnementverwaltung.'
            ]),
            'Rechtsgrundlagen sind Vertragserfüllung und vorvertragliche Maßnahmen gemäß Art. 6 Abs. 1 lit. b DSGVO, gesetzliche Pflichten gemäß Art. 6 Abs. 1 lit. c DSGVO sowie berechtigte Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO, insbesondere an einem sicheren und zuverlässigen Betrieb.'
          ]
        },
        {
          title: '4. Cookies und lokale Speicherung',
          paragraphs: [
            features.auth
              ? 'Die Anwendung verwendet ein technisch notwendiges Session-Cookie zur Anmeldung und ein Locale-Cookie zur Speicherung der ausgewählten Sprache.'
              : 'Die Anwendung verwendet ein Locale-Cookie zur Speicherung der ausgewählten Sprache.',
            'Diese Cookies sind für Login, geschützte Bereiche und Sprachführung erforderlich. Tracking- oder Marketing-Cookies sind im aktuellen Code nicht implementiert.'
          ]
        },
        {
          title: '5. Empfänger und externe Dienstleister',
          paragraphs: [
            'Personenbezogene Daten können an technische Dienstleister übermittelt werden, die wir für Hosting, Sicherheit und den Betrieb der jeweils aktiven Funktionen einsetzen.',
            ...providerParagraphs('de'),
            'Bei einer Übermittlung in Drittländer achten wir auf geeignete Garantien, insbesondere EU-Standardvertragsklauseln oder vergleichbare Schutzmechanismen, soweit diese erforderlich sind.'
          ]
        },
        {
          title: '6. Speicherdauer',
          paragraphs: [
            'Technische Zugriffsdaten werden nur so lange gespeichert, wie dies für Betrieb, Sicherheit und Fehleranalyse erforderlich ist.',
            ...fullModeParagraphs([
              siteConfig.privacy.retention.accountData,
              siteConfig.privacy.retention.activityLogs
            ]),
            ...billingParagraphs([siteConfig.privacy.retention.billingData])
          ]
        },
        {
          title: '7. Rechte betroffener Personen',
          paragraphs: [
            'Du hast nach Maßgabe der DSGVO Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.',
            'Soweit eine Verarbeitung auf Einwilligung beruht, kannst du diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.',
            'Du hast außerdem das Recht, dich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.'
          ]
        },
        {
          title: '8. Keine automatisierten Entscheidungen',
          paragraphs: [
            'Eine automatisierte Entscheidungsfindung einschließlich Profiling mit rechtlicher Wirkung findet im aktuellen Stand der Anwendung nicht statt.'
          ]
        }
      ]
    },
    terms: {
      eyebrow: 'Rechtliches',
      title: 'Allgemeine Geschäftsbedingungen',
      intro:
        'Diese Bedingungen regeln die Nutzung von Arratel und darauf basierenden SaaS-Produkten, soweit keine produktspezifischen Bedingungen etwas anderes bestimmen.',
      sections: [
        {
          title: 'Geltungsbereich',
          paragraphs: [
            `Diese Bedingungen gelten für die Nutzung der von ${siteConfig.product.name} bereitgestellten Webanwendung.`,
            'Abweichende oder ergänzende Bedingungen können für einzelne Produkte gelten, wenn sie dort ausdrücklich angegeben werden.'
          ]
        },
        ...fullModeParagraphs([
          {
            title: 'Nutzerkonto und Zugang',
            paragraphs: [
              'Für geschützte Bereiche ist ein Nutzerkonto erforderlich. Nutzer müssen wahrheitsgemäße Angaben machen und ihre Zugangsdaten vertraulich behandeln.',
              'Handlungen, die unter einem Nutzerkonto vorgenommen werden, können dem jeweiligen Konto zugeordnet werden, soweit kein Missbrauch nachgewiesen wird.'
            ]
          },
          {
            title: 'Teams und Rollen',
            paragraphs: [
              'Die Anwendung unterstützt Teams, Mitgliederrollen und Einladungen. Team-Owner können Mitglieder verwalten und sind dafür verantwortlich, nur berechtigte Personen einzuladen.',
              'Entfernte Mitglieder verlieren den Zugriff auf die entsprechenden Teamdaten.'
            ]
          }
        ]),
        {
          title: 'Leistungen und Verfügbarkeit',
          paragraphs: [
            'Wir stellen die Anwendung als Software-as-a-Service bereit. Der konkrete Funktionsumfang ergibt sich aus dem jeweils verfügbaren Produktstand und dem gewählten Plan.',
            'Wir bemühen uns um einen zuverlässigen Betrieb, schulden aber keine ununterbrochene Verfügbarkeit, sofern nicht ausdrücklich etwas anderes vereinbart wurde.'
          ]
        },
        ...billingParagraphs([
          {
            title: 'Preise, Abonnements und Zahlungen',
            paragraphs: [
              'Kostenpflichtige Pläne werden nach den beim Abschluss angezeigten Preisen und Abrechnungsintervallen berechnet.',
              'Zahlungen und Abonnementverwaltung können über Stripe abgewickelt werden. Für die Zahlungsabwicklung gelten zusätzlich die Bedingungen und Datenschutzhinweise von Stripe.',
              'Im Entwicklungs- oder Testbetrieb kann ein Mock-Billing-Modus aktiv sein. Dieser löst keine echten Zahlungen aus.'
            ]
          }
        ]),
        {
          title: 'Pflichten der Nutzer',
          paragraphs: [
            'Nutzer dürfen die Anwendung nicht missbräuchlich verwenden, keine Rechte Dritter verletzen und keine rechtswidrigen, schädlichen oder sicherheitsgefährdenden Inhalte oder Aktivitäten einbringen.',
            'Falls ein Produkt Uploads oder Dateiverarbeitung anbietet, dürfen Nutzer nur Dateien verarbeiten, zu deren Nutzung sie berechtigt sind.'
          ]
        },
        ...fullModeParagraphs([
          {
            title: 'Kündigung und Kontolöschung',
            paragraphs: compactParagraphs([
              features.billing
                ? 'Nutzer können kostenpflichtige Abonnements nach den im jeweiligen Checkout oder Kundenportal angegebenen Bedingungen kündigen.'
                : null,
              'Ein Nutzerkonto kann gelöscht werden. Dabei wird der Account im System als gelöscht markiert und die E-Mail-Adresse zur Wahrung technischer Eindeutigkeit pseudonymisiert.'
            ])
          }
        ]),
        {
          title: 'Haftung',
          paragraphs: [
            'Wir haften unbeschränkt bei Vorsatz, grober Fahrlässigkeit sowie bei Verletzung von Leben, Körper oder Gesundheit.',
            'Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den typischerweise vorhersehbaren Schaden. Zwingende gesetzliche Haftung bleibt unberührt.'
          ]
        },
        {
          title: 'Änderungen',
          paragraphs: [
            'Wir können diese Bedingungen anpassen, wenn sich Funktionsumfang, rechtliche Anforderungen oder betriebliche Abläufe ändern. Wesentliche Änderungen werden rechtzeitig mitgeteilt.'
          ]
        },
        {
          title: 'Anwendbares Recht',
          paragraphs: [
            'Es gilt deutsches Recht, soweit keine zwingenden Verbraucherschutzvorschriften entgegenstehen.'
          ]
        }
      ]
    }
  },
  en: {
    impressum: {
      eyebrow: 'Legal',
      title: 'Imprint',
      intro:
        'These provider details must be completed and reviewed before operating a public commercial service.',
      sections: [
        {
          title: 'Provider Information',
          paragraphs: legalAddress('en')
        },
        {
          title: 'Represented by',
          paragraphs: compactParagraphs([siteConfig.company.representative?.en])
        },
        {
          title: 'Contact',
          paragraphs: compactParagraphs([
            `Email: ${siteConfig.company.contact.email}`,
            siteConfig.company.contact.phone
              ? `Phone: ${siteConfig.company.contact.phone}`
              : null
          ])
        }
      ]
        .filter((section) => section.paragraphs.length > 0)
        .concat(
          siteConfig.company.register
            ? [
                {
                  title: 'Commercial Register',
                  paragraphs: [
                    `Register Court: ${siteConfig.company.register.court.en}`,
                    `Registration Number: ${siteConfig.company.register.number}`
                  ]
                }
              ]
            : [],
          siteConfig.company.vatId
            ? [
                {
                  title: 'VAT ID',
                  paragraphs: [
                    `VAT identification number: ${siteConfig.company.vatId}`
                  ]
                }
              ]
            : []
        )
    },
    privacy: {
      eyebrow: 'Legal',
      title: 'Privacy Policy',
      intro:
        'This privacy policy explains which personal data is processed when using Arratel and SaaS products based on it.',
      sections: [
        {
          title: '1. Controller',
          paragraphs: [
            `The controller responsible for data processing is ${controllerDetails('en')}.`,
            `For privacy-related questions, contact ${siteConfig.company.contact.email}.`
          ]
        },
        {
          title: '2. Data We Process',
          paragraphs: [
            'When the website is accessed, technical access data is processed where required for delivery, security, and operation of the application.',
            ...fullModeParagraphs([
              'When users register and use the service, we process account data such as email address, name, password hash, roles, team assignments, invitations, and creation or update timestamps.',
              'For dashboard operation, we process team data, memberships, roles, activity events, and technical information such as IP addresses where required for security, abuse prevention, and traceability.'
            ]),
            ...billingParagraphs([
              'For paid features, we process subscription data such as Stripe customer ID, Stripe subscription ID, product ID, plan name, and subscription status. Full payment details such as credit card numbers are not stored by the application.'
            ]),
            'The currently included PDF interface is a demo. As long as no real upload feature is implemented, this demo does not upload or store files.'
          ]
        },
        {
          title: '3. Purposes and Legal Bases',
          paragraphs: [
            'We process data to provide the application, secure the service, and communicate with users.',
            ...fullModeParagraphs([
              'When authentication and dashboard features are active, we also process data to manage user accounts and teams.'
            ]),
            ...billingParagraphs([
              'When billing is active, we also process data for payment and subscription management.'
            ]),
            'Legal bases include contract performance and pre-contractual measures under Art. 6(1)(b) GDPR, legal obligations under Art. 6(1)(c) GDPR, and legitimate interests under Art. 6(1)(f) GDPR, especially secure and reliable operation.'
          ]
        },
        {
          title: '4. Cookies and Local Storage',
          paragraphs: [
            features.auth
              ? 'The application uses a technically necessary session cookie for authentication and a locale cookie to store the selected language.'
              : 'The application uses a locale cookie to store the selected language.',
            'These cookies are required for login, protected areas, and language handling. Tracking or marketing cookies are not implemented in the current codebase.'
          ]
        },
        {
          title: '5. Recipients and External Service Providers',
          paragraphs: [
            'Personal data may be transferred to technical service providers used for hosting, security, and operation of the currently active features.',
            ...providerParagraphs('en'),
            'Where data is transferred to third countries, we rely on appropriate safeguards such as EU Standard Contractual Clauses or comparable protection mechanisms where required.'
          ]
        },
        {
          title: '6. Retention',
          paragraphs: [
            'Technical access data is stored only as long as required for operation, security, and error analysis.',
            ...fullModeParagraphs([
              'Account and team data is stored while the account exists. After account deletion, the account is marked as deleted and the email address is pseudonymized to preserve technical uniqueness.',
              'Activity logs are stored for security, auditability, and product operation purposes and reviewed periodically.'
            ]),
            ...billingParagraphs([
              'Billing and tax-relevant data is retained according to statutory retention obligations.'
            ])
          ]
        },
        {
          title: '7. Data Subject Rights',
          paragraphs: [
            'Subject to the GDPR, you have rights of access, rectification, erasure, restriction of processing, data portability, and objection.',
            'Where processing is based on consent, you may withdraw that consent at any time with effect for the future.',
            'You also have the right to lodge a complaint with a competent data protection supervisory authority.'
          ]
        },
        {
          title: '8. No Automated Decision-Making',
          paragraphs: [
            'The current application does not use automated decision-making, including profiling, that produces legal effects.'
          ]
        }
      ]
    },
    terms: {
      eyebrow: 'Legal',
      title: 'Terms of Service',
      intro:
        'These terms govern the use of Arratel and SaaS products based on it unless product-specific terms state otherwise.',
      sections: [
        {
          title: 'Scope',
          paragraphs: [
            `These terms apply to the web application provided by ${siteConfig.product.name}.`,
            'Different or additional terms may apply to individual products where expressly stated.'
          ]
        },
        ...fullModeParagraphs([
          {
            title: 'User Account and Access',
            paragraphs: [
              'Protected areas require a user account. Users must provide accurate information and keep their credentials confidential.',
              'Actions performed under a user account may be attributed to that account unless misuse is proven.'
            ]
          },
          {
            title: 'Teams and Roles',
            paragraphs: [
              'The application supports teams, member roles, and invitations. Team owners can manage members and are responsible for inviting only authorized persons.',
              'Removed members lose access to the corresponding team data.'
            ]
          }
        ]),
        {
          title: 'Services and Availability',
          paragraphs: [
            'We provide the application as software as a service. The specific feature set depends on the available product version and selected plan.',
            'We strive for reliable operation but do not guarantee uninterrupted availability unless expressly agreed otherwise.'
          ]
        },
        ...billingParagraphs([
          {
            title: 'Prices, Subscriptions, and Payments',
            paragraphs: [
              'Paid plans are billed according to the prices and billing intervals shown during checkout.',
              'Payments and subscription management may be handled through Stripe. Stripe terms and privacy notices additionally apply to payment processing.',
              'A mock billing mode may be active in development or testing. It does not trigger real payments.'
            ]
          }
        ]),
        {
          title: 'User Obligations',
          paragraphs: [
            'Users must not misuse the application, infringe third-party rights, or introduce unlawful, harmful, or security-threatening content or activities.',
            'If a product offers uploads or file processing, users may only process files they are authorized to use.'
          ]
        },
        ...fullModeParagraphs([
          {
            title: 'Termination and Account Deletion',
            paragraphs: compactParagraphs([
              features.billing
                ? 'Users may cancel paid subscriptions according to the conditions shown in the checkout or customer portal.'
                : null,
              'A user account may be deleted. The account is then marked as deleted and the email address is pseudonymized to preserve technical uniqueness.'
            ])
          }
        ]),
        {
          title: 'Liability',
          paragraphs: [
            'We are fully liable for intent, gross negligence, and injury to life, body, or health.',
            'For slight negligence, we are liable only for breaches of essential contractual obligations and limited to typically foreseeable damages. Mandatory statutory liability remains unaffected.'
          ]
        },
        {
          title: 'Changes',
          paragraphs: [
            'We may update these terms if features, legal requirements, or operational processes change. Material changes will be communicated in due time.'
          ]
        },
        {
          title: 'Applicable Law',
          paragraphs: [
            'German law applies unless mandatory consumer protection rules provide otherwise.'
          ]
        }
      ]
    }
  }
};

export function getLegalContent(locale: Locale) {
  return legalContent[locale];
}
