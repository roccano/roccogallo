import './style.scss'

// Language strings
const i18n: Record<string, Record<string, string>> = {
  en: { name: 'name', email: 'email', message: 'message', submit: 'submit', thanks: 'THANK YOU' },
  it: { name: 'nome', email: 'email', message: 'messaggio', submit: 'invia', thanks: 'GRAZIE' },
  es: { name: 'nombre', email: 'correo', message: 'mensaje', submit: 'enviar', thanks: 'GRACIAS' },
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
