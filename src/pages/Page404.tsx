import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Page404() {
  const [t] = useTranslation();
  return (
    <div
      className="h-screen capitalize"
      style={{
        width: "100%",
        // height: "100%",
        backgroundColor: "var(--clr-product)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "80px",
      }}
    >
      404 😢
      <p className="text-center text-capitalize">{t("404")}</p>
    </div>
  );
}
