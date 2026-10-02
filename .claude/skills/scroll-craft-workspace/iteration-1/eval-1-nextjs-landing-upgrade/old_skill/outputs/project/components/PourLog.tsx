import { tracePath } from "@/lib/pour";

/**
 * The scale's display. Rendered in its finished state (320.0 g, 3:30, full
 * trace) so it is complete without JavaScript and under reduced motion; the
 * client scrubs it from the act's progress when motion is allowed.
 * Decorative: it reflects the visitor's scroll, so it is hidden from assistive
 * technology rather than read out on every frame.
 */
export default function PourLog({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div className={`pour ${className}`} data-pour={id} aria-hidden="true">
      <div className="pour__row">
        <span className="pour__g" data-pour-g>
          320.0
        </span>
        <span className="pour__unit">g</span>
        <span className="pour__t" data-pour-t>
          3:30
        </span>
      </div>
      <svg className="pour__trace" viewBox="0 0 200 44" preserveAspectRatio="none" focusable="false">
        <path
          d={tracePath(200, 44)}
          data-pour-trace
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
