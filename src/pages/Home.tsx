import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const cases = [
  { id: 1, title: 'Как я спроектировал раздел автонакоплений для банка и получил 80% Success Rate', banner: 'case-1/banner 1.jpg' },
  { id: 2, title: 'Как я спроектировал раздел автонакоплений для банка и получил 80% Success Rate', banner: 'case-2/banner 2.jpg' },
];

const shots = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  alt: `UI Shot ${i + 1}`,
}));

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

const CaseArrowIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{
      rotate: isHovered ? 45 : 0,
      color: isHovered ? "#ffffff" : "#71717a"
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const CaseCard = ({ c, i }: { c: any; i: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      key={c.id}
      className="h-full"
    >
      <Link
        to={`/case?id=${c.id}`}
        className="block group h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="rounded-xl border-none shadow-sm overflow-hidden bg-[#ffffff] transition-all hover:shadow-md duration-300 ease-out h-full flex flex-col p-0">
          <div className="w-full aspect-[4/3] bg-muted/30 relative overflow-hidden p-0 m-0">
            <img
              src={`${BASE}assets/images/${c.banner}`}
              alt={c.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 md:p-6 flex-1 flex flex-row items-end justify-between gap-10">
            <h3 className="text-[20px] leading-[1.3] font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-primary flex-1">
              {c.title}
            </h3>
            <motion.div
              animate={{
                background: isHovered
                  ? "linear-gradient(225deg, #fde68a 0%, #a3e635 45%, #38bdf8 100%)"
                  : "#f4f4f5"
              }}
              className="hidden md:flex w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors overflow-hidden relative"
            >
              <CaseArrowIcon isHovered={isHovered} />
            </motion.div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Infinite Scroll & Drag Logic
  const marqueeX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_t, delta) => {
    if (!isPaused) {
      const moveBy = -0.5 * (delta / 16); // Normalizing for 60fps
      let updatedX = marqueeX.get() + moveBy;

      if (marqueeRef.current) {
        const halfWidth = marqueeRef.current.scrollWidth / 2;
        if (updatedX <= -halfWidth) {
          updatedX += halfWidth;
        } else if (updatedX >= 0) {
          updatedX -= halfWidth;
        }
      }
      marqueeX.set(updatedX);
    }
  });

  const handleDrag = () => {
    if (marqueeRef.current) {
      const halfWidth = marqueeRef.current.scrollWidth / 2;
      let currentX = marqueeX.get();
      if (currentX <= -halfWidth) {
        marqueeX.set(currentX + halfWidth);
      } else if (currentX >= 0) {
        marqueeX.set(currentX - halfWidth);
      }
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

      {/* Main content with spacer for fixed header */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-6 relative z-10">

        <motion.section
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12 md:mb-24 pt-4 md:pt-8 max-w-4xl mx-auto"
        >
          <h1 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6 text-foreground tracking-tight">Антон Карпук</h1>
          <p className="text-[24px] md:text-[42px] leading-[120%] font-medium tracking-tight px-1 md:px-0">
            <span className="text-foreground">6 лет</span> <span className="text-foreground/25">проектирую сложные интерфейсы для</span> <span className="text-foreground">web B2B SaaS</span><span className="text-foreground/25">‑продуктов,</span> <span className="text-foreground">IOS & Android</span> <span className="text-foreground/25">приложения и</span> <span className="text-foreground">дизайн‑системы</span>
          </p>
        </motion.section>

        <section className="mb-20 md:mb-32">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground/50 uppercase text-center mb-8 md:mb-12">Избранные кейсы</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
            {cases.map((c, i) => (
              <CaseCard key={c.id} c={c} i={i} />
            ))}
          </div>
        </section>

        {/* Interactive Loop Marquee (UI Shots) */}
        <section className="mb-24 overflow-hidden relative">
          <h2 className="text-sm font-semibold tracking-widest text-muted-foreground/50 uppercase text-center mb-8 md:mb-12">UI шоты</h2>

          <div
            className="relative w-full overflow-hidden pt-8 pb-10"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <motion.div
              ref={marqueeRef}
              style={{ x: marqueeX }}
              drag="x"
              onDragStart={() => setIsPaused(true)}
              onDrag={handleDrag}
              onDragEnd={() => setIsPaused(false)}
              className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing w-max select-none"
            >
              {[...shots, ...shots].map((shot, i) => (
                <div key={`${shot.id}-${i}`} className="flex-shrink-0 w-[280px] md:w-[400px]">
                  <Card className="rounded-xl overflow-hidden border-none shadow-sm aspect-[4/3] bg-[#ffffff] p-1 pointer-events-none">
                    <div className="w-full h-full relative overflow-hidden rounded-lg bg-muted/20 flex items-center justify-center">
                      <span className="text-muted-foreground/30 font-medium text-xs text-center px-4">UI Shot Placeholder</span>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>

            {/* Edge fading masks */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>
        </section>

        <footer className="flex justify-start py-8 pb-6 text-[13px] text-muted-foreground mt-4">
          <span>(c) 2026</span>
        </footer>

      </main>
    </div>
  );
}
