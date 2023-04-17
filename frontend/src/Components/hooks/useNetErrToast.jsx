/* eslint-disable functional/no-expression-statements */

import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useNetErrToast = () => {
  const { t } = useTranslation();
  const displayNetErr = () => {
    toast.error(t('feedback.errorNetwork'));
  };
  return displayNetErr;
};

export default useNetErrToast;
