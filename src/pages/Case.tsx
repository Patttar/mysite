import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const BASE = import.meta.env.BASE_URL;

const cases = [
  { id: 1, title: 'Как я спроектировал раздел автонакоплений для банка и получил 80% Success Rate' },
  { id: 2, title: 'Как я спроектировал раздел автонакоплений для банка и получил 80% Success Rate' },
];

const cvLink = "https://drive.google.com/file/d/1uA0-bED04z8XAIxBwQitAmk-YSQpC2HM/view?pli=1";

const TelegramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path d="M21.435 2.582a1.933 1.933 0 0 0-1.912-.03L2.947 10.43c-.886.417-.852 1.623.056 1.99l4.57 1.848 1.764 5.645a1.1 1.1 0 0 0 1.88.356l2.164-2.607 4.744 3.513a1.1 1.1 0 0 0 1.704-.627L22.015 4.393a1.1 1.1 0 0 0-.58-1.811zM8.32 13.565l9.282-5.748c.184-.114.368.145.215.29l-7.466 7.042-1.332 4.015-1.018-3.255.319-2.344z" fill="currentColor" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground fill-current">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function Case() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get('id') || '1');
  const caseData = cases.find(c => c.id === id) || cases[0];

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const [activeSection, setActiveSection] = useState<string>('');
  const sections = [
    { id: 'goal', label: 'Цель' },
    { id: 'metrics', label: 'Метрики' },
    { id: 'role', label: 'Моя роль' },
    { id: 'discovery', label: 'Дискавери' },
    { id: 'benchmark', label: 'Бенчмарк' },
    { id: 'flow', label: 'Флоу' },
    { id: 'screens', label: 'Экраны' },
  ];

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

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

          {/* Navigation Sidebar (Right Aligned with LinkedIn) */}
          <div className="absolute right-[16px] md:right-[24px] top-[128px] pointer-events-auto">
            <nav className="flex flex-col gap-3 border-r border-foreground/5 pr-4 items-end">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-[13px] font-medium text-right transition-all duration-300 hover:text-foreground",
                    activeSection === section.id
                      ? "text-foreground -translate-x-1"
                      : "text-muted-foreground/20"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
        {/* Working Area (600px) */}
        <main className="max-w-[600px] mx-auto pt-32 pb-24 relative z-10 transition-all">

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
                Когда деньги лежат на карте, тратить их очень легко: клик - и вот очередное списание в магазине или на маркетплейсе. А к концу месяца может оказаться, что не хватает на оплату аренды квартиры. Копилки, предлагаемые многими банками, позволяют нам отодвинуть горизонт финансового планирования на годы, что помогает безболезненно отложить деньги на дорогостоящие покупки.
              </p>
            </motion.section>

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
                Я проанализировал процесс создания Копилок и работы с ними в приложениях <a href="https://www.alfabank.by/" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all">Альфа банка</a>, <a href="https://www.sber-bank.by/" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all">Сбер банка</a> и <a href="https://www.belapb.by/" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all">Белагропромбанка</a> по 23-м критериям и выявил схожие фичи и подходы.
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
                className="text-[14px] font-medium text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-foreground/20"
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
                Я составил <a href="https://www.figma.com/board/ibhI2xoN187DyqaCs6ckHk/%D0%9A%D0%BE%D0%BF%D0%B8%D0%BB%D0%BA%D0%B0?node-id=0-1&t=otgw9xGTkgu1vWtQ-1" target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all">флоу</a> для 3-х базовых сценариев: Создания, пополнения и редактирования копилки.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-24">
                <div className="order-2 md:order-1 self-center">
                  <div className="overflow-hidden rounded-[24px] border border-foreground/5 shadow-sm">
                    <img src={`${BASE}assets/images/screen-home.png`} alt="Домашняя страница" className="w-full" />
                  </div>
                </div>
                <div className="order-1 md:order-2 self-center flex flex-col justify-center">
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
                      <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/5 shadow-sm">
                        <img src={`${BASE}assets/images/screen-create-emoji.png`} alt="Выбор обложки" className="w-full" />
                      </div>
                      <p className="text-[14px] leading-[1.6] text-muted-foreground">
                        Обычно любая цель имеет оболочку и ее можно сфотографировать, но если нет фото — в качестве обложки можно использовать подходящий эмодзи из предложенных.
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <div className="mb-6 overflow-hidden rounded-[24px] border border-foreground/5 shadow-sm">
                        <img src={`${BASE}assets/images/screen-create-methods.png`} alt="Выбор способа" className="w-full" />
                      </div>
                      <p className="text-[14px] leading-[1.6] text-muted-foreground">
                        Здесь пользователь выбирает тот способ накопления, который удобен лично ему.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <footer className="footer flex justify-start py-8 pb-6 text-[13px] text-muted-foreground mt-20 border-t border-foreground/5">
            <span>(c) 2026</span>
          </footer>

        </main>
      </div>
    </div>
  );
}
