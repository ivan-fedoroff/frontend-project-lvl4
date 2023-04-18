import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useNetErrToast = () => {
  const { t } = useTranslation();
  const displayNetErr = () => {
    /* eslint-disable functional/no-expression-statements */
    toast.error(t('feedback.errorNetwork'));
    /* eslint-enable */
  };
  return displayNetErr;
};

export default useNetErrToast;
