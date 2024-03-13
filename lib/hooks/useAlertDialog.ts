import { IFireAlertDialog, alertDialogRef } from "@lib/components/alert_dialog";
import { useCallback } from "react";

export function useAlertDialog() {
  const showAlertDialog = useCallback((options: IFireAlertDialog) => {
    alertDialogRef.current?.fire(options);
  }, []);

  return {
    showAlertDialog,
  };
}
