import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, Clock } from 'lucide-react';


const BASE = import.meta.env.BASE_URL;

const cases = [
  { id: 1, title: 'Как я спроектировал раздел автонакоплений для банка и получил 80% Success Rate и 67% Autosaving Conversion после первой итерации', banner: 'case-1/banner 1.jpg', year: '2025', category: 'Fintech' },
  { id: 2, title: 'Как я увеличил глубину заполнения профиля на 19% и неожиданно увеличил среднее время нахождения на странице на 40 секунд', banner: 'case-2/banner 2.jpg', year: '2025', category: 'Medtech' },
];

const cvLink = "https://drive.google.com/file/d/1uA0-bED04z8XAIxBwQitAmk-YSQpC2HM/view?pli=1";

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path d="M21.435 2.582a1.933 1.933 0 0 0-1.912-.03L2.947 10.43c-.886.417-.852 1.623.056 1.99l4.57 1.848 1.764 5.645a1.1 1.1 0 0 0 1.88.356l2.164-2.607 4.744 3.513a1.1 1.1 0 0 0 1.704-.627L22.015 4.393a1.1 1.1 0 0 0-.58-1.811zM8.32 13.565l9.282-5.748c.184-.114.368.145.215.29l-7.466 7.042-1.332 4.015-1.018-3.255.319-2.344z" fill="currentColor" />
  </svg>
);

const LongTextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="5" x2="21" y2="5" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="3" y1="20" x2="21" y2="20" />
  </svg>
);

const ShortTextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="8" x2="21" y2="8" />
    <line x1="3" y1="16" x2="21" y2="16" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground fill-current">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const caseNavSections: Record<number, { id: string; label: string }[]> = {
  1: [
    { id: 'goal', label: 'Цель' },
    { id: 'metrics', label: 'Метрики' },
    { id: 'role', label: 'Моя роль' },
    { id: 'discovery', label: 'Дискавери' },
    { id: 'benchmark', label: 'Бенчмарк' },
    { id: 'flow', label: 'Флоу' },
    { id: 'screens', label: 'Экраны' },
    { id: 'testing', label: 'Тестирование' },
    { id: 'improvements', label: 'Улучшения' },
  ],
  2: [
    { id: 'task', label: 'Задача' },
    { id: 'role', label: 'Моя роль' },
    { id: 'testing', label: 'Тестирование' },
    { id: 'discovery', label: 'Дискавери' },
    { id: 'solution', label: 'Решение' },
    { id: 'results', label: 'Результаты' },
    { id: 'observations', label: 'Наблюдения' },
    { id: 'improvements', label: 'Улучшения' },
  ],
};

