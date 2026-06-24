import './style.scss'

// Language strings
const i18n: Record<string, Record<string, string>> = {
  en: {
    name: 'name', email: 'email', message: 'message', submit: 'submit', thanks: 'THANK YOU',
    'bio-intro': 'Creative developer based in',
    'bio-mid': "I'm building immersive digital experiences at",
    'bio-end': 'I like creating things that live between design and code. I usually goes by',
    'section-websites': 'websites',
    'section-contact': 'contact',
    'desc-dececco': 'Institutional website redesign. The product becomes both starting point and destination, concentrating the brand\'s entire narrative and value system in a single, continuous experience.',
    'desc-alerion': 'A new digital identity for a leading Italian private aviation company. Built to surface information clearly, reinforce content credibility, and put the projects front and center.',
    'desc-oasy': 'Frontend development for the new website of an Italian petfood brand. Product-focused layouts with smooth scroll interactions and refined responsive design.',
    'desc-circolino': 'Restaurant website with immersive video hero, shader-based scroll effects. Sub-2s load time.',
    'desc-roccano': 'Personal artist portfolio powered by the objkt API. Browse my NFT works, collections, collectors, and a live minting feed.',
    'desc-jimmis': 'Immersive website for a burger restaurant in Rimini. Full-screen video hero and scroll-driven animations.',
  },
  it: {
    name: 'nome', email: 'email', message: 'messaggio', submit: 'invia', thanks: 'GRAZIE',
    'bio-intro': 'Creative developer con base a',
    'bio-mid': 'Costruisco esperienze digitali immersive presso',
    'bio-end': 'Mi piace creare cose che vivono tra design e codice. Di solito mi trovi come',
    'section-websites': 'siti web',
    'section-contact': 'contatti',
    'desc-dececco': "Redesign del sito istituzionale. Il prodotto diventa sia punto di partenza che di arrivo, concentrando l'intera narrativa del brand e il sistema di valori in un'unica esperienza continua.",
    'desc-alerion': "Una nuova identità digitale per una delle principali compagnie di aviazione privata italiane. Progettata per presentare le informazioni con chiarezza, rafforzare la credibilità e mettere i progetti al centro.",
    'desc-oasy': 'Sviluppo frontend per il nuovo sito di un brand italiano di prodotti per animali. Layout incentrati sul prodotto, interazioni scroll fluide e design responsive curato.',
    'desc-circolino': 'Sito per un ristorante con hero video immersivo, effetti scroll basati su shader. Tempo di caricamento sotto i 2s.',
    'desc-roccano': "Portfolio artistico personale alimentato dall'API di objkt. Esplora le mie opere NFT, collezioni, collezionisti e un feed di minting in tempo reale.",
    'desc-jimmis': 'Sito immersivo per un burger restaurant a Rimini. Hero video a schermo intero e animazioni guidate dallo scroll.',
  },
}

let currentLang = 'en'

function applyLang(lang: string): void {
  currentLang = lang
  const strings = i18n[lang] ?? i18n['en']
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n!
    if (strings[key]) el.textContent = strings[key]
  })
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang)
  })
}

function initLangSwitcher(): void {
  document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang!
      applyLang(lang)
    })
  })
}

function initContactForm(): void {
  const form = document.getElementById('contactForm') as HTMLFormElement | null
  const thanks = document.getElementById('formThanks') as HTMLElement | null
  if (!form || !thanks) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name    = (form.elements.namedItem('name')    as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    if (!name || !email || !message) return

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body    = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`)
    window.location.href = `mailto:roccangi@gmail.com?subject=${subject}&body=${body}`

    form.reset()
    thanks.hidden = false
    const strings = i18n[currentLang] ?? i18n['en']
    thanks.textContent = strings['thanks'] ?? 'THANK YOU'
    setTimeout(() => { thanks.hidden = true }, 5000)
  })
}

function init(): void {
  initLangSwitcher()
  initContactForm()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
