import { useState } from "react";
import { RootState } from "../../Store.tsx";
import { set_button_input, set_button_trigger, set_object_rotation_degree } from "../../Store.tsx" //prettier-ignore
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faArrowRotateLeft, faArrowUp, faArrowRight, faArrowDown, faArrowLeft, faCircleUp, faCircleDown} from "@fortawesome/free-solid-svg-icons" //prettier-ignore

import { useAudioPlayer } from "./AudioPlayer.tsx";

//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//Component The control panel positioned at the center bottom of the app that serves as a transforming tool for objects via mouse/touch input.
//Component It facilitates adjustments to object properties such as position, rotation, elevation and height.
//Component Phase 1 console fork note: labels avoid keyboard-first PC wording for phone/controller companion use.
//Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ControlsInput() {
  const dispatch = useDispatch();
  const playSound = useAudioPlayer();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const button_trigger = useSelector((state: RootState) => state.controlsInput.button_trigger);
  const object_rotation_degree = useSelector((state: RootState) => state.controlsInput.object_rotation_degree);
  const object_selected = useSelector((state: RootState) => state.modelsData.object_selected);
  const camera_3d_direction = useSelector((state: RootState) => state.camerasSettings.camera_3d_direction);
  const camera_type = useSelector((state: RootState) => state.camerasSettings.camera_type);
  const model_creation_state = useSelector((state: RootState) => state.modelsData.model_creation_state);

  const [previous_object_rotation_degree, set_previous_object_rotation_degree] = useState<number>(60);
  const [next_object_rotation_degree, set_next_object_rotation_degree] = useState<number>(15);

  function ChangeRotationDegree() {
    playSound("buttons_sound");

    switch (object_rotation_degree) {
      case 90:
        set_next_object_rotation_degree(30);
        set_previous_object_rotation_degree(90);
        dispatch(set_object_rotation_degree(15));
        break;

      case 15:
        set_next_object_rotation_degree(60);
        set_previous_object_rotation_degree(15);
        dispatch(set_object_rotation_degree(30));
        break;

      case 30:
        set_next_object_rotation_degree(90);
        set_previous_object_rotation_degree(30);
        dispatch(set_object_rotation_degree(60));
        break;

      case 60:
        set_next_object_rotation_degree(15);
        set_previous_object_rotation_degree(60);
        dispatch(set_object_rotation_degree(90));
        break;

      default:
        set_next_object_rotation_degree(30);
        set_previous_object_rotation_degree(90);
        dispatch(set_object_rotation_degree(15));
    }
  }

  function ObjectTransformButton(action: string) {
    dispatch(set_button_input(action));
    dispatch(set_button_trigger(button_trigger + 1));
  }

  //prettier-ignore
  return (
    <>
      {page_mode === "edit" && (
        <>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_top"
              // prettier-ignore
              style={{color: model_creation_state  ? "#ffd5b3" : !object_selected  ? "rgba(191, 191, 191, 0.5)"  : camera_3d_direction === "north"  ? "#ffd5b3"  : "#bbbbbb"}}
            >
              {camera_3d_direction === "north"
                ? "Forward +Z"
                : camera_3d_direction === "east"
                ? "Forward +X"
                : camera_3d_direction === "west"
                ? "Forward -X"
                : camera_3d_direction === "south"
                ? "Forward -Z"
                : "unknown"}
            </div>
          )}
          <button
            onClick={() => ObjectTransformButton("move_front")}
            className="object_move_button object_move_front_button"
            aria-label="Move selected piece forward"
          >
            <FontAwesomeIcon icon={faArrowUp} size="2xl" style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}/>
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_right"
              // prettier-ignore
              style={{color: model_creation_state  ? "#ffd5b3" : !object_selected  ? "rgba(191, 191, 191, 0.5)"  : camera_3d_direction === "west"  ? "#ffd5b3"  : "#bbbbbb"}}
            >
              {camera_3d_direction === "north"
                ? "Right +X"
                : camera_3d_direction === "east"
                ? "Right -Z"
                : camera_3d_direction === "west"
                ? "Right +Z"
                : camera_3d_direction === "south"
                ? "Right -X"
                : "unknown"}
            </div>
          )}
          <button
            onClick={() => ObjectTransformButton("move_right")}
            className="object_move_button object_move_right_button"
            aria-label="Move selected piece right"
          >
            <FontAwesomeIcon icon={faArrowRight} size="2xl" style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}/>
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_bottom"
              // prettier-ignore
              style={{color: model_creation_state  ? "#ffd5b3" : !object_selected  ? "rgba(191, 191, 191, 0.5)"  : camera_3d_direction === "south"  ? "#ffd5b3"  : "#bbbbbb"}}
            >
              {camera_3d_direction === "north"
                ? "Back -Z"
                : camera_3d_direction === "east"
                ? "Back -X"
                : camera_3d_direction === "west"
                ? "Back +X"
                : camera_3d_direction === "south"
                ? "Back +Z"
                : "unknown"}
            </div>
          )}
          <button
            onClick={() => ObjectTransformButton("move_back")}
            className="object_move_button object_move_back_button"
            aria-label="Move selected piece backward"
          >
            <FontAwesomeIcon icon={faArrowDown} size="2xl" style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}/>
          </button>
          {camera_type === "camera_3d" && (
            <div
              className="camera_direction_indicator indicator_left"
              // prettier-ignore
              style={{color: model_creation_state  ? "#ffd5b3" : !object_selected  ? "rgba(191, 191, 191, 0.5)"  : camera_3d_direction === "east"  ? "#ffd5b3"  : "#bbbbbb"}}
              
            >
              {camera_3d_direction === "north"
                ? "Left -X"
                : camera_3d_direction === "east"
                ? "Left +Z"
                : camera_3d_direction === "west"
                ? "Left -Z"
                : camera_3d_direction === "south"
                ? "Left +X"
                : "unknown"}
            </div>
          )}
          <button
            onClick={() => ObjectTransformButton("move_left")}
            className="object_move_button object_move_left_button"
            aria-label="Move selected piece left"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2xl"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
            />
          </button>
          {camera_type === "camera_3d" && (
            <button
              onClick={() => ObjectTransformButton("move_up")}
              className="object_move_button object_move_up_button"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              aria-label="Raise selected piece"
            >
              Raise
              <FontAwesomeIcon icon={faCircleUp} size="3x" />
            </button>
          )}
          {camera_type === "camera_3d" && (
            <button
              onClick={() => ObjectTransformButton("move_down")}
              className="object_move_button object_move_down_button"
              style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}
              aria-label="Lower selected piece"
            >
              <FontAwesomeIcon icon={faCircleDown} size="3x" />
              Lower
            </button>
          )}
          <div className="object_rotation_container">
            <button
              onClick={() => ObjectTransformButton("rotate_left")}
              className="rotation_direction_button"
              style={{ color: object_selected || model_creation_state ? "#ffd5b3" : "rgba(120, 120, 120, 0.5)" }}
              aria-label="Rotate placement left"
            >
              <FontAwesomeIcon icon={faArrowRotateRight} size="2xl" style={{ color: object_selected  ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}/>
              Left
            </button>
            <div onClick={() => ChangeRotationDegree()} className="model_rotation_wheel" role="button" aria-label="Change rotation step">
              <div className="model_rotation_button" style={{ color: object_selected || model_creation_state ? "#a8a8a8" : "rgba(191, 191, 191, 0.5)" }} >{next_object_rotation_degree}°</div>
              <button
                className="rotation_change_button"
                style={{ color: object_selected || model_creation_state ? "#ffd5b3" : "rgba(191, 191, 191, 0.5)" }}
              >
                {object_rotation_degree}°
              </button>
              <div className="model_rotation_button" style={{ color: object_selected || model_creation_state ? "#a8a8a8" : "rgba(191, 191, 191, 0.5)" }}>{previous_object_rotation_degree}°</div>
            </div>
            <button
              onClick={() => ObjectTransformButton("rotate_right")}
              className="rotation_direction_button"
              style={{ color: object_selected || model_creation_state ? "#ffd5b3" : "rgba(120, 120, 120, 0.5)" }}
              aria-label="Rotate placement right"
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} size="2xl" style={{ color: object_selected ? "#a8a8a8" : "rgba(120, 120, 120, 0.5)" }}/>
              Right
            </button>
          </div>
        </>
      )}
    </>
  );
}
