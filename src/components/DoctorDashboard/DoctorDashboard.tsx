import { DispatchWithoutAction, FC, useEffect } from "react";
import "./DoctorDashboard.scss";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

export const DoctorDashboard: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = () => {
  const navigate = useNavigate();
  const [colorScheme, themeParams] = useThemeParams();


  useEffect(() => {
    const handleBackButtonClick = () => {
      navigate(-1);
    };
    window.Telegram.WebApp.onEvent("backButtonClicked", handleBackButtonClick);
    window.Telegram.WebApp.BackButton.show();
    return () => {
      window.Telegram.WebApp.offEvent("backButtonClicked", handleBackButtonClick);
      window.Telegram.WebApp.BackButton.hide();
    };
  }, [navigate]);

  return (
    <ConfigProvider
      theme={
        themeParams.text_color
          ? {
              algorithm:
                colorScheme === "dark"
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
              token: {
                colorText: themeParams.text_color,
                colorPrimary: themeParams.button_color,
                colorBgBase: themeParams.bg_color,
              },
            }
          : undefined
      }
    >
        <h1>Doctor Dashboard</h1>
    </ConfigProvider>
  );
};

export default DoctorDashboard;
