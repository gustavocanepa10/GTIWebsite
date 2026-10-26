import { useRef } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from "motion/react";
import { Instagram, PhoneOutgoing, BarChart3, FileBarChart, Settings, Activity, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import artwork from "@/assets/hero-tecnologia.png";

// Render clean cards independently of the background captured in the original image.
const cards = [
  ["WhatsApp", WhatsAppIcon, "#25D366"],
  ["Instagram", Instagram, "#e1308c"],
  ["Discador", PhoneOutgoing, "#005177"],
  ["Dados", BarChart3, "#83cf00"],
  ["Relatórios", FileBarChart, "#00b6cc"],
  ["Automação", Settings, "#ff7900"],
  ["Realtime", Activity, "#83cf00"],
  ["Telefone", Phone, "#005177"],
];

function ArtworkDetail({ viewport, className }) {
  return (
    <svg viewBox={viewport} className={className} aria-hidden="true">
      <image href={artwork} width="1671" height="941" />
    </svg>
  );
}

export function ChannelOrbit() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const rotation = useMotionValue(0);
  const counterRotation = useTransform(rotation, (value) => -value);

  useAnimationFrame((_, delta) => {
    if (visible && document.visibilityState === "visible") {
      rotation.set((rotation.get() + (Math.min(delta, 64) * 360) / 120000) % 360);
    }
  });

  return (
    <div ref={ref} className="mx-auto w-[85%] max-w-[460px] py-5">
      <div
        className="relative aspect-square"
        role="img"
        aria-label="WhatsApp, Instagram, discador, dados, relatórios, automação, realtime e telefone orbitam a GTI Networks"
      >
        <div className="absolute inset-[18%] rounded-full border border-cyan-400/60 shadow-[0_0_30px_#00baff33]" />
        <div className="absolute inset-[26%] overflow-hidden rounded-full border-2 border-cyan-400/80 shadow-[0_0_35px_#00aeff55]">
          <ArtworkDetail viewport="1045 288 318 318" className="h-full w-full" />
        </div>
        <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
          <div className="absolute inset-[8%] rounded-full border border-cyan-400/80" />
          <div className="absolute inset-[4%] rounded-full border border-dashed border-sky-400/40" />
          <div className="absolute inset-[12%] rounded-full border border-orange-400/50" />
          {cards.map(([name, Icon, color], index) => {
            const angle = (index * Math.PI) / 4 - Math.PI / 2;
            return (
              <div
                key={name}
                className="absolute h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + Math.cos(angle) * 41}%`,
                  top: `${50 + Math.sin(angle) * 41}%`,
                }}
              >
                <motion.div
                  className="flex h-full w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-[22%] border border-cyan-400/45 bg-gradient-to-br from-[#24375b] to-[#172744] text-white shadow-[0_0_16px_#00aaff22]"
                  style={{ rotate: counterRotation }}
                >
                  <Icon className="h-[38%] w-[38%]" style={{ color }} aria-hidden="true" />
                  <span className="max-w-full px-1 text-center text-[clamp(7px,0.8vw,11px)] font-semibold leading-tight">{name}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
