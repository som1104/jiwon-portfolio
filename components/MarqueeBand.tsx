import Marquee from "@/components/ds/Marquee";
import { marqueeText } from "@/components/data";

export default function MarqueeBand() {
  return (
    <div className="marquee-band" data-reveal="fade">
      <Marquee speed={44}>{marqueeText}</Marquee>
    </div>
  );
}
