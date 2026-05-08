import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  set_button_input,
  set_button_trigger,
  set_create_prebuilt_base_state,
  set_model_creation_state,
  set_model_downgrade_trigger,
  set_model_type_to_create,
  set_model_upgrade_trigger,
  set_models_xray_active,
  set_object_rotation_degree,
  set_page_mode,
  set_selected_object_list,
} from "../../Store.tsx";

type Tab = "build" | "markers" | "edit";
type Tier = "Stone" | "Sheet" | "Armored";

const STRUCTURES: Record<Tier, { label: string; model: string }[]> = {
  Stone: [
    { label: "Square", model: "StoneFoundationSquareHigh" },
    { label: "Triangle", model: "StoneFoundationTriangleHigh" },
    { label: "Wall", model: "StoneWallHigh" },
    { label: "Doorway", model: "StoneDoorway" },
    { label: "Window", model: "StoneWindow" },
    { label: "Floor", model: "StoneFloorSquare" },
  ],
  Sheet: [
    { label: "Square", model: "MetalFoundationSquareHigh" },
    { label: "Triangle", model: "MetalFoundationTriangleHigh" },
    { label: "Wall", model: "MetalWallHigh" },
    { label: "Doorway", model: "MetalDoorway" },
    { label: "Window", model: "MetalWindow" },
    { label: "Floor", model: "MetalFloorSquare" },
  ],
  Armored: [
    { label: "Square", model: "ArmoredFoundationSquareHigh" },
    { label: "Triangle", model: "ArmoredFoundationTriangleHigh" },
    { label: "Wall", model: "ArmoredWallHigh" },
    { label: "Doorway", model: "ArmoredDoorway" },
    { label: "Window", model: "ArmoredWindow" },
    { label: "Floor", model: "ArmoredFloorSquare" },
  ],
};

const MARKERS = [
  { label: "TC", model: "ToolCupboard" },
  { label: "Bag", model: "SleepingBag" },
  { label: "Box", model: "LargeWoodBox" },
  { label: "Furnace", model: "Furnace" },
  { label: "Workbench", model: "WorkbenchT3" },
  { label: "Garage", model: "GarageDoor" },
];

export default function MobileConsolePanel() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<Tab>("build");
  const [tier, setTier] = useState<Tier>("Stone");
  const [collapsed, setCollapsed] = useState(false);

  const pageMode = useSelector((state: RootState) => state.pageMode.page_mode);
  const buttonTrigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const upgradeTrigger = useSelector((state: RootState) => state.modelsData.model_upgrade_trigger);
  const downgradeTrigger = useSelector((state: RootState) => state.modelsData.model_downgrade_trigger);
  const xrayActive = useSelector((state: RootState) => state.modelsData.models_xray_active);

  function selectModel(model: string) {
    dispatch(set_page_mode("edit"));
    dispatch(set_create_prebuilt_base_state(false));
    dispatch(set_selected_object_list(-1));
    dispatch(set_model_type_to_create(model));
    dispatch(set_model_creation_state(true));
    dispatch(set_object_rotation_degree(90));
  }

  function rotate(direction: "rotate_left" | "rotate_right") {
    dispatch(set_button_input(direction));
    dispatch(set_button_trigger(buttonTrigger + 1));
  }

  return (
    <section className={collapsed ? "mobile_console_panel mobile_console_panel--collapsed" : "mobile_console_panel"}>
      <header className="mobile_console_panel__topbar">
        <div>
          <strong>Console mobile</strong>
          <span>{pageMode === "edit" ? "Edit mode" : pageMode === "overview" ? "Overview" : "Estimate mode"}</span>
        </div>
        <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? "Open" : "Hide"}</button>
      </header>

      {!collapsed && (
        <>
          <nav className="mobile_console_panel__tabs">
            <button className={tab === "build" ? "active" : ""} onClick={() => setTab("build")}>Build</button>
            <button className={tab === "markers" ? "active" : ""} onClick={() => setTab("markers")}>Markers</button>
            <button className={tab === "edit" ? "active" : ""} onClick={() => setTab("edit")}>Edit</button>
          </nav>

          {tab === "build" && (
            <div className="mobile_console_panel__body">
              <div className="mobile_console_panel__tiers">
                {(["Stone", "Sheet", "Armored"] as Tier[]).map((nextTier) => (
                  <button key={nextTier} className={tier === nextTier ? "active" : ""} onClick={() => setTier(nextTier)}>{nextTier}</button>
                ))}
              </div>
              <div className="mobile_console_panel__grid">
                {STRUCTURES[tier].map((item) => (
                  <button key={item.model} onClick={() => selectModel(item.model)}>{item.label}</button>
                ))}
              </div>
            </div>
          )}

          {tab === "markers" && (
            <div className="mobile_console_panel__body">
              <p className="mobile_console_panel__hint">Markers do not inherit building material tiers.</p>
              <div className="mobile_console_panel__grid">
                {MARKERS.map((item) => (
                  <button key={item.model} onClick={() => selectModel(item.model)}>{item.label}</button>
                ))}
              </div>
            </div>
          )}

          {tab === "edit" && (
            <div className="mobile_console_panel__body">
              <div className="mobile_console_panel__grid">
                <button onClick={() => rotate("rotate_left")}>Rotate L</button>
                <button onClick={() => rotate("rotate_right")}>Rotate R</button>
                <button onClick={() => dispatch(set_model_upgrade_trigger(upgradeTrigger + 1))}>Upgrade</button>
                <button onClick={() => dispatch(set_model_downgrade_trigger(downgradeTrigger + 1))}>Downgrade</button>
                <button onClick={() => dispatch(set_models_xray_active(!xrayActive))}>{xrayActive ? "X-ray off" : "X-ray on"}</button>
                <button onClick={() => dispatch(set_page_mode("overview"))}>Overview</button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
