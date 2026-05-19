import React from "react";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";

interface VoiceActivatedAutoStartProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const VoiceActivatedAutoStart: React.FC<VoiceActivatedAutoStartProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { t } = useTranslation();
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const alwaysOnMode = getSetting("always_on_microphone") ?? false;
    const voiceActivated = getSetting("voice_activated_auto_start") ?? false;

    return (
      <ToggleSwitch
        checked={voiceActivated}
        onChange={(enabled) =>
          updateSetting("voice_activated_auto_start", enabled)
        }
        isUpdating={isUpdating("voice_activated_auto_start")}
        label={t("settings.debug.voiceActivatedAutoStart.label")}
        description={t("settings.debug.voiceActivatedAutoStart.description")}
        descriptionMode={descriptionMode}
        grouped={grouped}
        disabled={!alwaysOnMode}
      />
    );
  });
