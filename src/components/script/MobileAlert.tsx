import { useState } from "react";

const CONSOLE_NOTE =
  "This planner is optimized for Rust Console Edition next-gen console planning. It is not an official Rust tool and does not simulate the game engine exactly. Placement, costs, upkeep, durability, and raid estimates are approximations and should be verified in-game.";

export default function MobileAlert() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [panelOpen, setPanelOpen] = useState<boolean>(isMobile);

  return (
    <>
      {panelOpen && (
        <div className="mobile_alert_container" role="dialog" aria-modal="true" aria-label="Console Edition planner notes">
          <section className="mobile_alert_card">
            <p className="mobile_alert_eyebrow">Rust Console Edition / next-gen console</p>
            <h2 className="mobile_alert_title">Phone-first planning companion</h2>
            <p className="mobile_alert_text">{CONSOLE_NOTE}</p>
            <ul className="mobile_alert_list">
              <li>Use phone portrait controls as the primary workflow.</li>
              <li>Deployables are planning markers, not material-tier pieces.</li>
              <li>Server mode, patch, Official, Community, PTB/Staging, Easy Mode, and Hard Mode can change behavior.</li>
            </ul>
            <button className="mobile_alert_confirm" onClick={() => setPanelOpen(false)}>
              Start planning
            </button>
          </section>
        </div>
      )}
      {!panelOpen && (
        <button className="mobile_alert_reopen" onClick={() => setPanelOpen(true)} aria-label="Open console planner notes">
          Console notes
        </button>
      )}
    </>
  );
}
