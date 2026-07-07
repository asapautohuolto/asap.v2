import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, Wrench, Car, Shield, Star, MessageCircle } from "lucide-react";
import autofitLogo from "../imports/autofitlogo.svg";
import { translations, getInitialLocale, Locale } from "../i18n";

const NAV_LINK_KEYS = [
  { key: "nav.palvelut", href: "#palvelut" },
  { key: "nav.miksi", href: "#miksi" },
  { key: "nav.yhteystiedot", href: "#yhteystiedot" },
  { key: "nav.varaa", href: "https://wa.me/358454608554" },
];

const SERVICES = [
  { icon: <Wrench className="w-7 h-7" />, key: 'services.s1' },
  { icon: <Car className="w-7 h-7" />, key: 'services.s2' },
  { icon: <Shield className="w-7 h-7" />, key: 'services.s3' },
  { icon: <Wrench className="w-7 h-7" />, key: 'services.s4' },
  { icon: <Star className="w-7 h-7" />, key: 'services.s5' },
  { icon: <Shield className="w-7 h-7" />, key: 'services.s6' },
];

const REASONS = [
  { number: "01", key: 'reasons.r1' },
  { number: "02", key: 'reasons.r2' },
  { number: "03", key: 'reasons.r3' },
  { number: "04", key: 'reasons.r4' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {}
  }, [lang]);

  const t = (key: string) => {
    const parts = key.split('.');
    let cur: any = translations[lang as Locale];
    for (const p of parts) {
      cur = cur?.[p];
      if (cur === undefined) return key;
    }
    return cur;
  };

  const navLinks = NAV_LINK_KEYS.map((n) => ({ label: t(n.key), href: n.href }));

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1210]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <img
              src={autofitLogo}
              alt="Autofit logo"
              className="h-10 w-10 object-contain"
            />
            <span
              className="text-white font-black tracking-tight text-lg leading-none"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              ASAP<br />
              <span className="text-[#da2128] font-black text-base tracking-widest">AUTOHUOLTO</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+358451234567"
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              045 123 4567
            </a>
            <a
              href="https://wa.me/358454608554"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#da2128] hover:bg-[#b81a20] text-white px-5 py-2 text-sm font-semibold tracking-wide transition-colors"
            >
              {t('nav.varaa')}
            </a>
            <div className="flex items-center gap-2 ml-2">
              <button
                className={`px-2 py-1 rounded text-sm ${lang === 'fi' ? 'bg-[#da2128] text-white' : 'bg-white/90 text-black'}`}
                onClick={() => setLang('fi')}
                aria-label="Suomi"
              >
                FI
              </button>
              <button
                className={`px-2 py-1 rounded text-sm ${lang === 'en' ? 'bg-[#da2128] text-white' : 'bg-white/90 text-black'}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Valikko"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden bg-[#1a1210] border-t border-white/10 px-6 py-6 space-y-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-white/80 hover:text-white font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/358454608554"
              className="block bg-[#da2128] text-white text-center py-3 font-semibold tracking-wide mt-2"
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('nav.varaa')}
            </a>
            <div className="flex gap-2 mt-2">
              <button
                className={`px-3 py-2 rounded ${lang === 'fi' ? 'bg-[#da2128] text-white' : 'bg-white/90 text-black'}`}
                onClick={() => setLang('fi')}
              >
                FI
              </button>
              <button
                className={`px-3 py-2 rounded ${lang === 'en' ? 'bg-[#da2128] text-white' : 'bg-white/90 text-black'}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-[#1a1210]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1800&h=1000&fit=crop&auto=format')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay with red tint at bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1210]/95 via-[#1a1210]/75 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1210] to-transparent" />

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#da2128]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="pl-8 md:pl-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#da2128]" />
              <span className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase">
                {t('hero.location')}
              </span>
            </div>

              <h1
                className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-2"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                ASAP<br />
                <span className="text-[#da2128]">{t('hero.service')}</span>
              </h1>

            <div className="text-white font-semibold text-base md:text-lg leading-relaxed max-w-lg mb-10 space-y-3">
              {t('hero.tagline').split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/358454608554"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#da2128] hover:bg-[#b81a20] text-white px-7 py-4 font-semibold tracking-wide transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t('hero.whatsapp')}
              </a>
              <a
                href="tel:+358451234567"
                className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-7 py-4 font-medium tracking-wide transition-colors"
              >
                <Phone className="w-5 h-5" />
                {t('hero.call')}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { val: "15+", key: 'trust.years' },
                  { val: "4.9★", key: 'trust.rating' },
                  { bigKey: 'trust.makesBig', smallKey: 'trust.makesSmall' },
                ].map((b) => (
                  <div key={(b as any).key ?? (b as any).bigKey}>
                    <div
                      className="text-2xl font-black text-white"
                      style={{ fontFamily: "'Roboto Slab', serif" }}
                    >
                      {(b as any).bigKey ? t((b as any).bigKey) : ((b as any).key === 'trust.makes' ? t((b as any).key) : (b as any).val)}
                    </div>
                    <div className="text-xs text-white/50 mt-0.5">{(b as any).smallKey ? t((b as any).smallKey) : t((b as any).key)}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Logo badge */}
          <div className="flex justify-center lg:justify-end items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#da2128]/20 blur-3xl scale-110" />
              <img
                src={autofitLogo}
                alt="Autofit Service badge"
                className="relative w-40 h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="palvelut" className="bg-[#f5f4f2] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-8 mb-16">
            <div>
              <p className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Palvelut
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-[#1a1210] leading-tight"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Kaikki autosi<br />tarvitsemat palvelut
              </h2>
            </div>
            <div className="hidden md:block ml-auto mt-auto">
              <a
                href="https://wa.me/358454608554"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#da2128] font-semibold hover:gap-4 transition-all"
              >
                Varaa aika <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1210]/10">
            {SERVICES.map((s) => (
              <div
                key={s.key}
                className="bg-white p-8 group hover:bg-[#da2128] transition-colors duration-300 cursor-default"
              >
                <div className="text-[#da2128] group-hover:text-white mb-5 transition-colors">
                  {s.icon}
                </div>
                <h3
                  className="text-lg font-bold text-[#1a1210] group-hover:text-white mb-3 transition-colors"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {t(`${s.key}.title`)}
                </h3>
                <p className="text-sm text-[#6b6560] group-hover:text-white/80 leading-relaxed transition-colors">
                  {t(`${s.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="miksi" className="bg-[#1a1210] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {t('why.title')}
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-16"
            style={{ fontFamily: "'Roboto Slab', serif" }}
          >
            {t('why.heading').split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i < t('why.heading').split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/10">
            {REASONS.map((r) => (
              <div
                key={r.number}
                className="py-10 pr-10 border-b border-white/10 md:odd:border-r md:odd:border-white/10"
              >
                <span
                  className="text-[#da2128]/40 text-5xl font-black block mb-4"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {r.number}
                </span>
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {t(`${r.key}.title`)}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{t(`${r.key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / BOOKING ── */}
      <section id="yhteystiedot" className="bg-[#f5f4f2] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <p className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
              {t('contact.title')}
            </p>
            <h2
              className="text-4xl font-black text-[#1a1210] mb-8 leading-tight"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              {t('contact.heading')}
            </h2>

            <div className="space-y-6">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: t('contact.labels.address'), value: "Sahaajankatu 39 00880 Helsinki" },
                { icon: <Phone className="w-5 h-5" />, label: t('contact.labels.phone'), value: "045 123 4567" },
                { icon: <Mail className="w-5 h-5" />, label: t('contact.labels.email'), value: "info@asapautohuolto.fi" },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: t('contact.labels.hours'),
                  value: "Ma–Pe 8:00–17:00\nLa 9:00–14:00",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="mt-0.5 text-[#da2128] shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[#1a1210] font-medium whitespace-pre-line text-sm">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div id="ajanvaraus" className="bg-white p-10 border-l-4 border-[#da2128]">
            <h3
              className="text-2xl font-black text-[#1a1210] mb-6"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              {t('contact.booking')}
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                    Etunimi
                  </label>
                  <input
                    type="text"
                    placeholder="Matti"
                    className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                    Sukunimi
                  </label>
                  <input
                    type="text"
                    placeholder="Meikäläinen"
                    className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                  Puhelinnumero
                </label>
                <input
                  type="tel"
                  placeholder="045 000 0000"
                  className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                  Auto (merkki & malli)
                </label>
                <input
                  type="text"
                  placeholder="esim. Toyota Corolla 2019"
                  className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                  Palvelu
                </label>
                <select className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors text-[#1a1210]">
                  <option value="">Valitse palvelu...</option>
                  <option>Määräaikaishuolto</option>
                  <option>Jarrutyöt</option>
                  <option>Katsastuskorjaus</option>
                  <option>Moottorin korjaus</option>
                  <option>Rengasvaihto</option>
                  <option>Muu</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6b6560] uppercase tracking-wide mb-1.5">
                  Lisätiedot
                </label>
                <textarea
                  rows={3}
                  placeholder="Kuvaile ongelmaa tai lisätietoja..."
                  className="w-full border border-[#1a1210]/15 bg-[#f5f4f2] px-4 py-3 text-sm focus:outline-none focus:border-[#da2128] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#da2128] hover:bg-[#b81a20] text-white py-4 font-bold tracking-wide transition-colors text-sm uppercase"
              >
                {t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1210] border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={autofitLogo} alt="Autofit" className="h-8 w-8 object-contain" />
            <span
              className="text-white/80 text-sm font-semibold"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              ASAP Autohuolto
            </span>
          </div>
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} ASAP Autohuolto. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/358454608554"
        target="_blank"
        rel="noreferrer noopener"
        aria-label={t('contact.whatsappLabel')}
        className="fixed z-50 flex items-center gap-3 rounded-full bg-[#25d366] px-4 py-3 shadow-2xl shadow-black/30 ring-1 ring-white/20 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
        style={{ right: 'calc(1.5rem + env(safe-area-inset-right))', bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#25d366] shadow-inner">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/80">{t('contact.labels.whatsapp')}</p>
          <p className="text-sm font-semibold text-white">{t('contact.whatsappLabel')}</p>
        </div>
      </a>
    </div>
  );
}
