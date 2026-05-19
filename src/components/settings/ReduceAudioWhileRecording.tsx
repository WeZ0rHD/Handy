import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { Slider } from "../ui/Slider";
import { useSettings } from "../../hooks/useSettings";

interface ReduceAudioWhileRecordingProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ReduceAudioWhileRecording: React.FC<ReduceAudioWhileRecordingProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const reduceEnabled = getSetting("reduce_audio_while_recording") ?? false;
    const reductionLevel = getSetting("audio_reduction_level") ?? 70;

    return (
      <div className="flex flex-col gap-3">
        <ToggleSwitch
          checked={reduceEnabled}
          onChange={(enabled) => updateSetting("reduce_audio_while_recording", enabled)}
          isUpdating={isUpdating("reduce_audio_while_recording")}
          label={t("settings.sound.reduceAudioWhileRecording.label")}
          description={t("settings.sound.reduceAudioWhileRecording.description")}
          descriptionMode={descriptionMode}
          grouped={grouped}
        />
        {reduceEnabled && (
          <div className="flex flex-col gap-2 pl-6">
            <label className="text-sm text-slate-400">
              {t("settings.sound.reduceAudioWhileRecording.reductionLevel")}: {reductionLevel}%
            </label>
            <Slider
              value={reductionLevel}
              onChange={(value) => updateSetting("audio_reduction_level", value)}
              min={0}
              max={100}
              step={5}
              label={t("settings.sound.reduceAudioWhileRecording.reductionLevel")}
              description=""
              descriptionMode="inline"
            />
          </div>
        )}
      </div>
    );
  });