export default function Case() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get('id') || '1');
  const caseData = cases.find(c => c.id === id) || cases[0];

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShortVersion, setIsShortVersion] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navItems = caseNavSections[id] || [];

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Load saved toggle state
  useEffect(() => {
    const saved = localStorage.getItem('case_short_version');
    if (saved !== null) {
      setIsShortVersion(saved === 'true');
    }
  }, []);

  // Save toggle state
  const handleToggleVersion = () => {
    const newVal = !isShortVersion;
    setIsShortVersion(newVal);
    localStorage.setItem('case_short_version', String(newVal));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // IntersectionObserver — отслеживаем активный раздел
  useEffect(() => {
    if (isShortVersion) return;
    const ids = (caseNavSections[id] || []).map(item => item.id);
    if (ids.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Берём запись с наибольшим intersectionRatio среди видимых
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(top.target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    ids.forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [id, isShortVersion]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const blob1X = useTransform(smoothX, [0, 1920], [-20, 20]);
  const blob1Y = useTransform(smoothY, [0, 1080], [-20, 20]);
  const blob2X = useTransform(smoothX, [0, 1920], [20, -20]);
  const blob2Y = useTransform(smoothY, [0, 1080], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);



  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* Background Blobs (Antigravity Style) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute top-[20%] -right-[10%] w-[35%] h-[45%] bg-blue-500/10 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ x: blob1X, y: blob2Y }}
          className="absolute -bottom-[10%] left-[20%] w-[45%] h-[50%] bg-amber-500/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Header (Fixed and Clean) */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-background/70 backdrop-blur-md py-4 pointer-events-auto"
      >
        <div className="grid grid-cols-3 items-center max-w-6xl mx-auto px-4 md:px-6 w-full gap-4">
          <div className="flex justify-start">
            <Button variant="secondary" asChild className="rounded-xl px-5 h-12 font-medium bg-secondary hover:bg-secondary/80 transition-all text-base shadow-sm">
              <a href={cvLink} target="_blank" rel="noreferrer">CV</a>
            </Button>
          </div>

          <div className="flex justify-center items-center relative h-12">
            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {isScrolled && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-full mr-4 text-[15px] font-semibold text-muted-foreground/60 tracking-tight hidden sm:block whitespace-nowrap"
                  >
                    Антон
                  </motion.span>
                )}
              </AnimatePresence>

              <Link to="/" className="relative group z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-[-10px] bg-gradient-to-bl from-amber-200 via-lime-400 to-sky-400 blur-xl rounded-full z-0 group-hover:blur-2xl transition-all"
                />
                <motion.div
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-bl from-amber-200 via-lime-400 to-sky-400 p-[2px] shadow-sm cursor-pointer relative z-10"
                >
                  <Avatar className="w-full h-full bg-muted overflow-hidden rounded-[10px]">
                    <AvatarImage src={`${BASE}assets/images/avatar.jpg`} alt="Антон Карпук" className="object-cover object-[center_20%]" />
                    <AvatarFallback className="bg-secondary text-sm font-semibold rounded-[10px]">АК</AvatarFallback>
                  </Avatar>
                </motion.div>
              </Link>

              <AnimatePresence>
                {isScrolled && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full ml-4 text-[15px] font-semibold text-muted-foreground/60 tracking-tight hidden sm:block whitespace-nowrap"
                  >
                    Карпук
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-end gap-2 md:gap-3">
            <Button variant="secondary" asChild className="rounded-xl h-12 w-12 md:w-auto md:px-6 font-medium bg-secondary hover:bg-secondary/80 transition-all text-base shadow-sm flex items-center justify-center p-0">
              <a href="https://t.me/Anton_3223" target="_blank" rel="noreferrer">
                <span className="hidden md:inline">Telegram</span>
                <span className="md:hidden flex items-center justify-center"><TelegramIcon /></span>
              </a>
            </Button>
            <Button variant="secondary" asChild className="rounded-xl h-12 w-12 md:w-auto md:px-6 font-medium bg-secondary hover:bg-secondary/80 transition-all text-base shadow-sm flex items-center justify-center p-0">
              <a href="https://www.linkedin.com/in/anton-karpuk-3a7727180/" target="_blank" rel="noreferrer">
                <span className="hidden md:inline">LinkedIn</span>
                <span className="md:hidden flex items-center justify-center"><LinkedinIcon /></span>
              </a>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Side Alignments (Fixed to Viewport) */}
      <div className="fixed inset-0 pointer-events-none z-40 hidden lg:block">
        <div className="max-w-6xl mx-auto h-full px-4 md:px-6 relative">

          {/* Back Button (Left Aligned with CV) */}
          <div className="absolute left-[16px] md:left-[24px] top-[128px] pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="ghost" asChild className="px-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors group">
                <Link to="/" className="flex items-center gap-2">
                  <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <span className="text-[15px] font-medium pt-[1px]">Назад</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Vertical Section Navigation (Right side) */}
          {!isShortVersion && navItems.length > 0 && (
            <div className="absolute right-[16px] md:right-[24px] top-[128px] pointer-events-auto">
              <motion.nav
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col"
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  const isLast = index === navItems.length - 1;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-start gap-2.5 group text-left"
                    >
                      <div className="flex flex-col items-center flex-shrink-0 pt-[5px]">
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${isActive
                              ? 'scale-[1.4] bg-[#a3e635]'
                              : 'scale-100 bg-zinc-500/35'
                            }`}
                        />
                        {!isLast && (
                          <div className="w-px flex-1 min-h-[16px] bg-foreground/10 mt-1" />
                        )}
                      </div>
                      <span
                        className={`text-[15px] font-medium tracking-tight whitespace-nowrap pb-3 transition-all duration-150 ${isActive
                            ? 'text-foreground opacity-100'
                            : 'text-muted-foreground opacity-40 group-hover:opacity-80 group-hover:text-foreground'
                          }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </motion.nav>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        {/* Working Area (600px) */}
        <main className="max-w-[600px] mx-auto pt-32 pb-0 relative z-10 transition-all">

          {/* Back Button for Mobile */}
          <div className="lg:hidden mb-8 -mt-6">
            <Button variant="ghost" asChild className="px-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors group">
              <Link to="/" className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-[15px] font-medium pt-[1px]">Назад</span>
              </Link>
            </Button>
          </div>

          {id === 1 && (
            <div className="lg:mt-0 mt-8">
              {/* Title and Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-16"
              >

                <h1 className="text-[24px] md:text-[36px] leading-[120%] font-medium tracking-tight text-foreground mb-6 md:mb-8">
                  {caseData.title}
                </h1>

                <AnimatePresence mode="wait">
                  {!isShortVersion ? (
                    <motion.div
                      key="full-desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="full-content"
                    >
                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 font-normal">
                        Когда деньги лежат на карте, тратить их очень легко: клик - и вот очередное списание в магазине или на маркетплейсе. А к концу месяца может оказаться, что не хватает на оплату аренды квартиры. Копилки, предлагаемые многими банками, позволяют нам отодвинуть горизонт финансового планирования на годы, что помогает безболезненно отложить деньги на дорогостоящие покупки.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="summary-desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="summary-content"
                    >
                      <div className="bg-secondary/30 border border-foreground/5 p-6 rounded-[24px]">
                        <p className="text-[17px] md:text-[19px] leading-[1.6] text-foreground font-medium mb-4 italic border-l-4 border-lime-400 pl-4">
                          {id === 1
                            ? "Краткий обзор: Первая версия системы автонакоплений для крупного банка."
                            : "Краткий обзор: Редизайн профиля медтех-платформы для повышения вовлеченности."}
                        </p>
                        <ul className="space-y-2 text-[15px] md:text-[16px] text-foreground/80 list-disc pl-5">
                          {id === 1 ? (
                            <>
                              <li><span className="font-semibold text-foreground">80% Task Success Rate</span> — результат первой итерации дизайна.</li>
                              <li><span className="font-semibold text-foreground">67% конверсия</span> пользователей в автоматические способы накопления.</li>
                              <li>Ключевые боли: отсутствие контроля, страх списаний и сложность ручного расчета.</li>
                            </>
                          ) : (
                            <>
                              <li><span className="font-semibold text-foreground">+19% глубина заполнения</span> профиля после обновления интерфейса.</li>
                              <li><span className="font-semibold text-foreground">+40 секунд</span> среднего времени нахождения на критических страницах.</li>
                              <li>Ключевые боли: сложность ввода данных, отсутствие мотивации и перегруженные формы.</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>

              <AnimatePresence mode="wait">
                {!isShortVersion ? (
                  <motion.div
                    key="full-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Goal Section */}
                    <motion.section
                      id="goal"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Цель</h2>
                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                        Рассказать о том, как создавалась первая версия дизайна Копилки, на что я ориентировался, какие подходы применял, как и почему принимал те или иные решения, и поделюсь результатами своей работы в цифрах.
                      </p>
                    </motion.section>

                    {/* Metrics Section */}
                    <motion.section
                      id="metrics"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Метрики</h2>
                      <div className="bg-[#f4f4f5] p-6 rounded-[24px]">
                        <ul className="space-y-3 list-disc pl-5 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                          <li>
                            <span className="font-semibold text-foreground">Task Success Rate</span> — нужно знать насколько успешно проходятся все флоу в продукте.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Autosaving Conversion</span> — нужно понимать какой процент пользователей выбирают автопополнения как основной тип накопления.
                          </li>
                        </ul>
                      </div>
                    </motion.section>

                    {/* Role Section */}
                    <motion.section
                      id="role"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Моя роль</h2>
                      <ul className="space-y-2 list-disc pl-5 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                        <li>Провёл анализ конкурентов и аналитики.</li>
                        <li>Провел интервью, собрал боли и инсайты.</li>
                        <li>Построил user flow на основе данных.</li>
                        <li>Собрал первую версию дизайна.</li>
                        <li>Провёл usability тесты, написал гайд по прохождению.</li>
                      </ul>
                      <div className="bg-[#f4f4f5] p-6 rounded-[24px] flex items-start gap-4">
                        <span className="text-2xl mt-1">🎉</span>
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                          Итоговые решения в первой итерации показали 80% success rate и 67% autosave conversion.
                        </p>
                      </div>
                    </motion.section>

                    {/* Discovery Section */}
                    <motion.section
                      id="discovery"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Дискавери</h2>
                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                        Первым делом я отправился искать информацию о банковских копилках: что они предлагают клиентам и какие методы накоплений существуют. Несколько качественных запросов в чат GPT дали ценную информацию по теме.
                      </p>

                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-6 font-normal">
                        Я провёл 3 интервью, чтобы узнать какие приложения использует аудитория, кто и как умеет пользоваться цифровыми продуктами и копили ли когда-нибудь деньги такими способом. Гости интервью - люди разного возраста, доходов, финансовых привычек и опыта в мобильных приложениях. Общение с ними позволило поймать интересные инсайты:
                      </p>

                      <div className="bg-[#f4f4f5] p-6 rounded-[24px]">
                        <ul className="space-y-2 list-disc pl-5 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                          <li>У пользователя нет понимания реально ли накопить нужную сумму при текущих доходах/расходах в указанный срок. Считают вручную.</li>
                          <li>Слабая дисциплина и потеря мотивации на длинной дистанции (при ручном накоплении). В итоге начинаются сбои и накопления забрасываются.</li>
                          <li>У некоторых пользователей есть страх отдавать управление финансами приложению. Страх ошибок и непредсказуемых списаний.</li>
                        </ul>
                      </div>
                    </motion.section>

                    {/* Benchmark Section */}
                    <motion.section
                      id="benchmark"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Бенчмарк</h2>
                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                        После первоначального поиска я узнал довольно много о том, какие способы накопления обычно используются в банках, поэтому я проводил бенчмарк больше с целью подтвердить результаты исследований и посмотреть как другие продукты работают с накоплениями.
                      </p>

                      <div className="mb-8 overflow-hidden">
                        <img src={`${BASE}assets/images/benchmark-1.png`} alt="Бенчмарк приложений" className="w-full" />
                      </div>

                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                        Я проанализировал процесс создания Копилок и работы с ними в приложениях <a href="https://www.alfabank.by/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Альфа банка</a>, <a href="https://www.sber-bank.by/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Сбер банка</a> и <a href="https://www.belapb.by/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Белагропромбанка</a> по 23-м критериям и выявил схожие фичи и подходы.
                      </p>

                      <h3 className="text-[16px] md:text-[18px] leading-[1.6] text-foreground font-medium mb-6">
                        Большинство продуктов используют 4 основных метода автонакоплений:
                      </h3>

                      <div className="bg-[#f4f4f5] p-6 rounded-[24px] mb-8">
                        <ul className="space-y-4 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                          <li>
                            <span className="font-semibold text-foreground">Периодическое пополнение</span> — определенная сумма в определенный день переводится в копилку с выбранного счёта.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Процент от зачислений</span> — в копилку будет откладываться процент от любого зачисления на счёт или от выбранных типов поступлений.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Процент от расходов</span> — в копилку будет откладываться процент от любых трат.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Округление платежей</span> — все платежи с выбранного счёта округляются до целого, а сумма округления зачисляется в копилку. Например, стоимость кофе за 4,5 BYN будет округлена до 5 BYN, 50 копеек из которых зачислятся в копилку.
                          </li>
                        </ul>
                      </div>

                      <div className="mb-4 overflow-hidden">
                        <img src={`${BASE}assets/images/benchmark-2.png`} alt="Таблица бенчмарка" className="w-full" />
                      </div>

                      <a
                        href="https://docs.google.com/spreadsheets/d/1aCLBOQ2OPOxDfYkNfb1pdoMRsP7DRbRujUQyXceCIFA/edit?gid=0#gid=0"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[14px] font-medium text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all"
                      >
                        Бенчмарк
                      </a>
                    </motion.section>

                    {/* Flow Section */}
                    <motion.section
                      id="flow"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Флоу</h2>
                      <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                        Я составил <a href="https://www.figma.com/board/ibhI2xoN187DyqaCs6ckHk/%D0%9A%D0%BE%D0%BF%D0%B8%D0%BB%D0%BA%D0%B0?node-id=0-1&t=otgw9xGTkgu1vWtQ-1" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">флоу</a> для 3-х базовых сценариев: Создания, пополнения и редактирования копилки.
                      </p>

                      <div className="space-y-12">
                        <div>
                          <div className="mb-4 overflow-hidden bg-muted/5">
                            <img src={`${BASE}assets/images/flow-create.png`} alt="Создание копилки" className="w-full" />
                          </div>
                          <p className="text-[14px] leading-[1.6] text-muted-foreground">
                            Создание копилки. Я как пользователь хочу создать копилку, чтобы накопить на отпуск.
                          </p>
                        </div>

                        <div>
                          <div className="mb-4 overflow-hidden bg-muted/5">
                            <img src={`${BASE}assets/images/flow-refill.png`} alt="Пополнение копилки" className="w-full" />
                          </div>
                          <p className="text-[14px] leading-[1.6] text-muted-foreground">
                            Ручное пополнение копилки. Я как пользователь хочу вручную пополнить копилку.
                          </p>
                        </div>

                        <div>
                          <div className="mb-4 overflow-hidden bg-muted/5">
                            <img src={`${BASE}assets/images/flow-edit.png`} alt="Редактирование копилки" className="w-full" />
                          </div>
                          <p className="text-[14px] leading-[1.6] text-muted-foreground">
                            Редактирование копилки. Я как пользователь хочу изменить способ накопления и сдвинуть дату завершения.
                          </p>
                        </div>
                      </div>
                    </motion.section>

                    {/* Screens Section */}
                    <motion.section
                      id="screens"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">Экраны</h2>

                      {/* Home Page Content Aligned with Heading */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-24">
                        <div className="order-2 md:order-1 self-start">
                          <div className="overflow-hidden rounded-[24px] border border-foreground/10">
                            <img src={`${BASE}assets/images/screen-create-methods.png`} alt="Домашняя страница" className="w-full" />
                          </div>
                        </div>
                        <div className="order-1 md:order-2 self-start flex flex-col justify-start">
                          <h3 className="text-[18px] font-semibold tracking-tight text-foreground mb-6">
                            Домашняя страница
                          </h3>
                          <div className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 space-y-4">
                            <p>
                              Домашняя страница — это главный инструмент создания новых копилок и мониторинга уже существующих.
                            </p>
                            <p>
                              Каждая копилка даёт возможность еще на этапе превью контролировать сумму накопленных денег и целевое значение. Тут же можно в 1 клик вручную перевести нужную сумму.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Create Screens Content */}
                      <div className="space-y-12">
                        <div>
                          <h3 className="text-[18px] font-semibold tracking-tight text-foreground mb-10 text-left">Создание копилки</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-start">
                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/screen-create-emoji.png`} alt="Выбор обложки" className="w-full" />
                              </div>
                              <p className="text-[14px] leading-[1.6] text-muted-foreground">
                                Обычно любая цель имеет оболочку и ее можно сфотографировать, но если нет фото — в качестве обложки можно использовать подходящий эмодзи из предложенных.
                              </p>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/screen-home.png`} alt="Домашняя страница" className="w-full" />
                              </div>
                              <p className="text-[14px] leading-[1.6] text-muted-foreground">
                                Здесь пользователь выбирает тот способ накопления, который удобен лично ему.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Типы автонакоплений */}
                        <div className="pt-12">
                          <h3 className="text-[18px] font-semibold tracking-tight text-foreground mb-10 text-left">Типы автонакоплений</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-start">
                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/9.png`} alt="Типы автонакоплений" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                                <p>Обычно человеку приходится самому рассчитывать по сколько отклыдывать в зависимости от его дедлайна и целевой суммы, поэтому система считает всё за нас и подсказывает.</p>
                                <p>А для тех, кто хочет на 100% контролировать все переводы, есть возможность включить функцию подтверждения всех пополнений.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/10.png`} alt="Популярные решения" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                                <p>Редко кто-то выбирает необычный процент, чаще всего это что-то кратное 5 или 10. При выборе процента от зачислений система прелагает самые популярные решения и экономит несколько кликов.</p>
                                <p>Также, зачастую некоторые зачисления лучше оставить нетронутыми, а выбрать всего 1-2 из основных, добавив их в Избранные.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/11.png`} alt="Выбор счёта и процента" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                                <p>Выбор счёта и процента для пополнений.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/12.png`} alt="Выбор счёта" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                                <p>Выбор счёта для пополнений.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Самостоятельное пополнение */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-24">
                        <div className="order-2 md:order-1 self-start">
                          <div className="overflow-hidden rounded-[24px] border border-foreground/10">
                            <img src={`${BASE}assets/images/case-1/13.png`} alt="Самостоятельное пополнение" className="w-full" />
                          </div>
                        </div>
                        <div className="order-1 md:order-2 self-start flex flex-col justify-start">
                          <h3 className="text-[18px] font-semibold tracking-tight text-foreground mb-6">
                            Самостоятельное пополнение
                          </h3>
                          <div className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 space-y-4">
                            <p>
                              Хоть откладывать вручную можно и без банковского приложения, самостоятельное пополнение копилки всё еще довольно частый выбор среди пользователей.
                            </p>
                            <p>
                              Здесь система помогает не забывать пополнять копилку через напоминания, которые можно настроить вручную.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Секция Копилка */}
                      <div className="mt-24">
                        <h3 className="text-[18px] font-semibold tracking-tight text-foreground mb-10 text-left">Копилка</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 items-start mb-16">
                          <div className="flex flex-col">
                            <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                              <img src={`${BASE}assets/images/case-1/14.png`} alt="Не всегда удаётся придерживаться строгого графика" className="w-full" />
                            </div>
                            <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                              <p>Не всегда удаётся придерживаться строгого графика при накоплении. Иногда приходится сдвиграть дедлайн, менять стратегию накопления или редактировать целевую сумму. Страница копилки - это инструмент, который позволяет работать с подобными задачами.</p>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/10">
                              <img src={`${BASE}assets/images/case-1/15.png`} alt="Пополнение в 2 клика" className="w-full" />
                            </div>
                            <div className="text-[14px] leading-[1.6] text-muted-foreground space-y-4">
                              <p>Пополнение в 2 клика.</p>
                            </div>
                          </div>
                        </div>

                        {/* Горизонтальный ряд (Full Width Breakout 800px) */}
                        <div className="w-[100vw] max-w-[800px] relative left-1/2 -translate-x-1/2 px-4 lg:px-0 mb-12">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <div className="flex flex-col">
                              <div className="mb-4 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/16.png`} alt="История всех пополнений" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground">
                                <p>История всех пополнений.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-4 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/17.png`} alt="Вся информация о копилке" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground">
                                <p>Вся информация о копилке.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-4 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/18.png`} alt="Редактирование типа накопления" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground">
                                <p>Редактирование типа накопления.</p>
                              </div>
                            </div>

                            <div className="flex flex-col">
                              <div className="mb-4 overflow-hidden rounded-[24px] border border-foreground/10">
                                <img src={`${BASE}assets/images/case-1/19.png`} alt="Редактирование суммы и срока накопления" className="w-full" />
                              </div>
                              <div className="text-[14px] leading-[1.6] text-muted-foreground">
                                <p>Редактирование суммы и срока накопления.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </motion.section>

                    {/* Testing Section */}
                    <motion.section
                      id="testing"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">Тестирование</h2>

                      <div className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 space-y-4 mb-16">
                        <p>
                          Я проводил удаленные usability тестрирования в <a href="https://www.useberry.com/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Useberry</a>. В моем распоряжении было 10 пользователей, для которых я написал подробный гайд по прохождению тестов. Сформировал 6 заданий по основным функциям:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-foreground/80">
                          <li>Создание копилки.</li>
                          <li>Пополнение копилки.</li>
                          <li>Изменения типа накопления.</li>
                          <li>Настройка истории пополнений.</li>
                          <li>Изменение суммы и срока накопления.</li>
                          <li>Удаление копилки.</li>
                        </ul>
                      </div>

                      {/* 80% Task Success Rate */}
                      <div className="mb-16">
                        <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-foreground mb-2 text-left">
                          80% - глобальный Task Success Rate
                        </h3>
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-muted-foreground mb-8">
                          при среднем времени прохождения - 3 минуты 52 секунды.
                        </p>
                        <div className="mb-6">
                          <img src={`${BASE}assets/images/case-1/20.png`} alt="Результаты тестирования 1" className="w-full" />
                        </div>
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                          Хуже всего справились с заданием по изменению типа накопления (50% task success rate). С этим заданием не справилась половина участников. Как позже выяснится, самым непростым было - это зайти в копилку.
                        </p>
                      </div>

                      {/* 67% Пользователей */}
                      <div className="mb-16">
                        <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-foreground mb-6 text-left">
                          67% - столько пользователей выбрало один из типов автопополнения
                        </h3>
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                          Хоть акценты и были сделаны на автопополнения, 33% участников выбрали самостоятельное накопление. Могу сделать вывод, что уровень доверия к автоматическим переводам все еще недостаточно высок.
                        </p>
                        <div className="mb-8">
                          <img src={`${BASE}assets/images/case-1/21.png`} alt="Результаты тестирования 2" className="w-full" />
                        </div>
                      </div>

                      {/* Стартовый экран */}
                      <div className="mb-12">
                        <h3 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-foreground mb-6 text-left">
                          Стартовый экран - самое трудное место для пользователей
                        </h3>
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                          Судя по разбросу кликов на хитмапе во время первого попадания на страницу, пользователь теряется в интерфейсе.
                        </p>

                        {/* Выноска */}
                        <div className="bg-[#f4f4f5] rounded-[20px] p-6 mb-8 flex items-start gap-4">
                          <div className="text-[20px] leading-none select-none shrink-0" aria-hidden="true">❓</div>
                          <p className="text-[16px] md:text-[17px] leading-[1.6] text-foreground/90 font-medium">
                            Карточка копилки недостаточно обозначена как кликабельный элемент на фоне других компонентов страницы?
                          </p>
                        </div>

                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-10">
                          Стоит заметить, что после успешного попадания в копилку, паттерн усваивается и в следующих заданиях трудности отсутствуют.
                        </p>

                        {/* 2 столбца */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                          <div className="flex flex-col">
                            <div className="mb-4">
                              <img src={`${BASE}assets/images/case-1/22.png`} alt="Хитмап первого задания" className="w-full" />
                            </div>
                            <p className="text-[14px] leading-[1.6] text-muted-foreground">
                              Хитмап при выполнении первого задания.
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <div className="mb-4">
                              <img src={`${BASE}assets/images/case-1/23.png`} alt="Хитмап последнего задания" className="w-full" />
                            </div>
                            <p className="text-[14px] leading-[1.6] text-muted-foreground">
                              Хитмап при выполнении последнего задания.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.section>

                    {/* Improvements Section */}
                    <motion.section
                      id="improvements"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-16 scroll-mt-32"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">Что можно улучшить</h2>

                      <div className="bg-[#f4f4f5] p-6 md:p-8 rounded-[24px]">
                        <ul className="space-y-4 list-disc pl-5 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 marker:text-foreground/80">
                          <li>
                            <span className="font-semibold text-foreground">Копить по частям.</span> Разделить каждое накопление на этапы, чтобы лучше визуализировать прогресс.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Платежи прямо из копилки.</span> Добавить ссылку на желаемый товар и переходить к покупке прямо из копилки.
                          </li>
                          <li>
                            <span className="font-semibold text-foreground">Геймификация.</span> Ввести поощрения и награды за соблюдение сроков накопления при условии, что с копилки не снимались деньги.
                          </li>
                        </ul>
                      </div>
                    </motion.section>
                  </motion.div>
                ) : (
                  <motion.div
                    key="summary-sections"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="summary-content"
                  >
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-16"
                    >
                      <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-8">Результаты в одном экране</h2>
                      <div className="grid grid-cols-1 gap-12">
                        <div className="overflow-hidden rounded-[24px] border border-foreground/10 shadow-sm">
                          <img src={`${BASE}assets/images/${id === 1 ? 'case-1/banner 1.jpg' : 'case-2/banner 2.jpg'}`} alt="Результат" className="w-full" />
                        </div>
                        <div className="space-y-10">
                          <div>
                            <h3 className="text-[18px] font-semibold mb-4">Основные инсайты</h3>
                            <p className="text-foreground/80 leading-[1.6]">
                              {id === 1
                                ? "Пользователи боятся отдавать управление финансами автоматике. Решение: прозрачность расчетов и система подтверждений."
                                : "Сложные формы пугают пользователей. Решение: геймификация прогресса и пошаговый ввод данных."}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-[18px] font-semibold mb-4">Ключевые изменения</h3>
                            <ul className="space-y-3 list-disc pl-5 text-foreground/80">
                              {id === 1 ? (
                                <>
                                  <li>Автоматический расчет дедлайна и сумм пополнений.</li>
                                  <li>Возможность ручного подтверждения каждого списания.</li>
                                  <li>Визуальное разделение целей через эмодзи и фото.</li>
                                </>
                              ) : (
                                <>
                                  <li>Индикатор прогресса заполнения профиля.</li>
                                  <li>Подсказки и микро-награды за каждый заполненный блок.</li>
                                  <li>Оптимизация мобильных форм ввода.</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.section>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Thanks Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-[24px] md:text-[36px] leading-[120%] font-medium tracking-tight text-foreground mb-6 md:mb-8">
                  Спасибо за внимание
                </h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 font-normal">
                  Со мной можно связаться в <a href="https://www.linkedin.com/in/anton-karpuk-3a7727180/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Linkedin</a> и <a href="https://t.me/Anton_3223" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Telegram</a>.
                </p>
              </motion.section>

              {/* Next Case Link Section */}
              {(() => {
                const nextCase = cases.find(c => c.id === 2);
                if (!nextCase) return null;
                return (
                  <motion.section
                    id="next"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 pt-16 border-t border-foreground/5 scroll-mt-32"
                  >
                    <Link to={`/case?id=${nextCase.id}`} className="block group">
                      <div className="flex flex-col gap-6">
                        <span className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase">Следующий кейс</span>
                        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-foreground/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-1">
                          <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden relative rounded-lg bg-muted/30">
                            <img
                              src={`${BASE}assets/images/${nextCase.banner}`}
                              alt={nextCase.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              <div className="px-2.5 py-1 rounded-md bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider text-slate-900 uppercase shadow-sm">
                                {nextCase.year}
                              </div>
                              <div className="px-2.5 py-1 rounded-md bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider text-slate-900 uppercase shadow-sm">
                                {nextCase.category}
                              </div>
                            </div>
                          </div>
                          <div className="md:flex-1 p-6 md:p-8 flex flex-col text-left">
                            <h3 className="text-[20px] font-medium tracking-tight text-foreground/90 leading-snug">
                              {nextCase.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.section>
                );
              })()}
            </div>
          )}

          {id === 2 && (
            <div className="lg:mt-0 mt-8">
              {/* Title and Description */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-16"
              >

                <h1 className="text-[24px] md:text-[36px] leading-[120%] font-medium tracking-tight text-foreground mb-6 md:mb-8">
                  {caseData.title}
                </h1>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 font-normal">
                  Я работал над личным кабинетом медицинского центра. Внутри было около 20 полей, но кроме обязательных полей мало кто стремился заполнять остальные. А бизнесу важны эти данные, чтобы:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 marker:text-muted-foreground">
                  <li>Предлагать релевантные чек-апы.</li>
                  <li>Напоминать о скринингах.</li>
                  <li>Предлагать вакцинации и профилактические программы.</li>
                </ul>
              </motion.section>

              {/* Задача */}
              <motion.section
                id="task"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Задача</h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                  Переработать дизайн профиля, чтобы мотивировать пациентов заполнить как можно больше полей, при этом не помечать каждое поле как обязательное.
                </p>
              </motion.section>

              {/* Моя роль */}
              <motion.section
                id="role"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Моя роль</h2>
                <ul className="list-disc pl-5 mb-8 space-y-2 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 marker:text-muted-foreground">
                  <li>Протестировал исходный дизайн в Useberry, определил основные проблемы.</li>
                  <li>Провёл дискавери: проанализировал схожие решения.</li>
                  <li>Сформулировал и проверил 4 гипотезы.</li>
                  <li>В ускоренном режиме собрал обновлённый дизайн в Figma Make и протестировал на пользователях.</li>
                </ul>
                <div className="bg-[#f4f4f5] rounded-[20px] p-6 flex items-start gap-4">
                  <div className="text-[20px] leading-none select-none shrink-0" aria-hidden="true">🎉</div>
                  <p className="text-[16px] md:text-[17px] leading-[1.6] text-foreground/90 font-medium">
                    Увеличил глубину заполнения профиля на 19% и среднее время нахождения на странице на 40 секунд.
                  </p>
                </div>
              </motion.section>

              {/* Тестирование */}
              <motion.section
                id="testing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Тестирование</h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  Я потратил примерно 15 минут и несколько промптов в Figma Make, чтобы воссоздать исходную страницу профиля и протестировать её. По результатам тестирования лишь 30% пациентов заполнили все поля.
                </p>

                {/* 3 Photos Horizontal (Max 600px width, uncropped, no borders/shadows) */}
                <div className="w-full flex justify-between gap-2 md:gap-4 mb-12">
                  <div className="flex-1 w-full flex items-center justify-center">
                    <img src={`${BASE}assets/images/case-2/1.png`} alt="Тестирование 1" className="w-full h-auto object-contain" />
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center">
                    <img src={`${BASE}assets/images/case-2/2.png`} alt="Тестирование 2" className="w-full h-auto object-contain" />
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center">
                    <img src={`${BASE}assets/images/case-2/3.png`} alt="Тестирование 3" className="w-full h-auto object-contain" />
                  </div>
                </div>
              </motion.section>

              {/* Дискавери */}
              <motion.section
                id="discovery"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Дискавери</h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  Я был ограничен во времени, поэтому рассмотрел только <a href="https://hirify.me/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">hirify</a> и <a href="http://rabota.by" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">rabota.by</a>. Эти сервисы не связаны с медициной, однако у них есть заполненные формы при работе с CV.
                </p>
                <div className="mb-8 w-full">
                  <img src={`${BASE}assets/images/case-2/4.png`} alt="Hirify" className="w-full h-auto object-contain" />
                </div>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  В hirify форма разбита на разделы, по которым можно навигировать. Это удобно, когда нужна мобильность и необходимо быстро добраться до конкретного поля.
                </p>

                <div className="bg-[#f4f4f5] rounded-[20px] p-6 mb-12 space-y-6 flex flex-col items-start text-muted-foreground">
                  <p className="text-[16px] md:text-[17px] leading-[1.6] italic">
                    <span className="font-semibold text-foreground mr-1 not-italic">Гипотеза:</span>
                    Если разбить форму на разделы, пациентам будет психологически проще заполнять поля порциями, а не бесконечным списком. Таким образом мы увеличим глубину заполнения формы.
                  </p>
                  <p className="text-[16px] md:text-[17px] leading-[1.6] italic">
                    <span className="font-semibold text-foreground mr-1 not-italic">Гипотеза:</span>
                    Если объяснить пациентам ценность собираемой информации, то они будут воспринимать форму как заботу, а не шпионаж за личными данными. Таким образом мы мотивируем пациентов заполнить поля с чувствительной информацией.
                  </p>
                </div>

                <div className="mb-8 w-full">
                  <img src={`${BASE}assets/images/case-2/5.png`} alt="Rabota.by" className="w-full h-auto object-contain" />
                </div>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-6">
                  На <a href="http://rabota.by" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">rabota.by</a> кроме деления на разделы есть индикатор заполненности профиля. Это отличный способ визуализировать процесс заполнения, когда в большой форме нет чёткого понимания, сколько ещё осталось. Это также воспринимается как игра на чувстве незавершённости, что мотивирует заполнить прогресс-бар на 100%.
                </p>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  Ещё есть полезная возможность видеть незаполненные поля отдельным компактным списком справа. Это позволяет вместо скролла открыть нужное поле в один клик.
                </p>

                <div className="bg-[#f4f4f5] rounded-[20px] p-6 flex flex-col space-y-6 items-start text-muted-foreground">
                  <p className="text-[16px] md:text-[17px] leading-[1.6] italic">
                    <span className="font-semibold text-foreground mr-1 not-italic">Гипотеза:</span>
                    если добавить индикатор заполненности профиля, это мотивирует пациентов заполнить больше полей.
                  </p>
                  <p className="text-[16px] md:text-[17px] leading-[1.6] italic">
                    <span className="font-semibold text-foreground mr-1 not-italic">Гипотеза:</span>
                    если добавить рядом список незаполненных полей, по которым можно навигировать, пациенты будут быстрее заполнять форму.
                  </p>
                </div>
              </motion.section>

              {/* Решение */}
              <motion.section
                id="solution"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Решение</h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  Я потратил ещё 30 минут в Figma Make на доработку профиля. В дизайне скомбинировал подходы: разделение полей на разделы, добавление индикатора заполненности и список незаполненных полей.
                </p>
                <div className="w-full">
                  <img src={`${BASE}assets/images/case-2/6.png`} alt="Решение" className="w-full h-auto object-contain" />
                </div>
              </motion.section>

              {/* Результаты */}
              <motion.section
                id="results"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Результаты</h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 mb-8">
                  Я протестировал обновленный дизайн и получил следующие результаты:
                </p>

                {/* Horizontal Photos 7 & 8 */}
                <div className="flex justify-between gap-4 md:gap-6 mb-8 w-full">
                  <div className="flex-1 w-full flex items-center justify-center">
                    <img src={`${BASE}assets/images/case-2/7.png`} alt="Результат 1" className="w-full h-auto object-contain" />
                  </div>
                  <div className="flex-1 w-full flex items-center justify-center">
                    <img src={`${BASE}assets/images/case-2/8.png`} alt="Результат 2" className="w-full h-auto object-contain" />
                  </div>
                </div>

                <div className="bg-[#f4f4f5] rounded-[20px] p-6">
                  <ul className="list-disc pl-5 space-y-2 text-[16px] md:text-[17px] leading-[1.6] text-foreground/90 font-medium marker:text-foreground">
                    <li>Среднее Time on Task увеличилось на 40 секунд.</li>
                    <li>Исходная глубина заполнения формы - 57%. В обновленной версии - 76%.</li>
                  </ul>
                </div>
              </motion.section>

              {/* Наблюдения */}
              <motion.section
                id="observations"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Наблюдения</h2>
                <div className="space-y-4 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80">
                  <p>
                    Ожидалось, что среднее время нахождения на странице сократится за счёт навигации по незаполненным полям. Оказалось наоборот. Те, кто впервые работал с таким компонентом, тратили больше времени на изучение.
                  </p>
                  <p>
                    Пользователям привычнее стандартный скрол. Многие испытуемые игнорировали дополнительную навигацию.
                  </p>
                  <p>
                    Добиться заполнения формы на 100% невозможно пока существуют поля, на которые у пациентов не знают ответа.
                  </p>
                </div>
              </motion.section>

              {/* Что можно улучшить */}
              <motion.section
                id="improvements"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase mb-6">Что можно улучшить</h2>
                <div className="bg-[#f4f4f5] rounded-[24px] p-6 md:p-8">
                  <ul className="space-y-4 list-disc pl-5 text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 marker:text-foreground/80">
                    <li>
                      Добавить подсказки к полям, ответы на которые пациенты могут не знать. Например: как узнать свою группу крови и резус-фактор, где посмотреть номер полиса и т. п.
                    </li>
                    <li>
                      Глубже проработать мотивацию.
                    </li>
                  </ul>
                </div>
              </motion.section>

              {/* Thanks Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-[24px] md:text-[36px] leading-[120%] font-medium tracking-tight text-foreground mb-6 md:mb-8">
                  Спасибо за внимание!
                </h2>
                <p className="text-[16px] md:text-[18px] leading-[1.6] text-foreground/80 font-normal">
                  Со мной можно связаться в <a href="https://www.linkedin.com/in/anton-karpuk-3a7727180/" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Linkedin</a> и <a href="https://t.me/Anton_3223" target="_blank" rel="noreferrer" className="text-muted-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:text-foreground hover:decoration-foreground/50 transition-all font-medium">Telegram</a>.
                </p>
              </motion.section>

              {/* Next Case Link Section */}
              {(() => {
                const nextCase = cases.find(c => c.id === 1);
                if (!nextCase) return null;
                return (
                  <motion.section
                    id="next"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 pt-16 border-t border-foreground/5 scroll-mt-32"
                  >
                    <Link to={`/case?id=${nextCase.id}`} className="block group">
                      <div className="flex flex-col gap-6">
                        <span className="text-[13px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase">Следующий кейс</span>
                        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-foreground/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-1">
                          <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden relative rounded-lg bg-muted/30">
                            <img
                              src={`${BASE}assets/images/${nextCase.banner}`}
                              alt={nextCase.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 flex gap-2">
                              <div className="px-2.5 py-1 rounded-md bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider text-slate-900 uppercase shadow-sm">
                                {nextCase.year}
                              </div>
                              <div className="px-2.5 py-1 rounded-md bg-white/40 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider text-slate-900 uppercase shadow-sm">
                                {nextCase.category}
                              </div>
                            </div>
                          </div>
                          <div className="md:flex-1 p-6 md:p-8 flex flex-col text-left">
                            <h3 className="text-[20px] font-medium tracking-tight text-foreground/90 leading-snug">
                              {nextCase.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.section>
                );
              })()}

            </div>
          )}

        </main>
      </div>

      <footer className="footer max-w-[1024px] mx-auto flex items-center justify-between py-8 pb-2 md:pb-6 text-[13px] text-muted-foreground border-t border-foreground/5 font-medium tracking-tight px-4 md:px-0">
        <span>(c) 2026</span>
        <div className="flex gap-4 md:gap-6">
          <a href="https://www.behance.net/AntonVolle0079" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline underline-offset-4 transition-all cursor-pointer">Behance</a>
          <a href="https://dribbble.com/Patar" target="_blank" rel="noreferrer" className="hover:text-foreground hover:underline underline-offset-4 transition-all cursor-pointer">Dribbble</a>
        </div>
      </footer>
    </div>
  );
}
