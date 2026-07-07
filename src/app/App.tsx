import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronRight, Wrench, Car, Shield, Star, MessageCircle } from "lucide-react";
import autofitLogo from "../imports/autofitlogo.svg";
import lastImage from "../last.jpg";
import heroImage from "../hero.jpeg";
import takuImage from "../../taku.jpeg";
import suomiImage from "../suomi.png";
import { translations, getInitialLocale, Locale } from "../i18n";

const NAV_LINK_KEYS = [
  { key: "nav.palvelut", href: "#palvelut" },
  { key: "nav.miksi", href: "#miksi" },
  { key: "nav.yhteystiedot", href: "#yhteystiedot" },
  { key: "nav.varaa", href: "https://wa.me/358404608554" },
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

const brandLogoModules = import.meta.glob("../imports/brand-logos/*.png", { eager: true, query: '?url', import: 'default' });
const brandLogos = Object.values(brandLogoModules).filter((src): src is string => typeof src === "string");

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setBadgeVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (badgeRef.current) observer.observe(badgeRef.current);
    return () => observer.disconnect();
  }, []);

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#a39d9d] backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
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
              ASAP <span className="text-black font-black text-lg tracking-tight">AUTOHUOLTO</span><br />
              <span className="text-white font-black text-sm tracking-wide" style={{ fontFamily: "'ITC Avant Garde Gothic', sans-serif", fontStyle: 'italic' }}>Auto<span className="text-black">fit Herttoniemi</span></span>
            </span>
          </a>

          {/* Center: phone + address — absolutely centered */}
          <div className="hidden md:flex flex-col items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            <a
              href="tel:+358404608554"
              className="flex items-center gap-2 text-white hover:text-[#da2128] text-sm font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              040 460 8554
            </a>
            <a
              href="https://maps.google.com/?q=Sahaajankatu+39,+00880+Helsinki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/70 hover:text-[#da2128] text-xs transition-colors"
            >
              <MapPin className="w-3 h-3" />
              Sahaajankatu 39, 00880 Helsinki
            </a>
          </div>

          {/* Right: suomi image */}
          <div className="hidden md:flex items-center">
            <img src={suomiImage} alt="Suomi" className="h-12 w-auto object-contain" />
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

        {/* Red nav banner */}
        <div className="hidden md:block bg-[#da2128]">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-white hover:text-white/70 text-sm font-medium tracking-wide transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://wa.me/358404608554"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-white hover:text-white/70 text-sm font-semibold tracking-wide transition-colors"
            >
              {t('nav.varaa')}
            </a>
            <div className="flex items-center gap-2">
              <button
                className={`px-2 py-0.5 rounded text-xs ${lang === 'fi' ? 'bg-white text-[#da2128] font-bold' : 'bg-white/30 text-white'}`}
                onClick={() => setLang('fi')}
                aria-label="Suomi"
              >
                FI
              </button>
              <button
                className={`px-2 py-0.5 rounded text-xs ${lang === 'en' ? 'bg-white text-[#da2128] font-bold' : 'bg-white/30 text-white'}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>
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
              href="https://wa.me/358404608554"
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
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark overlay with red tint at bottom */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#1a1210]/95 via-[#1a1210]/75 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1210] to-transparent" />

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#da2128]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28 md:pt-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 pl-8 md:pl-14">
            <div className="space-y-4">
              <h1
                className="text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                ASAP <span className="text-black">{t('hero.service')}</span>
              </h1>
              <div
                className="text-3xl md:text-4xl leading-none"
                style={{ 
                  fontFamily: "'ITC Avant Garde Gothic', sans-serif",
                  fontWeight: 900,
                  fontStyle: 'italic'
                }}
              >
                <span className="text-white">Auto</span><span className="text-black">fit</span> <span className="text-white">Herttoniemi</span>
              </div>
            </div>

            <div className="text-white font-semibold text-base md:text-lg leading-relaxed max-w-lg space-y-3">
              {t('hero.tagline').split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/358451234567"
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
            <div
              ref={badgeRef}
              className={`relative transition-all duration-700 ease-out ${badgeVisible ? "translate-x-0 rotate-0 opacity-100" : "translate-x-24 -rotate-8 opacity-0"}`}
              style={{ transformOrigin: "center bottom" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#da2128]/20 blur-3xl scale-110" />
              <img
                src={autofitLogo}
                alt="Autofit Service badge"
                className="relative w-40 h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gray spacer between hero and pre-services image */}
      <section className="h-10 md:h-14 bg-[#c9c4be]" aria-hidden="true" />

      {/* ── PRE-SERVICES IMAGE SECTION ── */}
      <section className="relative w-full py-12 bg-[#1a1210]">
        <div className="relative overflow-hidden">
          <img
            src={takuImage}
            alt="Autofit workshop"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto w-full px-6 pb-8 md:pb-14">
              <h1
                className="text-[#da2128] text-5xl md:text-7xl font-black tracking-tight mb-4"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                {t('warranty.title')}
              </h1>
              <p className="text-white text-base md:text-xl font-medium leading-relaxed max-w-4xl mb-3">
                {t('warranty.l1')}
              </p>
              <p className="text-white text-base md:text-xl font-medium leading-relaxed max-w-4xl mb-3">
                {t('warranty.l2')}
              </p>
              <p className="text-white text-base md:text-xl font-medium leading-relaxed max-w-4xl mb-3">
                {t('warranty.l3')}
              </p>
              <p className="text-[#da2128] text-base md:text-xl font-medium leading-relaxed max-w-4xl">
                {t('warranty.l4')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="palvelut" className="relative bg-[#f5f4f2] py-24">
        {/* Suomi image in top right */}
        <img
          src={suomiImage}
          alt="Suomi"
          className="absolute top-4 right-4 md:top-8 md:right-8 h-24 md:h-32 w-auto object-contain opacity-80"
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start gap-8 mb-16">
            <div>
              <p className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                {t('nav.palvelut')}
              </p>
              <h2
                className="text-4xl md:text-5xl font-black text-[#1a1210] leading-tight"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                {t('sections.services.heading').split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i < t('sections.services.heading').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </div>
            <div className="hidden md:block ml-auto mt-auto">
              <a
                href="https://wa.me/358404608554"
                className="flex items-center gap-2 text-[#da2128] font-semibold hover:gap-4 transition-all"
              >
                {t('nav.varaa')} <ChevronRight className="w-5 h-5" />
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

      {/* ── BRAND LOGO MARQUEE ── */}
      <section className="bg-[#f5f4f2] py-8 border-b border-[#1a1210]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-hidden rounded-2xl border border-[#1a1210]/10 bg-white/70 py-6 shadow-sm">
            <div className="logo-marquee flex w-max items-center gap-6">
              {[...brandLogos, ...brandLogos].map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="group flex h-20 w-36 shrink-0 items-center justify-center rounded-xl bg-white/90 p-3 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:z-10 hover:scale-115 hover:-translate-y-1"
                >
                  <img
                    src={src}
                    alt={`Brand logo ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
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
                className="py-10 pr-10 border-b border-white/10 md:odd:border-r md:odd:border-white/10 md:even:pl-10"
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

      {/* ── CONTACT SECTION ── */}
      {/* ── AUTOFIT LOGO STRIP (gap between Why Us and Contact) ── */}
      <div className="logo-strip bg-[#0f0e0d] py-10 overflow-hidden">
        <div className="logo-marquee-slow flex w-max items-center gap-16">
          {Array.from({ length: 20 }).map((_, index) => (
            <img
              key={`autofit-slow-${index}`}
              src={autofitLogo}
              alt="Autofit logo"
              className="logo-strip-item h-12 w-12 shrink-0 object-contain opacity-30 cursor-pointer"
            />
          ))}
        </div>
      </div>

      <section
        id="yhteystiedot"
        className="relative py-24"
        style={{
          backgroundImage: `url(${lastImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay over the whole section */}
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-16">
            <div className="max-w-2xl">
                <p className="text-[#da2128] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  {t('contact.title')}
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black text-white leading-tight"
                  style={{ fontFamily: "'Roboto Slab', serif" }}
                >
                  {t('contact.heading')}
                </h2>
              <p className="mt-6 text-white/60 max-w-xl leading-relaxed">
                {t('contact.description')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
              <div className="rounded-[28px] bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da2128]/10 text-[#da2128] mb-5">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">{t('contact.labels.phone')}</p>
                <p className="text-white font-semibold">040 460 8554</p>
              </div>
              <div className="min-w-0 rounded-[28px] bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da2128]/10 text-[#da2128] mb-5">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">{t('contact.labels.email')}</p>
                <a
                  href="mailto:info@asapautohuolto.fi"
                  className="text-white font-semibold break-words whitespace-normal hover:text-[#da2128]"
                >
                  info@asapautohuolto.fi
                </a>
              </div>
              <div className="rounded-[28px] bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da2128]/10 text-[#da2128] mb-5">
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">{t('contact.labels.address')}</p>
                <p className="text-white font-semibold">Sahaajankatu 39 00880 Helsinki</p>
              </div>
              <div className="min-w-0 rounded-[28px] bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#da2128]/10 text-[#da2128] mb-5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-2">{t('contact.labels.whatsapp')}</p>
                <a
                  href="https://wa.me/358404608554"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white font-semibold break-words whitespace-normal hover:text-[#da2128]"
                >
                  +358 45 460 8554
                </a>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-8 mt-10 rounded-[32px] max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-[24px] shadow-[0_28px_60px_rgba(0,0,0,0.35)]">
              <div className="bg-[#111010]">
                <iframe
                  className="w-full h-96"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.5024296083775!2d25.0498146768317!3d60.20551697505041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692092305d267d9%3A0x7bd28cea431cd2fb!2sASAP%20Autohuolto%20AUTOFIT!5e0!3m2!1sen!2sfi!4v1783368963154!5m2!1sen!2sfi"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#a39d9d] border-t border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={autofitLogo} alt="Autofit" className="h-8 w-8 object-contain" />
            <span
              className="text-black text-sm font-semibold"
              style={{ fontFamily: "'Roboto Slab', serif" }}
            >
              <span className="text-white">ASAP</span> Autohuolto
              <br />
              <span className="text-white font-black text-sm tracking-wide" style={{ fontFamily: "'ITC Avant Garde Gothic', sans-serif", fontStyle: 'italic' }}>Auto<span className="text-black">fit Herttoniemi</span></span>
            </span>
          </div>
          <p className="text-black text-xs text-center">
            © {new Date().getFullYear()} ASAP Autohuolto. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-black hover:text-black/70 text-xs transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

            <a
        href="https://wa.me/358404608554"
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
          <p className="text-sm font-semibold text-white">Lähetä viesti</p>
        </div>
      </a>
    </div>
  );
}
