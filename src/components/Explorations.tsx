import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExplorationItem } from '../types.ts';

gsap.registerPlugin(ScrollTrigger);

interface ExplorationsProps {
  onSelectExploration: (item: ExplorationItem) => void;
}

export const explorationItems: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'HTML Web Structure & DOM',
    medium: 'Frontend Syntax & Semantic Tags',
    year: '2024',
    image: '/assets/aistudio/images__1__0f0990a7.jpg',
    rotation: '-rotate-3',
    description:
      'การฝึกเขียนโครงสร้างเว็บด้วยภาษา HTML และ Semantic Tags เพื่อสร้างเค้าโครงเว็บไซต์ที่ถูกต้องตามมาตรฐานสากล'
  },
  {
    id: 'exp-2',
    title: 'CSS Rules & Web Styling',
    medium: 'Modern CSS & Screen Reader Styling',
    year: '2024',
    image: '/assets/aistudio/images__2__0ac154db.jpg',
    rotation: 'rotate-3',
    description:
      'การจัดรูปแบบหน้าเว็บด้วย CSS ปรับแต่งสี ขนาดตัวอักษร ระยะห่าง และการกำหนดคลาสสำหรับการแสดงผลที่สวยงาม'
  },
  {
    id: 'exp-3',
    title: 'HTML5 Modern Web Standards',
    medium: 'Hypertext Markup Language V5',
    year: '2024',
    image: '/assets/aistudio/images__3__f0744a17.jpg',
    rotation: '-rotate-2',
    description:
      'การเรียนรู้มาตรฐานเว็บ HTML5 ยุคใหม่ รองรับมัลติมีเดีย วิดีโอ กราฟิก และการสร้างประสบการณ์เว็บระดับสูง'
  },
  {
    id: 'exp-4',
    title: 'CSS3 Interactive Styling',
    medium: 'Cascading Style Sheets 3',
    year: '2024',
    image: '/assets/aistudio/images__4__9b007aaa.jpg',
    rotation: 'rotate-2',
    description:
      'การประยุกต์ใช้เทคโนโลยี CSS3 สำหรับจัดหน้าเว็บแบบ Responsive, Flexbox, Grid และแอนิเมชันกราฟิก'
  },
  {
    id: 'exp-5',
    title: 'Programming Fundamentals & Logic',
    medium: 'Core Programming & Data Structures',
    year: '2024',
    image: '/assets/aistudio/images__5__c6933379.jpg',
    rotation: '-rotate-3',
    description:
      'ทำความเข้าใจหลักการเขียนโปรแกรม การคิดเชิงคำนวณ ตรรกะอัลกอริทึม และการจัดการข้อมูลเบื้องต้น'
  },
  {
    id: 'exp-6',
    title: 'JavaScript Engine & Events',
    medium: 'Client-side Scripting & DOM Logic',
    year: '2024',
    image: '/assets/aistudio/images__6__0d848454.jpg',
    rotation: 'rotate-3',
    description:
      'การเขียนโค้ด JavaScript สำหรับควบคุมการตอบสนอง การดักจับ Event คลิก เมาส์ และการคำนวณฟังก์ชันแบบไดนามิก'
  },
];

export const Explorations: React.FC<ExplorationsProps> = ({
  onSelectExploration,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const centerPinRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !centerPinRef.current) return;

      // Layer 1: Pinned Center
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: centerPinRef.current,
        pinSpacing: false,
      });

      // Layer 2: Parallax Column 1
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 120 },
          {
            y: -240,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Layer 2: Parallax Column 2 (Offset parallax speed)
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: 350 },
          {
            y: -420,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1Items = explorationItems.filter((_, i) => i % 2 === 0);
  const col2Items = explorationItems.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg border-t border-stroke/50 overflow-hidden"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={centerPinRef}
        className="h-screen w-full flex flex-col justify-center items-center text-center px-6 pointer-events-auto z-10"
      >
        <div className="max-w-md mx-auto bg-transparent p-8 rounded-3xl border border-white/10 backdrop-blur-[2px]">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4 bg-transparent">
            <span className="w-8 h-px bg-stroke inline-block" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium bg-transparent">
              The End
            </span>
            <span className="w-8 h-px bg-stroke inline-block" />
          </div>

          {/* Heading: Thank You for Watching */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight font-light mb-4 bg-transparent">
            Thank You for{' '}
            <span className="font-display italic font-normal bg-transparent">Watching</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm text-muted/90 leading-relaxed font-['Prompt',sans-serif] font-normal flex flex-col gap-3 bg-transparent">
            <span className="bg-transparent text-text-primary/95">ขอขอบคุณทุกท่านที่ให้ความสนใจและเข้าเยี่ยมชมเว็บไซต์สื่อการเรียนการสอนของเรา</span>
            <span className="text-sm text-muted/90 leading-relaxed bg-transparent">
              ทางผู้จัดทำหวังเป็นอย่างยิ่งว่าเนื้อหาและสื่อการเรียนรู้ที่นำเสนอภายในเว็บไซต์นี้ จะเป็นประโยชน์ต่อการศึกษา ช่วยเพิ่มพูนความรู้ และสามารถนำไปประยุกต์ใช้ได้อย่างมีประสิทธิภาพ
            </span>
          </p>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute pointer-events-none wrapper, pointer-events-auto on cards) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex justify-center px-6 md:px-12 pt-24 pb-48">
        <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-32 md:gap-48 items-center md:items-start">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectExploration(item)}
                className={`pointer-events-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface/90 group cursor-pointer shadow-2xl transition-all duration-300 hover:scale-105 hover:border-white/30 ${item.rotation}`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle hover info overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-[10px] text-muted tracking-widest uppercase font-mono mb-1">
                      {item.medium}
                    </span>
                    <h4 className="text-lg text-text-primary font-medium tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-xs text-white/70 mt-1">Click to view in Lightbox</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-32 md:gap-48 items-center md:items-end pt-24 md:pt-40">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectExploration(item)}
                className={`pointer-events-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface/90 group cursor-pointer shadow-2xl transition-all duration-300 hover:scale-105 hover:border-white/30 ${item.rotation}`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle hover info overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-[10px] text-muted tracking-widest uppercase font-mono mb-1">
                      {item.medium}
                    </span>
                    <h4 className="text-lg text-text-primary font-medium tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-xs text-white/70 mt-1">Click to view in Lightbox</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
