import { IFireAlertDialog, alertDialogRef } from '@lib/components/alert_dialog';
import { useCallback } from 'react';

export function useAlertDialog() {
  const showAlertDialog = useCallback((options: IFireAlertDialog) => {
    alertDialogRef.current?.fire(options);
  }, []);

  const dismissDialog = useCallback(() => {
    alertDialogRef.current?.dismiss();
  }, []);

  return {
    showAlertDialog,
    dismissDialog
  };
}
